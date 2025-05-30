import { AppBar, Box, Button, Container, Toolbar } from '@mui/material'
import { Link } from 'react-router-dom'
import { FC } from 'react'

export const NavBar: FC = () => {
    return (
        <AppBar position='static' color='primary'>
            <Toolbar sx={{ justifyContent: 'space-between' }}>
                <Container maxWidth="md" sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Box sx={{ display: 'flex', gap: 2 }}>
                        <Button color='inherit' component={Link} to='/issues'>
                            Все задачи
                        </Button>
                        <Button color='inherit' component={Link} to='/boards'>
                            Проекты
                        </Button>
                    </Box>

                    <Button variant='outlined' color='inherit'>
                        Создать задачу
                    </Button>
                </Container>
            </Toolbar>
        </AppBar>
    );
}