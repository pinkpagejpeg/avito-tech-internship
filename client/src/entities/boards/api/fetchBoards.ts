import { createAsyncThunk } from '@reduxjs/toolkit'
import { IBoard } from '../model/types'
import { getBoards } from 'shared/api'

export const fetchBoards = createAsyncThunk<IBoard[], void, { rejectValue: string }>(
    "board/fetchBoards",
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await getBoards()
            return data
        } catch (error: unknown) {
            return rejectWithValue((error instanceof Error) ? error.message : 'Неизвестная ошибка')
        }
    }
)