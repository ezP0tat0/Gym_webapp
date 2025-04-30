using AutoMapper;
using GymWebapp.Model;
using GymWebapp.Model.Data;
using GymWebapp.Model.Dtos;
using GymWebapp.Mapper;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Http.HttpResults;


namespace GymWebapp.Services
{
    public interface IClassService
    {
        Task<List<ClassDto>> getClasses();
        Task joinToClass(int classId, int personId);
        Task CreateClass(NewClassDto classDto);
        Task<Tuple<byte[], string>> GetImage(int id);

    }
    public class ClassService : IClassService
    {
        private readonly DataContext _dataContext;
        private readonly IMapper _mapper;

        public ClassService(DataContext dataContext, IMapper mapper)
        {
            _dataContext = dataContext;
            _mapper = mapper;
        }
        public async Task<List<ClassDto>> getClasses()
        {
            var classes = await _dataContext.Classes.Include(x => x.Trainer).ThenInclude(x => x.User).ToListAsync();

            var result = new List<ClassDto>();

            foreach (var e in classes) result.Add(_mapper.Map<ClassDto>(e));

            return result;
        }

        public async Task joinToClass(int classId, int personId)
        {
            var boughtTickets = _dataContext.BougthTickets.Where(x => x.TicketType.Name.Equals("Edzés jegy"));

            if (!boughtTickets.Any()) throw new Exception("Nincs jegyed edzésfelvételhez");

            if (boughtTickets.All(x => x.Duration.Equals(0))) throw new Exception("Nincs jegyed edzésfelvételhez");

             boughtTickets.First(x=>!x.Duration.Equals(0)).Duration = Convert.ToString(int.Parse(boughtTickets.First().Duration)-1);
            
             var joining = new ClassAttendee()
             {
                 ClassId = classId,
                 UserId = personId,
             };

             _dataContext.classAttendees.Add(joining);

            _dataContext.SaveChanges();
        }
        public async Task CreateClass(NewClassDto classDto)
        {
            var newClass = _mapper.Map<Class>(classDto);
            var trainer = await _dataContext.Users.FirstOrDefaultAsync(x => x.Name.Equals(classDto.TrainerName));
            if (trainer != null) throw new Exception($"Edző nem található ezzel a névvel: {classDto.TrainerName}");
            newClass.TrainerId = trainer!.Id;

            await _dataContext.Classes.AddAsync(newClass);
            await _dataContext.SaveChangesAsync();
        }

        public async Task<Tuple<byte[], string>> GetImage(int id)
        {
            var clas = await _dataContext.Classes.FindAsync(id);

            if (clas == null) throw new Exception("A kiírt óra nem található");

            var Img = new Tuple<byte[], string>(clas.ImageData, clas.ImageType);

            return Img;
        }
    }
}
