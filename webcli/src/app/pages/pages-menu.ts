import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  
  {
    title: 'Dashboards',
    icon: 'pie-chart-outline',
    link: '/pages/dashboard',
    home: true,
  },
  {
    title: 'Tabelas',
    icon: 'grid-outline',
    children: [
      {
        title: 'Aplicativos',
        link: '/pages/tables/application',
      },
      {
        title: 'Comentários',
        link: '/pages/tables/review',
      },
    ],
  },
];
