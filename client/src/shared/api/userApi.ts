import { $host } from './http'

export class UserService {
    static async getAll() {
        const { data } = await $host.get(`/users`)
        return data
    }
}