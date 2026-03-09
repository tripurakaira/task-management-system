import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Box, Card, CardContent, TextField, Button, Typography, Alert, Stack } from '@mui/material'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    try {
      await login(username, password)
      navigate('/')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed')
    }
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'radial-gradient(circle at top, #1d4ed8 0, #020617 52%)',
        p: 3,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          inset: '-40%',
          background:
            'radial-gradient(circle at 0% 0%, rgba(59,130,246,0.16), transparent 55%), radial-gradient(circle at 100% 100%, rgba(14,165,233,0.12), transparent 50%)',
          opacity: 0.9,
          pointerEvents: 'none',
        }}
      />

      <Box sx={{ maxWidth: 1040, width: '100%', position: 'relative', zIndex: 1 }}>
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          spacing={3}
          alignItems="stretch"
          justifyContent="space-between"
        >
          <Box
            sx={{
              flex: 1.1,
              color: 'text.primary',
              pr: { md: 4 },
              mb: { xs: 2, md: 0 },
            }}
          >
            <Typography variant="overline" sx={{ color: 'primary.light', letterSpacing: 2 }}>
              TASK MANAGEMENT SUITE
            </Typography>
            <Typography variant="h4" sx={{ mt: 1, mb: 1.5 }}>
              Ship work with clarity and control.
            </Typography>
            <Typography variant="body1" sx={{ maxWidth: 420, color: 'text.secondary' }}>
              Track priorities, unblock teams, and keep every deliverable on a single, auditable
              system of record designed for growing organizations.
            </Typography>
          </Box>

          <Card sx={{ flex: 1, minWidth: { xs: '100%', md: 380 } }}>
            <CardContent sx={{ p: 4 }}>
              <Typography variant="h5" gutterBottom align="left">
                Welcome back
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Sign in to access your tasks, projects, and timelines.
              </Typography>
              {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                  {error}
                </Alert>
              )}
              <form onSubmit={handleSubmit}>
                <TextField
                  fullWidth
                  label="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  margin="normal"
                  autoComplete="username"
                  required
                />
                <TextField
                  fullWidth
                  label="Password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  margin="normal"
                  autoComplete="current-password"
                  required
                />
                <Button fullWidth type="submit" variant="contained" size="large" sx={{ mt: 3 }}>
                  Sign In
                </Button>
              </form>
              <Typography variant="body2" align="center" sx={{ mt: 3 }}>
                Don&apos;t have an account?{' '}
                <Link to="/register" style={{ color: 'inherit', fontWeight: 500 }}>
                  Create an account
                </Link>
              </Typography>
            </CardContent>
          </Card>
        </Stack>
      </Box>
    </Box>
  )
}
