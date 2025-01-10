using Microsoft.AspNetCore.Mvc;
using GymWebapp.Services;
using GymWebapp.Model;
using GymWebapp.Model.Dtos;
using GymWebapp.Model.Data;
using GymWebapp.Mapper;
using Microsoft.AspNetCore.Authorization;


namespace GymWebapp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : Controller
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [Authorize(Roles = "Admin")]
        [HttpGet("allUser")]
        public async Task<IActionResult> getAllUser()
        {
            var result = await _userService.getAllUsers();
            return Ok(result);
        }

        [Authorize(Roles = "Admin")]
        [HttpPatch("toAdmin/{id}")]
        public async Task<IActionResult> ToAdmin([FromRoute]int id)
        {
            await _userService.ToAdmin(id);
            return Ok(new { message = "Sikeresen változtatva" });
        }
    }
}
