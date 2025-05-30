import { createAsyncThunk } from '@reduxjs/toolkit'
import { IIssue } from '../model/types'
import { getIssues } from 'shared/api'

export const fetchIssues = createAsyncThunk<IIssue[], void, { rejectValue: string }>(
    "issue/fetchIssues",
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await getIssues()
            return data
        } catch (error: unknown) {
            return rejectWithValue((error instanceof Error) ? error.message : 'Неизвестная ошибка')
        }
    }
)