import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { AlertServiceService } from 'src/app/service/alert-service.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-write-support',
  templateUrl: './write-support.page.html',
  styleUrls: ['./write-support.page.scss'],
})
export class WriteSupportPage implements OnInit {

  ticketCategoryApi: any;
  private apiEndPoit2 = environment.supportAPI;
  private apiEndPoint1 = environment.suppourtAPI4;

  public ticketCategoryId:any;
  public subject:any;
  public description:any;
  public status: any = 'new';
  public computerNo: any;

  
  constructor(
    private navCtrl: NavController,
    private http: HttpClient,
    private router: Router,
    private alertService: AlertServiceService,


  ) { }

  ngOnInit() {
    this.verifyLogin();
    this.getSupportCategory();
  }

  goBack() {
    this.navCtrl.back();
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
      this.memoryData = JSON.parse(this.memoryData);
      //  this.userName = this.memoryData?.fullname;
      this.computerNo = this.memoryData?.computerNo;
      // this.memberId = this.memoryData?.memberId;

    }
  }

  getSupportCategory() {
    this.http.get(`${this.apiEndPoint1}`, { }).subscribe({
      next: data => {
        const ticketCategory = data;
        this.ticketCategoryApi = ticketCategory;
        // this.alertService.loadingScreen?.dismiss().then(() => { this.alertService.presentAlert('Success!!!', 'Loaded Succefully'); });
      },

      error: data => {
      }
    });
  }

  updateTicketId(event: any) {
    this.ticketCategoryId = event.target.value;
    // console.log(this.ticketCategoryId);
    
  }
  updateSubject(event: any) {
    this.subject = event.target.value;
    // console.log(this.subject);
    
  }
  updateDescripton(event: any) {
    this.description =event.target.value;
    // console.log(this.description);
    
  }

  validateInput() {
    if (this.ticketCategoryId === '' || this.ticketCategoryId === undefined ||
      this.computerNo === '' || this.computerNo === undefined ||
      this.subject === '' || this.subject === undefined ||
      this.description === '' || this.description === undefined ||
      this.status === '' || this.status === undefined) {
      this.alertService.presentAlert('Error!!!', 'All fields are required');
    }
    else {
      this.alertService.showLoading();
      this.http.post(this.apiEndPoit2, {
        "ticketCategoryId": this.ticketCategoryId,
        "computerNo": this.computerNo,
        "subject": this.subject,
        "description": this.description,
        "status": this.status,
    }).subscribe({
        next: data => {
          this.alertService.loadingScreen?.dismiss().then(() => { this.alertService.presentAlert('Success', 'Message sent succefully'); });
          this.router.navigate(['/support']);
        },
        error: data => {
          setTimeout(() => {
            this.alertService.loadingScreen?.dismiss().then(() => { this.alertService.presentAlert('Oops', 'Something went wrong'); });
          }, 1000);

        }
      });
    }
  }

}
