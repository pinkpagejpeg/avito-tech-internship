import { fireEvent, render, screen } from '@testing-library/react'
import { NavBar } from '../nav/NavBar'
import { MemoryRouter } from 'react-router-dom'

describe('NavBar', () => {
    test('При нажатии на кнопку "Создать задачу" должна вызываться функция openCreateModal с "create"', () => {
        const mock = jest.fn()
        render(
            <MemoryRouter>
                <NavBar openCreateModal={mock} />
            </MemoryRouter>
        )
        fireEvent.click(screen.getByText(/создать задачу/i))
        
        expect(mock).toHaveBeenCalledWith('create')
    })
})