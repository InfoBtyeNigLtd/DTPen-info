import { HttpClient } from '@angular/common/http';
import { AfterContentChecked, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { AlertServiceService } from 'src/app/service/alert-service.service';
import { ShowTabService } from 'src/app/service/show-tab.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})

export class WelcomePage implements OnInit, AfterContentChecked {




  constructor(private router: Router,
    private alertController: AlertController,
    private loadingCtrl: LoadingController,
    private http: HttpClient,
    private alertService: AlertServiceService,
    private ref: ChangeDetectorRef,
    private showTabService: ShowTabService


  ) { }



  ngOnInit() {

  }

  ngAfterContentChecked(): void {
    this.ref.detectChanges();
  }

  goToSignup() {
    this.router.navigate(['/signup']);
  }

  public password: any;
  public computerNo: any;
  public username: any;
  public email: any;


  APIEndPoint1 = environment.memberAPI;
  private reactivateAPI = environment.reactivateAPI;

  isLogin: boolean = true;
  isLogout: boolean = true;

  reactivation: boolean = false;

  userStatus: string = 'inactive';

  signin: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [Validators.required, Validators.min(3)])
  });

  hide = true;


  //email Input === computer Number
  get emailInput() { return this.signin.get('email'); }
  get passwordInput() { return this.signin.get('password'); }

  setStatus(value: string) {
    sessionStorage.setItem('userStatus', value);
  }
  getStatus(): any {
    return sessionStorage.getItem('userStatus');
  }


  updatePassword(value: any) {
    this.password = value.target.value;
    console.log(this.password);

  }

  updateUserName(value: any) {
    this.username = value.target.value;
    console.log(this.username);

  }

  updateEmail(value: any) {
    this.email = value.target.value;
    console.log(this.email);

  }

  validateInput() {
    if (this.email === '' && this.email === undefined && this.password === '' && this.password === undefined) {
      this.alertService.presentAlert('Error!!!', 'All fields are required');
    }
    else {
      this.alertService.showLoading();

      this.http.post(`${this.APIEndPoint1}${this.email}/${this.password}`, {}

      ).subscribe({
        next: data => {
          // console.log('success',data);

          sessionStorage.setItem('userData', JSON.stringify(data));
          this.alertService.loadingScreen?.dismiss();
          setTimeout(() => {
            this.alertService.loadingScreen?.dismiss().then(() => {
              this.setStatus('active');
              this.showTabService.isUserLoggedIn.next(true);
              this.gotoDashboard();
            });
          }, 1000);

        },
        error: data => {
          console.log('error', data.error);
          const errorMessage = data.error;

          if (errorMessage === 'Account not yet Activated or Deactivated by user.') {
            // console.log('Deactivated account');
            this.reactivation = true;
            this.isLogin = false;

          } else {
            // console.log('Wrong details');
          }
          setTimeout(() => {
            this.alertService.loadingScreen?.dismiss().then(() => { this.alertService.presentAlert('Oops', `${data.error}`); });
          }, 1000);

        }
      });
    }
  }


  gotoDashboard() {
    setTimeout(() => {
      this.router.navigate(['home']);
    }, 500);
  }

  reactivateUser() {
    this.alertService.showLoading();

    this.http.post(this.reactivateAPI,
      {
        "email": this.email,
        "username": this.username,
        "password": this.password,
        "rememberMe": true
      }
    ).subscribe({
      next: data => {
        console.log('reacivation message', data);

        setTimeout(() => {
          let response = Object.values(data);
          // console.log(response);
          this.alertService.loadingScreen?.dismiss().then(() => { this.alertService.presentAlert('Account Reactivated', `${response[6]}`); });

        }, 2000);

        this.reactivation = false;
        this.isLogin = true;

      },
      error: data => {
        console.log('error', data);
        setTimeout(() => {
          this.alertService.loadingScreen?.dismiss().then(() => { this.alertService.presentAlert('Oops', `Username: ${data.error.error}`); });
        }, 1000);
      }
    });
  }

}
