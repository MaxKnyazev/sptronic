import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import { useSessionStore } from '../../entities/session/model/session.store';
import { RoleSwitcher } from '../../features/role-switcher/ui/RoleSwitcher';

export const AuthPage = () => {
  const [mode, setMode] = useState(0);
  const role = useSessionStore((s) => s.role);
  const setRole = useSessionStore((s) => s.setRole);
  const navigate = useNavigate();

  const onEnter = () => {
    if (role === 'support') navigate('/support/all');
    else if (role === 'admin' || role === 'author_developer') navigate('/admin/dashboard');
    else if (role === 'temporary_support') navigate('/tickets/details');
    else navigate('/profile');
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'grid', placeItems: 'center', p: 2 }}>
      <Paper sx={{ p: 3, width: '100%', maxWidth: 620 }}>
        <Typography variant="h4" gutterBottom>
          SPTronic Support
        </Typography>
        <Tabs value={mode} onChange={(_, next) => setMode(next)} sx={{ mb: 2 }}>
          <Tab label="Логин" />
          <Tab label="Регистрация" />
        </Tabs>
        <Stack spacing={2}>
          <TextField label="Email" fullWidth />
          <TextField label="Логин" fullWidth />
          <TextField label="Пароль" type="password" fullWidth />
          <TextField label="sptronic" fullWidth />
          <TextField label="combilodaer" fullWidth />
          <TextField label="chiptunningpro" fullWidth />
          {mode === 1 && <TextField label="Подтверждение пароля" type="password" fullWidth />}
          <Divider />
          <Typography variant="subtitle2">Тестовый переключатель ролей</Typography>
          <RoleSwitcher value={role} onChange={setRole} />
          <Button variant="contained" onClick={onEnter}>
            Войти
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
};
