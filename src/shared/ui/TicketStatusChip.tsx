import Chip from '@mui/material/Chip';
import type { TicketStatus } from '../../entities/ticket/model/ticket.store';

const colorMap: Record<TicketStatus, 'warning' | 'info' | 'success'> = {
  'ожидает саппорта': 'warning',
  'в работе': 'info',
  закрыт: 'success',
};

export const TicketStatusChip = ({ status }: { status: TicketStatus }) => (
  <Chip
    size="small"
    color={colorMap[status]}
    label={status}
    sx={{
      height: 28,
      width: 132,
      borderRadius: '7px',
      justifyContent: 'center',
      '& .MuiChip-label': { px: 1.2, fontWeight: 600, textAlign: 'center', width: '100%' },
    }}
  />
);
