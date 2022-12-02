import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ShowTabService {

  public isUserLoggedIn: Subject<any> = new Subject();


  constructor() {
    this.isUserLoggedIn.next(false);
   }
}
