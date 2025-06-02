import { type TypedUseSelectorHook, useSelector } from 'react-redux'

/**
 * Типизированный хук useSelector, который использует тип RootState
 * Позволяет получать состояние из Redux со строгой типизацией
 */
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector