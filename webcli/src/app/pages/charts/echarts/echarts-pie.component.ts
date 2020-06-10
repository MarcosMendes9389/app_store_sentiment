import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { GeneralService } from '../../../@core/services/general.service';
import { Review } from '../../../@core/models/review';
import { Application } from '../../../@core/models/application';

@Component({
  selector: 'ngx-echarts-pie',
  template: `
    <div echarts [options]="options" class="echart"></div>
  `,
})
export class EchartsPieComponent implements AfterViewInit, OnDestroy {
  options: any = {};
  themeSubscription: any;
  reviews: Review[] = [];
  applications: Application[] = [];

  constructor(private theme: NbThemeService,
    private servicegeneral : GeneralService,) {
  }

  ngAfterViewInit() {
    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {

      const colors = config.variables;
      const echarts: any = config.variables.echarts;

      this.servicegeneral.listReviews().subscribe(result => {
      this.reviews = result;

      let listPositivos = this.reviews.filter(review => review.classification === "Positivo");
      let listNegativos = this.reviews.filter(review => review.classification === "Negativo");

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
              { value: listPositivos.length, name: 'Positivo' },
              { value: listNegativos.length, name: 'Negativo' },
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

      
    });
  }

  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }
}
