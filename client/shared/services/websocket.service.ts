// APP CONFIG
let config = require('../../../config/client');

// IMPORTS
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';

// INJECTION
@Injectable()

// SERVICE EXPORT
export class WebSocketService {

  // VARIABLES
  private location = window.location;
  private host: string = location.protocol + '//' + location.hostname + ':' + location.port + '/' + config.namespace;
  private socket;
  public connected = false;


  // ~~~~~~~~~~~~~~~~~
  // SERVICE FUNCTIONS
  // ~~~~~~~~~~~~~~~~~

  // CONNECT TO SOCKET
  connect() {

    this.socket = io(this.host);

    let observable = new Observable(observer => {
      this.socket.on('connected', (data) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });
    return observable;
  }

  // DISCONNECT FROM SOCKET
  disconnect(uri) {
    this.socket.disconnect(uri);
  }

  // SEND DATA TO SOCKET
  update (uri, data) {
    this.socket.emit(uri, data);

    let observable = new Observable(observer => {
      this.socket.on(uri, (data) => {
        observer.next(data);
      });

      return () => {
        this.socket.disconnect();
      };
    })
    return observable;
  }

  // GET DATA FROM SOCKET
  get (what, data?) {

    // IF DATA PARAMETER IS PASSED, ASSUME WE NEED TO EMIT THIS DATA TO THE SOCKET
    if (typeof data !== 'undefined') {
      this.socket.emit(what, data);
    } else {
      this.socket.emit(what);
    }

    let observable = new Observable(observer => {
      this.socket.on(what, (data) => {
        observer.next(data);
      });

      return () => {
        this.socket.disconnect();
      };
    })
    return observable;
  }

}
