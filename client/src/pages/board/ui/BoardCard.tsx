import { Box, Card, CardContent, Chip, Typography } from '@mui/material'
import { IIssue } from 'entities/issues'

interface IBoardCardProps {
    openEditModal: (mode: "create" | "edit") => void
    setIssueId: React.Dispatch<React.SetStateAction<number>>
    issue: IIssue
}

export const BoardCard = ({ openEditModal, setIssueId, issue }: IBoardCardProps) => {
    const openModalHandler = () => {
        setIssueId(issue.id)
        openEditModal('edit')
    }

    return (
        <Card key={issue.id} sx={{ mb: 2 }} onClick={openModalHandler}>
            <CardContent>
                <Typography variant='subtitle1' fontWeight='bold' >
                    {issue.title}
                </Typography>
                <Typography variant='body2' color='text.secondary'>
                    {issue.description}
                </Typography>
                <Box mt={1}>
                    <Chip label={issue.assignee.fullName} size='small' />
                </Box>
            </CardContent>
        </Card>
    );
}