import { Stack, Typography } from '@mui/material'
import { BoardCard } from './BoardCard'
import { FC } from 'react'
import { IBoard } from 'entities/boards'

interface IBoardListProps {
    boards: IBoard[] // список проектов (досок)
}

// Компонент списка проектов (досок)
export const BoardList: FC<IBoardListProps> = ({ boards }) => {
    // Если список проектов (досок) пустой, то отображается соответствующее сообщение
    if (!boards.length) {
        return (
            <Typography variant='h5' fontWeight='bold' gutterBottom textAlign='center'>
                Проекты не найдены
            </Typography>
        )
    }

    return (
        <Stack spacing={2}>
            {boards.map((board) => (
                <BoardCard key={board.id} board={board} />
            ))}
        </Stack>
    );
}