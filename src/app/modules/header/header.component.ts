import { Component, OnInit } from '@angular/core';

import { Router,ActivatedRoute } from "@angular/router";
import { StorageSessionService } from '../../service/storage-session.service';
import { ConfigServiceService } from '../../service/config-service.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  options:any=[];
  showprofilebtn:boolean=true;
  public userName:string = '';
  public agency:string = '';
  public index:any;
  constructor( private StorageSessionService:StorageSessionService,
     private route: ActivatedRoute, private router: Router) {
    this.userName = this.StorageSessionService.getSession('email');
    this.agency = this.StorageSessionService.getSession('agency');
     this.index = this.userName.indexOf('@');
     this.userName = this.userName.substring(0,this.index).toUpperCase();
    if(this.userName == undefined){
      this.router.navigate(['']);
    }
  }
  switchprofile(){
    this.router.navigate(['Profile']);
  }
  ngOnInit() {
    this.options=this.StorageSessionService.getLocalS("profileopt");
    if(this.options)this.options.length==0 ? this.showprofilebtn=false:this.showprofilebtn=true;

  }

  logout(){
  // this.cookieService.removeAll();
  this.StorageSessionService.ClearSession("email");
  this.StorageSessionService.ClearSession("agency");

   this.router.navigate(['']);
  }

}
