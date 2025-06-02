import { $host } from './http'

// Сервис для работы с API пользователей (исполнителей)
export class UserService {
    // Получение списка всех пользователей (исполнителей)
    static async getAll() {
        const { data } = await $host.get(`/users`)
        return data
    }
}