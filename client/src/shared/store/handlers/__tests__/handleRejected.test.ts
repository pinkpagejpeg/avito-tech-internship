import { handleRejected } from '../handleRejected'

describe('handleRejected', () => {
    test('handleRejected устанавливает ошибку из payload', () => {
        const state = { loading: true, error: null }
        handleRejected(state, { payload: 'Ошибка запроса', type: '' })

        expect(state.loading).toBe(false)
        expect(state.error).toBe('Ошибка запроса')
    })

    test('handleRejected использует стандартное сообщение об ошибке, если payload пуст', () => {
        const state = { loading: true, error: null }
        handleRejected(state, { payload: undefined, type: '' })

        expect(state.error).toBe('Неизвестная ошибка')
    })
})