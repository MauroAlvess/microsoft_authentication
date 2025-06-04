
using azure_cloud_api.Modals;
using azure_cloud_api.Modals.Request;

namespace azure_cloud_api.Services.IServices
{
    public interface IUserService
    {
        Task<IEnumerable<UsersDto>> GetTenantUsersAsync();
        Task<IEnumerable<GroupDto>> GetTenantGroupsAsync();
        Task<string?> ExchangeMicrosoftTokenAsync(MicrosoftTokenRequestDto request);

    }
}
