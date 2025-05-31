import { IIssue } from 'entities/issues'
import { useMemo } from 'react'

// Фильтрация задач
export const useFilteredIssues = (
    issues: IIssue[],
    filters: {
        status: string;
        board: string;
    }) => {
    const filteredIssues = useMemo(() => {
        return issues.filter(issue => {
            return (
                (filters.status ? issue.status === filters.status : true) &&
                (filters.board ? issue.boardName === filters.board : true)
            )
        })
    }, [filters, issues])

    return filteredIssues
}

// Поиск задач на  основе отфильтрованного списка
export const useIssues = (
    issues: IIssue[],
    filters: {
        status: string;
        board: string;
    },
    searchQuery: string
) => {
    const filteredIssues = useFilteredIssues(issues, filters)

    const filteredAndSearchedIssues = useMemo(() => {
        return filteredIssues.filter(issue => issue.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            issue.assignee.fullName.toLowerCase().includes(searchQuery.toLowerCase()))
    }, [searchQuery, filteredIssues])

    return filteredAndSearchedIssues
}