import { Priority, Status } from '@/shared/model'
import { $host } from '../http'
import { IssueService } from '../issueApi'

jest.mock('../http', () => ({
  $host: {
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
  },
  API_URL: 'http://localhost:8080'
}))

describe('IssueService', () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })

    test('getAll метод должен вызвать $host.get с /tasks и возвращать список задач', async () => {
        const mockData = [
            {
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
                },
                boardId: 1,
                boardName: "Редизайн карточки товара"
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
                },
                boardId: 1,
                boardName: "Редизайн карточки товара"
            },
        ]
            ; ($host.get as jest.Mock).mockResolvedValue({ data: mockData })

        const data = await IssueService.getAll()

        expect($host.get).toHaveBeenCalledWith('/tasks')
        expect(data).toEqual(mockData)
    })

    test('getById метод должен вызвать $host.get с /tasks/:id и возвращать задачу согласно id', async () => {
        const mockData = {
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
            },
            boardId: 1,
            boardName: "Редизайн карточки товара"
        }
            ; ($host.get as jest.Mock).mockResolvedValue({ data: mockData })

        const data = await IssueService.getById(1)

        expect($host.get).toHaveBeenCalledWith('/tasks/1')
        expect(data).toEqual(mockData)
    })

    test('create метод должен вызвать $host.post с /tasks/create и вернуть id созданной задачи', async () => {
        const newIssue = {
            title: "Оптимизация загрузки медиа-контента",
            description: "Оптимизация загрузки и отображения медиа-контента. Детали будут уточнены в процессе разработки.",
            priority: Priority.Medium,
            assigneeId: 1,
            boardId: 1
        }
        const mockData = { id: 3 }
            ; ($host.post as jest.Mock).mockResolvedValue({ data: mockData })

        const data = await IssueService.create(newIssue)

        expect($host.post).toHaveBeenCalledWith('/tasks/create', newIssue)
        expect(data).toEqual(mockData)
    })

    test('update метод должен вызвать $host.put с /tasks/update/:id и вернуть сообщение об успешном выполнении', async () => {
        const updatedIssue = { 
            title: "Оптимизация загрузки медиа-контента",
            description: "Оптимизация загрузки и отображения медиа-контента. Детали будут уточнены в процессе разработки.",
            priority: Priority.Medium,
            status: Status.InProgress,
            assigneeId: 1,
         }
        const mockData = { message: "Задача обновлена" }
            ; ($host.put as jest.Mock).mockResolvedValue({ data: mockData })

        const data = await IssueService.update(updatedIssue, 1)

        expect($host.put).toHaveBeenCalledWith('/tasks/update/1', updatedIssue)
        expect(data).toEqual(mockData)
    })
})
