import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from "@angular/router";
import { RollserviceService } from '../../../service/rollservice.service';
import { StorageSessionService } from '../../../service/storage-session.service';
import {HttpClientModule,HttpClient, HttpHeaders} from '@angular/common/http';
import {Globals} from './../../../service/globals';

@Component({
  selector: 'app-usernavbar',
  templateUrl: './usernavbar.component.html',
  styleUrls: ['./usernavbar.component.css']
})
export class UsernavbarComponent implements OnInit {
 
  constructor(private router:Router,
  private roll:RollserviceService,
  private globals:Globals,
  private StorageSessionService:StorageSessionService,
private http:HttpClient)
   { 
   
  }
  roll_execute:boolean=false;
  roll_schedule:boolean=false;
  roll_orchestrate:boolean=false;
  roll_myTask:boolean=false;
  roll_exeption:boolean=false;
  roll_dashboard:boolean=false;
  roll_process:boolean=false;
Roll_cd:any[]=[];
domain_name=this.globals.domain_name;
agency=this.StorageSessionService.getSession("agency");
V_USR_NM=this.StorageSessionService.getSession("email");
  ngOnInit() {
   this.http.get("https://"+this.domain_name+"/rest/E_DB/SP?V_SRC_CD="+this.agency+"&V_USR_NM="+this.V_USR_NM+"&REST_Service=UserRoles&Verb=GET").subscribe(
     res=>{   this.Roll_cd=res['ROLE_CD'];
        (this.Roll_cd);
let l =this.Roll_cd.length;
for(let i=0;i<l;i++){
              // switch(this.Roll_cd[i]){
              //       case this.Roll_cd[i]=='Enablement Workflow Execute Role':
              //       this.roll_execute=true;
              //       break;
              //       case this.Roll_cd[i]=='Enablement Workflow Schedule Role':
              //       this.roll_schedule=true;
              //       break;
              //       case this.Roll_cd[i]=='Enablement Workflow Orchestrate Role':
              //       this.roll_orchestrate=true;
              //       break;
              //       case this.Roll_cd[i]=='Enablement Workflow MyTask Role':
              //       this.roll_myTask=true;
              //       break;
              //       case this.Roll_cd[i]=='Enablement Workflow Exception Role':
              //       this.roll_exeption=true;
              //       break;
              // }
        if(this.Roll_cd[i]=='Enablement Workflow Execute Role'){ this.roll_execute=true;}
         else if(this.Roll_cd[i]=='Enablement Workflow Schedule Role'){this.roll_schedule=true;}
        else if(this.Roll_cd[i]=='Enablement Workflow Orchestrate Role'){this.roll_orchestrate=true;}
        else if(this.Roll_cd[i]=='Enablement Workflow MyTask Role'){this.roll_myTask=true;}
        else if(this.Roll_cd[i]=='Enablement Workflow Exception Role'){this.roll_exeption=true;}
        else if(this.Roll_cd[i]=='Enablement Workflow Dashboard Role'){this.roll_dashboard=true;}    
        else if(this.Roll_cd[i]=='Enablement Workflow Process Role'){this.roll_process=true;}    
        }
  }
   );
  }

}
