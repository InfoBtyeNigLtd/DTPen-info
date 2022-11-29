import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { environment } from 'src/environments/environment';



@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})

export class WelcomePage implements OnInit {

  constructor(private router: Router,
    private alertController: AlertController,
    private loadingCtrl: LoadingController,
    private http: HttpClient,
    ) { }

  ngOnInit() {

    let lStatus = this.getStatus();

    if (lStatus === 'active') {

      this.isLogin = false;
      this.isLogout = true;
    } else {

      this.isLogin = true;
      this.isLogout = false;
    }

  }

  goToHome() {
    this.router.navigate(['/home']);
}


public password :any;
public computerNo: any;
loadingScreen!: HTMLIonLoadingElement;

APIEndPoint1 = environment.memberAPI;
private reactivateAPI = environment.reactivateAPI;

isLogin: boolean = false;
isLogout: boolean = true;

reactivation: boolean = false;

userStatus: string = 'inactive';

signin: FormGroup = new FormGroup({
  email: new FormControl('', [Validators.email, Validators.required ]),
  password: new FormControl('', [Validators.required, Validators.min(3) ])
});

hide = true;


//email Input === computer Number
get emailInput() { return this.signin.get('email'); }
get passwordInput() { return this.signin.get('password'); } 

/** two must be supplied to show mwssage
 * @param header 
 * @param subHeader
 */
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

updatePassword(value: any) {
  this.password = value.target.value;
  console.log(this.password);
  
}

updateEmail(value: any) {
  this.computerNo = value.target.value;
  console.log(this.computerNo);
  
}

validateInput(){
  if (this.computerNo === '' || this.computerNo === undefined || this.password === '' || this.password === undefined) {
    this.presentAlert('Oops!', 'All fields are required');
  }else{
    this.showLoading();

    this.http.post(`${this.APIEndPoint1}${this.computerNo}/${this.password}`, { }
    ).subscribe({
      next: data => {
        console.log('success', data);
        
        sessionStorage.setItem('userData', JSON.stringify(data));
        this.loadingScreen?.dismiss();
        this.presentAlert('User found', 'Login successfull');
        setTimeout(() => {
          this.loadingScreen?.dismiss().then(() => {
            this.setStatus('active');
            this.gotoDashboard();
          });
        }, 1000);
      },
      error: data => {
        console.log('login error', data.error);
        if (data.error === 'Account not yet Activated or Deactivated by user.') {
          // console.log('Deactivated account');
          this.reactivation = true;
          this.isLogin = false;

        } else {
          // console.log('Wrong details');
        }
        setTimeout(() => {
        this.presentAlert('OOPS!!!', `${data.error}`);

          this.loadingScreen?.dismiss().then(() => { this.presentAlert('OOPS!!!', `${data.error}`); });
        }, 1000);
        
      }
    });
  }
}

gotoDashboard() {
  setTimeout(() => {
    this.router.navigate(['/home']);
  }, 500);
}

getStatus(): any {
  return sessionStorage.getItem('userStatus');
}
setStatus(value: string) {
  sessionStorage.setItem('userStatus', value);
}

}
