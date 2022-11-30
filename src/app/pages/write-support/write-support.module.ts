import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WriteSupportPageRoutingModule } from './write-support-routing.module';

import { WriteSupportPage } from './write-support.page';

import { MatCardModule } from '@angular/material/card';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MatCardModule,
    HttpClientModule,
    WriteSupportPageRoutingModule
  ],
  declarations: [WriteSupportPage]
})
export class WriteSupportPageModule {}
