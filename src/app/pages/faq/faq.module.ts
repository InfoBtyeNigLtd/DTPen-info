import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FaqPageRoutingModule } from './faq-routing.module';

import { FaqPage } from './faq.page';
import { ComponentsModule } from "../../components/components.module";

@NgModule({
    declarations: [FaqPage],
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        FaqPageRoutingModule,
        ComponentsModule
    ]
})
export class FaqPageModule {}
