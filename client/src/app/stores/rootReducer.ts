import { combineReducers } from '@reduxjs/toolkit'
import { boardReducer } from 'entities/boards'
import { issueReducer } from 'entities/issues'
import { userReducer } from 'entities/users'

// Создание корневого редьюсера Redux на основе всех редьюсеров
export const rootReducer = combineReducers({
    issue: issueReducer, // редьюсер задач
    board: boardReducer, // редьюсер проектов (досок)
    user: userReducer // редьюсер пользователей (исполнителей)
})