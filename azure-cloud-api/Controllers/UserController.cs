using azure_cloud_api.Modals.Request;
using azure_cloud_api.Services.IServices;
using Microsoft.AspNetCore.Mvc;

namespace azure_cloud_api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;

        public UserController( IUserService userservice)
        {
            _userService = userservice ?? throw new ArgumentNullException(nameof(userservice));
        }

        [HttpGet("tenant-users")]
        public async Task<IActionResult> GetTenantUsersAsync()
        {
            try
            {
                var users = await _userService.GetTenantUsersAsync();
                return Ok(users);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error: " + ex.Message);
            }
        }

        [HttpGet("tenant-groups")]
        public async Task<IActionResult> GetTenantGroupsAsync()
        {
            try
            {
                var groups = await _userService.GetTenantGroupsAsync();
                return Ok(groups);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error: " + ex.Message);
            }
        }

        [HttpPost("exchange-microsoft")]
        public async Task<IActionResult> ExchangeMicrosoftToken([FromBody] MicrosoftTokenRequestDto request)
        {
            var jwt = await _userService.ExchangeMicrosoftTokenAsync(request);
            if (jwt == null)
                return BadRequest("Token inválido ou usuário não encontrado.");

            return Ok(new { token = jwt });
        }

    }
}
