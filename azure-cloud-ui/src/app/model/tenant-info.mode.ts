
export interface UsersDto {
    id: string;
    displayName: string | null;
    mail: string | null;
    userPrincipalName: string | null;
}

export interface GroupDto {
    id: string;
    displayName: string | null;
    mail: string | null;
}

export interface SignInDto {
    userDisplayName: string | null;
    userPrincipalName: string | null;
    createdDateTime: string | null;
    status: any | null;
    appDisplayName: string | null;
    ipAddress: string | null;
}

export interface ApplicationDto {
    id: string;
    displayName: string | null;
    appId: string | null;
}

export interface TenantInfoResponseDto {
    users: UsersDto[];
    groups: GroupDto[];
    signIns: SignInDto[];
    totalUsersCount?: number;
    totalGroupsCount?: number;
    tenantDisplayName?: string;
    verifiedDomains?: string[];
    applications?: ApplicationDto[];
}