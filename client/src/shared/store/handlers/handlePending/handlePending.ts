import { ICommonState } from '../../state'

/**
 * Обработчик состояния загрузки (pending) для redux slice с общей структурой состояния
 * Устанавливает индикатор загрузки в true и очищает ошибку
 *
 * @param state - состояние redux slice, соответствующее интерфейсу ICommonState
 */
export const handlePending = <T extends ICommonState>(state: T) => {
    state.loading = true;
    state.error = null;
}

/**
 * Фабрика функций для создания обработчика состояния загрузки (pending)
 * Позволяет переиспользовать один и тот же обработчик в extraReducers
 * 
 * @returns функция-обработчик для состояния загрузки (pending)
 */
export const createPendingHandler = <T extends ICommonState>() =>
    (state: T) => handlePending(state);