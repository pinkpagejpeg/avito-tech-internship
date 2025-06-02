import { Provider } from 'react-redux'
import { store } from '../stores'
import type { FC, ReactNode } from 'react'

interface MainProviderProps {
    children: ReactNode
}

// Компонент, оборачивающий приложение в Redux Provider для подключения стора
export const MainProvider: FC<MainProviderProps> = ({ children }) => {
    return (
        <Provider store={store}>
            {children}
        </Provider>
    )
}