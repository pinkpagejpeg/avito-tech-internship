import { PayloadAction } from '@reduxjs/toolkit'
import { ICommonState } from '../../state'

/**
 * Обработчик состояния ошибки (rejected) для redux slice с общей структурой состояния
 * Устанавливает индикатор загрузки в false и записывает сообшение об ошибке из payload, 
 * либо устанавливает стандартное сообщение
 * 
 * @param state - состояние redux slice, соответствующее интерфейсу ICommonState
 * @param action - payload action с сообщением об ошибке
 */
export const handleRejected = <T extends ICommonState>(
    state: T,
    action: PayloadAction<string | undefined>
) => {
    state.loading = false;
    state.error = action.payload || `Неизвестная ошибка`;
};

/**
 * Фабрика функций для создания обработчика состояния ошибки (rejected)
 * Позволяет переиспользовать один и тот же обработчик в extraReducers
 * 
 * @returns функция-обработчик для состояния состояния ошибки (rejected)
 */
export const createRejectedHandler = <T extends ICommonState>() =>
    (state: T, action: PayloadAction<string | undefined>) => handleRejected(state, action);