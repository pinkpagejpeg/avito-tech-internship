import { Box, Card, CardContent, Chip, Container, Grid, Paper, Typography } from '@mui/material'
import { useEffect, useState, type FC } from 'react'
import { useParams } from 'react-router-dom'
import { BoardService, IssueService } from 'shared/api'
import { useTypedSelector } from 'shared/store'
import { Loader, ModalForm, NavBar } from 'shared/ui'
import { useFetching } from '../lib'
import { IBoard } from 'entities/boards'
import { ICreateIssue, IIssue } from 'entities/issues'

export const Board: FC = () => {
    const { id } = useParams<{ id: string }>()
    const [modalOpen, setModalOpen] = useState(false)
    const [board, setBoard] = useState<IBoard | null>(null)
    const [boardIssues, setBoardIssues] = useState<IIssue[]>([])
    const { boards } = useTypedSelector(state => state.board)
    const columns: Record<string, string> = {
        'To Do': 'Backlog',
        'In Progress': 'InProgress',
        'Done': 'Done'
    }

    const [fetchBoardIssues, isBoardIssuesLoading, boardIssuesError] = useFetching(async (id: string) => {
        const { data } = await BoardService.getById(id)
        setBoardIssues(data)
    })

    useEffect(() => {
        const board = boards.find(item => item.id === Number(id))
        setBoard(board)
        fetchBoardIssues(id)
    }, [id])

    const getIssuesByStatus = (status: string) => {
        return boardIssues.filter((issue) => issue.status === status)
    }

    const openCreateModal = () => {
        setModalOpen(true)
    }

    const createIssueHandler = async (issue: ICreateIssue) => {
        await IssueService.create(issue)
        fetchBoardIssues(id)
    }

    return (
        <>
            <NavBar openCreateModal={openCreateModal} />
            <Container maxWidth='md' sx={{ mt: 4 }}>
                <Paper elevation={3} sx={{ p: 3 }}>
                    {board &&
                        <Typography variant='h4' fontWeight='bold' gutterBottom>
                            {board.name}
                        </Typography>
                    }
                    {isBoardIssuesLoading ? (<Loader />) :
                        boardIssuesError ? (
                            <Typography variant='h5' fontWeight='bold' gutterBottom textAlign='center'>
                                Произошла ошибка: {boardIssuesError}
                            </Typography>
                        ) : (
                            <Grid container spacing={2}>
                                {Object.entries(columns).map(([title, value]) => (
                                    <Grid key={title} size={{ xs: 12, sm: 4 }}>
                                        <Paper elevation={3} sx={{ p: 2, height: '100%' }}>
                                            <Typography
                                                variant='h5'
                                                fontWeight='bold'
                                                textAlign='center'
                                                gutterBottom
                                                sx={{
                                                    backgroundColor: '#1976d2',
                                                    color: '#fff',
                                                    p: 1,
                                                    borderRadius: 1
                                                }}>
                                                {title}
                                            </Typography>

                                            {getIssuesByStatus(value).map((issue) => (
                                                <Card key={issue.id} sx={{ mb: 2 }}>
                                                    <CardContent>
                                                        <Typography variant='subtitle1' fontWeight='bold'>
                                                            {issue.title}
                                                        </Typography>
                                                        <Typography variant='body2' color='text.secondary'>
                                                            {issue.description}
                                                        </Typography>
                                                        <Box mt={1}>
                                                            <Chip label={issue.assignee.fullName} size='small' />
                                                        </Box>
                                                    </CardContent>
                                                </Card>
                                            ))}
                                        </Paper>
                                    </Grid>
                                ))}
                            </Grid>
                        )}
                </Paper>
            </Container>
            <ModalForm
                open={modalOpen}
                mode='create'
                fromPage='board'
                onClose={setModalOpen}
                onSubmit={createIssueHandler}
            />
        </>
    );
}