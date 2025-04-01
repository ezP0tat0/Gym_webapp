using GymWebapp.Services;
using Microsoft.AspNetCore.Mvc;

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
    }
}
