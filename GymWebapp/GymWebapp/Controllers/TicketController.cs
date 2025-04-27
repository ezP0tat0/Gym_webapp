using Microsoft.AspNetCore.Mvc;
using GymWebapp.Services;
using GymWebapp.Model;
using GymWebapp.Model.Dtos;
using GymWebapp.Model.Data;
using GymWebapp.Mapper;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;

namespace GymWebapp.Controllers
{


    // X alkalmas jegyek ?????????

    [Route("api/[controller]")]
    [ApiController]
    public class TicketController : Controller
    {
        private readonly ITicketService _ticketService;

        public TicketController(ITicketService ticketService)
        {
            _ticketService = ticketService;
        }

        [HttpGet]
        public async Task<IActionResult> ListAllTickets()
        {
            var result = await _ticketService.getAllTickets();
            return Ok(result);
        }
        [HttpGet("myTickets")]
        public async Task<IActionResult> getMyTickets()
        {
            var userIdString = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (int.TryParse(userIdString, out int userId))
            {
                var result = await _ticketService.getMyTickets(userId);
                return Ok(result);
            }
            else throw new Exception($"Claim User nem talált: {userIdString}");
        }

        [HttpPost("purchaseTicket/{id}")]
        public async Task<IActionResult> PurchaseTicket(int id)
        {
            var userIdString = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (int.TryParse(userIdString, out int userId))
            {
                await _ticketService.TicketPurchase(id, userId);
                return Ok("Sikeres vásárlás");
            }
            else throw new Exception($"Claim User nem talált: {userIdString}");
        }

        [HttpPost("useTicket")]
        public async Task<IActionResult> UseTicket(int boughtTicketId)
        {
            var userIdString = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (int.TryParse(userIdString, out int userId))
            {
                var result = await _ticketService.UseTicket(boughtTicketId,userId);
                return Ok(result);
            }
            else throw new Exception($"Claim User nem talált: {userIdString}");
            
        }

        [Authorize(Roles ="Admin")]
        [HttpPost("NewTicket")]
        public async Task<IActionResult> AddNewTicket([FromForm]NewTicketDto newTicket)
        {
            await _ticketService.AddNewTicketType(newTicket);
            return Ok("Sikeresen hozzáadva");
        }

        [Authorize(Roles ="Admin")]
        [HttpPatch("ChangePrice/{ticketId}")]
        public async Task<IActionResult> ChangeTicketPrice(int ticketId,[FromBody]NewPrice price)
        {
            await _ticketService.ChangeTicketPrice(ticketId,price.Price);
            return Ok("Ár sikeresen megváltoztatva");
        }
        [Authorize(Roles ="Admin")]
        [HttpPatch("ChangeImage/{ticketId}")]
        public async Task<IActionResult> ChangeImage(int ticketId, [FromBody]NewPicture image)
        {
            await _ticketService.ChangeImage(ticketId, image.Image);
            return Ok("Kép sikeresen változtatva");
        }

        [HttpGet("Image/{id}")]
        public async Task<IActionResult> getImage(int id)
        {
            var ticket = await _ticketService.GetImage(id);

            return File(ticket.Item1, ticket.Item2);
        }


    }
}
