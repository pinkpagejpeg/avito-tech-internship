import { ICreateIssue } from 'entities/issues'
import { $host } from './http'

export class IssueService {
    static async getAll() {
        const { data } = await $host.get(`/tasks`)
        return data
    }

    static async create(issue: ICreateIssue) {
        const { data } = await $host.post(`/tasks/create`, issue)
        return data
    }
}