
using azure_cloud_api.Modals;
using azure_cloud_api.Repositories.IRepositories;
using Microsoft.Graph;

namespace azure_cloud_api.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly GraphServiceClient _graphServiceClient;


        public UserRepository (GraphServiceClient graphServiceClient)
        {
            _graphServiceClient = graphServiceClient;
        }

        public async Task<IEnumerable<UsersDto>> GetTenantUsersAsync()
        {
            var users = await _graphServiceClient.Users.GetAsync(requestConfig =>
            {
                requestConfig.QueryParameters.Select = new[] { "id", "displayName", "mail", "userPrincipalName" };
                requestConfig.QueryParameters.Top = 10;
            });

            return users.Value.Select(u => new UsersDto
            {
                Id = u.Id,
                DisplayName = u.DisplayName,
                Mail = u.Mail,
                UserPrincipalName = u.UserPrincipalName
            });
        }

        public async Task<IEnumerable<GroupDto>> GetTenantGroupsAsync()
        {
            var groups = await _graphServiceClient.Groups.GetAsync(requestConfig =>
            {
                requestConfig.QueryParameters.Select = new[] { "id", "displayName", "mail" };
                requestConfig.QueryParameters.Top = 10;
            });

            return groups.Value.Select(g => new GroupDto
            {
                Id = g.Id,
                DisplayName = g.DisplayName,
                Mail = g.Mail
            });
        }

    }
}
