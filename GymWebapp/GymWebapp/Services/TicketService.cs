using AutoMapper;
using GymWebapp.Model;
using GymWebapp.Model.Dtos;
using GymWebapp.Mapper;
using GymWebapp.Model.Data;
using Microsoft.EntityFrameworkCore;
using System;

namespace GymWebapp.Services
{
    public interface ITicketService
    {
        Task<List<TicketType>> getAllTickets();
        Task<List<MyTicketsDto>> getMyTickets(int userId);
        Task TicketPurchase(int ticketId, int userId);
        Task<string> UseTicket(int BoughtTicketId, int userId);
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
            var myTickets = _dataContext.BougthTickets.Include(x => x.TicketType).Where(x => x.UserId == userId);
            var result = _mapper.Map<List<MyTicketsDto>>(myTickets);
            return result;
        }

        public async Task TicketPurchase(int ticketId, int userId)
        {
            //purchase change!!!!!!!!!!
           //id,ticketID,userId, duration
            var ticketType= await _dataContext.TicketTypes.FindAsync(ticketId);
            var newBoughtTicket = new BougthTicket
            {
                TicketTypeId = ticketId,
                UserId = userId,
                Duration = ticketType.Duration
            };

            _dataContext.Add(newBoughtTicket);
            await _dataContext.SaveChangesAsync();
        }

        public async Task<string> UseTicket(int ticketId,int userId)
        {
            var usedTicket = await _dataContext.BougthTickets.FindAsync(ticketId);
            if (usedTicket == null) throw new Exception("Jegy nem található");

            var AccessCode = AccessCodeGenerate();

            if(usedTicket.Duration.Equals("1")) _dataContext.BougthTickets.Remove(usedTicket);

            else 
            {
                if(!usedTicket.Duration.Contains('.')) usedTicket.Duration = $"{int.Parse(usedTicket.Duration)-1}";
            }

            var ActiveTicket = new ActiveTicket()
            {
                AccessCode = AccessCode,
                UserId = userId,
                ExpireDate = DateTime.Now.AddHours(24)
            };

            _dataContext.ActiveTickets.Add(ActiveTicket);
            await _dataContext.SaveChangesAsync();

            return AccessCode;
        }

        public async Task AddNewTicketType(NewTicketDto newTicket)
        {
            var newTicketType = _mapper.Map<TicketType>(newTicket);
            
            _dataContext.TicketTypes.Add(newTicketType);
            await _dataContext.SaveChangesAsync();

        }
        public async Task ChangeTicketPrice(int ticketId, int price)
        {
            var ticket=await  _dataContext.TicketTypes.FindAsync(ticketId);
            
            if (ticket == null) throw new Exception("Jegy nem található");

            ticket.Price = price;

            await _dataContext.SaveChangesAsync();

        }

        private string AccessCodeGenerate()
        {
            Random rnd = new Random();

            int RandomNumber = rnd.Next(0000, 10000);

            return $"{RandomNumber}";
        }
    }
}
