import { useState, useEffect } from 'react'
import {
  Box,
  Container,
  AppBar,
  Toolbar,
  Typography,
  Button,
  Tabs,
  Tab,
  Card,
  CardContent,
  CardActions,
  IconButton,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  CircularProgress,
  Alert,
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import LogoutIcon from '@mui/icons-material/Logout'
import { useAuth } from '../context/AuthContext'
import * as api from '../api/api'
import type { Task, TaskRequest } from '../api/api'

type StatusFilter = 'ALL' | 'PENDING' | 'IN_PROGRESS' | 'COMPLETED'

export default function Dashboard() {
  const { user, logout } = useAuth()
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [filter, setFilter] = useState<StatusFilter>('ALL')
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingTask, setEditingTask] = useState<Task | null>(null)
  const [form, setForm] = useState<TaskRequest>({
    title: '',
    description: '',
    status: 'PENDING',
    priority: 'MEDIUM',
  })

  const loadTasks = async () => {
    setLoading(true)
    setError('')
    try {
      const status = filter === 'ALL' ? undefined : filter
      const data = await api.getTasks(status)
      setTasks(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load tasks')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadTasks()
  }, [filter])

  const handleOpenCreate = () => {
    setEditingTask(null)
    setForm({ title: '', description: '', status: 'PENDING', priority: 'MEDIUM' })
    setDialogOpen(true)
  }

  const handleOpenEdit = (task: Task) => {
    setEditingTask(task)
    setForm({
      title: task.title,
      description: task.description ?? '',
      status: task.status,
      priority: task.priority,
    })
    setDialogOpen(true)
  }

  const handleClose = () => {
    setDialogOpen(false)
    setEditingTask(null)
  }

  const handleSubmit = async () => {
    if (!form.title.trim()) return
    try {
      if (editingTask) {
        await api.updateTask(editingTask.id, form)
      } else {
        await api.createTask(form)
      }
      handleClose()
      loadTasks()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Operation failed')
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this task?')) return
    try {
      await api.deleteTask(id)
      loadTasks()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete')
    }
  }

  const getPriorityColor = (p: Task['priority']) => {
    if (p === 'HIGH') return 'error'
    if (p === 'MEDIUM') return 'warning'
    return 'default'
  }

  const getStatusColor = (s: Task['status']) => {
    if (s === 'COMPLETED') return 'success'
    if (s === 'IN_PROGRESS') return 'info'
    return 'default'
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: 'linear-gradient(to bottom, #020617, #020617 40%, #020617)',
      }}
    >
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Task Management
          </Typography>
          <Typography variant="body2" sx={{ mr: 2 }}>
            {user?.username}
          </Typography>
          <Button color="inherit" startIcon={<LogoutIcon />} onClick={logout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: { xs: 'flex-start', sm: 'center' },
            flexDirection: { xs: 'column', sm: 'row' },
            gap: 2,
            mb: 3,
          }}
        >
          <Box>
            <Typography variant="h5" sx={{ mb: 0.5 }}>
              Overview
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Monitor tasks across statuses and priorities.
            </Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              gap: 2,
              alignItems: 'center',
              bgcolor: 'rgba(15,23,42,0.9)',
              borderRadius: 999,
              px: 1.5,
              py: 0.5,
              border: '1px solid rgba(148,163,184,0.28)',
            }}
          >
            <Tabs
              value={filter}
              onChange={(_, v) => setFilter(v)}
              sx={{
                minHeight: 0,
                '& .MuiTab-root': { minHeight: 0, px: 1.5 },
              }}
            >
              <Tab value="ALL" label="All" />
              <Tab value="PENDING" label="Pending" />
              <Tab value="IN_PROGRESS" label="In Progress" />
              <Tab value="COMPLETED" label="Completed" />
            </Tabs>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={handleOpenCreate}
              sx={{ whiteSpace: 'nowrap' }}
            >
              New Task
            </Button>
          </Box>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError('')}>
            {error}
          </Alert>
        )}

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
            <CircularProgress />
          </Box>
        ) : (
          <Grid container spacing={2}>
            {tasks.map((task) => (
              <Grid item xs={12} sm={6} md={4} key={task.id}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      {task.title}
                    </Typography>
                    {task.description && (
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                        {task.description}
                      </Typography>
                    )}
                    <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap', mt: 1 }}>
                      <Chip label={task.status} color={getStatusColor(task.status)} size="small" />
                      <Chip label={task.priority} color={getPriorityColor(task.priority)} size="small" />
                    </Box>
                  </CardContent>
                  <CardActions>
                    <IconButton size="small" onClick={() => handleOpenEdit(task)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton size="small" color="error" onClick={() => handleDelete(task.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}

        {!loading && tasks.length === 0 && (
          <Typography color="text.secondary" align="center" sx={{ py: 4 }}>
            No tasks yet. Create your first task!
          </Typography>
        )}
      </Container>

      <Dialog open={dialogOpen} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>{editingTask ? 'Edit Task' : 'Create Task'}</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            margin="normal"
            multiline
            rows={3}
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Status</InputLabel>
            <Select
              value={form.status}
              label="Status"
              onChange={(e) => setForm({ ...form, status: e.target.value as Task['status'] })}
            >
              <MenuItem value="PENDING">Pending</MenuItem>
              <MenuItem value="IN_PROGRESS">In Progress</MenuItem>
              <MenuItem value="COMPLETED">Completed</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel>Priority</InputLabel>
            <Select
              value={form.priority}
              label="Priority"
              onChange={(e) => setForm({ ...form, priority: e.target.value as Task['priority'] })}
            >
              <MenuItem value="LOW">Low</MenuItem>
              <MenuItem value="MEDIUM">Medium</MenuItem>
              <MenuItem value="HIGH">High</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button variant="contained" onClick={handleSubmit} disabled={!form.title.trim()}>
            {editingTask ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}
