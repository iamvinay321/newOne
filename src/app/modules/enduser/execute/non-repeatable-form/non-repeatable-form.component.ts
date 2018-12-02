import { Component, OnInit } from '@angular/core';
import {GetFormData} from '../getDataForm';
import { StorageSessionService } from '../../../../service/storage-session.service';

import { EndUserService } from '../../../../service/EndUser-service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Globals } from '../../../../service/globals';
import {HttpClient} from '@angular/common/http'
import { Router } from '@angular/router';
import {MatTableDataSource} from '@angular/material';
@Component({
  selector: 'app-non-repeatable-form',
  templateUrl: './non-repeatable-form.component.html',
  styleUrls: ['./non-repeatable-form.component.css']
})
export class NonRepeatableFormComponent implements OnInit {

// domain_name = this.globals.domain_name;
  //  private apiUrlGet = "https://" + this.domain_name + "/rest/E_DB/SP?";
  private formData: GetFormData;
  public form: FormGroup;
  public param: any;
  dataSource: TableEx[];
  editing = true;
  displayedColumns = ['V_USR_NM', 'Program_Manager', 'Program_Score', 'Program_Start_Date', 'Program_Status', 'Program_Trend', 'Program_Type'];
  constructor(
    private storage: StorageSessionService,
    private http:HttpClient,
    private router:Router
  ) {
    this.formData = new GetFormData(this.storage,this.http);
    this.param = this.formData.getFormParameter();
    let group: any = {};

    this.param.forEach((e) => {
      group[e] = new FormControl()
    })
    this.form = new FormGroup(group);
  }

  onSubmit() {
    console.log(JSON.stringify(this.form.value));
    this.formData.submitForm(JSON.stringify(this.form.value),this);
  }
  /*
    call again getFormParameter method after form
    submited , and its contains the table name
  */
  formSubmitResponse(result,data:any[]) : void {
      if(result){
        let reportData=new ReportData();
        console.log(data);
        let dt=JSON.stringify(data);
        reportData=JSON.parse(dt);
        console.log(reportData);
        if (reportData.RESULT =="INPUT_ARTFCT_TASK") {

          this.router.navigateByUrl('InputArtForm');

        } else if (reportData.RESULT == "FORM" && reportData.V_EXE_CD[0] == "NONREPEATABLE_MANUAL_TASK") {
          // non-repetable NonRepetForm
          this.router.navigateByUrl('NonRepetForm');

        } else if (reportData.RESULT == "FORM" && reportData.V_EXE_CD[0] == "REPEATABLE_MANUAL_TASK") {
          //repetable

          this.router.navigateByUrl('RepetForm');
        }
        else if (reportData.RESULT == "TABLE") {

          this.router.navigateByUrl('ReportTable');
        }
      }
  }
  ngOnInit() {
    const obj = [];
    const data = JSON.parse(this.param);
    obj.push(data);
    this.dataSource =  obj;
    console.log(this.dataSource);
  }

}

export interface TableEx {
  V_USR_NM: any;
  Program_Score: any;
  Program_Manager: any;
  Program_Start_Date: any;
  Program_Status: any;
  Program_Trend: any;
  Program_Type: any;
  // V_SRC_CD: string;
  // V_PRCS_ID: any;
}
export class Data {
  PARAM_NM: string[];
  PVP: any[];
  V_SRVC_CD: any[];
}

export class FormPass {
  V_TABLE_NAME: string;
  V_SCHEMA_NAME: string;
  V_KEY_NAMEA: string;
  V_KEY_NAME: string;
  V_KEY_VALUE: string;
  V_SRVC_CD: string;
  constructor() {

  }
}
export class ReportData{
  PARAM_NM: string[];
  PARAM_VAL: string[];
  RESULT:string;
  V_EXE_CD:string[];
  CONT_ON_ERR_FLG: string[];

  constructor(){

  }

}

export class FormPass1{
  SRVC_ID:any[];
  UNIQUE_ID:string[];
  V_EXE_CD:string[];
  constructor() {

  }
}
