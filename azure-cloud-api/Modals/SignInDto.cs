namespace azure_cloud_api.Modals
{
    public class SignInDto
    {
        public string UserDisplayName { get; set; } = string.Empty;
        public string UserPrincipalName { get; set; } = string.Empty;
        public DateTimeOffset? CreatedDateTime { get; set; }
        public object? Status { get; set; } 
        public string AppDisplayName { get; set; } = string.Empty;
        public string IpAddress { get; set; } = string.Empty;
    }
}
