import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { FaqService } from 'src/app/service/faq.service';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.page.html',
  styleUrls: ['./faq.page.scss'],
})
export class FaqPage implements OnInit {

  features:any = [];
  automaticClose = false;


  constructor(private navCtrl: NavController,
    private faq: FaqService,
    ) {
      this.features = this.faq.features;
     }

  ngOnInit() {
  }

  goBack() {
    this.navCtrl.back();
}

toggleSection(index: any) {
  this.features[index].open = !this.features[index].open;
  if (this.automaticClose && this.features[index].open) {
      this.features.filter((item: any, itemIndex: any) => itemIndex != index).map((item:any) => item.open = false);
  }
}

}
