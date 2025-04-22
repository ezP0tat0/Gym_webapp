using AutoMapper;
using GymWebapp.Model;
using GymWebapp.Model.Data;
using GymWebapp.Model.Dtos;

namespace GymWebapp.Services
{
    public interface ILoggingService
    {
        Task addLog(List<LogDto> l, int userId);
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
        public async Task addLog(List<LogDto> l, int userId)
        {
            var last = _dataContext.Logs.LastOrDefault().SetGroupId;
            int setg = last == null ? 0 : last + 1;
            foreach (LogDto log in l)
            {
                var c = new Log()
                {
                    SetGroupId = setg,
                    UserId = userId,
                    ExerciseId = log.ExerciseId,
                    Date = log.Date,
                    Repetition = log.Repetition,
                };

                await _dataContext.Logs.AddAsync(c);

            }
            await _dataContext.SaveChangesAsync();
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

            foreach(var e in _dataContext.Logs)
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