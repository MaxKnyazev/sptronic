import { useMemo, useState } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import { useSessionStore } from '../../entities/session/model/session.store';
import { useTicketStore } from '../../entities/ticket/model/ticket.store';
import { TicketStatusChip } from '../../shared/ui/TicketStatusChip';

type SortDirection = 'default' | 'asc' | 'desc';
type SortField = 'id' | 'userId' | 'status' | 'createdAt' | 'closedAt';

const statusRank = { 'ожидает саппорта': 1, 'в работе': 2, закрыт: 3 } as const;

export const UserTicketsPage = () => {
  const tickets = useTicketStore((s) => s.tickets);
  const setSelectedTicketId = useSessionStore((s) => s.setSelectedTicketId);
  const navigate = useNavigate();
  const [sortField, setSortField] = useState<SortField>('id');
  const [sortDirection, setSortDirection] = useState<SortDirection>('default');

  const sortedTickets = useMemo(() => {
    if (sortDirection === 'default') {
      return tickets;
    }

    const factor = sortDirection === 'asc' ? 1 : -1;
    return [...tickets].sort((a, b) => {
      if (sortField === 'status') {
        return (statusRank[a.status] - statusRank[b.status]) * factor;
      }

      if (sortField === 'closedAt') {
        return ((a.closedAt ?? '').localeCompare(b.closedAt ?? '')) * factor;
      }

      return String(a[sortField]).localeCompare(String(b[sortField])) * factor;
    });
  }, [sortDirection, sortField, tickets]);

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
      <Typography variant="h4">Мои тикеты</Typography>
      <TableContainer component={Paper}>
        <Table size="small" sx={{ tableLayout: 'fixed' }}>
          <TableHead
            sx={{
              backgroundColor: '#8fb076',
              '& .MuiTableCell-root': {
                color: '#ffffff',
                fontWeight: 700,
              },
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
                  <Button
                    size="small"
                    variant="outlined"
                    onClick={() => {
                      setSelectedTicketId(ticket.id);
                      navigate('/tickets/details');
                    }}
                  >
                    Открыть
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Stack>
  );
};
