import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonSlides } from '@ionic/angular';
import { VerifyLoginService } from 'src/app/service/verify-login.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  @ViewChild('mySlider', { static: false }) slider: IonSlides | undefined;
  loop: boolean = true;
  
  constructor(private router: Router,
    private verifyLoginService: VerifyLoginService
    ) { }

  ngOnInit() {
    this.verifyLoginService.verifyLogin();
    this.userName =this.verifyLoginService.userName;
  }

  userName!: string;
  avatarImage1: string = '/assets/imgs/simple-logo.png';
  avatarImage2: string = '/assets/imgs/banner2.jpg';
  avatarImage3: string = '/assets/imgs/banner3.jpg';


  gridContent = [
    {
      avatar: '/assets/imgs/Profile-details.png',
      title: 'Profile',
      subTitle: 'checkout your details',
      color: '#965dec',
      url: 'profile'
    },
    {
      avatar: '/assets/imgs/Code 200 – OK v1.png',
      title: 'Support',
      subTitle: 'Message helpdesk Center',
      color: '#f85c33',
      url: 'support'
    },
    {
      avatar: '/assets/imgs/Personal finance.png',
      title: 'Status',
      subTitle: 'know your status',
      color: '#5ba8f8',
      url: 'status'
    },
    {
      avatar: '/assets/imgs/FAQs.png',
      title: 'FAQ',
      subTitle: 'Frequently Asked Questions',
      color: '#5f75ed',
      url: 'faq'
    },
    // undraw_Questions_re_1fy7.png
  ];


  goToPage(url:any) {
    this.router.navigate([url])
  }

  gotoAnnoucement(){
    console.log('clicked');
    this.router.navigate(['/announcement'])
  }
  
}
