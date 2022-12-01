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
  
  constructor(private router: Router,
    private verifyLoginService: VerifyLoginService
    ) { }

  ngOnInit() {
    this.verifyLoginService.verifyLogin();
    this.userName =this.verifyLoginService.userName;
  }

  userName!: string;

  gridContent = [
    {
      title: 'Profile',
      subTitle: 'checkout your details',
      color: '#965dec',
      url: 'profile'
    },
    {
      title: 'Support',
      subTitle: 'upadted news portal',
      color: '#f85c33',
      url: 'support'
    },
    {
      title: 'Status',
      subTitle: 'know your status',
      color: '#5ba8f8',
      url: 'status'
    },
    {
      title: 'FAQ',
      subTitle: 'Frequently Asked Questions',
      color: '#5f75ed',
      url: 'faq'
    },
  ];


  goToPage(url:any) {
    this.router.navigate([url])
  }

  gotoAnnoucement(){
    console.log('clicked');
    this.router.navigate(['/announcement'])
  }
  
}
