import { Stack, Typography } from '@mui/material'
import { IIssue } from 'entities/issues'
import { FC } from 'react'
import { IssueCard } from './IssueCard'

interface IIssueListProps {
    openEditModal: (mode: "create" | "edit") => void // функция для открытия модального окна
    setIssueId: React.Dispatch<React.SetStateAction<number>> // сеттер для ID редактируемой задачи
    issues: IIssue[] // список задач
}

// Компонент списка задач
export const IssueList: FC<IIssueListProps> = ({ issues, openEditModal, setIssueId }) => {
    // Обработчик нажатия на карточку задачи, 
    // который открывает модальное окно для редактирования задачи
    const openModalHandler = (id: number) => {
        setIssueId(id)
        openEditModal('edit')
    }

    // Если список задач пустой, то отображается соответствующее сообщение
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
                <IssueCard key={item.id} issue={item} openModal={openModalHandler}/>
            ))}
        </Stack>
    );
}