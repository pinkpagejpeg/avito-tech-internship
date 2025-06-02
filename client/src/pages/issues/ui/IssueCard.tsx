import { Box, Chip, Paper, Typography } from '@mui/material'
import { IIssue } from 'entities/issues'
import { FC } from 'react'

interface IIssueCardProps {
    issue: IIssue // объект задачи
    openModal: (id: number) => void // функция для открытия модального окна
}

// Компонент карточки задачи на странице задач
export const IssueCard: FC<IIssueCardProps> = ({ issue, openModal }) => {
    return (
        <Paper variant='outlined' sx={{ p: 2, cursor: 'pointer' }} onClick={() => openModal(issue.id)}>
            <Box display='flex' justifyContent='space-between' alignItems='center'>
                <Typography variant='subtitle1' fontWeight='medium'>
                    {issue.title}
                </Typography>

                <Chip
                    label={issue.status}
                    color={
                        issue.status === 'Done'
                            ? 'success'
                            : issue.status === 'InProgress'
                                ? 'warning'
                                : 'error'
                    }
                    size='small'
                />
            </Box>
            
            <Typography variant='body2' color='text.secondary' mt={0.5}>
                Доска: {issue.boardName ?? 'Не указано'} |
                Исполнитель: {issue.assignee.fullName ?? 'Не назначен'}
            </Typography>
        </Paper>
    );
}