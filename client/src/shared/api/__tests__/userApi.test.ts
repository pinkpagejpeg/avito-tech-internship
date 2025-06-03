import { $host } from '../http'
import { UserService } from '../userApi'

jest.mock('../http', () => ({
    $host: {
        get: jest.fn()
    },
    API_URL: 'http://localhost:8080'
}))

describe('UserService', () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })

    test('getAll метод должен вызвать $host.get с /users и возвращать список пользователей', async () => {
        const mockData = [
            {
                id: 1,
                fullName: "Александра Ветрова",
                email: "al.vetrova@avito.ru",
                description: "Frontend Tech Lead",
                avatarUrl: "https://randomuser.me/api/portraits/women/1.jpg",
                teamId: 1,
                teamName: "Frontend Team",
                tasksCount: 12
            },
            {
                id: 2,
                fullName: "Илья Романов",
                email: "il.romanov@avito.ru",
                description: "Senior Frontend Developer",
                avatarUrl: "https://randomuser.me/api/portraits/men/1.jpg",
                teamId: 1,
                teamName: "Frontend Team",
                tasksCount: 10
            },
        ]
            ; ($host.get as jest.Mock).mockResolvedValue({ data: mockData })

        const data = await UserService.getAll()

        expect($host.get).toHaveBeenCalledWith('/users')
        expect(data).toEqual(mockData)
    })
})
