import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class VerifyLoginService {

  constructor(private router: Router,) { }

  userName!:any;

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
}
