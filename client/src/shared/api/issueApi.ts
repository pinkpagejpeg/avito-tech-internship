import { ICreateIssue, IUpdateIssue } from 'entities/issues'
import { $host } from './http'

// Сервис для работы с API задач
export class IssueService {
    // Получение списка всех задач
    static async getAll() {
        const { data } = await $host.get(`/tasks`)
        return data
    }
    
    // Получение задачи по ID
    static async getById(id: number) {
        const { data } = await $host.get(`/tasks/${id}`)
        return data
    }

    // Создание задачи
    static async create(issue: ICreateIssue) {
        const { data } = await $host.post(`/tasks/create`, issue)
        return data
    }

    // Обновление задачи
    static async update (issue: IUpdateIssue, id: number) {
        const { data } = await $host.put(`/tasks/update/${id}`, issue)
        return data
    }
}