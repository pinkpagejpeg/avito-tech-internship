import { createAsyncThunk } from '@reduxjs/toolkit'
import { IUser } from '../model/types'
import { UserService } from 'shared/api'

// Асинхронный redux thunk для получения списка пользователей (исполнителей) с сервера
export const fetchUsers = createAsyncThunk<IUser[], void, { rejectValue: string }>(
    "user/fetchUsers",
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await UserService.getAll()
            return data
        } catch (error: unknown) {
            return rejectWithValue((error instanceof Error) ? error.message : 'Неизвестная ошибка')
        }
    }
)