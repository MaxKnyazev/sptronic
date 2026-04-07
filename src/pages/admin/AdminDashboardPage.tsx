import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { StatsOverview } from '../../widgets/statistics/StatsOverview';

export const AdminDashboardPage = () => (
  <Stack spacing={2}>
    <Typography variant="h4">Админ дашборд</Typography>
    <StatsOverview />
    <Paper sx={{ p: 2 }}>
      <Typography variant="h6">Распределение по статусам</Typography>
      <Typography color="text.secondary">Ожидает саппорта: 40% | В работе: 30% | Закрыт: 30%</Typography>
    </Paper>
    <Paper sx={{ p: 2 }}>
      <Typography variant="h6">Динамика нагрузки</Typography>
      <Typography color="text.secondary">Графики интегрируются на следующем этапе, сейчас заглушка UI.</Typography>
    </Paper>
  </Stack>
);
