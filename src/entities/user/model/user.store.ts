import { create } from 'zustand';
import type { UserRole } from '../../../shared/types/roles';

type UserProfile = {
  id: string;
  email: string;
  fullName: string;
  login: string;
  password: string;
  modules: string[];
};

type UserState = {
  profile: UserProfile;
  registeredUsers: Array<{
    id: string;
    fullName: string;
    email: string;
    role: UserRole;
  }>;
  updateProfile: (patch: Partial<Pick<UserProfile, 'fullName' | 'login' | 'password'>>) => void;
};

export const useUserStore = create<UserState>((set) => ({
  profile: {
    id: '84712953',
    email: 'user@sptronic.test',
    fullName: 'Иван Петров',
    login: 'ivan.petrov',
    password: '******',
    modules: ['Module 1', 'Module 2', 'Module 3'],
  },
  registeredUsers: [
    { id: '84712953', fullName: 'Иван Петров', email: 'user@sptronic.test', role: 'user' },
    { id: '59374621', fullName: 'Сергей Орлов', email: 'orlov@sptronic.test', role: 'user' },
    { id: '12004567', fullName: 'Павел Мельников', email: 'pavel@sptronic.test', role: 'user' },
    { id: '99001357', fullName: 'Олег Зорин', email: 'ozorin@sptronic.test', role: 'user' },
    { id: '33445566', fullName: 'Мария Support', email: 'maria.support@sptronic.test', role: 'support' },
    { id: '22334455', fullName: 'Алексей Support', email: 'alex.support@sptronic.test', role: 'support' },
    { id: '11223344', fullName: 'Системный Админ', email: 'admin@sptronic.test', role: 'admin' },
    { id: '99887766', fullName: 'Автор Разработчик', email: 'author@sptronic.test', role: 'author_developer' },
  ],
  updateProfile: (patch) =>
    set((state) => ({
      profile: { ...state.profile, ...patch },
    })),
}));
