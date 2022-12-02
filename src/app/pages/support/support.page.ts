import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { AlertServiceService } from 'src/app/service/alert-service.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-support',
  templateUrl: './support.page.html',
  styleUrls: ['./support.page.scss'],
})
export class SupportPage implements OnInit {

  posterImage: string = "../assets/imgs/support.jpg";
  responseData: any = [];
  private apiEndPoit2 = environment.supportAPI;
  computerNo: any;
  plusConversations: boolean = false;


  constructor(
    private navCtrl: NavController,
    private router: Router,
    private http: HttpClient,
    private alertService: AlertServiceService,


  ) {  }

  ngOnInit() {
    this.verifyLogin();

    /**for inifit loading of data */
    // for (let i = 1; i < this.responseData.lenght - 1 ; i++) {
    //   this.responseData.push(`responseData ${i}`);
    // }
  }

  goBack() {
    this.navCtrl.back();
  }

  handleRefresh(event:any) {
    setTimeout(() => {
      // Any calls to load data go here
      this.getSupportMessage();
      event.target.complete();
    }, 2000);
  };

  routeToDetails(computerNo:any, tkCatId:any, ticketId:any){
    if (computerNo !== undefined && tkCatId !== undefined) {
      this.router.navigate(['/support-details', {computerNo: computerNo, tkCatId: tkCatId, ticketId: ticketId}])
    }else {

    }
  }

  getSupportMessage() {
    this.alertService.showLoading();
    this.http.get(`${this.apiEndPoit2}${this.computerNo}/0/${this.plusConversations}`, { }).subscribe({
      next: (data:any) => {
        this.responseData = data.reverse();
        console.log('sent url',`${this.apiEndPoit2}${this.computerNo}/0/${this.plusConversations}`);
        console.log(this.responseData, data);

        this.alertService.loadingScreen?.dismiss();
      },
      error: data => {
        console.log(data);
        
        setTimeout(() => {
          this.alertService.loadingScreen?.dismiss().then(() => { this.alertService.presentAlert('Oops!!!', 'Ensure you have a steady Network'); });
  
        }, 1000);
  
      }
    });
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
       this.getSupportMessage();
     }
   }

   swtichActivePage(page:any){
    if (page === 'new-message') {
      this.router.navigate(['/write-support']);
    }
  }

}
