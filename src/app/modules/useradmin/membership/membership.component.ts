import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UseradminService } from '../../../service/useradmin.service';
import { Http,Response,Headers } from '@angular/http';
import { HttpClient,HttpEvent,HttpEventType } from '@angular/common/http';
import { StorageSessionService } from '../../../service/storage-session.service';
import { HostListener } from "@angular/core";

@Component({
  selector: 'app-membership',
  templateUrl: './membership.component.html',
  styleUrls: ['./membership.component.css']
})
export class MembershipComponent implements OnInit {
  V_SRC_CD:string=this.StorageSessionService.getSession("agency");
  V_USR_NM:string=this.StorageSessionService.getSession("email");
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
    private toastr:ToastrService,
    private data:UseradminService,
    
    private http:HttpClient,
    private StorageSessionService:StorageSessionService
  ) {
    this.onResize();
    this.onpselect = function(index){
      this.selecteduser = index;
      this.selectedgroup=null;}
      this.onqselect = function(index){
        this.selectedgroup = index;
      }
  }
  USR_GRP_CD:any[]=[];
  domain_name="enablement.online";
  USR_GRP_CDR:any;
  USR_GRP_DSCR:any;
  USR_GRP_CD_SELC:any;
  start_date:any;
  end_date:any;
  progress:boolean=false;
  onpselect:Function;
  onqselect:Function;
  selecteduser=Number;
  selectedgroup=Number;
  AvailableGroup(){
    this.progress=true;
          this.data.AvaiableGroup().subscribe(
            res=>{
              console.log(res);
        this.USR_GRP_CD=res['USR_GRP_CD'];
        this.progress=false;
            }
          );
  }
  getAvailableGroup(USR_GRP_CD:any){
    this.progress=true;
    // if(USR_GRP_CD==""){
    //     this.deleteBtn=true;
    // }else{
    //   this.deleteBtn=false;
    // }
            this.data.getAvailableGroup(USR_GRP_CD).subscribe(
              res=>{
                console.log(res);
                this.start_date=res['EFF_STRT_DT_TM'];
                this.end_date=res['EFF_END_DT_TM'];
                this.USR_GRP_CDR=res['USR_GRP_CD'];
                this.USR_GRP_DSCR=res['USR_GRP_DSC'];
                this.progress=false;
              }
            );
  }
  selected(e){
    this.USR_GRP_CD_SELC=e;
  }

  USR_NM:any[]=[];
  getUser(){
    this.progress=true;
        this.data.getUser().subscribe(
            res=>{
              console.log(res.json());
              this.USR_NM=res.json()['USR_NM'];
              this.progress=false;
            }
        );
  }
  USR_NM_R:any;
  USR_DSC_R:any;
  USR_NM_RR:any;
  getUserDetails(USR_NM:any){
    this.progress=true;
          this.data.getUSerDetails(USR_NM).subscribe(
            res=>{
                    this.USR_NM_R=res.json()['USR_NM'];
                      this.USR_DSC_R=res.json()['USR_DSC'];
                     // this.USRC_STATUS_R=res.json()['STS'];
                     // this.USR_PASS=res.json()[];
                   
                     this.progress=false;
            }
          );
  }
  fooo(e){
    this.USR_NM_RR=e;
  }

  AddGroupTL(){
    this.progress=true;
    let body={"V_USR_NM":[this.V_USR_NM],
    "V_USR_GRP_CD":[this.USR_GRP_CDR],
    "V_SRC_CD":[this.V_SRC_CD],
    "V_EFF_STRT_DT_TM":[this.start_date],
    "V_EFF_END_DT_TM":[this.end_date],
    "REST_Service":["Membership"],
    "Verb":["PUT"]}
    this.http.patch("https://"+this.domain_name+"/rest/E_DB/SP",body).subscribe(
      res=>{
            // if(res.status==20){
            //       this.toastr.info("Info","Sucess....!");
            // }else if(res.status==400){
            //       this.toastr.warning("Failed","Not sucesss...!");
            // }
            this.progress=false;
      }
    );
  }
  Label:any[]=[];
  ngOnInit() {
    this.data.getJSON().subscribe(data => {
      console.log(data.json());
      this.Label=data.json();
      console.log(this.Label);
  })
    this.getUser();
    this.AvailableGroup();
  }

}
