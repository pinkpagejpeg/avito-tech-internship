import { Box, Button, Container, Paper, Stack, Typography } from '@mui/material'
import { type FC } from 'react'
import { Link } from 'react-router-dom'
import { useTypedSelector } from 'shared/store'
import { NavBar } from 'shared/ui'

export const Boards: FC = () => {
    const { boards } = useTypedSelector(state => state.board)

    return (
        <>
            <NavBar />
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
        </>
    );
}