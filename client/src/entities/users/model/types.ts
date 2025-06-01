export interface IUsersState {
    users: IUser[]
    loading: boolean,
    error: string | null | undefined,
}

export interface IUser {
    id: number,
    fullName: string,
    email: string,
    description: string,
    avatarUrl: string,
    teamId: number,
    teamName: string,
    tasksCount: number
}