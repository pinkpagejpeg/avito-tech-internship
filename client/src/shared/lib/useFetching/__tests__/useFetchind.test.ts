import { renderHook, act } from '@testing-library/react'
import { useFetching } from '../useFetching'

describe('useFetching', () => {
  test('Хук должен инициализироваться с isLoading = false и error = ""', () => {
    const { result } = renderHook(() => useFetching(async () => {}))
    const [fetching, isLoading, error] = result.current

    expect(isLoading).toBe(false)
    expect(error).toBe('')
    expect(typeof fetching).toBe('function')
  })

  test('Хук должен корректно обрабатывать успешный вызов', async () => {
    const asyncFn = jest.fn().mockResolvedValue(true)
    const { result } = renderHook(() => useFetching(asyncFn))

    await act(() => result.current[0]()) // вызов fetching

    expect(asyncFn).toHaveBeenCalled()
    expect(result.current[1]).toBe(false) // isLoading
    expect(result.current[2]).toBe('')    // error
  })

  test('Хук должен корректно обрабатывать ошибку', async () => {
    const asyncFn = jest.fn().mockRejectedValue(new Error('Ошибка запроса'))
    const { result } = renderHook(() => useFetching(asyncFn))

    await act(() => result.current[0]()) // вызов fetching

    expect(asyncFn).toHaveBeenCalled()
    expect(result.current[1]).toBe(false) // isLoading
    expect(result.current[2]).toBe('Ошибка запроса') // error
  })
})
