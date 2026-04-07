import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import Typography from '@mui/material/Typography';
import { roleLabels, roles, type UserRole } from '../../../shared/types/roles';

type Props = {
  value: UserRole;
  onChange: (role: UserRole) => void;
};

export const RoleSwitcher = ({ value, onChange }: Props) => (
  <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, minmax(220px, 1fr))' }, gap: 1 }}>
    {roles.map((role) => {
      const selected = value === role;
      return (
        <ButtonBase
          key={role}
          onClick={() => onChange(role)}
          sx={{
            width: '100%',
            textAlign: 'left',
            px: 1.2,
            py: 0.85,
            borderRadius: '10px',
            border: selected ? '2px solid #6f9158' : '1px solid #b8c8aa',
            backgroundColor: selected ? '#f4faee' : '#ffffff',
            boxShadow: 'none',
            transition: 'all .15s ease',
            '&:hover': {
              backgroundColor: selected ? '#eef7e4' : '#f7f7f7',
              borderColor: selected ? '#5f814a' : '#a8b997',
            },
          }}
        >
          <Typography
            variant="caption"
            fontWeight={600}
            sx={{ color: selected ? '#3f5f2f' : '#2f2f2f', textTransform: 'uppercase' }}
          >
            {roleLabels[role]}
          </Typography>
        </ButtonBase>
      );
    })}
  </Box>
);
