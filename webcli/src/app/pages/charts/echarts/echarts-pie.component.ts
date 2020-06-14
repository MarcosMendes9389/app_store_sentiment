import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { GeneralService } from '../../../@core/services/general.service';
import { Review } from '../../../@core/models/review';
import { Application } from '../../../@core/models/application';

@Component({
  selector: 'ngx-echarts-pie',
  templateUrl: './echarts-pie.component.html',
})
export class EchartsPieComponent implements AfterViewInit, OnDestroy {
  options: any = {};
  themeSubscription: any;
  reviews: Review[] = [];
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
        this.servicegeneral.listReviews().subscribe(result => {
          this.reviews = result;
          this.apps.forEach(app => {
            this.listPositivos.push({app: app.id, qty: this.reviews.filter(review => review.appId === app.id && review.classification === 'Positivo').length});
            this.listNegativos.push({app: app.id, qty: this.reviews.filter(review => review.appId === app.id && review.classification === 'Negativo').length});
          });  
          this.selectedApp = apps[0];
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
