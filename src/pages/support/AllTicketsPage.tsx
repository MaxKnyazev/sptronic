import { useMemo, useState } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import { useSessionStore } from '../../entities/session/model/session.store';
import { useTicketStore, type TicketStatus } from '../../entities/ticket/model/ticket.store';
import { TicketStatusChip } from '../../shared/ui/TicketStatusChip';

type SortDirection = 'default' | 'asc' | 'desc';
type SortField = 'id' | 'userId' | 'status' | 'createdAt' | 'closedAt';

const statusRank = { 'ожидает саппорта': 1, 'в работе': 2, закрыт: 3 } as const;

export const AllTicketsPage = () => {
  const [status, setStatus] = useState<'all' | TicketStatus>('all');
  const [search, setSearch] = useState('');
  const [sortField, setSortField] = useState<SortField>('id');
  const [sortDirection, setSortDirection] = useState<SortDirection>('default');
  const tickets = useTicketStore((s) => s.tickets);
  const assignTicket = useTicketStore((s) => s.assignTicket);
  const setSelectedTicketId = useSessionStore((s) => s.setSelectedTicketId);
  const navigate = useNavigate();

  const filtered = useMemo(
    () =>
      tickets.filter((ticket) => {
        const statusMatch = status === 'all' || ticket.status === status;
        const textMatch = `${ticket.id} ${ticket.title}`.toLowerCase().includes(search.toLowerCase());
        return statusMatch && textMatch;
      }),
    [search, status, tickets],
  );

  const sortedTickets = useMemo(() => {
    if (sortDirection === 'default') {
      return filtered;
    }

    const factor = sortDirection === 'asc' ? 1 : -1;
    return [...filtered].sort((a, b) => {
      if (sortField === 'status') {
        return (statusRank[a.status] - statusRank[b.status]) * factor;
      }

      if (sortField === 'closedAt') {
        return ((a.closedAt ?? '').localeCompare(b.closedAt ?? '')) * factor;
      }

      return String(a[sortField]).localeCompare(String(b[sortField])) * factor;
    });
  }, [filtered, sortDirection, sortField]);

  const cycleSort = (field: SortField) => {
    if (field !== sortField) {
      setSortField(field);
      setSortDirection('asc');
      return;
    }
    setSortDirection((prev) => (prev === 'default' ? 'asc' : prev === 'asc' ? 'desc' : 'default'));
  };

  const getSortMark = (field: SortField) => {
    if (field !== sortField || sortDirection === 'default') return '↕';
    return sortDirection === 'asc' ? '↑' : '↓';
  };

  return (
    <Stack spacing={2}>
      <Typography variant="h4">Все тикеты</Typography>
      <Paper sx={{ p: 2 }}>
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
          <TextField select label="Статус" value={status} onChange={(e) => setStatus(e.target.value as typeof status)}>
            <MenuItem value="all">Все</MenuItem>
            <MenuItem value="ожидает саппорта">Ожидает саппорта</MenuItem>
            <MenuItem value="в работе">В работе</MenuItem>
            <MenuItem value="закрыт">Закрыт</MenuItem>
          </TextField>
          <TextField label="Поиск" value={search} onChange={(e) => setSearch(e.target.value)} />
        </Stack>
      </Paper>
      <TableContainer component={Paper}>
        <Table size="small" sx={{ tableLayout: 'fixed' }}>
          <TableHead
            sx={{
              backgroundColor: '#8fb076',
              '& .MuiTableCell-root': { color: '#ffffff', fontWeight: 700 },
            }}
          >
            <TableRow>
              <TableCell sx={{ width: '16.66%' }}>
                <Box sx={{ cursor: 'pointer', userSelect: 'none' }} onClick={() => cycleSort('id')}>
                  ID тикета {getSortMark('id')}
                </Box>
              </TableCell>
              <TableCell sx={{ width: '16.66%' }}>
                <Box sx={{ cursor: 'pointer', userSelect: 'none' }} onClick={() => cycleSort('userId')}>
                  ID пользователя {getSortMark('userId')}
                </Box>
              </TableCell>
              <TableCell sx={{ width: '16.66%' }}>
                <Box sx={{ cursor: 'pointer', userSelect: 'none' }} onClick={() => cycleSort('status')}>
                  Статус тикета {getSortMark('status')}
                </Box>
              </TableCell>
              <TableCell sx={{ width: '16.66%' }}>
                <Box sx={{ cursor: 'pointer', userSelect: 'none' }} onClick={() => cycleSort('createdAt')}>
                  Дата создания {getSortMark('createdAt')}
                </Box>
              </TableCell>
              <TableCell sx={{ width: '16.66%' }}>
                <Box sx={{ cursor: 'pointer', userSelect: 'none' }} onClick={() => cycleSort('closedAt')}>
                  Дата закрытия {getSortMark('closedAt')}
                </Box>
              </TableCell>
              <TableCell sx={{ width: '16.66%' }} align="right">
                Действия
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedTickets.map((ticket, index) => (
              <TableRow key={ticket.id} hover sx={{ backgroundColor: index % 2 === 0 ? '#ffffff' : '#f7fbf4' }}>
                <TableCell>{ticket.id}</TableCell>
                <TableCell>{ticket.userId}</TableCell>
                <TableCell>
                  <TicketStatusChip status={ticket.status} />
                </TableCell>
                <TableCell>{ticket.createdAt}</TableCell>
                <TableCell>{ticket.closedAt ?? '-'}</TableCell>
                <TableCell align="right">
                  {ticket.status !== 'в работе' ? (
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => {
                        assignTicket(ticket.id, 'Мария Support');
                        setSelectedTicketId(ticket.id);
                        navigate('/tickets/details');
                      }}
                    >
                      Взять в работу
                    </Button>
                  ) : (
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => {
                        setSelectedTicketId(ticket.id);
                        navigate('/tickets/details');
                      }}
                    >
                      Открыть
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Stack>
  );
};
