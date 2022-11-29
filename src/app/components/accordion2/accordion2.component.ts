import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-accordion2',
  templateUrl: './accordion2.component.html',
  styleUrls: ['./accordion2.component.scss'],
})
export class Accordion2Component implements OnInit {

  @Input('product') product: any;
  constructor() { }

  ngOnInit() {}

}
