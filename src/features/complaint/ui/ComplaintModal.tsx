import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';

type Props = {
  open: boolean;
  onClose: () => void;
};

export const ComplaintModal = ({ open, onClose }: Props) => {
  const [text, setText] = useState('');
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Жалоба</DialogTitle>
      <DialogContent>
        <Box pt={1}>
          <TextField
            fullWidth
            multiline
            minRows={4}
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Опишите причину жалобы"
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Отмена</Button>
        <Button variant="contained" onClick={onClose} disabled={!text.trim()}>
          Отправить
        </Button>
      </DialogActions>
    </Dialog>
  );
};
