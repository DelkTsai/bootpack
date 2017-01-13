// APP CONFIG
let config = require('../../../config/client');

// ANGULAR MODULES
import { Component, ViewEncapsulation } from '@angular/core';
import { Logger } from 'angular2-logger/core';

@Component({
  selector: config.namespace,
  templateUrl: 'default.component.pug',
  styleUrls: ['default.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class DefaultComponent {

  constructor (
    private logger: Logger
  ){}

  ngOnInit() {}

}
