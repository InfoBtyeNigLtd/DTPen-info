import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SupportDetailsPageRoutingModule } from './support-details-routing.module';

import { SupportDetailsPage } from './support-details.page';
import { MatCardModule } from '@angular/material/card';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MatCardModule,
    HttpClientModule,
    SupportDetailsPageRoutingModule
  ],
  declarations: [SupportDetailsPage]
})
export class SupportDetailsPageModule {}
