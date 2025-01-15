using AutoMapper;
using GymWebapp.Model;
using GymWebapp.Model.Dtos;
using GymWebapp.Mapper;
using GymWebapp.Model.Data;
using Microsoft.EntityFrameworkCore;

namespace GymWebapp.Services
{
    public interface ITicketService
    {
        Task<List<TicketType>> getAllTickets();
        Task<List<MyTicketsDto>> getMyTickets(int userId);
        Task TicketPurchase(int ticketId, int userId);
        Task<string> UseTicket(int BoughtTicketId);
        Task AddNewTicketType(NewTicketDto newTicket);
        Task ChangeTicketPrice(int ticketId, int price);

    }
    public class TicketService : ITicketService
    {
        private readonly DataContext _dataContext;
        private readonly IMapper _mapper;

        public TicketService(DataContext dataContext, IMapper mapper)
        {
            _dataContext = dataContext;
            _mapper = mapper;
        }
        public async Task<List<TicketType>> getAllTickets()
        {
            var result = _dataContext.TicketTypes.ToList();
            return result;
        }

        public async Task<List<MyTicketsDto>> getMyTickets(int userId)
        {
            var myTickets=_dataContext.BougthTickets.Include(x=>x.TicketType).Include(x=>x.User).Where(x => x.UserId == userId);
            var result = _mapper.Map<List<MyTicketsDto>>(myTickets);
            return result;
        }

        public async Task TicketPurchase(int ticketId, int userId)
        {

        }

        public async Task<string> UseTicket(int ticketId)
        {
            return "";
        }

        public async Task AddNewTicketType(NewTicketDto newTicket)
        {

        }
        public async Task ChangeTicketPrice(int ticketId, int price)
        {

        }
    }
}
