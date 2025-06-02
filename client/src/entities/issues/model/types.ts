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

// Интерфейс данных, необходимых для передачи на сервер для создания задачи
export interface ICreateIssue {
    assigneeId: number,
    boardId: number,
    description: string,
    priority: Priority,
    title: string,
}

// Интерфейс данных, необходимых для передачи на сервер для обновления задачи
export interface IUpdateIssue {
    assigneeId: number,
    description: string,
    priority: Priority,
    title: string,
    status: Status
}

// Интерфейс пользователя (исполнителя)
export interface IAsignee {
    id: number,
    fullName: string,
    email: string,
    avatarUrl: string,
}

// Допустимые значения приоритетов задач
export enum Priority {
    Low = 'Low',
    Medium = 'Medium',
    High = 'High',
}

//  Допустимые значения статусов задач
export enum Status {
    Backlog = 'Backlog',
    InProgress = 'InProgress',
    Done = 'Done',
}