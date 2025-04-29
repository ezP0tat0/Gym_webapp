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
        Task<List<TicketDto>> getAllTickets();
        Task<List<MyTicketsDto>> getMyTickets(int userId);
        Task TicketPurchase(int ticketId, int userId);
        Task<string> UseTicket(int BoughtTicketId, int userId);
        Task AddNewTicketType(NewTicketDto newTicket);
        Task ChangeTicketPrice(int ticketId, int price);
        Task<Tuple<byte[], string>> GetImage(int id);
        Task ChangeImage(int id,IFormFile image);
        Task <List<ActiveTicketsDto>> GetActiveTickets(int userId);

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
        public async Task<List<TicketDto>> getAllTickets()
        {
            var tickets = _dataContext.TicketTypes.ToList();
            var result = new List<TicketDto>();
            
            foreach(var e in tickets) result.Add(_mapper.Map<TicketDto>(e));

            return result;
        }

        public async Task<List<MyTicketsDto>> getMyTickets(int userId)
        {

            activeTicketCheck(userId)

            var myTickets = _dataContext.BougthTickets.Include(x => x.TicketType).Where(x => x.UserId == userId);
            var result= new List<MyTicketsDto>();
            
            foreach(var t in myTickets)
                if(ticketValidityCheck(t)) result.Add(_mapper.Map<MyTicketsDto>(t));

            return result;
        }

        private bool ticketValidityCheck(BougthTicket t)
        {
            if(t.Duration.Equals(0))
            {
                if (_dataContext.ActiveTickets.Where(x=>x.UserId==t.UserId).Union(_dataContext.ActiveTickets.Where(x =>x.BougthTicketId==t.Id)==null) return false;
            }

            return true;
        }

        private async void activeTicketCheck(int userId)
        {
            var activeT=_dataContext.ActiveTickets.Where(x => x.UserId == userId);
            
            if(activeT!=null)
                foreach(var t in activeT)
                {
                    if(t.ExpireDate<DateTime.Now) 
                        _dataContext.ActiveTickets.Remove(t);
                }

            await _dataContext.SaveChangesAsync();
        }

        public async Task TicketPurchase(int ticketId, int userId)
        {
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

            if(!usedTicket.Duration.Contains('.')) usedTicket.Duration = $"{int.Parse(usedTicket.Duration)-1}";
            

            var ActiveTicket = new ActiveTicket()
            {
                AccessCode = AccessCode,
                BougthTicketId=usedTicket.Id,
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
        public async Task<List<ActiveTicketsDto>> GetActiveTickets(int userId)
        {
            var at=new List<ActiveTicketsDto>();
            var ActiveTickets=_dataContext.ActiveTickets.ToList().Where(x=>x.UserId==userId);

            foreach (var e in ActiveTickets)
                at.Add(_mapper.Map<ActiveTicketsDto>(e));

            return at;
        }

        private string AccessCodeGenerate()
        {
            Random rnd = new Random();

            int RandomNumber = rnd.Next(0000, 10000);

            return $"{RandomNumber}";
        }


        public async Task<Tuple<byte[],string>> GetImage(int id)
        {
            var ticket = await _dataContext.TicketTypes.FindAsync(id);

            if (ticket == null) throw new Exception("Jegy nem található");

            var Img = new Tuple<byte[], string>(ticket.ImageData,ticket.ImageType);

            return Img;
        }

        public async Task ChangeImage(int id, IFormFile image)
        {
            IImgService _imgService = new ImgService();
            var convertedImg= _imgService.imgToBytes(image);

            var ticket = await _dataContext.TicketTypes.FindAsync(id);
            if (ticket == null) throw new Exception("Jegy nem található");

            ticket.ImageData = convertedImg.data;
            ticket.ImageType = convertedImg.type;

            await _dataContext.SaveChangesAsync();
        }
    }
}
