import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { AlertServiceService } from 'src/app/service/alert-service.service';




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
    private alertService: AlertServiceService,

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
    this.alertService.presentAlert('Oops!', 'All fields are required');
  }else{
    this.alertService.showLoading();

    this.http.post(`${this.APIEndPoint1}${this.computerNo}/${this.password}`, { }
    ).subscribe({
      next: data => {
        console.log('success', data);
        
        sessionStorage.setItem('userData', JSON.stringify(data));
        this.alertService.loadingScreen?.dismiss();
        this.alertService.presentAlert('User found', 'Login successfull');
        setTimeout(() => {
          this.alertService.loadingScreen?.dismiss().then(() => {
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
        this.alertService.presentAlert('OOPS!!!', `${data.error}`);

          this.alertService.loadingScreen?.dismiss().then(() => { this.alertService.presentAlert('OOPS!!!', `${data.error}`); });
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
