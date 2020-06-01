import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Tabelas',
    icon: 'grid-outline',
    children: [
      {
        title: 'Comentários',
        link: '/pages/tables/smart-table',
      },
    ],
  },
];
