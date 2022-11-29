import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { VerifyLoginService } from 'src/app/service/verify-login.service';

@Component({
  selector: 'app-announcement',
  templateUrl: './announcement.page.html',
  styleUrls: ['./announcement.page.scss'],
})
export class AnnouncementPage implements OnInit {

userName!: string; 

  constructor(private router: Router,
    private verifyLoginService: VerifyLoginService,
    private navCtrl: NavController,) {
      
     }

  ngOnInit() {
    this.verifyLogin();
    this.annoucements = this.annoucementLoader();
  }

  annoucements: any = []


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
    
     //  this.getUserData();
     this.memoryData = JSON.parse(this.memoryData);
     this.userName= this.memoryData?.fullname;

    }
  }
  goBack() {
    this.navCtrl.back();
}

annoucementLoader(){

}

}
