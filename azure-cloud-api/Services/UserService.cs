using azure_cloud_api.Modals.Request;
using azure_cloud_api.Modals.Response;
using azure_cloud_api.Repositories.IRepositories;
using azure_cloud_api.Services.IServices;
using Microsoft.Graph;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace azure_cloud_api.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;
        private readonly IConfiguration _configuration;
        
        public UserService(IUserRepository userRepository, IConfiguration configuration, GraphServiceClient graphServiceClient)
        {
            _userRepository = userRepository;
            _configuration = configuration;
        }

        public async Task<TenantInfoResponseDto> GetTenantInfoAsync()
        {
            return await _userRepository.GetTenantInfoAsync();
        }

        public async Task<string?> ExchangeMicrosoftTokenAsync(MicrosoftTokenRequestDto request)
        {
            var handler = new JwtSecurityTokenHandler();
            var jwtToken = handler.ReadJwtToken(request.MicrosoftToken);

            var email = jwtToken.Claims.FirstOrDefault(c => c.Type == "preferred_username" || c.Type == "email")?.Value;

            if (string.IsNullOrEmpty(email))
                return null;

            var claims = new[]
            {
            new Claim(ClaimTypes.Email, email),
        };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JwtSettings:Secret"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: _configuration["JwtSettings:Issuer"],
                audience: _configuration["JwtSettings:Audience"],
                claims: claims,
                expires: DateTime.UtcNow.AddMinutes(Convert.ToDouble(_configuration["JwtSettings:ExpiryMinutes"])),
                signingCredentials: creds
            );

            return handler.WriteToken(token);
        }
    }
}