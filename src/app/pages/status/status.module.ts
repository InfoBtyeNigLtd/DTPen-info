import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StatusPageRoutingModule } from './status-routing.module';

import { StatusPage } from './status.page';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MatCardModule,
    HttpClientModule,
    StatusPageRoutingModule
  ],
  declarations: [StatusPage]
})
export class StatusPageModule {}
