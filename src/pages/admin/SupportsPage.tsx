import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import { useMemo, useState } from 'react';
import { TemporaryBlockModal } from '../../features/moderation/ui/TemporaryBlockModal';
import { useTicketStore } from '../../entities/ticket/model/ticket.store';
import { useUserStore } from '../../entities/user/model/user.store';

export const SupportsPage = () => {
  const registeredUsers = useUserStore((s) => s.registeredUsers);
  const tickets = useTicketStore((s) => s.tickets);
  const users = useMemo(() => registeredUsers.filter((user) => user.role === 'support'), [registeredUsers]);
  const [blockUserLabel, setBlockUserLabel] = useState<string | null>(null);
  const supportRatings = useMemo(() => {
    const grouped = tickets.reduce<Record<string, number[]>>((acc, ticket) => {
      if (!ticket.closedBy || !ticket.supportRating) return acc;
      acc[ticket.closedBy] = acc[ticket.closedBy] ? [...acc[ticket.closedBy], ticket.supportRating] : [ticket.supportRating];
      return acc;
    }, {});

    return Object.fromEntries(
      Object.entries(grouped).map(([supportName, values]) => [
        supportName,
        (values.reduce((sum, value) => sum + value, 0) / values.length).toFixed(1),
      ]),
    );
  }, [tickets]);
  return (
    <Stack spacing={2}>
      <Typography variant="h4">Саппорты</Typography>
      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead
            sx={{
              backgroundColor: '#8fb076',
              '& .MuiTableCell-root': { color: '#ffffff', fontWeight: 700 },
            }}
          >
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>ФИО</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Средний рейтинг</TableCell>
              <TableCell align="right">Действия</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user, index) => (
              <TableRow key={user.id} sx={{ backgroundColor: index % 2 === 0 ? '#ffffff' : '#f7fbf4' }}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.fullName}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{supportRatings[user.fullName] ? `${supportRatings[user.fullName]} / 5` : 'Нет оценок'}</TableCell>
                <TableCell align="right">
                  <Button size="small" variant="outlined" onClick={() => setBlockUserLabel(`${user.fullName}, ID ${user.id}`)}>
                    Выдать блокировку
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TemporaryBlockModal open={Boolean(blockUserLabel)} onClose={() => setBlockUserLabel(null)} userLabel={blockUserLabel ?? ''} />
    </Stack>
  );
};
