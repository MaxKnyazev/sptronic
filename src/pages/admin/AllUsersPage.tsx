import { useState } from 'react';
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
import { TemporaryBlockModal } from '../../features/moderation/ui/TemporaryBlockModal';
import { useUserStore } from '../../entities/user/model/user.store';
import { roleLabels } from '../../shared/types/roles';

export const AllUsersPage = () => {
  const users = useUserStore((s) => s.registeredUsers);
  const [blockUserLabel, setBlockUserLabel] = useState<string | null>(null);
  return (
    <Stack spacing={2}>
      <Typography variant="h4">Все пользователи</Typography>
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
              <TableCell>Роль</TableCell>
              <TableCell align="right">Действия</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user, index) => (
              <TableRow key={user.id} sx={{ backgroundColor: index % 2 === 0 ? '#ffffff' : '#f7fbf4' }}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.fullName}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{roleLabels[user.role]}</TableCell>
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
