using GymWebapp.Model;
using GymWebapp.Model.Dtos;
using AutoMapper;
using GymWebapp.Mapper;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Http.HttpResults;

namespace GymWebapp.Services
{
    public interface IUserService
    {
        Task<List<UserInfoDto>> getAllUsers();
        Task RoleChange(RoleChangeDto rl);
        Task<UserInfoDto> getUserInfo(int id);
    }
    public class UserService:IUserService
    {
        private readonly DataContext _dataContext;
        private readonly IMapper _mapper;

        public UserService(DataContext dataContext,IMapper mapper) 
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
            var user=await _dataContext.Users.FindAsync(rl.UserId);
            if (user == null) throw new Exception("Felhasználó nem található");

            user.Role = rl.Role;
            await _dataContext.SaveChangesAsync();
        }
        public async Task<UserInfoDto> getUserInfo(int id)
        {
            var user = await _dataContext.Users.FirstOrDefaultAsync(x => x.Id == id);
            if (user == null) throw new Exception("felhasználó nem található");

            var response=_mapper.Map<UserInfoDto>(user);
            
            return response;
        }
    }
}
