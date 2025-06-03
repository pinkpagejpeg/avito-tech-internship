import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IIssue, IIssuesState } from './types'
import { fetchIssues } from '../api'
import { createPendingHandler, createRejectedHandler } from '@shared/store'

// Начальное состояние
const initialState: IIssuesState = {
    issues: [],
    loading: false,
    error: null,
}

// Redux slice для задач
const IssuesSlice = createSlice({
    name: 'issue',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            // Обработка загрузки задач
            .addCase(fetchIssues.pending, createPendingHandler<IIssuesState>())
            // Обработка успешной подгрузки задач
            .addCase(fetchIssues.fulfilled, (state: IIssuesState, action: PayloadAction<IIssue[]>) => {
                state.loading = false
                state.error = null
                state.issues = action.payload
            })
            // Обработка возникновения ошибки при загрузке задач
            .addCase(fetchIssues.rejected, createRejectedHandler<IIssuesState>())
    }
})

export default IssuesSlice.reducer