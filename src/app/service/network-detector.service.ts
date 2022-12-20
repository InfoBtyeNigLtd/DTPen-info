import { Injectable } from '@angular/core';
import { Network } from '@capacitor/network';
import { PluginListenerHandle } from '@capacitor/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NetworkDetectorService {
  networkStatus: any;
  networkListener: PluginListenerHandle | undefined;

  public networkStrenght: Subject<any> = new Subject();


  constructor(  ) { 
    Network.addListener('networkStatusChange', status => {
      console.log('Network status changed', status);
      this.networkStrenght.next(status);
    });

    const logCurrentNetworkStatus = async () => {
      const status = await Network.getStatus();
    
      console.log('Network status:', status);
    };
  }

  testNetwork(){
    console.log('testing network');
    
    Network.addListener('networkStatusChange', status => {
      console.log('Network status changed', status);
      this.networkStrenght.next(status);
    });

    const logCurrentNetworkStatus = async () => {
      const status = await Network.getStatus();
    
      console.log('Network status:', status);
    };

  }

  ngOnInit() {
    this.networkListener = Network.addListener('networkStatusChange', (status) => {
      this.networkStatus = status;
      console.log('Network status changed', status);
    });
  }

  async getNetWorkStatus() {
    this.networkStatus = await Network.getStatus();
    console.log(this.networkStatus);
    this.networkStrenght.next(this.networkStatus)
  }

  endNetworkListener() {
    if (this.networkListener) {
      this.networkListener.remove();
    }
  }

}
