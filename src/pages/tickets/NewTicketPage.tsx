import { useState } from 'react';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import { useSessionStore } from '../../entities/session/model/session.store';
import { useTicketStore } from '../../entities/ticket/model/ticket.store';

export const NewTicketPage = () => {
  const [module, setModule] = useState('Module 1');
  const [description, setDescription] = useState('');
  const [files, setFiles] = useState('problem-log.txt');
  const createTicket = useTicketStore((s) => s.createTicket);
  const setSelectedTicketId = useSessionStore((s) => s.setSelectedTicketId);
  const navigate = useNavigate();
  return (
    <Stack spacing={2}>
      <Typography variant="h4">Создать тикет</Typography>
      <Paper sx={{ p: 2 }}>
        <Stack spacing={2}>
          <TextField select label="Модуль" value={module} onChange={(e) => setModule(e.target.value)}>
            {['Module 1', 'Module 2', 'Module 3'].map((item) => (
              <MenuItem key={item} value={item}>
                {item}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            label="Описание проблемы"
            multiline
            minRows={5}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <TextField
            label="Файлы (через запятую)"
            value={files}
            onChange={(e) => setFiles(e.target.value)}
            helperText="UI-заглушка загрузки файлов"
          />
          <Button
            variant="contained"
            disabled={!description.trim()}
            onClick={() => {
              const id = createTicket({
                module,
                description,
                files: files
                  .split(',')
                  .map((v) => v.trim())
                  .filter(Boolean),
              });
              setSelectedTicketId(id);
              navigate('/tickets/details');
            }}
          >
            Создать тикет
          </Button>
        </Stack>
      </Paper>
    </Stack>
  );
};
