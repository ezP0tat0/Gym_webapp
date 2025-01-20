using GymWebapp.Model;
using GymWebapp.Model.Dtos;
using AutoMapper;
using GymWebapp.Mapper;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Http.HttpResults;
using GymWebapp.Model.Data;

namespace GymWebapp.Services
{
    public interface IUserService
    {
        Task<List<UserInfoDto>> getAllUsers();
        Task RoleChange(RoleChangeDto rl);
        Task<UserInfoDto> getUserInfo(int id);
        Task DeleteUser(int id);
        Task AddPhoneNo(string phoneNo, int id);
        Task<List<TranersDto>> getAllTrainers();
    }
    public class UserService : IUserService
    {
        private readonly DataContext _dataContext;
        private readonly IMapper _mapper;

        public UserService(DataContext dataContext, IMapper mapper)
        {
            _dataContext = dataContext;
            _mapper = mapper;
        }

        public async Task<List<UserInfoDto>> getAllUsers()
        {
            var users = await _dataContext.Users.ToListAsync();
            var response = _mapper.Map<List<UserInfoDto>>(users);

            return response;
        }
        public async Task RoleChange(RoleChangeDto rl)
        {
            var user = await _dataContext.Users.FindAsync(rl.UserId);
            if (user == null) throw new Exception("Felhasználó nem található");

            user.Role = rl.Role;
            await _dataContext.SaveChangesAsync();
        }
        public async Task<UserInfoDto> getUserInfo(int id)
        {
            var user = await _dataContext.Users.FirstOrDefaultAsync(x => x.Id == id);
            if (user == null) throw new Exception("felhasználó nem található");

            var response = _mapper.Map<UserInfoDto>(user);

            return response;
        }
        public async Task DeleteUser(int id)
        {
            var user = await _dataContext.Users.FirstAsync(x => x.Id == id);
            if (user == null) throw new Exception("Felhasználó nem található");

            _dataContext.Users.Remove(user);
            await _dataContext.SaveChangesAsync();
        }
        public async Task AddPhoneNo(string phoneNo, int id)
        {
            var user = await _dataContext.Trainers.FirstOrDefaultAsync(x => x.Id == id);

            if (user == null) throw new Exception("Felhasználó nem található");

            user.PhoneNumber = phoneNo;
            await _dataContext.SaveChangesAsync();
        }
        public async Task<List<TranersDto>> getAllTrainers()
        {
            var trainers = _dataContext.Trainers.Include(x => x.User).ToList();
            var response = _mapper.Map<List<TranersDto>>(trainers);

            return response;
        }
    }
}
