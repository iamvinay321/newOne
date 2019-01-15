import {Component, OnInit} from '@angular/core';
import {GetFormData} from '../getDataForm';
import {StorageSessionService} from '../../../../service/storage-session.service';

import {EndUserService} from '../../../../service/EndUser-service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Globals} from '../../../../service/globals';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import { FormComponent } from '../form/form.component';

@Component({
  selector: 'app-repeatable-form',
  templateUrl: './repeatable-form.component.html',
  styleUrls: ['./repeatable-form.component.css']
})
export class RepeatableFormComponent extends FormComponent implements OnInit {
// domain_name = this.globals.domain_name;
  //  private apiUrlGet = "https://" + this.domain_name + "/rest/E_DB/SP?";
  formData: GetFormData;
  public form: FormGroup;
  V_ID: any;
  ctrl_variables: Object;

  constructor(
    public StorageSessionService: StorageSessionService,
    public http: HttpClient,
    public router: Router,
    public globals: Globals
  ) {
    super(StorageSessionService,http,router,globals);
  }

  addForm(form): void {
    console.log('add form call');
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
    console.log("Body: "+body_FORMrec+"\nURL:"+this.apiUrlGet);
    this.http.post(this.apiUrlGet, body_FORMrec).subscribe(
      res => {
        console.log("Response:\n"+res);
      });
  }

  updateForm(form): void {
    console.log('update form call');
    //------------Adding paramter only if it is changed----------//
    var body_FORMrec: {[key: string]: any} = {};
    body_FORMrec["V_ID"]= this.V_ID;
    body_FORMrec["REST_Service"]= "Forms_Record";
    body_FORMrec["Verb"]= "PATCH";
    var prop = ["Field_Names","Field_Values","V_Table_Name","V_Schema_Name","V_SRVC_CD","V_USR_NM","V_SRC_CD","V_PRCS_ID"];
    let Current_record = {
      "Field_Names": this.Field_Names,
      "Field_Values": this.Field_Values,
      "V_Table_Name": this.V_TABLE_NAME,
      "V_Schema_Name": this.V_SCHEMA_NAME,
      "V_SRVC_CD": this.V_SRVC_CD,
      "V_USR_NM": this.V_USR_NM,
      "V_SRC_CD": this.V_SRC_CD,
      "V_PRCS_ID": this.V_PRCS_ID,
    }
    for(let i=0; i<prop.length; i++){
      if(Current_record[prop[i]] == this.Initial_record[prop[i]]){
        body_FORMrec[prop[i]] = Current_record[prop[i]];
      }
    }
    
    console.log("Body: "+body_FORMrec+"\nURL:"+this.apiUrlGet);
    this.http.put(this.apiUrlGet, body_FORMrec).subscribe(
      res => {
        console.log("Response:\n"+res);
      });
  }
  
  deleteForm(form): void {
    console.log('delete form call');
    var del_URL = "https://"+this.domain_name+"/rest/E_DB/SP?V_Table_Name="+this.V_TABLE_NAME+"&V_Schema_Name="+this.V_SCHEMA_NAME+"&V_SRVC_CD="+this.V_SRVC_CD+"&V_USR_NM="+this.V_USR_NM+"&V_SRC_CD="+this.V_SRC_CD+"&V_PRCS_ID="+this.V_PRCS_ID+"&REST_Service=Forms_Record&Verb=DELETE";
    del_URL = encodeURI(del_URL);
    this.http.delete(del_URL).subscribe(
      res => {
        console.log("Response:\n"+res);
    });
  }

  ngOnInit() {
    this.http.get('../../../../assets/control-variable.json').subscribe(res => {
      this.ctrl_variables = res;
      console.log(res);
    });
    
    this.getFormData();
  }

  onCancel() {
    console.log("Cancelled");
    this.router.navigateByUrl("End_User");
  }
  onSubmit() {
    console.log('submitbtn_click');
  }

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

export class ReportData {
  PARAM_NM: string[];
  PARAM_VAL: string[];
  RESULT: string;
  V_EXE_CD: string[];
  CONT_ON_ERR_FLG: string[];
  V_Table_Name: string[];
  V_Schema_Name: string[];
  V_Key_Names: string[];
  V_Key_Values: string[];
  V_SRVC_CD: string[];
  V_USR_NM: string[];
  V_SRC_CD: string[];
  V_PRCS_ID: string[];

  constructor() {

  }

}

export class FormPass1 {
  SRVC_ID: any[];
  UNIQUE_ID: string[];
  V_EXE_CD: string[];

  constructor() {

  }
}
