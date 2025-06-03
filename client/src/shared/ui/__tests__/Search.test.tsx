import { render, fireEvent, screen } from '@testing-library/react'
import { Search } from '../search/Search'

describe('Search', () => {
  test('Корректно отображается placeholder и иконка поиска', () => {
    render(<Search inputValue='' onChange={() => {}} placeholder='Поиск задач' />)

    expect(screen.getByPlaceholderText(/поиск задач/i)).toBeInTheDocument()
    expect(screen.getByTestId('SearchIcon')).toBeInTheDocument()
  })

  test('При вводе текста должна вызываться функция onChange', () => {
    const onChange = jest.fn()
    render(<Search inputValue='' onChange={onChange} />)
    const input = screen.getByPlaceholderText(/поиск/i)
    fireEvent.change(input, { target: { value: 'тест' } })

    expect(onChange).toHaveBeenCalledWith('тест')
  })

  test('При наличии текста отображается иконка очистки, при нажатии на которую очищается поле ввода', () => {
    const onChange = jest.fn()
    render(<Search inputValue='текст' onChange={onChange} />)
    const clearButton = screen.getByRole('button')
    expect(clearButton).toBeInTheDocument()
    fireEvent.click(clearButton)

    expect(onChange).toHaveBeenCalledWith('')
  })
})
