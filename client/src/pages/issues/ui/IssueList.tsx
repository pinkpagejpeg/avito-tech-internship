import { Stack, Typography } from '@mui/material';
import { IIssue } from 'entities/issues';
import { FC } from 'react'
import { IssueCard } from './IssueCard';

interface IIssueListProps {
    issues: IIssue[]
}

export const IssueList: FC<IIssueListProps> = ({ issues }) => {
    if (!issues.length) {
        return (
            <Typography variant='h5' fontWeight='bold' gutterBottom textAlign='center'>
                Задачи не найдены
            </Typography>
        )
    }
    
    return (
        <Stack spacing={2}>
            {issues.map((item) => (
                <IssueCard key={item.id} issue={item} />
            ))}
        </Stack>
    );
}