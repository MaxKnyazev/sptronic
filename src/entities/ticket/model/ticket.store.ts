import { create } from 'zustand';

export type TicketStatus = 'ожидает саппорта' | 'в работе' | 'закрыт';

export type Ticket = {
  id: string;
  userId: string;
  title: string;
  module: string;
  description: string;
  status: TicketStatus;
  owner: string;
  createdAt: string;
  closedAt?: string;
  assignedSupport?: string;
  files: string[];
  logFiles: string[];
  chat: { from: 'user' | 'support'; text: string }[];
  closedBy?: string;
};

type TicketState = {
  tickets: Ticket[];
  createTicket: (payload: { module: string; description: string; files: string[] }) => string;
  setStatus: (id: string, status: TicketStatus) => void;
  assignTicket: (id: string, supportName: string) => void;
  addUserFile: (id: string, file: string) => void;
  addLogFile: (id: string, file: string) => void;
  addMessage: (id: string, from: 'user' | 'support', text: string) => void;
  closeTicket: (id: string, supportName: string) => void;
};

const seedTickets: Ticket[] = [
  {
    id: 'TCK-1001',
    userId: '84712953',
    title: 'Ошибка при синхронизации',
    module: 'Module 1',
    description: 'После обновления не запускается синхронизация данных.',
    status: 'ожидает саппорта',
    owner: 'Иван Петров',
    createdAt: '2026-04-05 11:40',
    files: ['screenshot.png'],
    logFiles: ['sync-log-01.txt'],
    chat: [{ from: 'user', text: 'Добрый день, нужна помощь.' }],
  },
  {
    id: 'TCK-1002',
    userId: '84712953',
    title: 'Падение формы отчета',
    module: 'Module 2',
    description: 'При открытии отчета приложение зависает.',
    status: 'в работе',
    owner: 'Иван Петров',
    createdAt: '2026-04-06 09:15',
    assignedSupport: 'Мария Support',
    files: [],
    logFiles: ['report-crash.log'],
    chat: [
      { from: 'user', text: 'Проблема воспроизводится стабильно.' },
      { from: 'support', text: 'Приняла в работу, изучаю логи.' },
    ],
  },
  {
    id: 'TCK-1003',
    userId: '84712953',
    title: 'Некорректные значения датчика',
    module: 'Module 3',
    description: 'В журнале появляются скачки значений температуры.',
    status: 'закрыт',
    owner: 'Иван Петров',
    createdAt: '2026-04-03 14:05',
    closedAt: '2026-04-04 10:22',
    assignedSupport: 'Мария Support',
    files: ['sensor-data.csv'],
    logFiles: ['temp-sensor.log'],
    chat: [
      { from: 'user', text: 'Скачки каждые 2-3 минуты.' },
      { from: 'support', text: 'Исправили конфигурацию фильтра, проверьте.' },
    ],
    closedBy: 'Мария Support',
  },
  {
    id: 'TCK-1004',
    userId: '59374621',
    title: 'Не открывается окно калибровки',
    module: 'Module 1',
    description: 'Кнопка калибровки неактивна после обновления.',
    status: 'ожидает саппорта',
    owner: 'Сергей Орлов',
    createdAt: '2026-04-06 16:48',
    files: ['calibration-ui.png'],
    logFiles: [],
    chat: [{ from: 'user', text: 'Переустановка не помогла.' }],
  },
  {
    id: 'TCK-1005',
    userId: '59374621',
    title: 'Проблема с сохранением профиля',
    module: 'Module 2',
    description: 'Сохраненные профили не отображаются после перезапуска.',
    status: 'в работе',
    owner: 'Сергей Орлов',
    createdAt: '2026-04-07 08:10',
    assignedSupport: 'Алексей Support',
    files: ['profiles-export.zip'],
    logFiles: ['profile-service.log'],
    chat: [
      { from: 'user', text: 'Профили пропадают после рестарта.' },
      { from: 'support', text: 'Проверяю миграции и каталог хранения.' },
    ],
  },
  {
    id: 'TCK-1006',
    userId: '12004567',
    title: 'Ошибка подключения к CAN-шине',
    module: 'Module 1',
    description: 'На стенде периодически теряется связь с устройством.',
    status: 'ожидает саппорта',
    owner: 'Павел Мельников',
    createdAt: '2026-04-07 10:34',
    files: ['can-timeout.txt'],
    logFiles: [],
    chat: [],
  },
  {
    id: 'TCK-1007',
    userId: '12004567',
    title: 'Долгая загрузка проекта',
    module: 'Module 3',
    description: 'Проект открывается более 5 минут.',
    status: 'закрыт',
    owner: 'Павел Мельников',
    createdAt: '2026-03-30 12:01',
    closedAt: '2026-03-31 09:40',
    assignedSupport: 'Мария Support',
    files: ['project-size.txt'],
    logFiles: ['startup.log'],
    chat: [
      { from: 'user', text: 'Проблема только на большом проекте.' },
      { from: 'support', text: 'Оптимизировали кэш, должно стать быстрее.' },
    ],
    closedBy: 'Мария Support',
  },
  {
    id: 'TCK-1008',
    userId: '77553319',
    title: 'Сбой экспорта отчета PDF',
    module: 'Module 2',
    description: 'Экспорт завершаетcя ошибкой на 80%.',
    status: 'в работе',
    owner: 'Антон Киселев',
    createdAt: '2026-04-06 11:27',
    assignedSupport: 'Алексей Support',
    files: ['report-template.pdf'],
    logFiles: ['export-worker.log'],
    chat: [{ from: 'support', text: 'Нужен пример отчета для проверки.' }],
  },
  {
    id: 'TCK-1009',
    userId: '99001357',
    title: 'Не сохраняются пользовательские настройки',
    module: 'Module 3',
    description: 'После выхода настройки сбрасываются на дефолт.',
    status: 'ожидает саппорта',
    owner: 'Олег Зорин',
    createdAt: '2026-04-07 09:02',
    files: [],
    logFiles: [],
    chat: [],
  },
  {
    id: 'TCK-1010',
    userId: '99001357',
    title: 'Ошибка авторизации в тестовом окружении',
    module: 'Module 1',
    description: 'Периодически появляется 401 при валидных данных.',
    status: 'закрыт',
    owner: 'Олег Зорин',
    createdAt: '2026-03-25 15:50',
    closedAt: '2026-03-26 13:07',
    assignedSupport: 'Мария Support',
    files: ['auth-headers.txt'],
    logFiles: ['gateway.log'],
    chat: [
      { from: 'user', text: 'Ошибка возникает раз в несколько входов.' },
      { from: 'support', text: 'Обновили TTL сессии, проблема должна уйти.' },
    ],
    closedBy: 'Мария Support',
  },
];

export const useTicketStore = create<TicketState>((set) => ({
  tickets: seedTickets,
  createTicket: ({ module, description, files }) => {
    const id = `TCK-${Math.floor(1000 + Math.random() * 9000)}`;
    set((state) => ({
      tickets: [
        {
          id,
          userId: '84712953',
          title: `Новый тикет (${module})`,
          module,
          description,
          status: 'ожидает саппорта',
          owner: 'Иван Петров',
          createdAt: new Date().toLocaleString('ru-RU', { hour12: false }),
          files,
          logFiles: [],
          chat: [],
        },
        ...state.tickets,
      ],
    }));
    return id;
  },
  setStatus: (id, status) =>
    set((state) => ({
      tickets: state.tickets.map((ticket) => (ticket.id === id ? { ...ticket, status } : ticket)),
    })),
  assignTicket: (id, supportName) =>
    set((state) => ({
      tickets: state.tickets.map((ticket) =>
        ticket.id === id ? { ...ticket, assignedSupport: supportName, status: 'в работе' } : ticket,
      ),
    })),
  addUserFile: (id, file) =>
    set((state) => ({
      tickets: state.tickets.map((ticket) => (ticket.id === id ? { ...ticket, files: [...ticket.files, file] } : ticket)),
    })),
  addLogFile: (id, file) =>
    set((state) => ({
      tickets: state.tickets.map((ticket) =>
        ticket.id === id ? { ...ticket, logFiles: [...ticket.logFiles, file] } : ticket,
      ),
    })),
  addMessage: (id, from, text) =>
    set((state) => ({
      tickets: state.tickets.map((ticket) =>
        ticket.id === id ? { ...ticket, chat: [...ticket.chat, { from, text }] } : ticket,
      ),
    })),
  closeTicket: (id, supportName) =>
    set((state) => ({
      tickets: state.tickets.map((ticket) =>
        ticket.id === id
          ? { ...ticket, status: 'закрыт', closedBy: supportName, closedAt: new Date().toLocaleString('ru-RU', { hour12: false }) }
          : ticket,
      ),
    })),
}));
