import { combineReducers } from '@reduxjs/toolkit'
import { issueReducer } from 'entities/issues'

export const rootReducer = combineReducers({
    issue: issueReducer
})