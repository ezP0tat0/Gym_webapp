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
        Task ToAdmin(int id);
    }
    public class UserServices:IUserService
    {
        private readonly DataContext _dataContext;
        private readonly IMapper _mapper;

        public UserServices(DataContext dataContext,IMapper mapper) 
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
        public async Task ToAdmin(int id)
        {
            var user=await _dataContext.Users.FindAsync(id);
            if (user == null) throw new Exception("Felhasználó nem található");

            user.Role = "Admin";
            await _dataContext.SaveChangesAsync();
        }
    }
}
