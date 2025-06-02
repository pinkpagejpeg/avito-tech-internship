import { $host } from './http'

// Сервис для работы с API проектов (досок)
export class BoardService {
    // Получение списка всех проектов (досок)
    static async getAll() {
        const { data } = await $host.get(`/boards`)
        return data
    }

    // Получение задач проекта (доски) по ID
    static async getById(id: string) {
        const { data } = await $host.get(`/boards/${id}`)
        return data
    }
}