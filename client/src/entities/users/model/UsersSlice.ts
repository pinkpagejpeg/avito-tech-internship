import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IUser, IUsersState } from './types'
import { createPendingHandler, createRejectedHandler } from 'shared/store'
import { fetchUsers } from '../api'

// Начальное состояние
const initialState: IUsersState = {
    users: [],
    loading: false,
    error: null,
}

// Redux slice для пользователей (исполнителей)
const UsersSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            // Обработка загрузки пользователей (исполнителей)
            .addCase(fetchUsers.pending, createPendingHandler<IUsersState>())
            // Обработка успешной подгрузки пользователей (исполнителей)
            .addCase(fetchUsers.fulfilled, (state: IUsersState, action: PayloadAction<IUser[]>) => {
                state.loading = false
                state.users = action.payload
            })
            // Обработка возникновения ошибки при загрузке пользователей (исполнителей)
            .addCase(fetchUsers.rejected, createRejectedHandler<IUsersState>())
    }
})

export default UsersSlice.reducer