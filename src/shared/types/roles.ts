export const roles = [
  'user',
  'support',
  'admin',
  'temporary_support',
  'author_developer',
] as const;

export type UserRole = (typeof roles)[number];

export const roleLabels: Record<UserRole, string> = {
  user: 'Пользователь',
  support: 'Саппорт',
  admin: 'Админ',
  temporary_support: 'Временный саппорт',
  author_developer: 'Автор-разработчик',
};
