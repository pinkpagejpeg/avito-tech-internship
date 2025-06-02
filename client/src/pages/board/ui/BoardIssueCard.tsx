import { Box, Card, CardContent, Chip, Typography } from '@mui/material'
import { IBoardIssue } from 'entities/boards'
import { type FC } from 'react'

interface IBoardIssueCardProps {
    openEditModal: (mode: "create" | "edit") => void // функция для открытия модального окна
    setIssueId: React.Dispatch<React.SetStateAction<number>> // сеттер для ID редактируемой задачи
    issue: IBoardIssue // объект задачи
}

// Компонент карточки задачи на странице проекта (доски)
export const BoardIssueCard: FC<IBoardIssueCardProps> = ({ openEditModal, setIssueId, issue }) => {
    // Обработчик нажатия на карточку задачи, 
    // который открывает модальное окно для редактирования задачи
    const openModalHandler = () => {
        setIssueId(issue.id)
        openEditModal('edit')
    }

    return (
        <Card key={issue.id} sx={{ mb: 2, cursor: 'pointer'}} onClick={openModalHandler}>
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