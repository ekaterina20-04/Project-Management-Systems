export interface Users{
    avatarUrl: string,
    description: string,
    email: string,
    fullName: string,
    id: number,
    tasksCount: number,
    teamId: number,
    teamName: string
}
export interface UsersResponse{
    data:Users[]
}