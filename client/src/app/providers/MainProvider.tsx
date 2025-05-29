import { Provider } from 'react-redux'
import { store } from '../stores'
import type { FC, ReactNode } from 'react'

interface MainProviderProps {
    children: ReactNode
  }

export const MainProvider: FC<MainProviderProps> = ({ children }) => {
    return (
        <Provider store={store}>
            {children}
        </Provider>
    )
}