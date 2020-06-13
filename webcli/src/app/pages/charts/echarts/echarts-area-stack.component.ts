import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { Application } from '../../../@core/models/application';
import { GeneralService } from '../../../@core/services/general.service';

@Component({
  selector: 'ngx-echarts-area-stack',
  templateUrl: './echarts-area-stack.component.html',
})
export class EchartsAreaStackComponent implements AfterViewInit, OnDestroy {
  options: any = {};
  themeSubscription: any;
  apps: Application[] = [];
  selectedApp: Application;
  data: any[] = [];
  classifications = ['Positivo', 'Negativo'];

  constructor(private theme: NbThemeService,
              private servicegeneral : GeneralService) {
  }

  ngAfterViewInit() {
    this.servicegeneral.listApps().subscribe(apps => {
      this.apps = apps.filter(app => app.store === 'google');
      this.servicegeneral.listClassificationAppDatebyDay().subscribe(data => {
        this.data = data;
        this.selectedApp = this.apps[0];
        this.rederizeChart();
      });  
    });  
  }

  changeApp(app) {
    if (this.selectedApp !== app) {
      this.selectedApp = app;
      this.rederizeChart();
    }
  }

  rederizeChart() {

    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {

      const colors: any = config.variables;
      const echarts: any = config.variables.echarts;

      let countsPos: any[] = [];
      let countsNeg: any[] = [];
      let dates: any[] = [];
      
      let dataFilteredApp = this.data.filter(item => item._id.app === this.selectedApp.id);
            
      dataFilteredApp.forEach( item => {
          dates.push(item._id.date);
      });

      dates = [...new Set(dates)];

      dataFilteredApp.forEach( item => {          
        if(item._id.classification === 'Positivo'){
          countsPos.push(item.count);
        }
        if(item._id.classification === 'Negativo'){
          countsNeg.push(item.count);
        }
      });

      this.options = {
        backgroundColor: echarts.bg,
        color: [colors.warningLight, colors.infoLight, colors.dangerLight, colors.successLight, colors.primaryLight],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: echarts.tooltipBackgroundColor,
            },
          },
        },
        legend: {
          data: this.classifications,
          textStyle: {
            color: echarts.textColor,
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
            boundaryGap: false,
            data: dates,
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
            name: 'Negativo',
            type: 'line',
            stack: 'Total amount',
            areaStyle: { normal: { opacity: echarts.areaOpacity } },
            data: countsNeg,
          },
          {
            name: 'Positivo',
            type: 'line',
            stack: 'Total amount',
            areaStyle: { normal: { opacity: echarts.areaOpacity } },
            data: countsPos,
          }
        ],
      };
    });
  }

  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }
}
