using AutoMapper;
using GymWebapp.Model;
using GymWebapp.Model.Dtos;
using GymWebapp.Mapper;

namespace GymWebapp.Services
{
    public interface ITicketService
    {

    }
    public class TicketService:ITicketService
    {
        private readonly DataContext _dataContext;
        private readonly IMapper _mapper;

        public TicketService(DataContext dataContext, IMapper mapper)
        {
            _dataContext = dataContext;
            _mapper = mapper;
        }
    }
}
