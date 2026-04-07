import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

type Props = {
  open: boolean;
  onClose: () => void;
  initialValue?: number | null;
  initialComment?: string;
  onSubmit?: (value: number, comment: string) => void;
};

export const SupportRatingModal = ({ open, onClose, initialValue = 5, initialComment = '', onSubmit }: Props) => {
  const [value, setValue] = useState<number | null>(initialValue);
  const [comment, setComment] = useState(initialComment);

  useEffect(() => {
    if (open) {
      setValue(initialValue);
      setComment(initialComment);
    }
  }, [initialComment, initialValue, open]);

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Оценка работы саппорта</DialogTitle>
      <DialogContent>
        <Stack spacing={2} pt={1}>
          <Box>
            <Typography variant="body2" gutterBottom>
              Поставьте оценку от 1 до 5
            </Typography>
            <Rating value={value} onChange={(_, next) => setValue(next)} />
          </Box>
          <TextField
            multiline
            minRows={3}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Комментарий (необязательно)"
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Позже</Button>
        <Button
          variant="contained"
          onClick={() => {
            if (!value) return;
            onSubmit?.(value, comment);
            onClose();
          }}
          disabled={!value}
        >
          Отправить
        </Button>
      </DialogActions>
    </Dialog>
  );
};
