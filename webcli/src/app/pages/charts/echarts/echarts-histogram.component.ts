import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { Application } from '../../../@core/models/application';
import { GeneralService } from '../../../@core/services/general.service';

@Component({
  selector: 'ngx-echarts-histogram',
  templateUrl: './echarts-histogram.component.html',
})
export class EchartsHistogramComponent implements AfterViewInit, OnDestroy {
  options: any = {};
  themeSubscription: any;
  apps: Application[] = [];
  selectedApp: Application;

  constructor(private theme: NbThemeService,
              private servicegeneral : GeneralService) {
  }

  ngAfterViewInit() {
    this.servicegeneral.listApps().subscribe(apps => {
      this.apps = apps;
      this.selectedApp = apps[0];
      this.rederizeChart();
    });
  }

  changeApp(app: Application) {
    if (this.selectedApp !== app) {
      this.selectedApp = app;
      this.rederizeChart();
    }
  }

  rederizeChart() {

    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {

      const colors: any = config.variables;
      const echarts: any = config.variables.echarts;

      const histogram = this.apps.find(app => app.id === this.selectedApp.id).histogram;

      this.options = {
        backgroundColor: echarts.bg,
        color: [colors.primaryLight],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
          },
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true,
        },
        xAxis: [
          {
            type: 'category',
            data: Object.keys(histogram),
            axisTick: {
              alignWithLabel: true,
            },
            axisLine: {
              lineStyle: {
                color: echarts.axisLineColor,
              },
            },
            axisLabel: {
              textStyle: {
                color: echarts.textColor,
              },
            },
          },
        ],
        yAxis: [
          {
            type: 'value',
            axisLine: {
              lineStyle: {
                color: echarts.axisLineColor,
              },
            },
            splitLine: {
              lineStyle: {
                color: echarts.splitLineColor,
              },
            },
            axisLabel: {
              textStyle: {
                color: echarts.textColor,
              },
            },
          },
        ],
        series: [
          {
            name: 'Score',
            type: 'bar',
            barWidth: '60%',
            data: Object.values(histogram) 
          },
        ],
      };
    });
  }

  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }
}
