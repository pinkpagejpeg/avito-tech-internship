import { Box, Button, Paper, Typography } from '@mui/material'
import { IBoard } from 'entities/boards'
import { FC } from 'react'
import { Link } from 'react-router-dom'

interface IBoardCardProps {
    board: IBoard
}

// Компонент карточки проекта (доски) на странице проекта (доски)
export const BoardCard: FC<IBoardCardProps> = ({ board }) => {
    return (
        <Paper variant='outlined' sx={{ p: 2 }}>
            <Box display='flex' justifyContent='space-between' alignItems='center'>
                <Typography variant='subtitle1' fontWeight='medium'>
                    {board.name}
                </Typography>

                <Button color='primary' component={Link} to={`/board/${board.id}`}>
                    Перейти к доске
                </Button>
            </Box>
        </Paper>
    );
}