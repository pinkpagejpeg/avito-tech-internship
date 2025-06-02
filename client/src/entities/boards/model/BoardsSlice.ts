import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IBoard, IBoardsState } from './types'
import { createPendingHandler, createRejectedHandler } from 'shared/store'
import { fetchBoards } from '../api'

// Начальное состояние
const initialState: IBoardsState = {
    boards: [],
    loading: false,
    error: null,
}

// Redux slice для проектов (досок)
const BoardsSlice = createSlice({
    name: 'board',
    initialState,
    reducers: {
        
    },
    extraReducers: (builder) => {
        builder
            // Обработка загрузки проектов (досок)
            .addCase(fetchBoards.pending, createPendingHandler<IBoardsState>())
            // Обработка успешной подгрузки проектов (досок)
            .addCase(fetchBoards.fulfilled, (state: IBoardsState, action: PayloadAction<IBoard[]>) => {
                state.loading = false
                state.boards = action.payload
            })
            // Обработка возникновения ошибки при загрузке проектов (досок)
            .addCase(fetchBoards.rejected, createRejectedHandler<IBoardsState>())
    }
})

export default BoardsSlice.reducer