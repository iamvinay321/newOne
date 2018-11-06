import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-useradminnav',
  templateUrl: './useradminnav.component.html',
  styleUrls: ['./useradminnav.component.css']
})
export class UseradminnavComponent implements OnInit {
  isCollapsed:boolean;
  isNavbarCollapsed = true;
  constructor() { 
    this.isCollapsed=true;
  }

  ngOnInit() {
  }

}
