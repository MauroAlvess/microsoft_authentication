
namespace azure_cloud_api.Modals.Response
{
    public class TenantInfoResponseDto
    {
        public IEnumerable<UsersDto> Users { get; set; } = new List<UsersDto>();
        public IEnumerable<GroupDto> Groups { get; set; } = new List<GroupDto>();
        public IEnumerable<SignInDto>? SignIns { get; set; } = new List<SignInDto>();

        public long TotalUsersCount => Users?.LongCount() ?? 0;
        public long TotalGroupsCount => Groups?.LongCount() ?? 0;
        public string? TenantDisplayName { get; set; } = string.Empty;
        public List<string>? VerifiedDomains { get; set; } 
        public List<ApplicationDto>? Applications { get; set; } 

    }
}
