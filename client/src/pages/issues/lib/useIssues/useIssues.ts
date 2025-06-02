import { IIssue } from 'entities/issues'
import { useMemo } from 'react'

// Кастомный хук для фильтрации задач по статусу и названию доски
export const useFilteredIssues = (
    issues: IIssue[], // список задач
    filters: { // перечень доступных фильтров
        status: string;
        board: string;
    }) => {
    const filteredIssues = useMemo(() => {
        return issues.filter(issue => {
            return (
                // Проверки на совпадение по статусу и проекту (доске), 
                // если соответствующие фильтры заданы
                (filters.status ? issue.status === filters.status : true) &&
                (filters.board ? issue.boardName === filters.board : true)
            )
        })
    }, [filters, issues])

    return filteredIssues
}

// Кастомный хук для поиск поиск задач по названию или 
// имени пользователя (исполнителя) на основе отфильтрованного списка
export const useIssues = (
    issues: IIssue[], // список задач
    filters: { // перечень доступных фильтров
        status: string;
        board: string;
    },
    searchQuery: string // поисковый запрос
) => {
    const filteredIssues = useFilteredIssues(issues, filters)

    const filteredAndSearchedIssues = useMemo(() => {
        // Поиск по заданному поисковому запросу
        return filteredIssues.filter(issue => issue.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            issue.assignee.fullName.toLowerCase().includes(searchQuery.toLowerCase()))
    }, [searchQuery, filteredIssues])

    return filteredAndSearchedIssues
}