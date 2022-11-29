import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  pageTitle = "Update Profile";
  loading: boolean = false;
  dispatcherImageStatus: boolean = true;
  dispatcherEmail: string = "";
  dispatcherAddress: string = "";
  dispatcherMobile: string = "";

  surname: string = "";
  otherNames: string = "";
  memberId: any;
  computerNo: string = "";
  pfaCode: string = "";
  pinNo: string = "";
  gender: string = "";
  result: any;

  loadingScreen!: HTMLIonLoadingElement;
  isDelete: boolean = false;

  APIEndPoint1 = environment.memberAPI;

  handlerMessage = '';
  roleMessage = '';


  constructor(
    private router: Router,
    private alertController: AlertController,
    private http: HttpClient,
    private loadingCtrl: LoadingController,
  ) { }

  ngOnInit() {
    this.verifyLogin();
  }


    //local storage
  /**change the localStorage to sessionStorage if you want session storage
   * localStirage.removeItem;
  */
   memoryData: any = sessionStorage.getItem('userData');

   verifyLogin() {
     if (this.memoryData == undefined || this.memoryData == null) {
       setTimeout(() => {
         this.router.navigate(['/']);
       }, 500);
     } else {
     
       this.getUserData();
 
     }
   }

   getUserData() {
    this.showLoading();
    this.memoryData = JSON.parse(this.memoryData);
    this.memoryData?.fullname;
    this.computerNo = this.memoryData?.computerNo;
    this.memberId = this.memoryData?.memberId;

    this.http.get(`${this.APIEndPoint1}${this.memberId}`, {}).subscribe({
      next: data => {
        // console.log('success data', data);
        
        this.result = data;
        this.loadingScreen?.dismiss();
        const result: any = data;
        this.surname = result.surname;
        this.otherNames = result.firstName + " " + result.middleName
        this.pfaCode = result.pfaCode;
        this.pinNo = result.pinNo;

      },
      error: data => {
        setTimeout(() => {
          // console.log('error data', data);
          
          this.loadingScreen?.dismiss().then(() => { this.presentAlert('OOPS!!!', 'Poor Network Detected'); });
        }, 1000);

      }

    });

  }

  async presentAlert(header: any, message: any) {
    const alert = await this.alertController.create({
      header: 'Alert',
      subHeader: header,
      message: message,
      // buttons: ['OK'],
    });
  
    return await alert.present();
  
    const { role } = await alert.onDidDismiss();
  }

  async showLoading() {
    this.loadingScreen = await this.loadingCtrl.create({
      message: 'Loading...',
      // duration: 3000,
      spinner: 'circles',
    });
  
    return await this.loadingScreen.present();
    
  }


  async presentAlertDelete() {
    const alert = await this.alertController.create({
      header: 'Confirm Prompt!',
      message: 'Are you sure',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            this.handlerMessage = 'Alert canceled';
          },
        },
        {
          text: 'OK',
          role: 'confirm',
          handler: () => {
            this.handlerMessage = 'Alert confirmed';
          },
        },
      ],
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    this.roleMessage = `Dismissed with role: ${role}`;
  }

  properDelete(event: any){
    // console.log('computer number: ',event);

    this.http.post(`${this.APIEndPoint1}${this.computerNo}`, {}).subscribe({
      next: data => {
        // console.log('sent successfully', data);
         // show success Message
         this.showLoading();
         setTimeout(() => {
           this.loadingScreen?.dismiss().then(() => {
           });
           this.logout();
          //  this.router.navigate(['/login']);
         }, 5000);

      },
      error: data => {
        console.log('something went wrong', data);
        this.loadingScreen?.dismiss();
        // show error Message
        this.presentAlert('Oops!', data.error);
        setTimeout(() => {
          this.loadingScreen?.dismiss().then(() => {
          });
        }, 5000);
      }
    });

}

setStatus(value: string) {
  sessionStorage.setItem('userStatus', value);
}

logout() {
  sessionStorage.removeItem('userData');
  this.setStatus('inactive');
  this.router.navigate(['/login']);
  window.location.reload();
}

}
