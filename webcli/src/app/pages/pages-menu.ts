import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
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
  {
    title: 'Dashboards',
    icon: 'pie-chart-outline',
    children: [
      {
        title: 'Gráficos',
        link: '/pages/charts/echarts',
        home: true
      },
    ],
  },
];
