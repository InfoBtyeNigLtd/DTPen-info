import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { AlertServiceService } from 'src/app/service/alert-service.service';

@Component({
  selector: 'app-status',
  templateUrl: './status.page.html',
  styleUrls: ['./status.page.scss'],
})
export class StatusPage implements OnInit {

  public userName!: string | undefined;
  computerNo: any;
  qAnswer: string = '';

  constructor(
    private navCtrl: NavController,
    private router: Router,
    private http: HttpClient,
    private alertService: AlertServiceService,
    
  ) { }

  ngOnInit() {
    this.verifyLogin();
  }

  goBack() {
    this.navCtrl.back();
  }

  public realQuestions: any = [
    {id: 1, question: 'Hello!, Welcome'},
    {id: 2, question: 'Click on any of the question below to get your updates'},
    {id: 3, question: 'Application Status?'},
    {id: 4, question: 'Accrued right?'},
    {id: 5, question: 'Total Contribution?'},
    {id: 6, question: 'When is my Payment Schedule?'},
    {id: 7, question: 'Send message to helpdesk center'}
  ];

  public selectedQuestion(id: number) {
    // console.log('clicked no', id);
    switch(id){
      case 3:  this.newGetUserAnswers('A'); break;
      case 4:  this.newGetUserAnswers('B'); break;
      case 5:  this.newGetUserAnswers('C'); break;
      case 6:  this.newGetUserAnswers('D'); break;
      default: this.showAnswer("Please click on any question"); break;
    }
    
  }

  newGetUserAnswers(questionId: any){
    this.alertService.showLoading();
    this.http.get(`http://app.deltastatepensionsbureau.com/IBHelpDeskWebAPI/api/Members/${this.computerNo}/${questionId}`, {headers: {'Content-type':'application/json'}}).subscribe({
      next: (data: any)=>{
      },
      error: (data: any)=>{
        /** We are getting the answer as error or return as error so take note */
        const returnData = JSON.parse(JSON.stringify(data));
        this.showAnswer(returnData?.error?.text);
      }
    })
  }

  public showAnswer(answer: string,) {
    this.qAnswer = answer;
    this.alertService.loadingScreen?.dismiss();
    this.alertService.presentAlert('Notification', this.qAnswer)
    
  }

  navigateToSupport() {
    this.router.navigate(['/support']);
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
        this.userName = this.memoryData?.fullname;
        console.log(this.realQuestions);
        
       this.computerNo = this.memoryData?.computerNo;
       // this.memberId = this.memoryData?.memberId;
     }
   }

}
