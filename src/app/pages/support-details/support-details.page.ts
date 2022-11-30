import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { timeStamp } from 'console';
import { AlertServiceService } from 'src/app/service/alert-service.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-support-details',
  templateUrl: './support-details.page.html',
  styleUrls: ['./support-details.page.scss'],
})
export class SupportDetailsPage implements OnInit {

  private computerNo: any;
  private tkCatId: any;
  private ticketId: any;

  responseData: any = [];
  commentData: any = [];
  responseToQuestionsAsked: any;

  private apiEndPoit2 = environment.supportAPI;
  private apiEndPoit1 = environment.supportAPI3;


  constructor(
    private navCtrl: NavController,
    private router: Router,
    private http: HttpClient,
    private alertService: AlertServiceService,
    private activatedRoute: ActivatedRoute,

  ) {
    this.activatedRoute.params.subscribe(param => {
      this.computerNo = param['computerNo'];
      this.tkCatId = param['tkCatId'];
      this.ticketId = param['ticketId'];
      // console.log('incoming data',param);

    });
  }

  ngOnInit() {
    this.verifyLogin();
  }

  goBack() {
    this.navCtrl.back();
  }

  getClickedResponse() {
    this.alertService.showLoading();
    this.http.get(`${this.apiEndPoit2}${this.computerNo}/${this.ticketId}/true`, {}).subscribe({
      next: (data: any) => {
        this.responseData = data;
        this.commentData = data[0].conversationDTOs.slice();
        this.alertService.loadingScreen?.dismiss();
      },
      error: data => {
        console.log('erro data', data);
        this.alertService.loadingScreen?.dismiss();

      }
    });
    this.alertService.loadingScreen?.dismiss();
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
      this.getClickedResponse();
    }
  }

  handleRefresh(event: any) {
    setTimeout(() => {
      // Any calls to load data go here
      this.getComment();
      event.target.complete();
    }, 2000);
  }

  submit() {
    console.log(this.responseToQuestionsAsked);
    if (this.responseToQuestionsAsked != '' && this.responseToQuestionsAsked != undefined) {
    this.alertService.showLoading();
      this.http.post(this.apiEndPoit1, {
        "ticketId": this.ticketId,
        "response": this.responseToQuestionsAsked
      }).subscribe({
        next: data => {
          this.alertService.loadingScreen?.dismiss();
          this.handleRefresh(this.getComment())
          // this.getComment();
        },
        error: data => {
          this.alertService.loadingScreen?.dismiss();
        }
      });
    } else {
      // this.alertService.loadingScreen?.dismiss();
      this.alertService.presentAlert('Oops!', 'can not submit empty message')
    }

    this.responseToQuestionsAsked = '';
  }

  updateResponseToQuestionsAsked(event: any) {
    this.responseToQuestionsAsked = event.target.value;
  }

  getComment() {
    this.alertService.showLoading();
    this.http.get(`${this.apiEndPoit2}${this.computerNo}/${this.ticketId}/true`, {}).subscribe({
      next: (data: any) => {
        this.responseData = data;
        this.commentData = data[0].conversationDTOs.slice();
        this.alertService.loadingScreen?.dismiss();
      },
      error: data => {
        console.log('error from comment', data);

      }
    });
    this.alertService.loadingScreen?.dismiss();
  }

}
