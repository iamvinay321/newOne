import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { HttpClient, HttpEvent, HttpEventType } from '@angular/common/http';

import { ToastrService } from 'ngx-toastr';
import { UseradminService } from '../../../service/useradmin.service';
import { StorageSessionService } from '../../../service/storage-session.service';
import { HostListener } from "@angular/core";

@Component({
  selector: 'app-authorizerole',
  templateUrl: './authorizerole.component.html',
  styleUrls: ['./authorizerole.component.css']
})
export class AuthorizeroleComponent implements OnInit {

   V_SRC_CD: string = this.StorageSessionService.getSession('agency');
  V_USR_NM: string = this.StorageSessionService.getSession('email');
  screenHeight=0;
  screenWidth=0;
  mobileView=false;
  desktopView=true;
  @HostListener('window:resize', ['$event'])
    onResize(event?) {
      this.screenHeight = window.innerHeight;
      this.screenWidth = window.innerWidth;
      if(this.screenWidth<=767)
      {
        this.mobileView=true;
        this.desktopView=false;
      }else{
        this.mobileView=false;
        this.desktopView=true;
      }
  }
  constructor(
    private toastr: ToastrService,
    private data: UseradminService,
    
    private http: HttpClient,
    private StorageSessionService: StorageSessionService
  ) {
    this.onResize();
    this.onpselect = function(index) {
      this.selectedauthtype = null;
      this.selectedauth = null;
      this.selectedrole = index; };
      this.onqselect = function(index) {
        this.selectedrole = index;
        this.selectedauth = null;
      };
      this.onrselect = function(index) {
        this.selectedauth = index;
      };
  }
  private apiUrlGet = 'https://enablement.us/rest/E_DB/SP?';
  private apiUrlPost = 'https://enablement.us/rest/E_DB/SP';

  roledesc: any;
  authdesc: any;
  application: any;
  role: string[] = [];
  progress = false;
  selectedrole = Number;
  selectedauth = Number;
  selectedauthtype = Number;
  onpselect: Function;
  onqselect: Function;
  onrselect: Function;
  Label: any[] = [];

  rol = [];
  authtype = [];
  authoriztion = [];
  authid: string[] = [];
  chararray = [5, 14, 23, 32, 42];
   arraycheckbox = [];




  ngOnInit() {
    this.data.getJSON().subscribe(data => {
      (data.json());
        this.Label = data.json();
         (this.Label);   });
	  this.getrole();
    this.getauthtype();

  }

  getrole() {
    this.progress = true;
    this.http.get<data>(this.apiUrlGet + 'V_SRC_CD=' + this.V_SRC_CD + '&V_CD_TYP=ROLE&REST_Service=Masters&Verb=GET').subscribe(
      res => {
        this.role = res.ROLE_CD;
        for (let i = 0; i < this.role.length; i++) {
          this.rol.push({name: this.role[i], selected: false});
        }
      });
    this.progress = false;
  }

  getroledecs(v_rol_cd: string, i: number) {
    this.progress = true;
    this.resetall();
    this.rol[i].selected = true;
    this.http.get<data>(this.apiUrlGet + 'V_SRC_CD=' + this.V_SRC_CD + '&V_ROLE_CD=' + v_rol_cd + '&REST_Service=Role&Verb=GET').subscribe(
      res => {
        this.roledesc = res.ROLE_DSC[0];
      });
    this.progress = false;
  }

  getauthtype() {
    this.authtype = [{name: 'Executable', selected: false}, {name: 'Process', selected: false}, {name: 'Service', selected: false}, {name: 'SLA', selected: false}, {name: 'Machine', selected: false}, {name: 'Platforms', selected: false}];
  }

  getauth(v_cd_typ: string, i: number) {
    this.progress = true;
    this.authoriztion = [];
    this.resetauth();
    this.authtype[i].selected = true;
    this.http.get<data>(this.apiUrlGet + 'V_SRC_CD=' + this.V_SRC_CD + '&V_CD_TYP=' + v_cd_typ + '&REST_Service=Masters&Verb=GET').subscribe(
      res => {
        this.authid = res.AUTH_ID;
        for (let i = 0; i < this.authid.length; i++) {
          this.authoriztion.push({authid: res.AUTH_ID[i], auth_cd: res.AUTH_CD[i], auth_dsc: res.AUTH_DSC[i], auth_access: res.AUTH_ACCESS[i], auth_app_cd: res.AUTH_APP_CD[i], selected: false});
        }
      });
    this.progress = false;
  }

  showauth(authorize: any, i: number) {
    this.resetauth2();
    this.authoriztion[i].selected = true;
    this.authdesc = authorize.auth_dsc;
    this.application = authorize.auth_app_cd;
    this.arraycheckbox = [];
    let acc = authorize.auth_access;
    for (let i = 0; i < 5; i++) {
      (acc[this.chararray[i]]);
      if (acc[this.chararray[i]] === 'Y') {
        this.arraycheckbox.push({data: true});
      }
      if (acc[this.chararray[i]] === 'N') {
        this.arraycheckbox.push({data: false});
      }
    }
  }

  resetall() {
    for (let i = 0; i < this.rol.length; i++) {
      this.rol[i].selected = false;
    }
  }

  resetauth() {
    for (let i = 0; i < this.authtype.length; i++) {
      this.authtype[i].selected = false;
    }
  }

  resetauth2() {
    for (let i = 0; i < this.authoriztion.length; i++) {
      this.authoriztion[i].selected = false;
    }
  }

}


export interface data {
  ROLE_CD: string[];
  ROLE_DSC: string[];
  SERVER_CD: string[];
  AUTH_ID: string[];
  AUTH_CD: string[];
  AUTH_DSC: string[];
  AUTH_ACCESS: string[];
  AUTH_APP_CD: string[];
}


