import { Container, Paper, Stack, Typography } from '@mui/material'
import { fetchIssues, ICreateIssue } from 'entities/issues'
import { useEffect, useState, type FC } from 'react'
import { IssueService } from 'shared/api'
import { useAppDispatch, useTypedSelector } from 'shared/store'
import { Loader, ModalForm, NavBar } from 'shared/ui'
import { BoardCard } from './BoardCard'
import { fetchBoards } from 'entities/boards'
import { fetchUsers } from 'entities/users'
import { BoardList } from './BoardList'

// Компонент страницы со списком всех проектов (досок)
export const Boards: FC = () => {
    // Получение функции dispatch для отправки Redux экшенов
    const dispatch = useAppDispatch()
    
    // Получение списка проектов (досок), состояний загрузки и ошибки из стора
    const { boards, loading, error } = useTypedSelector(state => state.board)

    // Состояние открытия/закрытия модального окна
    const [modalOpen, setModalOpen] = useState(false)

    // Режим модального окна (создание или редактирование задачи)
    const [modalMode, setModalMode] = useState<'create' | 'edit'>('create')

    // Загрузка данных задач, проектов и пользователей (исполнителей) при монтировании
    useEffect(() => {
        dispatch(fetchIssues())
        dispatch(fetchBoards())
        dispatch(fetchUsers())
    }, [dispatch])

    // Обработчик для открытия модального окна
    const openModal = (mode: 'create' | 'edit') => {
        setModalMode(mode)
        setModalOpen(true)
    }

    // Функция для отправки запроса на создание задачи
    const createIssueHandler = async (issue: ICreateIssue) => {
        await IssueService.create(issue)
    }

    return (
        <>
            {/* Навигационная панель (Header) */}
            <NavBar openCreateModal={openModal} />

            <Container maxWidth='md' sx={{ mt: 4 }}>
                <Paper elevation={3} sx={{ p: 3 }}>
                    <Typography variant='h4' fontWeight='bold' gutterBottom>
                        Проекты
                    </Typography>

                    {/* Вывод списка проектов (досок) */}
                    {loading ? (
                        <Loader />
                    ) : error ? (
                        <Typography variant='h5' fontWeight='bold' gutterBottom textAlign='center'>
                            Произошла ошибка: {error}
                        </Typography>
                    ) : (
                        <BoardList boards={boards}/>
                    )}
                </Paper>
            </Container>

            {/* Модальное окно для создания/редактирования задачи */}
            <ModalForm
                open={modalOpen}
                mode={modalMode}
                fromPage='boards'
                onClose={setModalOpen}
                onSubmit={createIssueHandler}
            />
        </>
    );
}