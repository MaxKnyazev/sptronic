import { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';

type Props = {
  open: boolean;
  onClose: () => void;
};

const options = [1, 2, 4, 8, 12];

export const TemporaryBlockModal = ({ open, onClose }: Props) => {
  const [hours, setHours] = useState('1');
  const [reason, setReason] = useState('');
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle>Временная блокировка пользователя</DialogTitle>
      <DialogContent>
        <Stack spacing={2} pt={1}>
          <TextField select label="Срок блокировки" value={hours} onChange={(e) => setHours(e.target.value)}>
            {options.map((hour) => (
              <MenuItem value={String(hour)} key={hour}>
                {hour} ч.
              </MenuItem>
            ))}
          </TextField>
          <TextField
            required
            multiline
            minRows={3}
            label="Причина"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Отмена</Button>
        <Button variant="contained" onClick={onClose} disabled={!reason.trim()}>
          Заблокировать
        </Button>
      </DialogActions>
    </Dialog>
  );
};
