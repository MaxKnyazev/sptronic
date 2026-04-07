import { Navigate, createBrowserRouter } from 'react-router-dom';
import { AppLayout } from '../layouts/AppLayout';
import { AllUsersPage } from '../../pages/admin/AllUsersPage';
import { AdminDashboardPage } from '../../pages/admin/AdminDashboardPage';
import { SupportsPage } from '../../pages/admin/SupportsPage';
import { UsersOnlyPage } from '../../pages/admin/UsersOnlyPage';
import { AuthPage } from '../../pages/auth/AuthPage';
import { ProfilePage } from '../../pages/profile/ProfilePage';
import { AllTicketsPage } from '../../pages/support/AllTicketsPage';
import { MyClosedTicketsPage } from '../../pages/support/MyClosedTicketsPage';
import { NewTicketPage } from '../../pages/tickets/NewTicketPage';
import { TicketDetailsPage } from '../../pages/tickets/TicketDetailsPage';
import { UserTicketsPage } from '../../pages/tickets/UserTicketsPage';

export const appRouter = createBrowserRouter([
  { path: '/auth', element: <AuthPage /> },
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { index: true, element: <Navigate to="/auth" replace /> },
      { path: 'profile', element: <ProfilePage /> },
      { path: 'tickets', element: <UserTicketsPage /> },
      { path: 'tickets/new', element: <NewTicketPage /> },
      { path: 'tickets/details', element: <TicketDetailsPage /> },
      { path: 'support/all', element: <AllTicketsPage /> },
      { path: 'support/my', element: <MyClosedTicketsPage /> },
      { path: 'admin/dashboard', element: <AdminDashboardPage /> },
      { path: 'admin/all-users', element: <AllUsersPage /> },
      { path: 'admin/users', element: <UsersOnlyPage /> },
      { path: 'admin/supports', element: <SupportsPage /> },
    ],
  },
  { path: '*', element: <Navigate to="/auth" replace /> },
]);
