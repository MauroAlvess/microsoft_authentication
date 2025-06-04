
using azure_cloud_api.Modals.Request;
using azure_cloud_api.Modals.Response;

namespace azure_cloud_api.Services.IServices
{
    public interface IUserService
    {
        Task<TenantInfoResponseDto> GetTenantInfoAsync();
        Task<string?> ExchangeMicrosoftTokenAsync(MicrosoftTokenRequestDto request);

    }
}
