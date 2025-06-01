import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IUser, IUsersState } from './types'
import { createPendingHandler, createRejectedHandler } from 'shared/store'
import { fetchUsers } from '../api'

const initialState: IUsersState = {
    users: [],
    loading: false,
    error: null,
}

const UsersSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            // fetchUsers
            .addCase(fetchUsers.pending, createPendingHandler<IUsersState>())
            .addCase(fetchUsers.fulfilled, (state: IUsersState, action: PayloadAction<IUser[]>) => {
                state.loading = false
                state.users = action.payload
            })
            .addCase(fetchUsers.rejected, createRejectedHandler<IUsersState>())
    }
})

export default UsersSlice.reducer