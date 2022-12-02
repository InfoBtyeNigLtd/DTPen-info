import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController, NavController } from '@ionic/angular';
import { AlertServiceService } from 'src/app/service/alert-service.service';
import { VerifyLoginService } from 'src/app/service/verify-login.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-announcement',
  templateUrl: './announcement.page.html',
  styleUrls: ['./announcement.page.scss'],
})
export class AnnouncementPage implements OnInit {

  userName!: string;
  private apiLink = environment.annoucementAPI;

  posterImage: string = "../assets/imgs/support.jpg";

  annoucementPostId: any;
  announcementDetails: any;

  constructor(private router: Router,
    private verifyLoginService: VerifyLoginService,
    private navCtrl: NavController,
    private http: HttpClient,
    private alertService: AlertServiceService
  ) { }

  ngOnInit() {
    this.verifyLogin();
    this.getAnnouncement();
  }

  goBack() {
    this.navCtrl.back();
  }

  annoucements: any = []
  // loadingScreen!: HTMLIonLoadingElement;


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

    }
  }



  getAnnouncement() {
    this.alertService.showLoading();
    this.http.get(`${this.apiLink}`, {}).subscribe({
      next: (data:any) => {
        this.annoucements = data.reverse();
        console.log('announcement', data);

        this.alertService.loadingScreen?.dismiss();
      },
      error: data => {
        setTimeout(() => {
          this.alertService.loadingScreen?.dismiss().then(() => { this.alertService.presentAlert('Oops!!!', 'Ensure you have a good network'); });
        }, 1000);
      }

    });
  }

  swtichActivePage(page: any, postId = 0) {
    if (page === 'annoucements-details') {
      let clickedData = this.annoucements.filter((user:any) => { return user.postId == postId });
      this.annoucementPostId = postId;
      this.announcementDetails = clickedData;
      console.log(this.announcementDetails);
      
      this.router.navigate(['/announcement-details',{annoucementPostId: this.annoucementPostId, announcementDetails:JSON.stringify(this.announcementDetails)}])

    }
    else {
     
    }
  }

  handleRefresh(event:any) {
    setTimeout(() => {
      // Any calls to load data go here
      this.getAnnouncement();
      event.target.complete();
    }, 2000);
  };

}
