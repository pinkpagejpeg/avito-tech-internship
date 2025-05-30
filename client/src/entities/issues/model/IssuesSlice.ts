import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IIssue, IIssuesState } from './types'
import { fetchIssues } from '../api'
import { createPendingHandler, createRejectedHandler } from 'shared/store'

const initialState: IIssuesState = {
    issues: [],
    loading: false,
    error: null,
}

const IssuesSlice = createSlice({
    name: 'issue',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            // fetchIssues
            .addCase(fetchIssues.pending, createPendingHandler<IIssuesState>())
            .addCase(fetchIssues.fulfilled, (state: IIssuesState, action: PayloadAction<IIssue[]>) => {
                state.loading = false
                state.issues = action.payload
            })
            .addCase(fetchIssues.rejected, createRejectedHandler<IIssuesState>())
    }
})

export default IssuesSlice.reducer