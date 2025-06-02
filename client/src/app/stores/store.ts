import { configureStore } from '@reduxjs/toolkit'
import { rootReducer } from './rootReducer'

// Создание Redux store с корневым редьюсером
export const store = configureStore({
    reducer: rootReducer,

    // подключение стандартных middleware из Redux Toolkit
    middleware: (getDefaultMiddleware) => getDefaultMiddleware()
})

// Глобальные типы приложения для использования в типизированных 
// хуках useSelector и useDispatch (необходимо для соблюдения архитектуры FSD)
declare global {
    type RootState = ReturnType<typeof rootReducer>
    type AppDispatch = typeof store.dispatch
}