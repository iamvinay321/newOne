import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UseradminService } from '../../../service/useradmin.service';
import { Http,Response,Headers } from '@angular/http';
import { StorageSessionService } from '../../../service/storage-session.service';
import {Globals} from './../../../service/globals';

@Component({
  selector: 'app-organization',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.css']
})
export class OrganizationComponent implements OnInit {
  V_SRC_CD:string=this.StorageSessionService.getSession("agency");
  V_USR_NM:string=this.StorageSessionService.getSession("email");
  constructor(
    private toastr:ToastrService,
    private data:UseradminService,private globals:Globals,
    
    private http:Http,
    private StorageSessionService:StorageSessionService
  ) { }
  domain_name=this.globals.domain_name;
  uploadLogo_FLD:any;
  adminEmail_FLD:any;
  logRetention_FLD:any;
  valPassword_FLD:any;
  defPassword_FLD:any;
  //----------
  durationYear_FLD:any;
  emailHost_FLD:any;
  PurgePeriod_FLD:any;
  AllowedIn_FLD:any;
  LogLevel_FLD:any;
  //---------
  maxRecords_FLD:any;
  emailPort_FLD:any;
  table_pr_FLD:any;
  Session_FLD:any;
progress:boolean=false;
  ///-----------------------------------
  getOrganization(){
    this.progress=true;
            this.data.getOrganization().subscribe(
              res=>{
                this.maxRecords_FLD=res.json()['MAX_RCD'];
                this.adminEmail_FLD=res.json()['ADMIN_EMAIL_ID'];
                this.LogLevel_FLD=res.json()['LOG_LVL'];
                this.durationYear_FLD=res.json()['VALDT_DRTN'];
                this.defPassword_FLD=res.json()['PWD_SFX'];
                this.emailHost_FLD=res.json()['EMAIL_HOST'];
                this.emailPort_FLD=res.json()['EMAIL_PORT'];
                this.AllowedIn_FLD=res.json()['LOGIN_VALIDITY_IN_MONTHS'];
                this.valPassword_FLD=res.json()['PWD_VALIDITY_IN_MONTHS'];
                this.Session_FLD=res.json()['SESSN_EXPY_SEC'];
                this.logRetention_FLD=res.json()['LOG_RTN_PRD'];
                this.PurgePeriod_FLD=res.json()['DATA_PRG_PRD'];
                this.table_pr_FLD=res.json()['TBL_PRTN_PRD'];
                this.progress=false;
              }
              
            );
  }
 
  UpdateOrganization(){
    this.progress=true;
   let body={"V_SRC_CD":[this.V_SRC_CD],
  "V_MAX_RCD":[this.maxRecords_FLD],
  "V_ADMIN_EMAIL_ID":[this.adminEmail_FLD],
  "V_LOG_LVL":[this.LogLevel_FLD],
  "V_PWD_SFX":[this.defPassword_FLD],
  "V_EMAIL_HOST":[this.emailHost_FLD],
  "V_EMAIL_PORT":[this.emailPort_FLD],
  "V_VALDT_DRTN":[this.durationYear_FLD],
  "V_LOGIN_VALIDITY_IN_MONTHS":[this.AllowedIn_FLD],
  "V_PWD_VALIDITY_IN_MONTHS":[this.valPassword_FLD],
  "V_LOG_RTN_PRD":[this.logRetention_FLD],
  "V_DATA_PRG_PRD":[this.PurgePeriod_FLD],
  "V_TBL_PRTN_PRD":[this.table_pr_FLD],
  "V_SESSN_EXPY_SEC":[this.Session_FLD],
  "REST_Service":["Orgnization"],
  "Verb":["PATCH"]}
        this.http.patch("https://"+this.domain_name+"/rest/E_DB/SP",body).subscribe(
          res=>{
                  if(res.status==200){
                        this.toastr.info("Response","Updated....!");
                  }
                  this.progress=false;
                  this.getOrganization();
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
    this.getOrganization();
  }

}
