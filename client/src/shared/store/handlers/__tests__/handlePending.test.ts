import { handlePending } from '../handlePending'

describe('handlePending', () => {
    test('handlePending устанавливает loading = true и error = null', () => {
        const state = { loading: false, error: 'Ошибка запроса' }
        handlePending(state)
        
        expect(state.loading).toBe(true)
        expect(state.error).toBe(null)
    })
})