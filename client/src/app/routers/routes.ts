import type { RouteObject } from 'react-router-dom'
import { BOARDS_ROUTE, BOARD_ROUTE, ISSUES_ROUTE } from '../../shared/config'
import { Boards } from '../../pages/boards'
import { Board } from '../../pages/board'
import { Issues } from '../../pages/issues'

export const publicRoutes: RouteObject[] = [
    {
        path: BOARDS_ROUTE,
        Component: Boards
    },
    {
        path: BOARD_ROUTE,
        Component: Board
    },
    {
        path: ISSUES_ROUTE,
        Component: Issues
    },
]