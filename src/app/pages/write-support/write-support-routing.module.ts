import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WriteSupportPage } from './write-support.page';

const routes: Routes = [
  {
    path: '',
    component: WriteSupportPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WriteSupportPageRoutingModule {}
