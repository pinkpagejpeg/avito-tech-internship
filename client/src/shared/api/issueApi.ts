import { ICreateIssue } from 'entities/issues'
import { $host } from './http'
import { IUpdateIssue } from 'entities/issues/model/types'

export class IssueService {
    static async getAll() {
        const { data } = await $host.get(`/tasks`)
        return data
    }

    static async getById(id: number) {
        const { data } = await $host.get(`/tasks/${id}`)
        return data
    }

    static async create(issue: ICreateIssue) {
        const { data } = await $host.post(`/tasks/create`, issue)
        return data
    }

    static async update (issue: IUpdateIssue, id: number) {
        const { data } = await $host.put(`/tasks/update/${id}`, issue)
        return data
    }
}