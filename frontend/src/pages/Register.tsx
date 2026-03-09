import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Box, Card, CardContent, TextField, Button, Typography, Alert, Stack } from '@mui/material'
import { useAuth } from '../context/AuthContext'

export default function Register() {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const { register } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    try {
      await register(username, email, password)
      navigate('/')
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Registration failed'
      setError(
        msg.includes('fetch') || msg.includes('Network')
          ? 'Cannot reach server. Ensure the backend is running on port 8081.'
          : msg
      )
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
              Create accounts for your team.
            </Typography>
            <Typography variant="body1" sx={{ maxWidth: 420, color: 'text.secondary' }}>
              Onboard new collaborators with secure, role-based access to projects, tasks, and
              reporting in minutes.
            </Typography>
          </Box>

          <Card sx={{ flex: 1, minWidth: { xs: '100%', md: 380 } }}>
            <CardContent sx={{ p: 4 }}>
              <Typography variant="h5" gutterBottom align="left">
                Create your workspace account
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Use a work email whenever possible so your team can find you.
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
                  required
                />
                <TextField
                  fullWidth
                  label="Email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  margin="normal"
                  autoComplete="email"
                  required
                />
                <TextField
                  fullWidth
                  label="Password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  margin="normal"
                  autoComplete="new-password"
                  required
                  helperText="Minimum 6 characters"
                />
                <Button fullWidth type="submit" variant="contained" size="large" sx={{ mt: 3 }}>
                  Register
                </Button>
              </form>
              <Typography variant="body2" align="center" sx={{ mt: 3 }}>
                Already have an account?{' '}
                <Link to="/login" style={{ color: 'inherit', fontWeight: 500 }}>
                  Sign in
                </Link>
              </Typography>
            </CardContent>
          </Card>
        </Stack>
      </Box>
    </Box>
  )
}
