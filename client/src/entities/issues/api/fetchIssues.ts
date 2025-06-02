import { createAsyncThunk } from '@reduxjs/toolkit'
import { IIssue } from '../model/types'
import { IssueService } from 'shared/api'

// Асинхронный redux thunk для получения списка задач с сервера
export const fetchIssues = createAsyncThunk<IIssue[], void, { rejectValue: string }>(
    "issue/fetchIssues",
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await IssueService.getAll()
            return data
        } catch (error: unknown) {
            return rejectWithValue((error instanceof Error) ? error.message : 'Неизвестная ошибка')
        }
    }
)