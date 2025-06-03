import { BoardService } from "../boardApi"
import { $host } from "../http"

jest.mock('../http', () => ({
    $host: {
        get: jest.fn()
    },
    API_URL: 'http://localhost:8080'
}))

describe('BoardService', () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })

    test('getAll метод должен вызвать $host.get с /boards и возвращать список проектов', async () => {
        const mockData = [{
            id: 1,
            name: 'Редизайн карточки товара',
            description: "Обновление UI/UX основных страниц",
            taskCount: 15
        },
        {
            id: 2,
            name: "Оптимизация производительности",
            description: "Улучшение Core Web Vitals",
            taskCount: 8
        },]
            ; ($host.get as jest.Mock).mockResolvedValue({ data: mockData })

        const data = await BoardService.getAll()

        expect($host.get).toHaveBeenCalledWith('/boards')
        expect(data).toEqual(mockData)
    })

    test('getAll метод должен отправлять запрос по адресу /boards/:id и возвращать задачи проекта согласно id', async () => {
        const mockData = [{
            id: 1,
            title: "Изменение цвета кнопок",
            description: "Изменение цвета кнопок",
            priority: "Medium",
            status: "InProgress",
            assignee: {
                id: 5,
                fullName: "Артем Белов",
                email: "ar.belov@avito.ru",
                avatarUrl: "https://randomuser.me/api/portraits/men/3.jpg"
            }
        },
        {
            id: 2,
            title: "Адаптация карточки для мобильных устройств",
            description: "Адаптация интерфейса для различных разрешений экрана. Детали будут уточнены в процессе разработки.",
            priority: "Low",
            status: "Backlog",
            assignee: {
                id: 2,
                fullName: "Илья Романов",
                email: "il.romanov@avito.ru",
                avatarUrl: "https://randomuser.me/api/portraits/men/1.jpg"
            }
        },]
            ; ($host.get as jest.Mock).mockResolvedValue({ data: mockData })

        const data = await BoardService.getById('123')

        expect($host.get).toHaveBeenCalledWith('/boards/123')
        expect(data).toEqual(mockData)
    })
})
