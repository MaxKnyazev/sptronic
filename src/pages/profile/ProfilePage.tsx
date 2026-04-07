import { useState } from 'react';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useUserStore } from '../../entities/user/model/user.store';

export const ProfilePage = () => {
  const profile = useUserStore((s) => s.profile);
  const updateProfile = useUserStore((s) => s.updateProfile);
  const [editMode, setEditMode] = useState(false);
  const [draft, setDraft] = useState({
    fullName: profile.fullName,
    login: profile.login,
    password: profile.password,
  });
  return (
    <Stack spacing={2}>
      <Typography variant="h4">Личный кабинет</Typography>
      <Paper sx={{ p: 2 }}>
        <Stack spacing={2}>
          <TextField label="ID" value={profile.id} disabled />
          <TextField label="Email" value={profile.email} disabled />
          <TextField
            label="ФИО"
            value={editMode ? draft.fullName : profile.fullName}
            disabled={!editMode}
            onChange={(e) => setDraft((s) => ({ ...s, fullName: e.target.value }))}
          />
          <TextField
            label="Логин"
            value={editMode ? draft.login : profile.login}
            disabled={!editMode}
            onChange={(e) => setDraft((s) => ({ ...s, login: e.target.value }))}
          />
          <TextField
            label="Пароль"
            value={editMode ? draft.password : profile.password}
            disabled={!editMode}
            type="password"
            onChange={(e) => setDraft((s) => ({ ...s, password: e.target.value }))}
          />
          <Typography variant="subtitle2">Доступные модули</Typography>
          <Typography>{profile.modules.join(', ')}</Typography>
          {editMode ? (
            <Button
              variant="contained"
              onClick={() => {
                updateProfile(draft);
                setEditMode(false);
              }}
            >
              Сохранить
            </Button>
          ) : (
            <Button variant="outlined" onClick={() => setEditMode(true)}>
              Редактировать
            </Button>
          )}
        </Stack>
      </Paper>
    </Stack>
  );
};
