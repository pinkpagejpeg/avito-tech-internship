import { Box, Button, Container, Grid, Paper, Typography } from '@mui/material'
import { fetchIssues, ICreateIssue, IUpdateIssue } from 'entities/issues'
import { useEffect, useState, type FC } from 'react'
import { useAppDispatch, useTypedSelector } from 'shared/store'
import { Loader, ModalForm, NavBar, Search } from 'shared/ui'
import { IssueFilters } from './IssueFilters'
import { IssueList } from './IssueList'
import { fetchBoards } from 'entities/boards'
import { useIssues } from '../lib'
import { fetchUsers } from 'entities/users'
import { IssueService } from 'shared/api'

// Компонент страницы списка всех задач
export const Issues: FC = () => {
    // Получение функции dispatch для отправки Redux экшенов
    const dispatch = useAppDispatch()

    // Получение списка задач, состояний загрузки и ошибки из стора
    const { issues, error, loading } = useTypedSelector(state => state.issue)

    // Состояние открытия/закрытия модального окна
    const [modalOpen, setModalOpen] = useState(false)

    // Режим модального окна (создание или редактирование задачи)
    const [modalMode, setModalMode] = useState<'create' | 'edit'>('create')

    // ID редактируемой задачи
    const [issueId, setIssueId] = useState<number | null>(null)

    // Поисковой запрос
    const [searchQuery, setSearchQuery] = useState('')

    // Перечень фильтров
    const [filters, setFilters] = useState({
        status: '',
        board: '',
    })

    // Получение отфильтрованных и найденных задач
    const filteredAndSearchedIssues = useIssues(issues, filters, searchQuery)

    // Загрузка данных задач, проектов и пользователей (исполнителей) при монтировании
    useEffect(() => {
        dispatch(fetchIssues())
        dispatch(fetchBoards())
        dispatch(fetchUsers())
    }, [dispatch])

    // Функция для отправки запроса на создание задачи
    const createIssueHandler = async (issue: ICreateIssue) => {
        await IssueService.create(issue)
        dispatch(fetchIssues())
    }

    // Функция для отправки запроса на обновление задачи
    const updateIssueHandler = async (issue: IUpdateIssue) => {
        if (issueId) {
            await IssueService.update(issue, issueId)
            dispatch(fetchIssues())
            setIssueId(null)
        }
    }

    // Обработчик для открытия модального окна
    const openModal = (mode: 'create' | 'edit') => {
        setModalMode(mode)
        setModalOpen(true)
    }

    return (
        <>
            {/* Навигационная панель (Header) */}
            <NavBar openCreateModal={openModal} />

            <Container maxWidth='md' sx={{ mt: 4 }}>
                <Paper elevation={3} sx={{ p: 3 }}>
                    <Typography variant='h4' fontWeight='bold' gutterBottom>
                        Список задач
                    </Typography>

                    {/* Поиск и фильтры */}
                    <Grid
                        container
                        spacing={2}
                        mb={3}
                        direction='row'
                        sx={{
                            justifyContent: 'space-between',
                        }}>
                        <Grid size={{ xs: 4 }}>
                            <Search onChange={setSearchQuery} inputValue={searchQuery} />
                        </Grid>
                        <Grid size={{ xs: 8 }}>
                            <IssueFilters filters={filters} onFiltersChange={setFilters} />
                        </Grid>
                    </Grid>

                    {/* Вывод списка задач */}
                    {loading ? (
                        <Loader />
                    ) : error ? (
                        <Typography variant='h5' fontWeight='bold' gutterBottom textAlign='center'>
                            Произошла ошибка: {error}
                        </Typography>
                    ) : (
                        <IssueList
                            issues={filteredAndSearchedIssues}
                            openEditModal={openModal}
                            setIssueId={setIssueId}
                        />
                    )}

                    {/* Кнопка для открытия модального окна для создания задач */}
                    <Box mt={4} textAlign='end'>
                        <Button variant='contained' color='primary' onClick={() => openModal('create')}>
                            Создать задачу
                        </Button>
                    </Box>
                </Paper>
            </Container >

            {/* Модальное окно для создания/редактирования задачи */}
            <ModalForm
                open={modalOpen}
                mode={modalMode}
                fromPage='issues'
                issueId={issueId}
                onClose={setModalOpen}
                onSubmit={modalMode === 'create' ? createIssueHandler : updateIssueHandler}
            />
        </>
    );
}