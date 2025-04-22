using GymWebapp.Services;
using Microsoft.AspNetCore.Mvc;
using GymWebapp.Model;
using GymWebapp.Model.Data;
using GymWebapp.Model.Dtos;
using System.Security.Claims;

namespace GymWebapp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoggingController : Controller
    {
        private readonly ILoggingService _loggingService;

        public LoggingController(ILoggingService loggingService)
        {
            _loggingService = loggingService;
        }

        [HttpPost("addLog")]
        public async Task<IActionResult> addLog(List<LogDto> l)
        {
            var userIdString = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (int.TryParse(userIdString, out int userId))
            {
                await _loggingService.addLog(l, userId);
                return Ok("Sikeres vásárlás");
            }
            else throw new Exception($"Claim User nem talált: {userIdString}");
        }

        [HttpDelete("removeLog")]
        public async Task<IActionResult> removeLog(int i)
        {
            await _loggingService.removeLog(i);
            return Ok("Sikeresen Törölve");
        }

        [HttpGet("getLogs")]
        public async Task<IActionResult> getLogs(string exercise = "")
        {
            var logs = await _loggingService.getLogs(exercise);
            return Ok(logs);
        }

        [HttpPost("addExercise")]
        public async Task<IActionResult> addExercise(ExerciseDto ex)
        {
            await _loggingService.addExercise(ex);
            return Ok("Sikeresen hozzáadva");
        }

        [HttpGet("getExercises")]
        public async Task<IActionResult> getExercises()
        {
            var exs= await _loggingService.getExercises();
            return Ok(exs);
        }
    }
}
