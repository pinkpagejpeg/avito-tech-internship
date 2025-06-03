import { Box, Button, Grid, Modal, TextField, Typography } from '@mui/material'
import { useEffect, useState, type FC } from 'react'
import { ICreateIssue, IUpdateIssue, Status, Priority } from '@shared/model'
import { useTypedSelector } from '@shared/store'
import { Link } from 'react-router-dom'
import { IssueService } from '@shared/api'
import { useFetching } from '@shared/lib'
import { SelectInput } from '../selectInput/SelectInput'

interface ModalFormProps {
  open: boolean           // указатель отображения модального окна
  mode: 'create' | 'edit' // режим модального окна (создание или редактирование задачи)
  fromPage: string        // откуда было открыто модальное окно (с какой страницы)
  issueId?: number | null // ID задачи для редактирования (только при режиме редактирования)
  onClose: React.Dispatch<React.SetStateAction<boolean>> // функция для закрытия модального окна
  onSubmit: (issue: ICreateIssue | IUpdateIssue) => Promise<void> // обработчик отправки формы
}

// Компонент модального окна, содержащего форму для редактирования/обновления задач
export const ModalForm: FC<ModalFormProps> = ({
  open,
  mode,
  fromPage,
  issueId,
  onClose,
  onSubmit
}) => {
  // Список приоритетов статусов для формы
  const priorities = Object.values(Priority)

  // Список значений статусов для формы
  const statuses = Object.values(Status)

  // Получение списка проектов (досок) из стора для формы
  const { boards } = useTypedSelector(state => state.board)

  // Получение списка пользователей (исполнителей) из стора для формы
  const { users } = useTypedSelector(state => state.user)

  // Локальные состояния для значений формы
  const [title, setTitle] = useState('') // название задачи
  const [description, setDescription] = useState('') // описание задачи
  const [priority, setPriority] = useState<Priority | null>(null) // приоритет
  const [status, setStatus] = useState<Status | null>(null) // статус
  const [boardId, setBoardId] = useState<number | null>(null) // проект, к которому относится задача
  const [assigneeId, setAssigneeId] = useState<number | null>(null) // исполнитель, к которому относится задача

  // Создание функции для получения задачи по ID а также обработки ее загрузки и получения ошибки
  const [fetchIssue] = useFetching(async (id: number) => {
    const { data } = await IssueService.getById(id)

    // Поиск проекта (доски) в списке по названию для получения ID
    const board = boards.find(item => item.name === data.boardName)

    // Заполнение формы полученными данными задачи
    setTitle(data.title)
    setDescription(data.description)
    setPriority(data.priority)
    setStatus(data.status)
    setBoardId(board.id)
    setAssigneeId(data.assignee?.id)
  })

  // При открытии формы в режиме редактирования и наличии ID задачи загружаются данные задачи
  useEffect(() => {
    if (open) {
      if (mode === 'create') {
        setStatus(Status.Backlog)
      }

      if (mode === 'edit' && issueId) {
        fetchIssue(issueId)
      }
    }
  }, [issueId, open, mode])

  // Очищение формы после закрытия модального окна
  useEffect(() => {
    if (!open) {
      setTitle('')
      setDescription('')
      setPriority(null)
      setStatus(null)
      setBoardId(null)
      setAssigneeId(null)
    }
  }, [open])

  // Функция для валидации формы
  const isFormValid = () => (
    Boolean(title.trim() && description.trim() && priority && assigneeId && boardId && status)
  )

  // Обработка отправки формы
  const handleSubmit = async () => {
    // Проверка на заполненность всех полей формы
    if (!isFormValid()) return

    // Данные, которые необходимы в обоих режимах
    const baseData = { title, description, priority, assigneeId }

    // В зависимости от режима передаются соответсвующие значения полей
    if (mode === 'create') {
      await onSubmit({ ...baseData, boardId })
    } else {
      await onSubmit({ ...baseData, status })
    }

    onClose(false)  // Закрытие модального окна после отправки формы
  }

  return (
    <Modal open={open} onClose={() => onClose(false)}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 500,
          bgcolor: 'background.paper',
          borderRadius: 2,
          boxShadow: 24,
          p: 4,
          maxHeight: '90vh',
          overflowY: 'auto',
        }}
      >
        {/* Заголовок формы зависит от режима */}
        <Typography variant='h5' gutterBottom fontWeight='bold'>
          {mode === 'create' ? 'Создание' : 'Редактирование'} задачи
        </Typography>

        <Box display='flex' flexDirection='column' gap={2}>
          {/* Поле для ввода названия задачи */}
          <TextField
            label='Название'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            fullWidth
            required
          />

          {/* Поле для ввода описания задачи */}
          <TextField
            label='Описание'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            fullWidth
            multiline
            rows={4}
            required
          />

          {/* Выбор проекта */}
          <SelectInput
            label='Проект'
            value={boardId}
            options={boards.map(board => board.id)}
            onChange={setBoardId}
            disabled={mode === 'edit'}
            getOptionLabel={(id) => boards.find(board => board.id === id)?.name || 'Неизвестно'}
            required
          />

          {/* Выбор приоритета */}
          <SelectInput
            label='Приоритет'
            value={priority}
            options={priorities}
            onChange={setPriority}
            required
          />

          {/* Выбор cтатуса */}
          <SelectInput
            label='Статус'
            value={status}
            options={statuses}
            disabled={mode === 'create'}
            onChange={setStatus}
            required
          />

          {/* Выбор исполнителя */}
          <SelectInput
            label='Исполнитель'
            value={assigneeId}
            options={users.map(user => user.id)}
            onChange={setAssigneeId}
            getOptionLabel={(id) => users.find(user => user.id === id)?.fullName || 'Неизвестно'}
            required
          />

          <Grid container spacing={2} mt={1} justifyContent='space-between'>
            {/* Кнопка для перехода на страницу проекта (доски), 
            доступна только на странице всех задач */}
            <Grid>
              {fromPage === 'issues' && boardId && (
                <Button color='primary' component={Link} to={`/board/${boardId}`}>
                  Перейти на доску
                </Button>
              )}
            </Grid>

            {/* Наименование кнопки для отправки формы зависит от режима */}
            <Grid>
              <Button variant='contained' onClick={handleSubmit} disabled={!isFormValid()}>
                {mode === 'create' ? 'Создать' : 'Обновить'}
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Modal>
  )
}