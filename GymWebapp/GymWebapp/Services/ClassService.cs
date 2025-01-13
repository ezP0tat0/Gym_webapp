using AutoMapper;
using GymWebapp.Model;
using GymWebapp.Model.Dtos;
using GymWebapp.Mapper;

namespace GymWebapp.Services
{
    public interface IClassService
    {

    }
    public class ClassService:IClassService
    {
        private readonly DataContext _dataContext;
        private readonly IMapper _mapper;

        public ClassService(DataContext dataContext, IMapper mapper)
        {
            _dataContext = dataContext;
            _mapper = mapper;
        }
    }
}
