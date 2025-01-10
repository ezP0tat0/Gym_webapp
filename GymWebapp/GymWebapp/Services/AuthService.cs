using GymWebapp.Model;
using GymWebapp.Model.Dtos;
using GymWebapp.Model.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;

namespace GymWebapp.Services
{
    public interface IAuthService
    {
        Task Register(User user, string password);
        Task<AuthResponseDto> Login(LoginDto loginDto);
        Task<User?> GetProfile();
    }
    public class AuthService : IAuthService
    {
        private readonly IConfiguration _configuration;
        private readonly DataContext _context;
        private readonly IHttpContextAccessor _httpContext;

        public AuthService(IConfiguration configuration, DataContext context, IHttpContextAccessor httpContext)
        {
            _configuration = configuration;
            _context = context;
            _httpContext = httpContext;
        }
        public async Task<AuthResponseDto> Login(LoginDto login)
        {
            var profile = await _context.Users!.FirstOrDefaultAsync(x => x.Username.Equals(login.Username))
                    ?? throw new Exception("Rossz Felhasználónév vagy jelszó");

            if (VerifyPasswordHash(login.Password, profile.pwHash!, profile.pwSalt!))
            {
                return new AuthResponseDto
                {
                    Username = profile.Username,
                    Name = profile.Name,
                    Role = profile.Role,
                    Token = CreateToken(profile)
                };
            }
            else throw new Exception("Rossz felhasználónév vagy jelszó");
        }
        public async Task Register(User profile, string password)
        {
            if (await ProfileExist(profile.Username))
                throw new Exception("Felhasználónév már foglalt");
            CreatePasswordHash(password, out byte[] psHash, out byte[] pwSalt);

            profile.pwHash = psHash;
            profile.pwSalt = pwSalt;

            await _context.Users!.AddAsync(profile);
            await _context.SaveChangesAsync();
        }

        public async Task<bool> ProfileExist(string username)
        {
            if (await _context.Users!.AnyAsync(x => x.Username.Equals(username)))
                return true;
            return false;
        }
        private string CreateToken(User user)
        {
            List<Claim> claims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, user.Username),
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Role, user.Role)
            };

            var key = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes(_configuration.GetSection("Token").Value));

            var cred = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var token = new JwtSecurityToken(
                    claims: claims,
                    expires: DateTime.Now.AddDays(1),
                    signingCredentials: cred
            );

            var jwt = new JwtSecurityTokenHandler().WriteToken(token);

            return jwt;
        }

        private void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using (var hmac = new HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
        }

        private bool VerifyPasswordHash(string password, byte[] passwordHash, byte[] passwordSalt)
        {
            using (var hmac = new HMACSHA512(passwordSalt))
            {
                var computedHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
                return computedHash.SequenceEqual(passwordHash);
            }
        }

        public Task<User?> GetProfile()
        {
            var username = _httpContext.HttpContext.User.FindFirst(ClaimTypes.Name)?.Value;
            return _context.Users!.FirstOrDefaultAsync(x => x.Username.Equals(username!));
        }
    }
}
