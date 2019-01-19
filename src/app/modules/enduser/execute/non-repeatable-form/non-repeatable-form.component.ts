import { Component, OnInit } from '@angular/core';
//import { GetFormData } from '../getDataForm';
import { StorageSessionService } from '../../../../service/storage-session.service';
import {FormComponent} from '../form/form.component';
import {AppComponent} from '../../../../app.component';

import { EndUserService } from '../../../../service/EndUser-service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Globals } from '../../../../service/globals';
import { HttpClient } from '@angular/common/http'
import { Router } from '@angular/router';
import * as dateFormat from 'dateformat';
import { MatTableDataSource } from '@angular/material';
import { getISODayOfWeek } from 'ngx-bootstrap/chronos/units/day-of-week';
import { encode } from 'punycode';
@Component({
  selector: 'app-non-repeatable-form',
  templateUrl: './non-repeatable-form.component.html',
  styleUrls: ['./non-repeatable-form.component.css']
})
export class NonRepeatableFormComponent extends FormComponent implements OnInit {

  // domain_name = this.globals.domain_name;
  //  private apiUrlGet = "https://" + this.domain_name + "/rest/E_DB/SP?";
  public param: any;
  editing = true;
  ctrl_variables: any;
  input:any[]= [];
  V_PVP: any;
  Field_Length: any;
  currentDate: string;
  PVP_Updated: any ={};
  date_value: any;
  dateEntry: any;
  constructor(
    public StorageSessionService: StorageSessionService,
    public app: AppComponent,
    public http: HttpClient,
    public router: Router,
    public globals: Globals
  ) {
    super(StorageSessionService,http,router,globals,app);
  }

  ngOnInit() {
    this.getFormData();
    for(let i=0; i<this.RVP_labels.length; i++){
      this.input[this.RVP_labels[i]] = this.RVP_DataObj[this.RVP_labels[i].split(" ").join("_")][0];
    }
    
  }

  onSubmit() {
    if(this.V_TABLE_NAME !== ''){
      this.submit_formsRecord();
    }
    this.build_PVP();
  }

  submit_formsRecord(){
    let body_FORMrec = {
      "Field_Names": this.Field_Names,
      "Field_Values": this.Field_Values,
      "V_Table_Name": this.V_TABLE_NAME,
      "V_Schema_Name": this.V_SCHEMA_NAME,
      "V_Key_Names": this.V_KEY_NAME,
      "V_Key_Values": this.V_KEY_VALUE,
      "V_SRVC_CD": this.V_SRVC_CD,
      "V_USR_NM": this.V_USR_NM,
      "V_SRC_CD": this.V_SRC_CD,
      "V_PRCS_ID": this.V_PRCS_ID,
      "REST_Service": "Forms_Record",
      "Verb": "POST"
    }
    console.log(body_FORMrec);
    this.http.post(this.apiUrlGet, body_FORMrec).subscribe(
      res => {
        console.log("Response:\n"+res);
      });
  }

  build_PVP(){
    this.currentDate = dateFormat(new Date(), "ddd mmm dd yyyy hh:MM:ss TT o");
    //-------Update PVP--------//
    
    for(let i=0; i<this.RVP_labels.length; i++){
      this.PVP_Updated[this.RVP_labels[i].split(" ").join("_")] = this.input[this.RVP_labels[i]].toString();
    }
    
    
    let body_buildPVP = {
      "V_USR_NM": this.V_USR_NM,
      "V_EXE_CD": this.Check_RPT_NRPT,
      "V_PRCS_TXN_ID": this.V_PRCS_TXN_ID,
      "V_APP_ID": this.V_APP_ID,
      "V_PRCS_ID": this.V_PRCS_ID,
      "V_SRVC_ID": this.V_SRVC_ID,
      "V_PVP": JSON.stringify(this.PVP_Updated),
      "V_RELEASE_RSN": "Submitted manual input",
      "V_SRC_ID": this.V_SRC_ID,
      "V_OPERATION": "MANUALSUBMIT",
      "V_UNIQUE_ID": this.V_UNIQUE_ID,
      "TimeZone": this.currentDate
    }
    console.log(body_buildPVP);
    console.log("Body: "+body_buildPVP+"\nURL:"+"https://" + this.domain_name + "/rest/Submit/FormSubmit");
    this.http.post("https://" + this.domain_name + "/rest/Submit/FormSubmit", body_buildPVP).subscribe(
      res => {
        console.log(res);
        this.invoke_router(res);
    });
  }

  onCancel(){
    console.log("Cancelled");
    this.router.navigateByUrl("End_User");
  }

}
