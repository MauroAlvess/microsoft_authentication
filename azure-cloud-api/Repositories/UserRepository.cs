
using azure_cloud_api.Modals;
using azure_cloud_api.Modals.Response;
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

        public async Task<TenantInfoResponseDto> GetTenantInfoAsync()
        {
            try
            {
                var users = await _graphServiceClient.Users.GetAsync(requestConfig =>
                {
                    requestConfig.QueryParameters.Select = new[] { "id", "displayName", "mail", "userPrincipalName" };
                    requestConfig.QueryParameters.Top = 10;
                });

                var groups = await _graphServiceClient.Groups.GetAsync(requestConfig =>
                {
                    requestConfig.QueryParameters.Select = new[] { "id", "displayName", "mail" };
                    requestConfig.QueryParameters.Top = 10;
                });

                //var signIns = await _graphServiceClient.AuditLogs.SignIns.GetAsync(requestConfig =>
                //{
                //    requestConfig.QueryParameters.Top = 10;
                //});

                return new TenantInfoResponseDto
                {
                    Users = users.Value.Select(u => new UsersDto
                    {
                        Id = u.Id,
                        DisplayName = u.DisplayName,
                        Mail = u.Mail,
                        UserPrincipalName = u.UserPrincipalName
                    }),
                    Groups = groups.Value.Select(g => new GroupDto
                    {
                        Id = g.Id,
                        DisplayName = g.DisplayName,
                        Mail = g.Mail
                    }),
                    //SignIns = signIns.Value.Select(s => new SignInDto
                    //{
                    //    UserDisplayName = s.UserDisplayName,
                    //    UserPrincipalName = s.UserPrincipalName,
                    //    CreatedDateTime = s.CreatedDateTime,
                    //    Status = s.Status,
                    //    AppDisplayName = s.AppDisplayName,
                    //    IpAddress = s.IpAddress
                    //})
                    SignIns = new List<SignInDto>()
                };
            }
            catch (Exception ex)
            {

                throw;
            } 
        }

    }
}
