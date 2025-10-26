import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  TextField,
  Button,
  Typography,
  Link,
  Snackbar,
  Alert
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (form.password !== form.confirm) {
      setSnackbar({ open: true, message: 'Passwords do not match', severity: 'error' });
      return;
    }

    // Simulate registration
    setTimeout(() => {
      setSnackbar({ open: true, message: 'Account created successfully!', severity: 'success' });
      setTimeout(() => navigate('/login'), 2000);
    }, 1000);
  };

  return (
    <Box
      sx={{
        height: '100vh',
        bgcolor: 'background.default',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        px: 2
      }}
    >
      <Card sx={{ width: '100%', maxWidth: 420, borderRadius: 3, boxShadow: 4 }}>
        <CardHeader
          title={<Typography variant="h5" fontWeight={600}>Create Account</Typography>}
          subheader={<Typography variant="body2" color="text.secondary">Join us and get started today</Typography>}
          sx={{ textAlign: 'center', pb: 0 }}
        />
        <CardContent>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField label="Full Name" name="name" value={form.name} onChange={handleChange} required fullWidth />
            <TextField label="Email Address" name="email" type="email" value={form.email} onChange={handleChange} required fullWidth />
            <TextField label="Password" name="password" type="password" value={form.password} onChange={handleChange} required fullWidth />
            <TextField label="Confirm Password" name="confirm" type="password" value={form.confirm} onChange={handleChange} required fullWidth />

            <Button
              type="submit"
              variant="contained"
              size="large"
              sx={{ mt: 1, py: 1.2, borderRadius: 2, textTransform: 'none', fontWeight: 600 }}
            >
              Sign Up
            </Button>

            <Typography variant="body2" align="center" sx={{ mt: 2 }}>
              Already have an account?{' '}
              <Link underline="hover" sx={{ cursor: 'pointer' }} onClick={() => navigate('/login')}>
                Sign In
              </Link>
            </Typography>
          </Box>
        </CardContent>
      </Card>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert severity={snackbar.severity} onClose={() => setSnackbar({ ...snackbar, open: false })}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Register;