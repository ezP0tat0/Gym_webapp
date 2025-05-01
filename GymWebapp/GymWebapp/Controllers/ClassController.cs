using GymWebapp.Model.Dtos;
using GymWebapp.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace GymWebapp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClassController : Controller
    {
        private readonly IClassService _classService;

        public ClassController(IClassService classService)
        {
            _classService = classService;
        }

        [HttpGet]
        public async Task<IActionResult> getClasses()
        {
            var result = await _classService.getClasses();
            return Ok(result);
        }
        [Authorize(Roles ="Admin,Trainer")]
        [HttpPost("newClass")]
        public async Task<IActionResult> CreateClass([FromForm]NewClassDto newClass)
        {
            await _classService.CreateClass(newClass);

            return Ok("Edzés sikeresen létrehozva");
        }
        [HttpPost("Join")]
        public async Task<IActionResult> JoinClass(int classId)
        {
            var userIdString = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (int.TryParse(userIdString, out int userId))
            {
                await _classService.joinToClass(classId, userId);

                return Ok("Sikeres csatlakozás");
            }
            else throw new Exception($"Claim User nem talált: {userIdString}");

        }
        [HttpGet("Image/{id}")]
        public async Task<IActionResult> getImage(int id)
        {
            var ticket = await _classService.GetImage(id);

            return File(ticket.Item1, ticket.Item2);
        }

    }
}
