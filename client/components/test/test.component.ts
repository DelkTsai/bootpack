// APP CONFIG
let config = require('../../../config/client');

// ANGULAR MODULES
import { Component, ViewEncapsulation } from '@angular/core';
import { Logger } from 'angular2-logger/core';

// SERVICES
import { TestService }  from '../../shared/services/test.service';

@Component({
  selector: config.namespace,
  templateUrl: 'test.component.pug',
  styleUrls: ['test.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class TestComponent {

  constructor (
    private logger: Logger,
    private test : TestService
  ){}

  ngOnInit() {
    this.test.get().subscribe( (response: any) => {
      this.logger.log('test socket ok: ', response);
    });
  }

}
