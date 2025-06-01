import { Box, Button, Container, Paper, Stack, Typography } from '@mui/material'
import { ICreateIssue } from 'entities/issues'
import { useState, type FC } from 'react'
import { Link } from 'react-router-dom'
import { IssueService } from 'shared/api'
import { useTypedSelector } from 'shared/store'
import { ModalForm, NavBar } from 'shared/ui'

export const Boards: FC = () => {
    const { boards } = useTypedSelector(state => state.board)
    const [modalOpen, setModalOpen] = useState(false)
    const [modalMode, setModalMode] = useState<'create' | 'edit'>('create')

     const openModal = (mode: 'create' | 'edit') => {
        setModalMode(mode)
        setModalOpen(true)
    }

    const createIssueHandler = async (issue: ICreateIssue) => {
        await IssueService.create(issue)
    }

    return (
        <>
            <NavBar openCreateModal={openModal} />
            <Container maxWidth='md' sx={{ mt: 4 }}>
                <Paper elevation={3} sx={{ p: 3 }}>
                    <Typography variant='h4' fontWeight='bold' gutterBottom>
                        Проекты
                    </Typography>

                    <Stack spacing={2}>
                        {boards.map((item, index) => (
                            <Paper key={index} variant='outlined' sx={{ p: 2 }}>
                                <Box display='flex' justifyContent='space-between' alignItems='center'>
                                    <Typography variant='subtitle1' fontWeight='medium'>
                                        {item.name}
                                    </Typography>
                                    <Button color='primary' component={Link} to={`/board/${item.id}`}>
                                        Перейти к доске
                                    </Button>
                                </Box>
                            </Paper>
                        ))}
                    </Stack>
                </Paper>
            </Container>
            <ModalForm
                open={modalOpen}
                mode={modalMode}
                fromPage='boards'
                onClose={setModalOpen}
                onSubmit={createIssueHandler}
            />
        </>
    );
}