import { create } from 'zustand';
import type { UserRole } from '../../../shared/types/roles';

type SessionState = {
  role: UserRole;
  selectedTicketId: string;
  setRole: (role: UserRole) => void;
  setSelectedTicketId: (ticketId: string) => void;
};

export const useSessionStore = create<SessionState>((set) => ({
  role: 'user',
  selectedTicketId: 'TCK-1001',
  setRole: (role) => set({ role }),
  setSelectedTicketId: (selectedTicketId) => set({ selectedTicketId }),
}));
