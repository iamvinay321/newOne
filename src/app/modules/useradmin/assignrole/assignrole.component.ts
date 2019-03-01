import { Component, OnInit, ViewContainerRef} from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UseradminService } from '../../../service/useradmin.service';
import { HttpClient, HttpEvent, HttpEventType, HttpHeaders } from '@angular/common/http';
import { StorageSessionService } from '../../../service/storage-session.service';
import { HostListener } from "@angular/core";
import {Globals} from './../../../service/globals';

@Component({
  selector: 'app-assignrole',
  templateUrl: './assignrole.component.html',
  styleUrls: ['./assignrole.component.css']
})


export class AssignroleComponent implements OnInit {
  V_SRC_CD: string = this.StorageSessionService.getSession("agency");
  V_USR_NM: string = this.StorageSessionService.getSession("email");
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
    private globals:Globals,
    private http: HttpClient,
    private StorageSessionService: StorageSessionService
  ) {
    this.onResize(); 
    this.onpselect = function (index) {
      this.selectedrole = null;
      this.selectedgroup = index;
    }
    this.onqselect = function (index) {
      this.selectedrole = index;
    }
  }
  domain_name=this.globals.domain_name; private apiUrlGet = "https://"+this.domain_name+"/rest/E_DB/SP?";
  private apiUrlPut = "https://"+this.domain_name+"/rest/E_DB/SP";

  groupdesc: any;
  roledesc: any;
  grp_roles: string[] = [];
  role_grps: string[] = [];
  group: string[] = [];
  role: string[]=[];
  progress: boolean = false;
  selectedrole = Number;
  selectedgroup = Number;
  onpselect: Function;
  onqselect: Function;
  Label: any[] = [];
  rol=[];
  grp=[];
  selectedOptions: string[] =[];
  selectedOptions1: string[]=[]; 

  getgroups() {
    this.progress = true;
    this.http.get<data>(this.apiUrlGet + "V_SRC_CD=" + this.V_SRC_CD + "&V_CD_TYP=USR_GRP&REST_Service=Masters&Verb=GET").subscribe(
      res => {
        this.group = res.USR_GRP_CD;
        for (var i = 0; i < this.group.length; i++) {
          this.grp.push({name:this.group[i],selected:false})
        }
      });
    this.progress = false;
  }

  getrole() {
    this.progress = true;
    this.http.get<data>(this.apiUrlGet + "V_SRC_CD=" + this.V_SRC_CD + "&V_CD_TYP=ROLE&REST_Service=Masters&Verb=GET").subscribe(
      res => {
        this.role = res.ROLE_CD;
        for (var i = 0; i < this.role.length; i++) {
          this.rol.push({name:this.role[i],selected:false})
        }
      });
     this.progress = false;
  }

  getroledesc(ROLE_CD: any) {
    this.progress = true;
    this.http.get<data>(this.apiUrlGet + "V_ROLE_CD=" + ROLE_CD + "&V_SRC_CD=" + this.V_SRC_CD + "&REST_Service=Role&Verb=GET").subscribe(
      res => {
        this.roledesc = res.ROLE_DSC;
      });
    this.progress = false;
  }
  getgroupdesc(V_USR_GRP_CD: any) {
    this.progress = true;
    this.http.get<data>(this.apiUrlGet + "V_USR_GRP_CD=" + V_USR_GRP_CD + "&V_SRC_CD=" + this.V_SRC_CD + "&REST_Service=Group&Verb=GET").subscribe(
      res => {
        this.groupdesc = res.USR_GRP_DSC;
      });
    this.progress = false;
  }
  getroleofgroup(VV_USR_GRP_CD: any) {
    this.progress = true;
    this.http.get<data>(this.apiUrlGet + "V_USR_GRP_CD=" + VV_USR_GRP_CD + "&V_ROLE_CD=&V_SRC_CD=" + this.V_SRC_CD + "&REST_Service=Groups_Roles&Verb=GET").subscribe(
      res => {
        this.grp_roles = res.ROLE_CD;
        (this.grp_roles);
        for(var f=0;f<this.rol.length;f++){
          this.rol[f].selected=false;
        }
        this.selectedOptions1=[];
        for (var i = 0; i < this.grp_roles.length; i++) {
          for (var j = 0; j < this.rol.length; j++) {
            if (this.grp_roles[i] === this.rol[j].name) {
              this.rol[j].selected= true;
              //this.selectedOptions1.push(this.rol[j].name);
            }}}
      });
    this.progress = false;
  }

  getgroupofrole(V_ROLE_CD: any) {
    this.progress = true;
    this.http.get<data>(this.apiUrlGet + "V_USR_GRP_CD=&V_ROLE_CD=" + V_ROLE_CD + "&V_SRC_CD=" + this.V_SRC_CD + "&REST_Service=Groups_Roles&Verb=GET").subscribe(
      res => {
        this.role_grps = res.USR_GRP_CD;
        (this.role_grps);
        // for(var f=0;f<this.grp.length;f++){
        //   this.grp[f].selected=false;
        // }
        // for (var i = 0; i < this.role_grps.length; i++) {
        //   for (var j = 0; j < this.grp.length; j++) {
        //     if (this.role_grps[i] === this.grp[j].name) {
        //       this.grp[j].selected= true;
        //     }}}
      });
      this.progress = false;
  }

  checkroles(rl){
    this.selectedOptions1=rl.selectedOptions.selected.map(item=>item.value);
    (this.selectedOptions1);
  }

  addrole() {
    for(var i=0;i<this.selectedOptions1.length;i++){
      //this.selectedOptions1[i];
      let body = {
        "V_USR_GRP_CD":this.selectedOptions[0],
        "V_SRC_CD": this.V_SRC_CD,
        "V_ROLE_CD": this.selectedOptions1[i],
        "REST_Service": "Group_Roles",
        "Verb": "PUT"
      }
      
      this.http.put(this.apiUrlPut, body).subscribe(
        res => {
          (res);
          (body);
        });
     }
  }
  deleterole() {
   for(var i=0;i<this.selectedOptions1.length;i++){
      this.http.request('delete',this.apiUrlPut,{
    body:{
      "V_USR_GRP_CD":this.selectedOptions[0],
      "V_SRC_CD": this.V_SRC_CD,
      "V_ROLE_CD": this.selectedOptions1[i],
      "REST_Service": "Group_Roles",
      "Verb": "DELETE",
    }}).subscribe(
      res=>{
        (res);
      });
    }
}
  ngOnInit() {
    this.getgroups();
    this.getrole();
    this.data.getJSON().subscribe(data => {
      (data.json());
      this.Label = data.json();
      (this.Label);
    })
  }
}
export interface data {
  USR_GRP_CD: string[];
  ROLE_CD: string[];
  ROLE_DSC: string[];
  USR_GRP_DSC: string[];
  RESULT: string[];
}
