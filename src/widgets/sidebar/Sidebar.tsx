import AssignmentIcon from '@mui/icons-material/Assignment';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonIcon from '@mui/icons-material/Person';
import PostAddIcon from '@mui/icons-material/PostAdd';
import PeopleIcon from '@mui/icons-material/People';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { NavLink, useNavigate } from 'react-router-dom';
import { useSessionStore } from '../../entities/session/model/session.store';
import { useUserStore } from '../../entities/user/model/user.store';
import { roleLabels } from '../../shared/types/roles';

const navByRole = {
  user: [
    { to: '/profile', label: 'Профиль', icon: <PersonIcon /> },
    { to: '/tickets', label: 'Список тикетов', icon: <AssignmentIcon />, end: true },
    { to: '/tickets/new', label: 'Новый тикет', icon: <PostAddIcon /> },
  ],
  support: [
    { to: '/support/all', label: 'Все тикеты', icon: <AssignmentIcon /> },
    { to: '/support/my', label: 'Мои тикеты', icon: <PersonIcon /> },
  ],
  temporary_support: [{ to: '/tickets/details', label: 'Назначенный тикет', icon: <AssignmentIcon /> }],
  admin: [
    { to: '/admin/dashboard', label: 'Дашборд', icon: <DashboardIcon /> },
    { to: '/admin/all-users', label: 'Все пользователи', icon: <PeopleIcon /> },
    { to: '/admin/users', label: 'Пользователи', icon: <PersonIcon /> },
    { to: '/admin/supports', label: 'Саппорты', icon: <SupportAgentIcon /> },
    { to: '/support/all', label: 'Все тикеты', icon: <AssignmentIcon /> },
    { to: '/profile', label: 'Профиль', icon: <PersonIcon /> },
  ],
  author_developer: [
    { to: '/admin/dashboard', label: 'Дашборд', icon: <DashboardIcon /> },
    { to: '/support/all', label: 'Все тикеты', icon: <AssignmentIcon /> },
    { to: '/profile', label: 'Профиль', icon: <PersonIcon /> },
  ],
};

export const Sidebar = () => {
  const role = useSessionStore((s) => s.role);
  const profile = useUserStore((s) => s.profile);
  const navigate = useNavigate();
  const initials = profile.fullName
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('');

  return (
    <Paper
      sx={{
        width: 280,
        borderRadius: 0,
        p: 2,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        backgroundColor: '#ffffff',
      }}
    >
      <Typography variant="h6" fontWeight={800}>
        SPTronic
      </Typography>
      <List sx={{ p: 0 }}>
        {navByRole[role].map((item) => (
          <ListItemButton
            key={item.to}
            component={NavLink}
            to={item.to}
            end={'end' in item ? item.end : false}
            sx={{ borderRadius: '10px', mb: 0.6 }}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.label} />
          </ListItemButton>
        ))}
      </List>

      <Box sx={{ mt: 'auto' }}>
        <Stack spacing={1.5}>
          <Divider />
          <Stack direction="row" spacing={1.2} alignItems="center">
            <Avatar sx={{ width: 40, height: 40, bgcolor: '#d4e3c5', color: '#365128', fontSize: 14 }}>{initials}</Avatar>
            <Box>
              <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
                {roleLabels[role]}
              </Typography>
              <Typography variant="body2" fontWeight={600} sx={{ lineHeight: 1.2 }}>
                {profile.fullName}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                ID {profile.id}
              </Typography>
            </Box>
          </Stack>
          <Button variant="outlined" onClick={() => navigate('/auth')}>
            Сменить роль
          </Button>
        </Stack>
      </Box>
    </Paper>
  );
};
