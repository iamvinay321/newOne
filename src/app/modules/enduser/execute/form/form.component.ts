import { Component, OnInit } from '@angular/core';
import { EndUserService } from '../../../../service/EndUser-service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Globals } from '../../../../service/globals';
import { HttpClient } from '@angular/common/http'
import { Router } from '@angular/router';
import * as dateFormat from 'dateformat';
import { MatTableDataSource } from '@angular/material';
import { getISODayOfWeek } from 'ngx-bootstrap/chronos/units/day-of-week';
import { encode } from 'punycode';
import { GetFormData } from '../getDataForm';
import { StorageSessionService } from '../../../../service/storage-session.service';
import { FormatWidth } from '@angular/common';
import { isNumber } from '@ng-bootstrap/ng-bootstrap/util/util';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  V_ID: any;
  formWidth: any = {};
  fieldType: any = {};
  plainInput: string;
  entry_plain: string;
  set_PhoneDash: any;
  phoneDash_Input: any;
  margin: number = 0;
  totalWidth_rep: number = 0;

  constructor(
    public StorageSessionService: StorageSessionService,
    public http: HttpClient,
    public router: Router,
    public globals: Globals
  ) { }

  domain_name = this.globals.domain_name;
  public apiUrlGet = 'https://' + this.domain_name + '/rest/E_DB/SP?';
  V_SRC_CD = this.StorageSessionService.getSession('agency');
  V_USR_NM = this.StorageSessionService.getSession('email');
  Form_Data: any;
  options: any = {};
  PVP: any;
  V_TABLE_NAME: any;
  V_SCHEMA_NAME: any;
  V_KEY_NAME: string;
  V_KEY_VALUE: string;
  V_SRVC_CD: any = {};
  V_PRCS_TXN_ID: any;
  V_APP_ID: any;
  V_SRC_ID: any;
  V_PRCS_ID: any;
  Check_RPT_NRPT: any;
  RVP_Data: any;
  Field_Names: string;
  Field_Values: string;
  V_SRVC_ID: any;
  V_UNIQUE_ID: any;
  SL_APP_CD: any;
  SL_PRC_CD: any;
  s_data: any;
  action: boolean;
  srvc_cd: any;
  srvc_cd_sl: any;
  RVP_labels: any[] = [];
  RVP_Keys: string[];
  RVP_Values: any[] = [];
  V_APP_CD: string = '';
  V_PRCS_CD: string = '';
  Initial_record:any = {};

  ngOnInit() {
  }
  getFormData(): any {
    console.log("Inside getFormData");
    this.Form_Data = this.StorageSessionService.getCookies('report_table');
    console.info('The form data stored in local storage: ');
    console.log(this.Form_Data);
    this.PVP = JSON.parse(this.Form_Data['PVP'][0]);
    this.srvc_cd_sl = this.Form_Data['SRVC_CD'][0];
    console.log(this.PVP);
    
    /*
          Checking the old table
    */
    if ('V_Table_Name' in this.PVP) {
      this.V_TABLE_NAME = this.PVP['V_Table_Name'][0];
      if (this.V_TABLE_NAME == null) {
        this.V_TABLE_NAME = '';
      }
      console.log(this.V_TABLE_NAME);
    }else{
      this.V_TABLE_NAME = '';
    }
    if ('V_Schema_Name' in this.PVP) {
      this.V_SCHEMA_NAME = this.PVP['V_Schema_Name'][0];
      if (this.V_SCHEMA_NAME == null) {
        this.V_SCHEMA_NAME = '';
      }
      console.log(this.V_SCHEMA_NAME);
    }else{
      this.V_SCHEMA_NAME = '';
    }
    if ('V_Key_Names' in this.PVP) {
      var V_KEY_NAME_arr = this.PVP['V_Key_Names'];
      for (let i = 0; i < V_KEY_NAME_arr.length; i++) {
        this.V_KEY_NAME += V_KEY_NAME_arr[i] + '|';
      }

      if (this.V_KEY_NAME == null || this.V_KEY_NAME == '|') {
        this.V_KEY_NAME = '';
      }
      this.V_KEY_NAME = this.V_KEY_NAME.slice(0, -1);
    }

    if ('0' in this.PVP) {
      var V_KEY_VALUE_arr = this.PVP['V_Key_Values'];
      for (let i = 0; i < V_KEY_VALUE_arr.length; i++) {
        this.V_KEY_VALUE += V_KEY_VALUE_arr[i] + '|';
      }

      if (this.V_KEY_VALUE == null || this.V_KEY_VALUE === '|') {
        this.V_KEY_VALUE = '';
      }
      this.V_KEY_VALUE = this.V_KEY_VALUE.slice(0, -1);
    }

    this.V_SRVC_CD = this.PVP['V_SRVC_CD'][0];
    console.info('This is completed data of V_TABLE_NAME parameter :');
    console.log('V_SRVC_CD=>' + this.V_SRVC_CD + 'V_TABLE_NAME=>' + this.V_TABLE_NAME + 'V_KEY_NAME=>' + this.V_KEY_NAME + 'V_KEY_VALUE=>' + this.V_KEY_VALUE + 'V_SCHEMA_NAME=>' + this.V_SCHEMA_NAME);

    this.V_PRCS_TXN_ID = this.PVP['V_PRCS_TXN_ID'][0];

    this.V_APP_ID = this.PVP['V_APP_ID'][0];

    this.V_SRC_ID = this.PVP['V_SRC_ID'][0];

    this.V_PRCS_ID = this.PVP['V_PRCS_ID'][0];

    this.Check_RPT_NRPT = this.Form_Data['V_EXE_CD'][0];

    //------------Getting RVP Data--------------//
    this.RVP_Data = this.Form_Data['RVP'];
    console.log("Field Data 1:");
    console.log(JSON.parse(this.RVP_Data));
    var RVP_DataObj = JSON.parse(this.RVP_Data);
    console.log(RVP_DataObj);
    var key_array = Object.keys(RVP_DataObj);

    //----------Field Names & Field Values as {"str1"|"str2"}-----------//
    this.Field_Names = '';
    this.Field_Values = "";
    for (let i = 0; i < key_array.length; i++) {
      if (i != 0) {
        this.Field_Names += '|';
        this.Field_Values += '|';
      }
      this.Field_Names += "\"" + key_array[i] + "\"";
      this.Field_Values += "\"" + RVP_DataObj[key_array[i]] + "\"";
    }
    this.RVP_Data.push('V_abcd');
    this.Field_Names += '|\"V_abcd\"';
    this.Field_Values += '|\"\"';

    console.log("Field_Names");
    console.log(this.Field_Names);
    console.log("Field_Values");
    console.log(this.Field_Values);
    console.log(this.StorageSessionService.getCookies('App_Prcs'));

    this.V_SRVC_ID = this.Form_Data['SRVC_ID'][0];

    this.V_UNIQUE_ID = this.Form_Data['UNIQUE_ID'];

    this.SL_APP_CD = this.StorageSessionService.getCookies('executedata')['SL_APP_CD'];

    this.SL_PRC_CD = this.StorageSessionService.getCookies('executedata')['SL_PRC_CD'];

    //----------------Lables to Show---------------//
    this.RVP_Keys = Object.keys(RVP_DataObj);
    for (let i = 0; i < this.RVP_Keys.length; i++) {
      this.RVP_Values.push(RVP_DataObj[this.RVP_Keys[i]]);
      if (this.RVP_Keys[i].substring(0, 2) == "V_") {

      } else {
        this.RVP_labels.push(this.RVP_Keys[i].replace(new RegExp('_', 'g'), ' '));
      }
    }

    console.log(this.RVP_labels);
    for(let i = 0; i<this.RVP_labels.length; i++){
      this.getOptional_values(this.RVP_labels[i]);
      this.set_fieldType_OLD(this.RVP_labels[i]);
    }
    this.set_fieldType();
    this.set_fieldWidth();
    console.log(this.options);
    console.log(this.formWidth);
    console.log(this.fieldType);
    //this.rewriteOld_data();
  }
  
  set_fieldWidth(): any{
    //--------Setting MAX_COL_PER_PAGE as width---------//
    var allWidths = this.Form_Data["MAX_COL_PER_PAGE"][0].split(",");
    var total = 0;

    console.log(allWidths);
    for(let i=0; i<allWidths.length; i++){
      console.log(allWidths[i]);
      allWidths[i] = allWidths[i].split('\'').join('');
      console.log(allWidths[i]);
      total+=(100/(parseInt(allWidths[i])));
      this.formWidth[this.RVP_labels[i]] = (100/(parseInt(allWidths[i])))-2.5;
      this.totalWidth_rep += (100/(parseInt(allWidths[i])))-2.5;
      if(total>=100 && this.margin===0){
        this.margin = 2.5/(i+1);
      }
    }
    this.totalWidth_rep += this.margin*allWidths.length;
    
  }
  onChange_PhoneDash(event): any{
    console.log("Value changed");
    var setVal = event.toString();
    if(setVal.length < 11){
      let noDash = setVal.split('-').join('');
      if (noDash.length > 0) {
        noDash = noDash.match(new RegExp('.{1,3}', 'g')).join('-');
      }
      console.log(noDash);
      this.phoneDash_Input = noDash;
    }
    
  }

  allow_PhoneDash_format(event): any{
    return (event.charCode>=48 && event.charCode<=57)||event.charCode==45;
    
  }
  set_fieldType(): any {
    var test = {};
    var allTypes = this.Form_Data["FLD_TYPE"][0].split(",");
    for(let i=0; i<this.RVP_labels.length; i++){
      var temp = allTypes[i].trim();
      test[this.RVP_labels[i]] = temp.substring(1,temp.length-1);
    }
    console.log(test);
  }

  rewriteOld_data() {
    const url = this.apiUrlGet + 'V_Table_Name=' + this.V_TABLE_NAME + '&V_Schema_Name=' + this.V_SCHEMA_NAME + '&V_Key_Names=' + this.V_KEY_NAME + '&V_Key_Values=' + this.V_KEY_VALUE + '&V_SRVC_CD=' + this.V_SRVC_CD + '&V_USR_NM=' + this.V_USR_NM + '&V_SRC_CD=' + this.V_SRC_CD + '&V_PRCS_ID=' + this.V_PRCS_ID + '&REST_Service=Forms_Record&Verb=GET';
    const encoded_url = encodeURI(url);
    console.log(encoded_url);
    this.http.get(encoded_url).subscribe(
      res => {
        console.log(res);
        this.V_ID = res['V_ID'];
        this.Initial_record = {
          "Field_Names": this.Field_Names,
          "Field_Values": this.Field_Values,
          "V_Table_Name": this.V_TABLE_NAME,
          "V_Schema_Name": this.V_SCHEMA_NAME,
          "V_SRVC_CD": this.V_SRVC_CD,
          "V_USR_NM": this.V_USR_NM,
          "V_SRC_CD": this.V_SRC_CD,
          "V_PRCS_ID": this.V_PRCS_ID,
        }
      });
  }

  getOptional_values(V_PARAM_NM){
    const url = this.apiUrlGet + 'V_SRC_CD=' + this.V_SRC_CD + '&V_APP_CD=' + this.SL_APP_CD + '&V_PRCS_CD=' + this.SL_PRC_CD + '&V_PARAM_NM=' + V_PARAM_NM + '&V_SRVC_CD=' + this.V_SRVC_CD + '&REST_Service=ProcessParametersOptions&Verb=GET';
    const encoded_url = encodeURI(url);
    console.log(encoded_url);
    console.log("Option Values: "+ V_PARAM_NM);
    this.http.get(encoded_url).subscribe(
      res => {
        console.log(res);
        this.options[V_PARAM_NM] = res[V_PARAM_NM];
      });
  }

  set_fieldType_OLD(parameter:string){
    var initParam = parameter;
    parameter = parameter.replace(new RegExp(' ', 'g'), '_');
    parameter = parameter.toLowerCase();
    if(parameter.startsWith("date_") || parameter.endsWith("_date")){
      console.log("Field type : Date");
      this.fieldType[initParam] = 'date';
    }
    else if(parameter.includes("password")){
      console.log("Field Type: Password");
      this.fieldType[initParam] = 'password';
    }
    else{
      this.fieldType[initParam] = 'plain';
      //this.fieldType[initParam] = 'Phone Dash';
    }
  }

}
