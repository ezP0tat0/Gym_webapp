using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using GymWebapp.Services;
using GymWebapp.Model;
using GymWebapp.Model.Dtos;
using GymWebapp.Model.Data;
using GymWebapp.Mapper;

namespace GymWebapp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : Controller
    {
        private readonly IAuthService _authService;
        private readonly IMapper _mapper;

        public AuthController(IAuthService authService, IMapper mapper)
        {
            _authService = authService;
            _mapper = mapper;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginDto login)
        {
            var response = await _authService.Login(login);
            return Ok(response);
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(RegisterDto registerDto)
        {
            User user = _mapper.Map<RegisterDto, User>(registerDto);
            _mapper.Map<RegisterDto, User>(registerDto);
            await _authService.Register(user, registerDto.Password);
            return Ok("");
        }
    }
}
