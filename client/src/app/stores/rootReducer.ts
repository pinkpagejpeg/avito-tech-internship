import { combineReducers } from '@reduxjs/toolkit'
import { boardReducer } from 'entities/boards'
import { issueReducer } from 'entities/issues'
import { userReducer } from 'entities/users'

export const rootReducer = combineReducers({
    issue: issueReducer,
    board: boardReducer,
    user: userReducer
})