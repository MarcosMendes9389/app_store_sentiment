import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { Application } from '../../../@core/models/application';
import { GeneralService } from '../../../@core/services/general.service';

@Component({
  selector: 'ngx-echarts-bar',
  templateUrl: './echarts-bar.component.html',
})
export class EchartsBarComponent implements AfterViewInit, OnDestroy {
  options: any = {};
  themeSubscription: any;
  dataPos: any[] = [];
  dataNeg: any[] = [];
  apps: Application[] = [];
  classifications = ['Positivo', 'Negativo'];
  selectedClassification: string;
  appsPosNamePercent: any[] = [];
  appsNegNamePercent: any[] = [];
  QTY_RANKING = 5;

  constructor(private theme: NbThemeService,
              private servicegeneral : GeneralService) {
  }

  ngAfterViewInit() {
    this.servicegeneral.listApps().subscribe(apps => {
      this.apps = apps;
      this.servicegeneral.listRankingAppClassificationPositivo().subscribe(resultPos => {
        this.dataPos = resultPos;
        this.servicegeneral.listRankingAppClassificationNegativo().subscribe(resultNeg => {
          this.dataNeg = resultNeg;
          this.apps.forEach(app => {
            let elemPos = this.dataPos.find(element => element._id.app === app.id);
            let totalPos: number;
            if(elemPos) totalPos = elemPos.count;
            else totalPos = 0;
            let elemNeg = this.dataNeg.find(element => element._id.app === app.id);
            let totalNeg: number ;
            if(elemNeg) totalNeg = elemNeg.count;
            else totalNeg = 0;

            if((totalPos + totalNeg) === 0){
              this.appsPosNamePercent.push({app: app.name + ' - ' + app.store, percent: 0 });
              this.appsNegNamePercent.push({app: app.name + ' - ' + app.store, percent: 0 });

            } else {
              this.appsPosNamePercent.push({app: app.name + ' - ' + app.store, percent: (totalPos / (totalPos + totalNeg)*100).toFixed(2) });
              this.appsNegNamePercent.push({app: app.name + ' - ' + app.store, percent: (totalNeg / (totalPos + totalNeg)*100).toFixed(2) });
            }
            this.appsPosNamePercent.sort((item1, item2) =>{
                        if(item1.percent > item2.percent) return -1;
                        return 1;
            });

            this.appsPosNamePercent = this.appsPosNamePercent.slice(0,this.QTY_RANKING);
            this.appsNegNamePercent.sort((item1, item2) =>{
                        if(item1.percent > item2.percent) return -1;
                        return 1;
            });
            this.appsNegNamePercent = this.appsNegNamePercent.slice(0,this.QTY_RANKING);

          });
          this.selectedClassification = this.classifications[0];
          this.rederizeChart();
        });
      });
    });
  }

  changeApp(classification) {
    if (this.selectedClassification !== classification) {
      this.selectedClassification = classification;
      this.rederizeChart();
    }
  }

  rederizeChart() {

    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {

      const colors: any = config.variables;
      const echarts: any = config.variables.echarts;

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
            data: this.selectedClassification === this.classifications[0] ? 
            this.appsPosNamePercent.map(item => item.app) : 
            this.appsNegNamePercent.map(item => item.app) ,
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
            data: this.selectedClassification === this.classifications[0] ? 
                                                  this.appsPosNamePercent.map(item => item.percent) : 
                                                  this.appsNegNamePercent.map(item => item.percent) 
          },
        ],
      };
    });
  }

  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }
}
