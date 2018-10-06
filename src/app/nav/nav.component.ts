import { Component, OnInit ,Input} from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  @Input()
  isForm: boolean;
  @Input()
  isList: boolean;
  @Input()
  isForm1: boolean;
  @Input()
  isList1: boolean;

  constructor() { }

  ngOnInit() {
  }

}
