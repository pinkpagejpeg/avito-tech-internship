export interface IBoardsState {
    boards: IBoard[]
    loading: boolean,
    error: string | null | undefined,
}

export interface IBoard {
    id: number,
    name: string,
    description: string,
    taskCount: number
}