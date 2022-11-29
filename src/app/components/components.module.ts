import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Accordion1Component } from './accordion1/accordion1.component';
import { Accordion2Component } from './accordion2/accordion2.component';
import { IonicModule } from '@ionic/angular';

const components = [
  Accordion1Component,
  Accordion2Component
];

@NgModule({
  declarations: [
    components
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports:[
    ...components
  ]
})
export class ComponentsModule { }
