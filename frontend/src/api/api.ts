const API_BASE = '/api'

function getAuthHeaders(): HeadersInit {
  const token = localStorage.getItem('token')
  return {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
  }
}

export async function login(username: string, password: string) {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  })
  if (!res.ok) return handleErrorResponse(res, 'Invalid username or password')
  return res.json()
}

function parseErrorResponse(err: Record<string, unknown>, defaultMsg = 'Request failed'): string {
  if (typeof err.message === 'string' && err.message) return err.message
  if (typeof err.error === 'string') return err.error
  if (typeof err === 'object' && err !== null) {
    const parts: string[] = []
    if (err.username) parts.push(String(err.username))
    if (err.email) parts.push(String(err.email))
    if (err.password) parts.push(String(err.password))
    if (parts.length) return parts.join('. ')
    const entries = Object.entries(err)
      .filter(([k]) => !['timestamp', 'status', 'path'].includes(k))
      .map(([k, v]) => `${k}: ${v}`)
    if (entries.length) return entries.join('. ')
  }
  return defaultMsg
}

async function handleErrorResponse(res: Response, defaultMsg: string): Promise<never> {
  const text = await res.text()
  let err: Record<string, unknown> = {}
  try {
    err = text ? (JSON.parse(text) as Record<string, unknown>) : {}
  } catch {
    throw new Error(`${defaultMsg} (HTTP ${res.status})`)
  }
  throw new Error(parseErrorResponse(err, res.status === 500 ? 'Server error. Check backend logs.' : defaultMsg))
}

export async function register(username: string, email: string, password: string) {
  const res = await fetch(`${API_BASE}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, email, password }),
  })
  if (!res.ok) return handleErrorResponse(res, 'Registration failed')
  return res.json()
}

export interface Task {
  id: number
  title: string
  description?: string
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED'
  priority: 'LOW' | 'MEDIUM' | 'HIGH'
  dueDate?: string
  createdAt: string
  updatedAt: string
}

export interface TaskRequest {
  title: string
  description?: string
  status?: Task['status']
  priority?: Task['priority']
  dueDate?: string
}

export async function getTasks(status?: Task['status']): Promise<Task[]> {
  const url = status ? `${API_BASE}/tasks?status=${status}` : `${API_BASE}/tasks`
  const res = await fetch(url, { headers: getAuthHeaders() })
  if (!res.ok) throw new Error('Failed to fetch tasks')
  return res.json()
}

export async function getTask(id: number): Promise<Task> {
  const res = await fetch(`${API_BASE}/tasks/${id}`, { headers: getAuthHeaders() })
  if (!res.ok) throw new Error('Failed to fetch task')
  return res.json()
}

export async function createTask(data: TaskRequest): Promise<Task> {
  const res = await fetch(`${API_BASE}/tasks`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error('Failed to create task')
  return res.json()
}

export async function updateTask(id: number, data: TaskRequest): Promise<Task> {
  const res = await fetch(`${API_BASE}/tasks/${id}`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error('Failed to update task')
  return res.json()
}

export async function deleteTask(id: number): Promise<void> {
  const res = await fetch(`${API_BASE}/tasks/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  })
  if (!res.ok) throw new Error('Failed to delete task')
}
