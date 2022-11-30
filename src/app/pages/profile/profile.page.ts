import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController, NavController } from '@ionic/angular';
import { AlertServiceService } from 'src/app/service/alert-service.service';
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

  isDelete: boolean = false;

  APIEndPoint1 = environment.memberAPI;

  handlerMessage = '';
  roleMessage = '';


  constructor(
    private router: Router,
    private alertController: AlertController,
    private http: HttpClient,
    private loadingCtrl: LoadingController,
    private alertService: AlertServiceService,
    private navCtrl: NavController,


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
    this.alertService.showLoading();
    this.memoryData = JSON.parse(this.memoryData);
    this.memoryData?.fullname;
    this.computerNo = this.memoryData?.computerNo;
    this.memberId = this.memoryData?.memberId;

    this.http.get(`${this.APIEndPoint1}${this.memberId}`, {}).subscribe({
      next: data => {
        // console.log('success data', data);
        
        this.result = data;
        this.alertService.loadingScreen?.dismiss();
        const result: any = data;
        this.surname = result.surname;
        this.otherNames = result.firstName + " " + result.middleName
        this.pfaCode = result.pfaCode;
        this.pinNo = result.pinNo;

      },
      error: data => {
        setTimeout(() => {
          // console.log('error data', data);
          
          this.alertService.loadingScreen?.dismiss().then(() => { this.alertService.presentAlert('OOPS!!!', 'Poor Network Detected'); });
        }, 1000);

      }

    });

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
         this.alertService.showLoading();
         setTimeout(() => {
           this.alertService.loadingScreen?.dismiss().then(() => {
           });
           this.logout();
          //  this.router.navigate(['/login']);
         }, 5000);

      },
      error: data => {
        console.log('something went wrong', data);
        this.alertService.loadingScreen?.dismiss();
        // show error Message
        this.alertService.presentAlert('Oops!', data.error);
        setTimeout(() => {
          this.alertService.loadingScreen?.dismiss().then(() => {
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

goBack() {
  this.navCtrl.back();
}

}
