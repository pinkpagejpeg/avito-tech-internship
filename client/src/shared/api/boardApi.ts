import { $host } from './http'

export const getBoards = async () => {
    const { data } = await $host.get(`/boards`)
    return data
}