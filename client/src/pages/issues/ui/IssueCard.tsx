import { Box, Chip, Paper, Typography } from '@mui/material'
import { IIssue } from 'entities/issues'

interface IIssueCardProps {
    issue: IIssue
    openModal: (id: number) => void
}

export const IssueCard = ({ issue, openModal }: IIssueCardProps) => {
    return (
        <Paper variant='outlined' sx={{ p: 2 }} onClick={() => openModal(issue.id)}>
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