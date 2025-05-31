import { combineReducers } from '@reduxjs/toolkit'
import { boardReducer } from 'entities/boards'
import { issueReducer } from 'entities/issues'

export const rootReducer = combineReducers({
    issue: issueReducer,
    board:  boardReducer
})