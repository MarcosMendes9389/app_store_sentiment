import { NgModule } from '@angular/core';
import { NgxEchartsModule } from 'ngx-echarts';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ChartModule } from 'angular2-chartjs';
import { NbCardModule, NbSelectModule } from '@nebular/theme';

import { ThemeModule } from '../../@theme/theme.module';

import { ChartsRoutingModule, routedComponents } from './charts-routing.module';
import { EchartsPieComponent } from './echarts/echarts-pie.component';
import { EchartsBarComponent } from './echarts/echarts-bar.component';
import { EchartsAreaStackComponent } from './echarts/echarts-area-stack.component';
import { EchartsHistogramComponent } from './echarts/echarts-histogram.component';

const components = [
  EchartsPieComponent,
  EchartsBarComponent,
  EchartsAreaStackComponent,
  EchartsHistogramComponent
];

@NgModule({
  imports: [
    ThemeModule,
    ChartsRoutingModule,
    NgxEchartsModule,
    NgxChartsModule,
    ChartModule,
    NbCardModule,
    NbSelectModule,
  ],
  declarations: [...routedComponents, ...components],
})
export class ChartsModule {}
