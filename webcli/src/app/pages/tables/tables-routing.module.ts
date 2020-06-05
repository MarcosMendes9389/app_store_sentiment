import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TablesComponent } from './tables.component';
import { ReviewComponent } from './review/review.component';
import { ApplicationComponent } from './application/application.component';

const routes: Routes = [{
  path: '',
  component: TablesComponent,
  children: [
    {
      path: 'review',
      component: ReviewComponent,
    },
    {
      path: 'application',
      component: ApplicationComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TablesRoutingModule { }

export const routedComponents = [
  TablesComponent,
  ReviewComponent,
  ApplicationComponent
];
