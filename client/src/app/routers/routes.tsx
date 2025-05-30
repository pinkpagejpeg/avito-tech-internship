import type { RouteObject } from 'react-router-dom'
import { BOARDS_ROUTE, BOARD_ROUTE, ISSUES_ROUTE } from '../../shared/config'
import { Boards } from '../../pages/boards'
import { Board } from '../../pages/board'
import { Issues } from '../../pages/issues'
import { Navigate } from 'react-router-dom'

export const publicRoutes: RouteObject[] = [
    {
        path: BOARDS_ROUTE,
        element: <Boards />
    },
    {
        path: BOARD_ROUTE + '/:id',
        element: <Board />
    },
    {
        path: ISSUES_ROUTE,
        element: <Issues />
    },
    {
        path: '*',
        element: <Navigate to={ ISSUES_ROUTE } replace />
    },
]