import { $host } from './http'

export class BoardService {
    static async getAll() {
        const { data } = await $host.get(`/boards`)
        return data
    }

    static async getById(id: string) {
        const { data } = await $host.get(`/boards/${id}`)
        return data
    }
}