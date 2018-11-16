import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpEventType } from '@angular/common/http';
import { Http, ResponseContentType } from '@angular/http';
import { StorageSessionService } from './storage-session.service';
import { Observable } from 'rxjs/Observable';
import { Globals } from './globals';
import { Headers, RequestMethod, RequestOptions } from '@angular/http';
import {RepeatableFormComponent} from '../modules/enduser/execute/repeatable-form/repeatable-form.component';
@Injectable()

export class formService{
    constructor(private http:Http,
            private storage:StorageSessionService,
            private globals:Globals,
    ){

    }
    private V_SRC_CD: string = this.storage.getSession("agency");
    private V_USR_NM: string = this.storage.getSession("email");
    /*
    Repeatable form
    */
    updateFormField(form:RepeatableFormComponent,fieldName:any,filedValues:any){
        console.info("Update api calling");
      this.http.get(this.getUrl(form,fieldName,fieldName,"PATCH")).subscribe(
            res=>{
                console.log(res.json());
            }
        );
    }

    getUrl(form:RepeatableFormComponent,fieldName:any,filedValues:any,verb:string) : string{
return "https://"+this.globals.domain_name +"/rest/E_BD/SP?V_Key_Names="
+form.formData.formPass.V_KEY_NAME+
"&V_Key_Values="+form.formData.formPass.V_KEY_VALUE+
"&Field_Names="+fieldName+"&Field_Values="+filedValues+"&V_Table_Name="+form.formData.formPass.V_TABLE_NAME+
"&V_Schema_Name="+form.formData.formPass.V_SCHEMA_NAME+"&V_SRVC_CD="+form.formData.formPass.V_SRVC_CD+"&V_USR_NM="+this.V_USR_NM+
"&V_SRC_CD="+this.V_SRC_CD+"&V_PRCS_ID="+form.formData.formPass.V_PRCS_ID+"&REST_Service=Forms_Record&Verb="+verb;
    }
}