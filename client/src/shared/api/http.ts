import axios from 'axios'

// Создание экземпляра axios с базовым URL
const $host = axios.create({
    baseURL: import.meta.env.VITE_API_URL
})

export { $host }