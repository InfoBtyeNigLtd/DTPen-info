import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { VerifyLoginService } from 'src/app/service/verify-login.service';

@Component({
  selector: 'app-announcement-details',
  templateUrl: './announcement-details.page.html',
  styleUrls: ['./announcement-details.page.scss'],
})
export class AnnouncementDetailsPage implements OnInit {

  announcementData: any = [];
  private annoucementPostId:any;
  posterImage: string = "../assets/imgs/support.jpg";



    constructor(
    private verifyLoginService: VerifyLoginService,
    private navCtrl: NavController,
    private router: Router,
    private activatedRoute: ActivatedRoute,


    ) { 
      this.activatedRoute.params.subscribe(param => {
        this.announcementData = JSON.parse(param['announcementDetails']);
        this.annoucementPostId = param['annoucementPostId'];
        console.log('incoming data',param);
  
      });
    }

  ngOnInit() {
    this.verifyLogin();
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
 
     }
   }


}
