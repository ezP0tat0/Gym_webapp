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
        Task<Tuple<byte[], string>> GetImage(int id);
        Task AddExpertise(string expertise,int userId);
        Task<TranersDto> getTrainer(int userId);
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
            var response = new List<UserInfoDto>();

            foreach(var e in users) response.Add(_mapper.Map<UserInfoDto>(e));


            return response;
        }
        public async Task RoleChange(RoleChangeDto rl)
        {
            var user = await _dataContext.Users.FindAsync(rl.UserId);
            if (user == null) throw new Exception("Felhasználó nem található");

            if (user.Role.Equals("Trainer") && rl.Role.Equals("User"))
                _dataContext.Trainers.Remove(await _dataContext.Trainers.FindAsync(rl.UserId));
            else
            {
                user.Role = rl.Role;

                if (user.Role.Equals("Trainer"))
                {
                    IImgService _imgService = new ImgService();
                    var convertedImg = _imgService.imgToBytes();

                    var trainer = new Trainer()
                    {
                        Id = rl.UserId,
                        PhoneNumber = "",
                        Expertise = "",
                        ImageData = convertedImg.data,
                        ImageType = convertedImg.type,
                    };

                    await _dataContext.Trainers.AddAsync(trainer);
                }
            }

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

            var response = new List<TranersDto>();

            foreach (var e in trainers) response.Add(_mapper.Map<TranersDto>(e));
                

            return response;
        }

        public async Task<Tuple<byte[], string>> GetImage(int id)
        {
            var user = await _dataContext.Trainers.FindAsync(id);

            if (user == null) throw new Exception("Trainer nem található");

            var Img = new Tuple<byte[], string>(user.ImageData, user.ImageType);

            return Img;
        }

        public async Task AddExpertise(string expertise, int userId)
        {
            var trainer =await _dataContext.Trainers.FindAsync(userId);
            if (trainer == null) throw new Exception("edző nem található");

            trainer.Expertise = expertise;
            await _dataContext.SaveChangesAsync();
        }
        public async Task<TranersDto> getTrainer(int userId) 
        {
            var trainer = await _dataContext.Trainers.FindAsync(userId);
            if (trainer == null) throw new Exception("edző nem található");

            var response = _mapper.Map<TranersDto>(trainer);

            return response;
        }
    }
}
