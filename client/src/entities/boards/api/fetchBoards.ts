import { createAsyncThunk } from '@reduxjs/toolkit'
import { IBoard } from '../model/types'
import { BoardService } from 'shared/api'

export const fetchBoards = createAsyncThunk<IBoard[], void, { rejectValue: string }>(
    "board/fetchBoards",
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await BoardService.getAll()
            return data
        } catch (error: unknown) {
            return rejectWithValue((error instanceof Error) ? error.message : 'Неизвестная ошибка')
        }
    }
)