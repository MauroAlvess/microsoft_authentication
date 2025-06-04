
using azure_cloud_api.Modals;

namespace azure_cloud_api.Repositories.IRepositories
{
    public interface IUserRepository
    {
        Task<IEnumerable<GroupDto>> GetTenantGroupsAsync();
        Task<IEnumerable<UsersDto>> GetTenantUsersAsync();
    }
}
