import { render, fireEvent, screen } from '@testing-library/react'
import { SelectInput } from '../selectInput/SelectInput'

describe('SelectInput', () => {
    const options = ['опция1', 'опция2', 'опция3']

    test('Корректно отображается label и выбранное значение', () => {
        render(
            <SelectInput
                label='Выбор'
                value='опция2'
                options={options}
                onChange={() => { }}
            />
        )

        expect(screen.getByLabelText(/выбор/i)).toBeInTheDocument()
        expect(screen.getByText(/опция2/i)).toBeInTheDocument()
    })

    test('При выборе нового значения должна вызываться функция onChange', () => {
        const onChange = jest.fn()
        render(
            <SelectInput
                label="Выбор"
                value="опция1"
                options={options}
                onChange={onChange}
            />
        )

         fireEvent.mouseDown(screen.getByLabelText(/выбор/i)) // открытие селекта

        const option = screen.getByText('опция2')
        fireEvent.click(option) // выбор второй опции

        expect(onChange).toHaveBeenCalledWith('опция2')
    })

    test('Корректно работает getOptionLabel', () => {
        const boards = [
            { id: 1, name: 'Доска 1' },
            { id: 2, name: 'Доска 2' },
        ]

        const getOptionLabel = (id: number) =>
            boards.find((board) => board.id === id)?.name || 'Неизвестно'

        render(
            <SelectInput
                label="Выбор доски"
                value={1}
                options={boards.map((b) => b.id)}
                onChange={() => { }}
                getOptionLabel={getOptionLabel}
            />
        )

        expect(screen.getByText('Доска 1')).toBeInTheDocument()
    })
})
