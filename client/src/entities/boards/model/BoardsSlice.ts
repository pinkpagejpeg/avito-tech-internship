import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IBoard, IBoardsState } from './types'
import { createPendingHandler, createRejectedHandler } from 'shared/store'
import { fetchBoards } from '../api'

const initialState: IBoardsState = {
    boards: [],
    loading: false,
    error: null,
}

const BoardsSlice = createSlice({
    name: 'board',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            // fetchBoards
            .addCase(fetchBoards.pending, createPendingHandler<IBoardsState>())
            .addCase(fetchBoards.fulfilled, (state: IBoardsState, action: PayloadAction<IBoard[]>) => {
                state.loading = false
                state.boards = action.payload
            })
            .addCase(fetchBoards.rejected, createRejectedHandler<IBoardsState>())
    }
})

export default BoardsSlice.reducer