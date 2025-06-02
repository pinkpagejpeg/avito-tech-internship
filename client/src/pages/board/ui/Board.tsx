import { Container, Grid, Paper, Typography } from '@mui/material'
import { useEffect, useState, type FC } from 'react'
import { useParams } from 'react-router-dom'
import { BoardService, IssueService } from 'shared/api'
import { useAppDispatch, useTypedSelector } from 'shared/store'
import { Loader, ModalForm, NavBar } from 'shared/ui'
import { fetchBoards, IBoard } from 'entities/boards'
import { fetchIssues, ICreateIssue, IUpdateIssue } from 'entities/issues'
import { BoardIssueCard } from './BoardIssueCard'
import { useFetching } from 'shared/lib'
import { IBoardIssue } from 'entities/boards'
import { fetchUsers } from 'entities/users'

// Компонент страницы проекта (доски)
export const Board: FC = () => {
    // Получение функции dispatch для отправки Redux экшенов
    const dispatch = useAppDispatch()

    // Получение ID проекта (доски) из url-параметров
    const { id } = useParams<{ id: string }>()

    // Состояние открытия/закрытия модального окна
    const [modalOpen, setModalOpen] = useState(false)

    // Режим модального окна (создание или редактирование задачи)
    const [modalMode, setModalMode] = useState<'create' | 'edit'>('create')

    // ID редактируемой задачи
    const [issueId, setIssueId] = useState<number | null>(null)

    // Информация о текущем проекте (доске)
    const [board, setBoard] = useState<IBoard | null>(null)

    // Список задач проекта (доски)
    const [boardIssues, setBoardIssues] = useState<IBoardIssue[]>([])

    // Получение списка проектов (досок) из стора
    const { boards } = useTypedSelector(state => state.board)

    // Наименования колонок и соответствующие статусы
    const columns: Record<string, string> = {
        'To Do': 'Backlog',
        'In Progress': 'InProgress',
        'Done': 'Done'
    }

    // Создание функции для получения задач доски а также обработки их загрузки и получения ошибки
    const [fetchBoardIssues, isBoardIssuesLoading, boardIssuesError] = useFetching(async (id: string) => {
        const { data } = await BoardService.getById(id)
        setBoardIssues(data)
    })

    // Загрузка данных задач, проектов и пользователей (исполнителей) при монтировании
    useEffect(() => {
        dispatch(fetchIssues())
        dispatch(fetchBoards())
        dispatch(fetchUsers())
    }, [dispatch])

    // Получение информации о доске и ее задачах при изменении ID
    useEffect(() => {
        const board = boards.find(item => item.id === Number(id))
        setBoard(board)
        fetchBoardIssues(id)
    }, [id])

    // Фильтрация задач по статусу для распределения их по колонкам
    const getIssuesByStatus = (status: string) => {
        return boardIssues.filter((issue) => issue.status === status)
    }

    // Обработчик для открытия модального окна
    const openModal = (mode: 'create' | 'edit') => {
        setModalMode(mode)
        setModalOpen(true)
    }

    // Функция для отправки запроса на создание задачи
    const createIssueHandler = async (issue: ICreateIssue) => {
        await IssueService.create(issue)
        fetchBoardIssues(id)  // обновление списка задач
    }

    // Функция для отправки запроса на обновление задачи
    const updateIssueHandler = async (issue: IUpdateIssue) => {
        if (issueId) {
            await IssueService.update(issue, issueId)
            fetchBoardIssues(id)
            setIssueId(null) // сброс ID редактируемой задачи
        }
    }

    return (
        <>
            {/* Навигационная панель (Header) */}
            <NavBar openCreateModal={openModal} />

            <Container maxWidth='md' sx={{ mt: 4 }}>
                <Paper elevation={3} sx={{ p: 3 }}>
                    {board &&
                        <Typography variant='h4' fontWeight='bold' gutterBottom>
                            {board.name}
                        </Typography>
                    }

                    {/* Вывод таблицы с задачами */}
                    {isBoardIssuesLoading ? (<Loader />) :
                        boardIssuesError ? (
                            <Typography variant='h5' fontWeight='bold' gutterBottom textAlign='center'>
                                Произошла ошибка: {boardIssuesError}
                            </Typography>
                        ) : (
                            <Grid container spacing={2}>
                                {Object.entries(columns).map(([title, value]) => (
                                    <Grid key={title} size={{ xs: 12, sm: 4 }}>
                                        <Paper elevation={3} sx={{ p: 2, height: '100%' }}>
                                            <Typography
                                                variant='h5'
                                                fontWeight='bold'
                                                textAlign='center'
                                                gutterBottom
                                                sx={{
                                                    backgroundColor: '#1976d2',
                                                    color: '#fff',
                                                    p: 1,
                                                    borderRadius: 1
                                                }}>
                                                {title}
                                            </Typography>

                                            {/* Распределение задач по колонкам */}
                                            {getIssuesByStatus(value).map((issue) => (
                                                <BoardIssueCard
                                                    key={issue.id}
                                                    openEditModal={openModal}
                                                    setIssueId={setIssueId}
                                                    issue={issue}
                                                />
                                            ))}
                                        </Paper>
                                    </Grid>
                                ))}
                            </Grid>
                        )}
                </Paper>
            </Container>

            {/* Модальное окно для создания/редактирования задачи */}
            <ModalForm
                open={modalOpen}
                mode={modalMode}
                issueId={issueId}
                fromPage='board'
                onClose={setModalOpen}
                onSubmit={modalMode === 'create' ? createIssueHandler : updateIssueHandler}
            />
        </>
    );
}