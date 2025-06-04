
using azure_cloud_api.Modals.Response;

namespace azure_cloud_api.Repositories.IRepositories
{
    public interface IUserRepository
    {
        Task<TenantInfoResponseDto> GetTenantInfoAsync();
    }
}
