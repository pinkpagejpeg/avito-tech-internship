import type { RouteObject } from 'react-router-dom'
import { BOARDS_ROUTE, BOARD_ROUTE, ISSUES_ROUTE } from '../../shared/config'
import { Boards } from '../../pages/boards'
import { Board } from '../../pages/board'
import { Issues } from '../../pages/issues'
import { Navigate } from 'react-router-dom'

// Массив маршрутов приложения
export const publicRoutes: RouteObject[] = [
    // Страница со списком всех проектов (досок)
    {
        path: BOARDS_ROUTE,
        element: <Boards />
    },

    // Страница конкретного проекта (доски) по ID
    {
        path: BOARD_ROUTE + '/:id',
        element: <Board />
    },

    // Страница со списком задач
    {
        path: ISSUES_ROUTE,
        element: <Issues />
    },
    
    // Перенаправление на страницу со списком всех задач для неизвестных маршрутов
    {
        path: '*',
        element: <Navigate to={ ISSUES_ROUTE } replace /> 
    },
]