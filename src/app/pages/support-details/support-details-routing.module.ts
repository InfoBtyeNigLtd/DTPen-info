import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SupportDetailsPage } from './support-details.page';

const routes: Routes = [
  {
    path: '',
    component: SupportDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SupportDetailsPageRoutingModule {}
