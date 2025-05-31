import { Box, Button, Container, Paper, Stack, Typography } from '@mui/material'
import { fetchIssues } from 'entities/issues'
import { useEffect, type FC } from 'react'
import { useAppDispatch, useTypedSelector } from 'shared/store'
import { NavBar, Search } from 'shared/ui'
import { IssueCard } from './IssueCard'
import { IssueFilters } from './IssueFilters'

export const Issues: FC = () => {
    const dispatch = useAppDispatch()
    const { issues } = useTypedSelector(state => state.issue)

    useEffect(() => {
        const timeoutIssues = getIssues()

        return () => {
            clearTimeout(timeoutIssues)
        }
    }, [])

    const getIssues = () => {
        dispatch(fetchIssues())

        return setTimeout(() => {
            getIssues()
        }, import.meta.env.DEFAULT_TIMEOUT_MS)
    }

    const setSearchHandler = (value: string) => {
        // dispatch(setSearch(value === '' ? null : value))
        dispatch(fetchIssues())
    }

    const setFiltersHandler = (filters: {
        status: string;
        board: string;
        title: string;
        assignee: string;
    }) => {
        // dispatch(setFilters(value === '' ? null : value))
        dispatch(fetchIssues())
    }

    return (
        <>
            <NavBar />
            <Container maxWidth='md' sx={{ mt: 4 }}>
                <Paper elevation={3} sx={{ p: 3 }}>
                    <Typography variant='h4' fontWeight='bold' gutterBottom>
                        Список задач
                    </Typography>

                    <Stack spacing={2} direction='row' mb={3}>
                        <Search onChange={setSearchHandler} />
                        <IssueFilters onFiltersChange={setFiltersHandler} />
                    </Stack>

                    <Stack spacing={2}>
                        {issues.map((item, index) => (
                            <IssueCard key={index} issue={item} />
                        ))}
                    </Stack>

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