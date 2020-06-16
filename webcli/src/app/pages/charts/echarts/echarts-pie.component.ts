import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { GeneralService } from '../../../@core/services/general.service';
import { Application } from '../../../@core/models/application';

@Component({
  selector: 'ngx-echarts-pie',
  templateUrl: './echarts-pie.component.html',
})
export class EchartsPieComponent implements AfterViewInit, OnDestroy {
  options: any = {};
  themeSubscription: any;
  apps: Application[] = [];
  selectedApp: Application;
  listPositivos: any[] = [];
  listNegativos: any[] = [];

  constructor(private theme: NbThemeService,
    private servicegeneral : GeneralService,) {
  }

  ngAfterViewInit() {
      this.servicegeneral.listApps().subscribe(apps => {
        this.apps = apps;
        this.servicegeneral.listRankingAppClassificationPositivo().subscribe(resultPos => {
          this.servicegeneral.listRankingAppClassificationNegativo().subscribe(resultNeg => {
            this.apps.forEach(app => {
              let elemPos = resultPos.find(element => element._id.app === app.id);
              let totalPos: number;
              if(elemPos) totalPos = elemPos.count;
              else totalPos = 0;
              let elemNeg = resultNeg.find(element => element._id.app === app.id);
              let totalNeg: number ;
              if(elemNeg) totalNeg = elemNeg.count;
              else totalNeg = 0;
              this.listPositivos.push({app: app.id, qty: totalPos});
              this.listNegativos.push({app: app.id, qty: totalNeg});
          });  
          this.selectedApp = apps[0];
          this.rederizeChart();
        });  
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

        const colors = config.variables;
        const echarts: any = config.variables.echarts;

        this.options = {
          backgroundColor: echarts.bg,
          color: [colors.warningLight, colors.infoLight, colors.dangerLight, colors.successLight, colors.primaryLight],
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)',
          },
          legend: {
            orient: 'vertical',
            left: 'left',
            data: ['Positivo', 'Negativo'],
            textStyle: {
              color: echarts.textColor,
            },
          },
          series: [
            {
              name: 'Classificação',
              type: 'pie',
              radius: '80%',
              center: ['50%', '50%'],
              data: [
                { value: this.listNegativos.find(obj => obj.app === this.selectedApp.id ).qty, name: 'Negativo' },
                { value: this.listPositivos.find(obj => obj.app === this.selectedApp.id ).qty , name: 'Positivo' },
              ],
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: echarts.itemHoverShadowColor,
                },
              },
              label: {
                normal: {
                  textStyle: {
                    color: echarts.textColor,
                  },
                },
              },
              labelLine: {
                normal: {
                  lineStyle: {
                    color: echarts.axisLineColor,
                  },
                },
              },
            },
          ],
        };
      });  
  }

  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }
}
