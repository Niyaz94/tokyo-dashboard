import React, { useState,useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  TextField,
  Button,
  Typography,
  Link,
  CircularProgress,
  Snackbar,
  Alert
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { usePostAPI }         from "../../../utility/customHook";

const Login: React.FC = () => {

    const { loading:post_api_loading, error:post_api_error, success,response, postData}   = usePostAPI();
    
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({ username: '', password: '' });
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    await postData("users/login/", form,"JSON",200);

  };

   useEffect(() => {
    console.log("response:",success,response);
      if (success) {
        setSnackbar({ open: true, message: 'Login successful!', severity: 'success' });
        setLoading(false);
        navigate('/dashboard');
      }else{
        setSnackbar({ open: true, message: 'Invalid credentials', severity: 'error' });
        setLoading(false);
      }
    }, [success,response]);

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
          title={<Typography variant="h5" fontWeight={600}>Welcome Back</Typography>}
          subheader={<Typography variant="body2" color="text.secondary">Please sign in to continue</Typography>}
          sx={{ textAlign: 'center', pb: 0 }}
        />
        <CardContent>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              label="Username"
              name="username"
              type="text"
              value={form.username}
              onChange={handleChange}
              required
              fullWidth
            />
            <TextField
              label="Password"
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              required
              fullWidth
            />
            <Button
              type="submit"
              variant="contained"
              size="large"
              sx={{ mt: 1, py: 1.2, borderRadius: 2, textTransform: 'none', fontWeight: 600 }}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : 'Sign In'}
            </Button>
            <Typography variant="body2" align="center" sx={{ mt: 2 }}>
              Don’t have an account?{' '}
              <Link underline="hover" sx={{ cursor: 'pointer' }} onClick={() => navigate('/register')}>
                Sign Up
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

export default Login;