import { AppBar, Box, Button, Container, Toolbar } from '@mui/material'
import { Link } from 'react-router-dom'
import { FC } from 'react'

interface INavBarProps {
    openCreateModal: (mode: 'create' | 'edit') => void
}

export const NavBar: FC<INavBarProps> = ({ openCreateModal }) => {
    const createIssueButtonHandler = () => {
        openCreateModal('create')
    }

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

                    <Button variant='outlined' color='inherit' onClick={createIssueButtonHandler}>
                        Создать задачу
                    </Button>
                </Container>
            </Toolbar>
        </AppBar>
    );
}