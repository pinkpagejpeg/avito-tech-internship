import { Box, Button, Container, Grid, Paper, Typography } from '@mui/material'
import { fetchIssues } from 'entities/issues'
import { useEffect, useState, type FC } from 'react'
import { useAppDispatch, useTypedSelector } from 'shared/store'
import { Loader, NavBar, Search } from 'shared/ui'
import { IssueFilters } from './IssueFilters'
import { IssueList } from './IssueList'
import { fetchBoards } from 'entities/boards'
import { useIssues } from '../lib'

export const Issues: FC = () => {
    const dispatch = useAppDispatch()
    const { issues, error, loading } = useTypedSelector(state => state.issue)
    const [searchQuery, setSearchQuery] = useState('')
    const [filters, setFilters] = useState({
        status: '',
        board: '',
    })
    const filteredAndSearchedIssues = useIssues(issues, filters, searchQuery)

    // Отправка запроса на получение списка задач и досок
    useEffect(() => {
        dispatch(fetchIssues())
        dispatch(fetchBoards())
    }, [dispatch])

    return (
        <>
            <NavBar />
            <Container maxWidth='md' sx={{ mt: 4 }}>
                <Paper elevation={3} sx={{ p: 3 }}>
                    <Typography variant='h4' fontWeight='bold' gutterBottom>
                        Список задач
                    </Typography>

                    <Grid
                        container
                        spacing={2}
                        mb={3}
                        direction='row'
                        sx={{
                            justifyContent: 'space-between',
                        }}>
                        <Grid size={{ xs: 4 }}>
                            <Search onChange={setSearchQuery} inputValue={searchQuery} />
                        </Grid>
                        <Grid size={{ xs: 8 }}>
                            <IssueFilters filters={filters} onFiltersChange={setFilters} />
                        </Grid>
                    </Grid>

                    {/* Вывод списка задач */}
                    {loading ? (
                        <Loader />
                    ) : error ? (
                        <Typography variant='h5' fontWeight='bold' gutterBottom textAlign='center'>
                            Произошла ошибка: {error}
                        </Typography>
                    ) : (
                        <IssueList issues={filteredAndSearchedIssues} />
                    )}

                    <Box mt={4} textAlign='end'>
                        <Button variant='contained' color='primary'>
                            Создать задачу
                        </Button>
                    </Box>
                </Paper>
            </Container>
        </>
    );
}