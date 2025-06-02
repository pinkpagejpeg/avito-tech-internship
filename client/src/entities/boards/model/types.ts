import { IAsignee, Priority, Status } from 'entities/issues'

// Интерфейс состояния Redux slice для проектов (досок)
export interface IBoardsState {
    boards: IBoard[]
    loading: boolean,
    error: string | null | undefined,
}

// Интерфейс проекта (доски)
export interface IBoard {
    id: number,
    name: string,
    description: string,
    taskCount: number
}

// Интерфейс задачи на странице проекта (доски)
export interface IBoardIssue {
    id: number,
    title: string,
    description: string,
    priority: Priority,
    status: Status,
    assignee: IAsignee
}