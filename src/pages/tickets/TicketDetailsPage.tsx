import { useState } from 'react';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useSessionStore } from '../../entities/session/model/session.store';
import { useTicketStore } from '../../entities/ticket/model/ticket.store';
import { ComplaintModal } from '../../features/complaint/ui/ComplaintModal';
import { SupportRatingModal } from '../../features/rating/ui/SupportRatingModal';
import { TemporaryBlockModal } from '../../features/moderation/ui/TemporaryBlockModal';
import { TicketStatusChip } from '../../shared/ui/TicketStatusChip';

export const TicketDetailsPage = () => {
  const role = useSessionStore((s) => s.role);
  const selectedTicketId = useSessionStore((s) => s.selectedTicketId);
  const tickets = useTicketStore((s) => s.tickets);
  const ticket = tickets.find((item) => item.id === selectedTicketId) ?? tickets[0];
  const addMessage = useTicketStore((s) => s.addMessage);
  const addUserFile = useTicketStore((s) => s.addUserFile);
  const addLogFile = useTicketStore((s) => s.addLogFile);
  const closeTicket = useTicketStore((s) => s.closeTicket);
  const rateSupport = useTicketStore((s) => s.rateSupport);

  const [msg, setMsg] = useState('');
  const [fileName, setFileName] = useState('new-file.txt');
  const [logFileName, setLogFileName] = useState('support-log.txt');
  const [complaintOpen, setComplaintOpen] = useState(false);
  const [ratingOpen, setRatingOpen] = useState(false);
  const [blockOpen, setBlockOpen] = useState(false);

  if (!ticket) return null;

  const isSupportRole = role === 'support' || role === 'admin' || role === 'author_developer' || role === 'temporary_support';

  return (
    <Stack spacing={2}>
      <Typography variant="h4">Тикет {ticket.id}</Typography>
      <Paper sx={{ p: 2 }}>
        <Stack spacing={1}>
          <Typography variant="h6">{ticket.title}</Typography>
          <TicketStatusChip status={ticket.status} />
          <Typography>{ticket.description}</Typography>
        </Stack>
      </Paper>
      <Paper sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom>
          Чат
        </Typography>
        <Stack spacing={1}>
          {ticket.chat.map((line, idx) => (
            <Typography key={idx} variant="body2">
              <b>{line.from === 'user' ? 'Пользователь' : 'Саппорт'}:</b> {line.text}
            </Typography>
          ))}
          <TextField value={msg} onChange={(e) => setMsg(e.target.value)} placeholder="Новое сообщение" />
          <Button
            variant="outlined"
            onClick={() => {
              addMessage(ticket.id, isSupportRole ? 'support' : 'user', msg);
              setMsg('');
            }}
            disabled={!msg.trim()}
          >
            Отправить
          </Button>
        </Stack>
      </Paper>
      <Paper sx={{ p: 2 }}>
        <Typography variant="h6">Файлы пользователя</Typography>
        <Typography variant="body2" sx={{ mb: 1 }}>
          {ticket.files.join(', ') || 'Нет файлов'}
        </Typography>
        <Stack direction="row" spacing={1}>
          <TextField size="small" value={fileName} onChange={(e) => setFileName(e.target.value)} />
          <Button variant="outlined" onClick={() => addUserFile(ticket.id, fileName)}>
            Добавить файл
          </Button>
        </Stack>
        <Divider sx={{ my: 2 }} />
        <Typography variant="h6">Лог-файлы</Typography>
        <Typography variant="body2" sx={{ mb: 1 }}>
          {ticket.logFiles.join(', ') || 'Нет лог-файлов'}
        </Typography>
        {isSupportRole && (
          <Stack direction="row" spacing={1}>
            <TextField size="small" value={logFileName} onChange={(e) => setLogFileName(e.target.value)} />
            <Button variant="outlined" onClick={() => addLogFile(ticket.id, logFileName)}>
              Добавить лог-файл
            </Button>
          </Stack>
        )}
      </Paper>
      <Stack direction="row" spacing={1}>
        {!isSupportRole && (
          <Button variant="contained" color="error" onClick={() => setComplaintOpen(true)}>
            Жалоба
          </Button>
        )}
        {isSupportRole && (
          <>
            <Button
              variant="contained"
              onClick={() => {
                closeTicket(ticket.id, 'Мария Support');
              }}
            >
              Закрыть тикет
            </Button>
            <Button variant="outlined" color="warning" onClick={() => setBlockOpen(true)}>
              Временная блокировка
            </Button>
          </>
        )}
        {!isSupportRole && ticket.status === 'закрыт' && (
          <Button variant="outlined" onClick={() => setRatingOpen(true)}>
            Оставить отзыв саппорту
          </Button>
        )}
      </Stack>
      {!isSupportRole && ticket.status === 'закрыт' && ticket.supportRating && (
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6">Ваш отзыв</Typography>
          <Typography variant="body2">Оценка: {ticket.supportRating}/5</Typography>
          <Typography variant="body2" color="text.secondary">
            {ticket.supportReviewComment || 'Без комментария'}
          </Typography>
        </Paper>
      )}
      <ComplaintModal open={complaintOpen} onClose={() => setComplaintOpen(false)} />
      <SupportRatingModal
        open={ratingOpen}
        onClose={() => setRatingOpen(false)}
        initialValue={ticket.supportRating ?? 5}
        initialComment={ticket.supportReviewComment ?? ''}
        onSubmit={(value, comment) => rateSupport(ticket.id, value, comment)}
      />
      <TemporaryBlockModal open={blockOpen} onClose={() => setBlockOpen(false)} />
    </Stack>
  );
};
