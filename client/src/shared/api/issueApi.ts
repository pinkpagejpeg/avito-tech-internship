import { $host } from './http'

export class IssueService {
    static async getAll() {
        const { data } = await $host.get(`/tasks`)
        return data
    }
}