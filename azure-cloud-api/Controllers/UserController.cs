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

        [HttpGet("tenant-info")]
        public async Task<IActionResult> GetTenantInfoAsync()
        {
            try
            {
                var tenantInfo = await _userService.GetTenantInfoAsync();
                return Ok(tenantInfo);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error: " + ex.Message);
            }
        }

        [HttpPost("exchange-microsoft-token")]
        public async Task<IActionResult> ExchangeMicrosoftToken([FromBody] MicrosoftTokenRequestDto request)
        {
            var jwt = await _userService.ExchangeMicrosoftTokenAsync(request);
            if (jwt == null)
                return BadRequest("Token inválido ou usuário não encontrado.");

            return Ok(new { token = jwt });
        }

    }
}
