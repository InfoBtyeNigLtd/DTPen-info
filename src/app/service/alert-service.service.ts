import { Injectable } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AlertServiceService {


  loadingScreen!: HTMLIonLoadingElement;

  constructor(
    private alertController: AlertController,
    private loadingCtrl: LoadingController,
  ) { }

/** 'title', 'message' supplied to show alert mwssage
* @param header 
* @param subHeader
*/
  async presentAlert(header: any, message: any) {
    const alert = await this.alertController.create({
      header: header,
      // subHeader: header,
      message: message,
      // buttons: ['OK'],
    });

    return await alert.present();

    const { role } = await alert.onDidDismiss();
  }

  /**for loading effect */
  async showLoading() {
    this.loadingScreen = await this.loadingCtrl.create({
      message: 'Loading...',
      // duration: 3000,
      spinner: 'circles',
    });

    return await this.loadingScreen.present();

  }

}
