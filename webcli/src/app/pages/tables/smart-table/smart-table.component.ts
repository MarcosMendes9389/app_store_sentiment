import { Component } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';

import { Review } from '../../../@core/models/review';
import { GeneralService } from '../../../@core/services/general.service';

@Component({
  selector: 'ngx-smart-table',
  templateUrl: './smart-table.component.html',
  styleUrls: ['./smart-table.component.scss'],
})
export class SmartTableComponent {

  //reviews
  reviews: Review[] = [];

  settings = {
    columns: {
      app: {
        title: 'Aplicativo',
        type: 'string',
      },
      text: {
        title: 'Comentário',
        type: 'string',
      },
      score: {
        title: 'Score',
        type: 'number',
      },
      store: {
        title: 'Loja',
        type: 'string',
      },
      classification: {
        title: 'Classificação',
        type: 'string', 
      },
    },
    actions : false,
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(
    private servicegeneral : GeneralService,) { }

  ngOnInit() {

    this.servicegeneral.listReviews().subscribe(result => {
      this.reviews = result;  
      this.source.load(this.reviews);

    });

  }

}
