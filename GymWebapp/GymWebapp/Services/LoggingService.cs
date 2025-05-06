using AutoMapper;
using GymWebapp.Model;
using GymWebapp.Model.Data;
using GymWebapp.Model.Dtos;
using Microsoft.EntityFrameworkCore;

namespace GymWebapp.Services
{
    public interface ILoggingService
    {
        Task addLog(List<addLogDto> l, int userId);
        Task removeLog(int i);
        Task<List<LogDto>> getLogs(string exercise);
        Task addExercise(ExerciseDto exercise);
        Task<List<ExerciseDto>> getExercises();
    }
    public class LoggingService : ILoggingService
    {
        private readonly DataContext _dataContext;
        private readonly IMapper _mapper;

        public LoggingService(DataContext dataContext, IMapper mapper)
        {
            _dataContext = dataContext;
            _mapper = mapper;
        }
        public async Task addLog(List<addLogDto> l, int userId)
        {
            var last = _dataContext.Logs.OrderBy(x=>x.SetGroupId).LastOrDefault();
            int setg = last == null ? 0 : last.SetGroupId + 1;
            
                for (int i = 0; i < l.Count(); i++)
                {
                    var lo = new Log()
                    {
                        SetGroupId = setg,
                        UserId = userId,
                        ExerciseId = _dataContext.Exercises.FirstOrDefault(x => x.Name.Equals(l[i].Exercise)).Id,
                        Date = DateTime.Now,
                        Repetition = l[i].Repetition
                    };
                    await _dataContext.Logs.AddAsync(lo);

                    await _dataContext.SaveChangesAsync();
                }
        }

        public async Task removeLog(int i)
        {
            int sg=_dataContext.Logs.Find(i).SetGroupId;
            var list=_dataContext.Logs.ToList().Where(x=>x.SetGroupId==sg);
            
            foreach (var e in list)
                _dataContext.Logs.Remove(e);

            await _dataContext.SaveChangesAsync();
        }
        public async Task<List<LogDto>> getLogs(string exercise)
        {
            var logList = new List<LogDto>();

            foreach(var e in _dataContext.Logs.Include(x=>x.Exercise))
                logList.Add(_mapper.Map<LogDto>(e));

            return logList;
        }
        public async Task addExercise(ExerciseDto exercise)
        {
            await _dataContext.Exercises.AddAsync(_mapper.Map<Exercise>(exercise));
            await _dataContext.SaveChangesAsync();
        }
        public async Task<List<ExerciseDto>> getExercises()
        {
            var exs= new List<ExerciseDto>();
            foreach (var e in _dataContext.Exercises)
                exs.Add(_mapper.Map<ExerciseDto>(e));

            return exs;
        }

    }
}