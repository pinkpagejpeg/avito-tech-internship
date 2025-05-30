import { $host } from './http'

export const getIssues = async () => {
    const { data } = await $host.get(`/tasks`)
    return data
}