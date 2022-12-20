import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { AlertServiceService } from 'src/app/service/alert-service.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  public name!: string;
  public username!: string;
  public computerNo!: string;
  public email!: string;
  public password!: string;
  public rPassword!: string;
  canRegister: boolean = false;

  private apiEndPoit = environment.signupAPI;
  private signUpAPI = environment.fullSignUpAPI;

  hide = true;


  constructor(
    private navCtrl: NavController,
    private router: Router,
    private alertService: AlertServiceService,
    private http: HttpClient,


  ) { }

  ngOnInit() {
  }

  goBack() {
    this.navCtrl.back();
  }
  
  signup: FormGroup = new FormGroup({
    // computerNo: new FormControl('', [Validators.required, Validators.required]),
    computerNo: new FormControl('', [Validators.email, Validators.required]),
    username: new FormControl('', [Validators.required, Validators.required]),
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [Validators.required, Validators.min(3)]),
    rPassword: new FormControl('', [Validators.required, Validators.min(3)])


  });

  updateComputerNo(value: any) {
    this.computerNo = value.target.value;
    this.isValidUser();
  }
  updateUserName(value: any) {
    this.username = value.target.value;
  }
  updateEmail(value: any) {
    this.email = value.target.value;
  }
  updatePassword(value: any) {
    this.password = value.target.value;
  }
  updateRepeatPassword(value: any) {
    this.rPassword = value.target.value;
  }

  validatepassword() {
    if (this.password === this.rPassword) {
      //  this.validateInput();
    } else {
      this.alertService.presentAlert('Oops', "Password and Repeat Password doesn't Match");
    }
    return false;
  }

  goToLogin() {
    setTimeout(() => {
      this.router.navigate(['/']);
    }, 500);
  }
  // this.name == '' || this.name == undefined || this.name === null ||
  validateInput() {
    if (this.computerNo === '' || this.computerNo === undefined || this.computerNo === null ||
      this.username === '' || this.username === undefined || this.username === null ||
      this.email === '' || this.email === undefined || this.email === null) {
      this.alertService.presentAlert('Error', 'All fields are required');
    }
    else {
      this.alertService.showLoading();

      // https://app.deltastatepensionsbureau.com/IBHelpDeskWebAPI/api/Members/GetMemberByComputerNo?id=10000377 //all retiree detalils
      // https://app.deltastatepensionsbureau.com/IBHelpDeskWebAPI/api/Members/GetMemberFullname?ComputerNo=10000377 //only the name
      // memberAPI: 'http://app.deltastatepensionsbureau.com/IBHelpDeskWebAPI/api/Members/',

      this.http.post(this.signUpAPI,
        {
          "email": this.email,
          "password": this.password,
          "username": this.username,
          "computerNo": this.computerNo
        }
      ).subscribe({
        next: (data: any) => {
          console.log('data for reg', data);

          setTimeout(() => {
            let response = Object.values(data);
            console.log(response);
            // this.name = numbers[3]+ ' ' + numbers[4] + ' '+ numbers[5];
            this.alertService.loadingScreen?.dismiss().then(() => { this.alertService.presentAlert('Success', `${response}`); });

          }, 1000);
          this.router.navigate(['/']);

        },
        error: (data: any) => {
          console.log('error', data);
          setTimeout(() => {
            this.alertService.loadingScreen?.dismiss().then(() => { this.alertService.presentAlert('Oops', `Username: ${data.error.error}`); });
          }, 1000);
        }
      });
    }
  }

  isValidUser() {
    this.http.get(`${this.apiEndPoit}${this.computerNo}`, {}).subscribe({
      next: data => {
        // this.loadingModal('user Found.');
        // console.log('success',data);
        let numbers = Object.values(data);
        this.name = numbers[3] + ' ' + numbers[4] + ' ' + numbers[5];
        this.canRegister = true;
        this.alertService.loadingScreen?.dismiss();
        setTimeout(() => {
          this.alertService.loadingScreen?.dismiss().then(() => { this.alertService.presentAlert('User Found', `${this.name}`); });
        }, 1000);

      },
      error: data => {

        // this.loadingModal('User Not Found...');
        console.log('error', data);
        this.alertService.presentAlert('Oops', `User ${data.error.title}`);

        // console.log('error text', data.error.title);
        this.name = data.error.text;
        if (this.name == undefined) {
          setTimeout(() => {
            this.alertService.loadingScreen?.dismiss().then(() => { this.alertService.presentAlert('Oops', `User ${data.error.title}`); });
          }, 1000);

        } else {
          setTimeout(() => {
            this.canRegister = true;
            this.alertService.loadingScreen?.dismiss().then(() => { this.alertService.presentAlert('User Found', `${data.error.text}`); });
            this.name = data.error.text;
          }, 1000);
          this.alertService.loadingScreen?.dismiss();
        }

        const errorMessage = data.error;

        if (errorMessage === 'Account not yet Activated or Deactivated by user.') {
          // console.log('Deactivated account');

        } else {
          // console.log('Wrong details');
        }

      }
    });
  }

}
