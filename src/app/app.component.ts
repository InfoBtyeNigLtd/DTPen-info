import { AfterContentChecked, ChangeDetectorRef, Component, DoCheck, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { ShowTabService } from './service/show-tab.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {


  isShowTab: boolean = false;

  constructor(
    private router: Router,
    private showTabService: ShowTabService,
    private ref: ChangeDetectorRef,

  ) { }

  ngOnInit(): void {
    this.showTabService.isUserLoggedIn.subscribe((data: any) => {
      // console.log('showtab data', data);
      if (data === true) {
        this.isShowTab = true;
      }
    })
    // console.log('here are we');
    
    this.verifyLogin()
  }

  //local storage
  /**change the localStorage to sessionStorage if you want session storage
   * localStirage.removeItem;
  */
  memoryData: any = sessionStorage.getItem('userData');

  verifyLogin() {
    if (this.memoryData === undefined || this.memoryData === null) {
      setTimeout(() => {
        this.router.navigate(['/']);
      }, 500);
    } else {
      this.isShowTab = true;
      // window.location.reload();
    }
  }
}
