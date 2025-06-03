import { IAsignee, Priority, Status } from "@/shared/model";

// Интерфейс состояния Redux slice для задач
export interface IIssuesState {
    issues: IIssue[]
    loading: boolean,
    error: string | null | undefined,
}

// Интерфейс задачи
export interface IIssue {
    id: number,
    title: string,
    description: string,
    priority: Priority,
    status: Status,
    assignee: IAsignee,
    boardId: number,
    boardName: string,
}