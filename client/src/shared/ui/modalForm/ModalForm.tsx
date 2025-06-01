import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography
} from '@mui/material'
import { useEffect, useState, type FC } from 'react'
import { ICreateIssue } from 'entities/issues'
import { useTypedSelector } from 'shared/store'
import { Link } from 'react-router-dom'
import { IssueService } from 'shared/api'
import { IUpdateIssue } from 'entities/issues/model/types'
import { useFetching } from 'shared/lib'

interface ModalFormProps {
  open: boolean
  mode: 'create' | 'edit'
  fromPage: string
  issueId?: number | null
  onClose: React.Dispatch<React.SetStateAction<boolean>>
  onSubmit: (issue: ICreateIssue | IUpdateIssue) => Promise<void>
}

export const ModalForm: FC<ModalFormProps> = ({
  open,
  mode,
  fromPage,
  issueId,
  onClose,
  onSubmit
}) => {
  const priorities = ['Low', 'Medium', 'High']
  const statuses = ['Backlog', 'InProgress', 'Done']
  const { boards } = useTypedSelector(state => state.board)
  const { users } = useTypedSelector(state => state.user)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [priority, setPriority] = useState<'Low' | 'Medium' | 'High' | ''>('')
  const [status, setStatus] = useState<'Backlog' | 'InProgress' | 'Done' | ''>('')
  const [boardId, setBoardId] = useState<number | ''>('')
  const [assigneeId, setAssigneeId] = useState<number | ''>('')

  const [fetchIssue, isIssueLoading, issueError] = useFetching(async (id: number) => {
    const { data } = await IssueService.getById(id)
    const board = boards.find(item => item.name === data.boardName)

    setTitle(data.title)
    setDescription(data.description)
    setPriority(data.priority)
    setStatus(data.status)
    setBoardId(board.id)
    setAssigneeId(data.assignee?.id)
  })

  useEffect(() => {
    if (open && mode === 'edit' && issueId) {
      fetchIssue(issueId)
    }
  }, [issueId, open])

  useEffect(() => {
  if (!open) {
    setTitle('')
    setDescription('')
    setPriority('')
    setStatus('')
    setBoardId('')
    setAssigneeId('')
  }
}, [open])

  const handleSubmit = async () => {
    if (!title.trim()) return
    if (!description.trim()) return
    if (!priority) return
    if (!assigneeId) return
    if (!boardId) return
    if (!status) return

    if (mode === 'create') {
      onSubmit({
        title,
        description,
        priority,
        assigneeId,
        boardId
      })
    }

    if (mode === 'edit') {
      onSubmit({
        title,
        description,
        priority,
        status,
        assigneeId
      })
    }

    onClose(false)
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
        <Typography variant='h5' gutterBottom fontWeight='bold'>
          {mode === 'create' ? 'Создание' : 'Редактирование'} задачи
        </Typography>

        <Box display='flex' flexDirection='column' gap={2}>
          <TextField
            label='Название'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            fullWidth
            required
          />

          <TextField
            label='Описание'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            fullWidth
            multiline
            rows={4}
            required
          />

          <FormControl fullWidth disabled={mode === 'edit'}>
            <InputLabel>Проект</InputLabel>
            <Select value={boardId} onChange={(e) => setBoardId(Number(e.target.value))} required>
              {boards.map((board) => (
                <MenuItem key={board.id} value={board.id}>{board.name}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel>Приоритет</InputLabel>
            <Select value={priority} onChange={(e) => setPriority(e.target.value)} required>
              {priorities.map((p) => (
                <MenuItem key={p} value={p}>{p}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel>Статус</InputLabel>
            <Select value={status} onChange={(e) => setStatus(e.target.value)} required>
              {statuses.map((s) => (
                <MenuItem key={s} value={s}>{s}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel>Исполнитель</InputLabel>
            <Select
              value={assigneeId}
              onChange={(e) => setAssigneeId(Number(e.target.value))}
              required
            >
              {users.map((user) => (
                <MenuItem key={user.id} value={user.id}>{user.fullName}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <Grid container spacing={2} mt={1} justifyContent='space-between'>
            <Grid>
              {fromPage === 'issues' && boardId && (
                <Button color='primary' component={Link} to={`/board/${boardId}`}>
                  Перейти на доску
                </Button>
              )}
            </Grid>
            <Grid>
              <Button variant='contained' onClick={handleSubmit}>
                {mode === 'create' ? 'Создать' : 'Обновить'}
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Modal>
  )
}
