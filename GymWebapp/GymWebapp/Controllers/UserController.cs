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
        [HttpPatch("RoleChange")]
        public async Task<IActionResult> RoleChange(RoleChangeDto rl)
        {
            await _userService.RoleChange(rl);
            return Ok(new { message = "Sikeresen változtatva" });
        }

        [HttpGet]
        public async Task<IActionResult> getUserInfo()
        {
            var userIdString = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (int.TryParse(userIdString, out int userId))
            {
                var result = await _userService.getUserInfo(userId);
                return Ok(result);
            }
            else throw new Exception($"Claim User nem talált: {userIdString}");
        }

        [Authorize(Roles = "Admin")]
        [HttpDelete("DeleteUser")]

        public async Task<IActionResult> deleteUser(Userid user)
        {
            if (user.UserId != 0) await _userService.DeleteUser(user.UserId);
            else
            {
                var userIdString = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                if (int.TryParse(userIdString, out int userId))
                {
                    await _userService.DeleteUser(userId);
                }
            }

            return Ok("Sikeresen törölve");
        }

        [HttpPatch("AddPhoneNo")]
        public async Task<IActionResult> AddPhoneNumber(UpdateTrainerInfo phoneNo)
        {
            var userIdString = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (int.TryParse(userIdString, out int userId))
            {
                await _userService.AddPhoneNo(phoneNo.text, userId);
                return Ok("Sikeresen hozzáadva");
            }
            else throw new Exception($"Claim User nem talált: {userIdString}");

        }
        [HttpPatch("Expertise")]
        public async Task<IActionResult> AddExpertise(UpdateTrainerInfo expertise)
        {
            var userIdString = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (int.TryParse(userIdString, out int userId))
            {
                await _userService.AddExpertise(expertise.text, userId);
                return Ok("Sikeresen hozzáadva");
            }
            else throw new Exception($"Claim User nem talált: {userIdString}");
        }
        [HttpPatch("ChangeImg")]
        public async Task<IActionResult> ChangeImg([FromForm]NewPicture image)
        {
            var userIdString = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (int.TryParse(userIdString, out int userId))
            {
                await _userService.changeImg(image.Image,userId);
                return Ok("Sikeresen hozzáadva");
            }
            else throw new Exception($"Claim User nem talált: {userIdString}");
        }
        [HttpGet("Trainers")]
        public async Task<IActionResult> getTrainers()
        {
            var response = await _userService.getAllTrainers();
            return Ok(response);
        }
        [HttpGet("oneTrainer/{id}")]
        public async Task<IActionResult> getTrainer(int id) 
        {
            var trainer = await _userService.getTrainer(id);
            return Ok(trainer);
        }
        [HttpGet("Image/{id}")]
        public async Task<IActionResult> getImage(int id)
        {
            var ticket = await _userService.GetImage(id);

            return File(ticket.Item1, ticket.Item2);
        }
    }
}
