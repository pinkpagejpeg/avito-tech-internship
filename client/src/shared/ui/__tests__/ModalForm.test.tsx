import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { ModalForm } from '../modalForm/ModalForm'
import { IssueService } from '@shared/api'
import { Status, Priority } from '@shared/model'
import { MemoryRouter } from 'react-router-dom'

jest.mock('@shared/store', () => {
    const actualState = {
        board: {
            boards: [
                { id: 1, name: 'Доска 1' },
                { id: 2, name: 'Доска 2' },
            ],
        },
        user: {
            users: [
                { id: 10, fullName: 'Пользователь 1' },
                { id: 20, fullName: 'Пользователь 2' },
            ],
        },
    };

    return {
        useTypedSelector: jest.fn(fn => fn(actualState)),
    };
})

jest.mock('@shared/api', () => ({
    IssueService: {
        getById: jest.fn(),
    },
}))

jest.mock('../selectInput/SelectInput', () => ({
    SelectInput: (props) => (
        <select
            data-testid={props.label}
            value={props.value ?? ''}
            disabled={props.disabled}
            onChange={e => props.onChange(Number(e.target.value))}
        >
            {props.options.map((option) => (
                <option key={option} value={option}>
                    {props.getOptionLabel ? props.getOptionLabel(option) : option}
                </option>
            ))}
        </select>
    ),
}))

describe('ModalForm', () => {
    const onClose = jest.fn()
    const onSubmit = jest.fn(() => Promise.resolve())

    beforeEach(() => {
        jest.clearAllMocks()
    })

    test('Рендер формы в режиме создания со стандартным статусом', () => {
        render(
            <MemoryRouter>
                <ModalForm
                    open={true}
                    mode="create"
                    fromPage="issues"
                    onClose={onClose}
                    onSubmit={onSubmit}
                />
            </MemoryRouter>
        )
        const statusElement = screen.getByTestId('Статус') as HTMLSelectElement;

        expect(screen.getByText('Создание задачи')).toBeInTheDocument()
        expect(statusElement.value).toBe(Status.Backlog); // cтатус по умолчанию - Backlog
        expect(screen.getByText('Создать')).toBeDisabled() // кнопка "Создать" должна быть недоступна (форма пустая)
    })

    test('При рендере в режиме редактирования должны загружаться данные задачи', async () => {
        ; (IssueService.getById as jest.Mock).mockResolvedValueOnce({
            data: {
                id: 1,
                title: 'Тестовая задача',
                description: 'Описание тестовой задачи',
                priority: Priority.High,
                status: Status.InProgress,
                boardName: 'Доска 1',
                assignee: { id: 10 },
            },
        })

        render(
            <MemoryRouter>
                <ModalForm
                    open={true}
                    mode="edit"
                    issueId={1}
                    fromPage="issues"
                    onClose={onClose}
                    onSubmit={onSubmit}
                />
            </MemoryRouter>
        )
        const priorityElement = screen.getByTestId('Приоритет') as HTMLSelectElement;
        const statusElement = screen.getByTestId('Статус') as HTMLSelectElement;
        const boardElement = screen.getByTestId('Проект') as HTMLSelectElement;
        const asigneeElement = screen.getByTestId('Исполнитель') as HTMLSelectElement;

        await waitFor(() => {
            expect(screen.getByDisplayValue('Тестовая задача')).toBeInTheDocument()
            expect(screen.getByDisplayValue('Описание тестовой задачи')).toBeInTheDocument()
            expect(priorityElement.value).toBe(Priority.High)
            expect(statusElement.value).toBe(Status.InProgress)
            expect(boardElement.value).toBe('1')
            expect(asigneeElement.value).toBe('10')
        })

        expect(screen.getByText('Обновить')).toBeEnabled() // кнопка "Обновить" активна, если форма валидна
    })

    test('onSubmit нельзя вызвать, если форма невалидна', async () => {
        render(
            <MemoryRouter>
                <ModalForm
                    open={true}
                    mode="create"
                    fromPage="issues"
                    onClose={onClose}
                    onSubmit={onSubmit}
                />
            </MemoryRouter>
        )

        const createBtn = screen.getByText('Создать')
        expect(createBtn).toBeDisabled()

        fireEvent.click(createBtn)
        expect(onSubmit).not.toHaveBeenCalled()
    })

    test('Кнопка "Перейти на доску" отображается только, если fromPage=issues и boardId задан', () => {
        const { rerender } = render(
            <MemoryRouter>
                <ModalForm
                    open={true}
                    mode="create"
                    fromPage="other"
                    onClose={onClose}
                    onSubmit={onSubmit}
                />
            </MemoryRouter>
        )
        // Кнопка отсутствует, т.к. boardId не задан и fromPage="other"
        expect(screen.queryByText('Перейти на доску')).not.toBeInTheDocument()

        rerender(
            <MemoryRouter>
                <ModalForm
                    open={true}
                    mode="create"
                    fromPage="issues"
                    onClose={onClose}
                    onSubmit={onSubmit}
                />
            </MemoryRouter>
        )
        // Необходимо заполнить boardId, чтобы кнопка отобразилась
        fireEvent.change(screen.getByTestId('Проект'), { target: { value: '1' } })

        expect(screen.getByText('Перейти на доску')).toBeInTheDocument() // Кнопка должна отображаться
    })
})