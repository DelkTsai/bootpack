// ANGULAR MODULES
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Logger } from 'angular2-logger/core';

// SERVICES
import { WebSocketService } from './websocket.service';

// INJECTION
@Injectable()

// SERVICE EXPORT
export class TestService {

  // VARIABLES
  private uri = 'test';
  config: any;

  // CONSTRUCTOR
  constructor(
    private ws: WebSocketService
  ) {}

  get() {

    let observable = new Observable(observer => {
      this.ws.get(this.uri).subscribe( (response:any) => {
        observer.next(response);
      });
    });
    return observable;
  }

}
