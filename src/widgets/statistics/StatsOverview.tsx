import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

const cards = [
  { label: 'Всего тикетов', value: '128' },
  { label: 'В работе', value: '34' },
  { label: 'Ожидают саппорта', value: '51' },
  { label: 'Закрыто за неделю', value: '43' },
];

export const StatsOverview = () => (
  <Grid container spacing={2}>
    {cards.map((card) => (
      <Grid size={{ xs: 12, md: 3 }} key={card.label}>
        <Paper sx={{ p: 2 }}>
          <Typography variant="body2" color="text.secondary">
            {card.label}
          </Typography>
          <Typography variant="h5" fontWeight={700}>
            {card.value}
          </Typography>
        </Paper>
      </Grid>
    ))}
  </Grid>
);
