export interface IIssuesState {
    issues: IIssue[]
    loading: boolean,
    error: string | null | undefined,
}

export interface IIssue {
    id: number,
    title: string,
    description: string,
    priority: string,
    status: string,
    assignee: {
        id: number,
        fullName: string,
        email: string,
        avatarUrl: string,
    },
    boardId: number,
    boardName: string,
}

export interface ICreateIssue {
    assigneeId: number,
    boardId: number,
    description: string,
    priority: 'Low' | 'Medium' | 'High',
    title: string,
}

export interface IUpdateIssue {
    assigneeId: number,
    description: string,
    priority: 'Low' | 'Medium' | 'High',
    title: string,
    status: 'Backlog' | 'InProgress' | 'Done'
}