import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import { useMemo } from 'react';
import { useUserStore } from '../../entities/user/model/user.store';

export const UsersOnlyPage = () => {
  const registeredUsers = useUserStore((s) => s.registeredUsers);
  const users = useMemo(() => registeredUsers.filter((user) => user.role === 'user'), [registeredUsers]);
  return (
    <Stack spacing={2}>
      <Typography variant="h4">Пользователи</Typography>
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
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user, index) => (
              <TableRow key={user.id} sx={{ backgroundColor: index % 2 === 0 ? '#ffffff' : '#f7fbf4' }}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.fullName}</TableCell>
                <TableCell>{user.email}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Stack>
  );
};
