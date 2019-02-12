import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpEventType } from '@angular/common/http';
import { Http, ResponseContentType } from '@angular/http';
import { StorageSessionService } from './storage-session.service';
import { Observable } from 'rxjs';
import { Globals } from './globals';
import { Headers, RequestMethod, RequestOptions } from '@angular/http';

@Injectable()

export class EndUserService {
    private baseUrl:string="https://"+this.globals.domain_name + "/rest/E_DB/SP?";
    private V_SRC_CD: string = this.storage.getSession("agency");
    private V_USR_NM: string = this.storage.getSession("email");
    private ResetOptimised: boolean = false;
    private Lazyload: boolean = true;
    constructor(private globals:Globals,
                private http:Http,
                private storage:StorageSessionService
    ){
        
    }

    /*
        get all application
    */
    getApplication(){
      return  this.http.get(this.baseUrl + "V_CD_TYP=APP&V_SRC_CD=" + this.V_SRC_CD + "&SCREEN=PROFILE&REST_Service=Masters&Verb=GET");
    }
    /*
        get process
    */
    getProcesses(application:string){
      return  this.http.get(this.baseUrl + "V_APP_CD=" + application + "&V_SRC_CD=" + this.V_SRC_CD + "&V_USR_NM=" + this.V_USR_NM + "&REST_Service=AppProcesses&Verb=GET");
    }
    /*
        gets all parameter and values 
    */
    getprocessParameter(application:string,process:string){
      return  this.http.get(this.baseUrl + "V_APP_CD=" + application + "&V_PRCS_CD=" + process + "&V_SRC_CD=" + this.V_SRC_CD + "&ResetOptimised=" + this.ResetOptimised + "&Lazyload=" + this.Lazyload + "&REST_Service=ProcessParameters&Verb=GET");
    }
    /*
        get parameter all option
    */
    getParameterAllOption(application:string,process:string,paramName:string,srcCode:string){
        return  this.http.get(this.baseUrl + "V_SRC_CD=" + this.V_SRC_CD + "&V_APP_CD=" + application + "&V_PRCS_CD=" +process + "&V_PARAM_NM=" + paramName+ "&V_SRVC_CD="+srcCode+"&REST_Service=ProcessParametersOptions&Verb=GET");
    }
    /*
        update parameter values
    */
    updateParameterValues(appication:string,process:string,paramName:string,paramValue:String){

        return this.http.get(this.baseUrl + "V_APP_CD=" + appication + "&V_PRCS_CD=" + process + "&V_SRC_CD=" +this.V_SRC_CD + "&V_USR_NM=" + this.V_USR_NM + "&V_PARAM_NM=" + paramName + "&V_PARAM_VAL=" + paramValue+ "&REST_Service=ProcessParameters&Verb=PATCH");
    }
}
