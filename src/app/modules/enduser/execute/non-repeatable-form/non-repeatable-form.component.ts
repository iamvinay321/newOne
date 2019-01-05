import { Component, OnInit } from '@angular/core';
import { GetFormData } from '../getDataForm';
import { StorageSessionService } from '../../../../service/storage-session.service';

import { EndUserService } from '../../../../service/EndUser-service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Globals } from '../../../../service/globals';
import { HttpClient } from '@angular/common/http'
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material';
@Component({
  selector: 'app-non-repeatable-form',
  templateUrl: './non-repeatable-form.component.html',
  styleUrls: ['./non-repeatable-form.component.css']
})
export class NonRepeatableFormComponent implements OnInit {

  // domain_name = this.globals.domain_name;
  //  private apiUrlGet = "https://" + this.domain_name + "/rest/E_DB/SP?";
  private formData: GetFormData;
  domain_name = this.globals.domain_name;
  private apiUrlGet = 'https://' + this.domain_name + '/rest/E_DB/SP?';
  V_SRC_CD = this.StorageSessionService.getSession('agency');
  V_USR_NM = this.StorageSessionService.getSession('email');
  public form: FormGroup;
  public param: any;
  dataSource = new MatTableDataSource<TableFormRVP>();
  editing = true;
  displayedColumns = ['V_USR_NM', 'Program_Manager', 'Program_Score', 'Program_Start_Date', 'Program_Status', 'Program_Trend', 'Program_Type'];
  ctrl_variables: Object;
  Form_Data: any;
  PVP: any;
  V_TABLE_NAME: any;
  V_SCHEMA_NAME: any;
  V_KEY_NAME: string;
  V_KEY_VALUE: string;
  V_SRVC_CD: any;
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
  tm: any = {};
  tp: any;
  td: any[];
  tableData: any[];
  g: any;
  constructor(
    private StorageSessionService: StorageSessionService,
    private http: HttpClient,
    private router: Router,
    private globals: Globals
  ) {

  }

  ngOnInit() {
    
    this.http.get('../../../../assets/control-variable.json').subscribe(res => {
      this.ctrl_variables = res;
      console.log(res);
    });
    this.getFormData();
  }

  getFormData(): any {
    this.Form_Data = this.StorageSessionService.getCookies('report_table');
    console.info('The form data stored in local storage: ');
    console.log(this.Form_Data);
    this.PVP = JSON.parse(this.Form_Data['PVP'][0]);
    console.log(this.PVP);
    /*
          Checking the old table
    */
    if ('V_Table_Name' in this.PVP) {
      this.V_TABLE_NAME = this.PVP['V_Table_Name'][0];
      if (this.V_TABLE_NAME == null) {
        this.V_TABLE_NAME = '';
      }
    }
    if ('V_Schema_Name' in this.PVP) {
      this.V_SCHEMA_NAME = this.PVP['V_Schema_Name'][0];
      if (this.V_SCHEMA_NAME == null) {
        this.V_SCHEMA_NAME = '';
      }
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

    this.Check_RPT_NRPT = this.StorageSessionService.getCookies('report_table')['V_EXE_CD'][0];

    this.RVP_Data = this.StorageSessionService.getCookies('report_table')['RVP'];
    console.log("Field Data 1:");
    console.log(JSON.parse(this.RVP_Data));
    var RVP_DataObj = JSON.parse(this.RVP_Data);
    var key_array = Object.keys(RVP_DataObj);

    this.Field_Names = '';
    for (let i = 0; i < key_array.length; i++) {
      if (i != 0) {
        this.Field_Names += '|';
        this.Field_Values += '|';
      }
      this.Field_Names += "\"" + key_array[i] + "\"";
      this.Field_Values += "\"" + RVP_DataObj[key_array[i]] + "\"";
    }
    this.V_SRVC_ID = this.StorageSessionService.getCookies('report_table')['SRVC_ID'][0];

    this.V_UNIQUE_ID = this.StorageSessionService.getCookies('report_table')['UNIQUE_ID'];

    this.SL_APP_CD = this.StorageSessionService.getCookies('executedata')['SL_APP_CD'];

    this.SL_PRC_CD = this.StorageSessionService.getCookies('executedata')['SL_PRC_CD'];

    this.s_data = this.RVP_Data;
    this.RVP_Data.push('V_abcd');
    this.Field_Names += '|\"V_abcd\"';
    this.Field_Values += '|\"\"';
    console.log("Field_Names");
    console.log(this.Field_Names);
    console.log("Field_Values");
    console.log(this.Field_Values);
    console.log(this.RVP_Data);
    this.RVP_Data = this.RVP_Data.filter(function (item) {
      return item.indexOf('V_') !== 0;
    });
    const l = this.s_data.length - this.RVP_Data.length;
    if (this.s_data.length > l) {
      this.s_data.splice(0, this.s_data.length - l);
    }
    this.s_data.pop();
    for (let i = 0; i < this.s_data.length; i++) {
      this.s_data[i] = this.s_data[i].split(' ').join('_');
    }
    for (let i = 0; i < this.s_data.length; i++) {
      if (this.s_data[i] in this.PVP) {
        if (this.PVP[this.s_data[i]][0] == null || this.PVP[this.s_data[i]][0] === '') {
          this.tp[this.s_data[i]] = '||';
        } else {
          this.tp[this.s_data[i]] = this.PVP[this.s_data[i]][0];
        }
      }
    }
    var displayedColumnsClone = Object.keys(JSON.parse(this.RVP_Data));
    this.Check_RPT_NRPT === 'NONREPEATABLE_MANUAL_TASK' ? this.action = false : this.action = true;
    console.log(this.Check_RPT_NRPT);
    if (displayedColumnsClone.length > 0) {
      this.displayedColumns = displayedColumnsClone;
      const index1 = displayedColumnsClone.indexOf('V_USR_NM');
      if (index1 !== -1) {
        displayedColumnsClone.splice(index1, 1);
        this.displayedColumns = displayedColumnsClone;
      }
      const index2 = displayedColumnsClone.indexOf('V_PRCS_ID');
      if (index2 !== -1) {
        displayedColumnsClone.splice(index2, 1);
        this.displayedColumns = displayedColumnsClone;
      }
      const index3 = displayedColumnsClone.indexOf('V_SRC_CD');
      if (index3 !== -1) {
        displayedColumnsClone.splice(index3, 1);
        this.displayedColumns = displayedColumnsClone;
      }
      const index4 = displayedColumnsClone.indexOf('V_SRVC_CD');
      if (index4 !== -1) {
        displayedColumnsClone.splice(index4, 1);
        this.displayedColumns = displayedColumnsClone;
      }
      const index5 = displayedColumnsClone.indexOf('V_Key_Value');
      if (index5 !== -1) {
        displayedColumnsClone.splice(index5, 1);
        this.displayedColumns = displayedColumnsClone;
      }
      const index6 = displayedColumnsClone.indexOf('V_Key_Name');
      if (index6 !== -1) {
        displayedColumnsClone.splice(index6, 1);
        this.displayedColumns = displayedColumnsClone;
      }
      if (this.action)
        this.displayedColumns.push('action');
      //---------Removed Action Label & tick icon from non-repeatable form----------//
    }
    // debugger;
    console.log('Columns to Display : ', this.displayedColumns);

    console.log(this.tp);
    console.log(this.RVP_Data);


    this.srvc_cd = this.Form_Data['SRVC_CD'];
    this.srvc_cd_sl = this.srvc_cd[0];
    for (let i = 0; i < this.RVP_Data.length; i++) {
      this.tm[this.RVP_Data[i]] = ' ';
    }

    this.tableFieldValue();

  }
  initvalObj:{} = {};
  tableFieldValue() {
    if (this.V_TABLE_NAME !== '') {
      const url = this.apiUrlGet + 'V_Table_Name=' + this.V_TABLE_NAME + '&V_Schema_Name=' + this.V_SCHEMA_NAME + '&V_Key_Names=' + this.V_KEY_NAME + '&V_Key_Values=' + this.V_KEY_VALUE + '&V_SRVC_CD=' + this.V_SRVC_CD + '&V_USR_NM=' + this.V_USR_NM + '&V_SRC_CD=' + this.V_SRC_CD + '&V_PRCS_ID=' + this.V_PRCS_ID + '&REST_Service=Forms_Record&Verb=GET';
      const encoded_url = encodeURI(url);
      console.log(encoded_url);
      this.http.get(encoded_url).subscribe(
        res => {
          console.info('This is old Table response API:');
          console.log(res);
          var initvalues = res;
          
          for (let i = 0; i < this.displayedColumns.length; i++) {
            const k = this.displayedColumns[i].split(' ').join('_');
            if (k in initvalues) {
              this.initvalObj[this.displayedColumns[i]] = initvalues[k];
            }
          }
          this.initvalObj['V_ID'] = initvalues['V_ID'];
          console.log(this.initvalObj);
          console.log('this.displayedColumns', this.displayedColumns);


          this.td = [];
          const l = this.initvalObj[this.displayedColumns[0]].length;
          console.log(l);
          for (let j = 0; j < l; j++) {
            this.tm = {};
            for (let i = 0; i < this.displayedColumns.length - 1; i++) {
              this.tm[this.displayedColumns[i]] = this.initvalObj[this.displayedColumns[i]][j];
            }
            this.tm['id'] = this.g;
            this.tm['show'] = true;
            this.tm['up'] = false;
            this.tm['V_ID'] = this.initvalObj['V_ID'][j];
            this.g = this.g + 1;
            this.td.push(this.tm);
          }
          this.g = this.g - 1;
          console.log(this.td);
          this.tableData = this.td;
          console.info('Test table-------------->');
          console.log(this.tableData);
          Object.assign(this.tm, JSON.parse(this.RVP_Data));
          this.td.push(this.tm);
          console.log('this.displayedColumns', this.displayedColumns);
          this.dataSource = new MatTableDataSource(this.td);
          console.log('tableDataqqq', this.dataSource)
          if (this.td.length == 0) {
            this.tm = {};
            this.td = [];

            for (let i = 0; i < this.displayedColumns.length - 1; i++) {
              this.tm[this.displayedColumns[i]] = '';
            }
            this.tm['id'] = this.g;
            this.tm['show'] = false;
            this.tm['up'] = false;
            console.log('this.displayedColumns', this.displayedColumns);
            Object.assign(this.tm, JSON.parse(this.RVP_Data));
            this.td.push(this.tm);
            this.dataSource = new MatTableDataSource(this.td);
          }
        });
    } else {
      this.tm = {};
      this.td = [];

      for (let i = 0; i < this.displayedColumns.length - 1; i++) {
        this.tm[this.displayedColumns[i]] = '';
      }
      this.tm['id'] = this.g;
      this.tm['show'] = false;
      this.tm['up'] = false;
      Object.assign(this.tm, JSON.parse(this.RVP_Data));
      this.td.push(this.tm);
      // this.td.push(JSON.parse(this.RVP_Data));
      console.log(this.td);
      this.dataSource = new MatTableDataSource(this.td);
      console.log('tableData', this.dataSource);
    }
  }
  onSubmit() {

  }
  cancelbtn_click() {
    console.log('cancelbtn_click');
  }
  submitbtn_click() {
    console.log('submitbtn_click');
  }

}
export interface TableFormRVP {
  Program_Manager: any;
  ALF_Phase: any;
  Program_Deputy: any;
  PAE: any;
  Assistant_Program_Manager: any;
  Office: any;
  Program_Level: any;
  Program_Type: any;
  SubType: any;
  Program_LoB: any;
  Program_Description: any;
  Program_Status: any;
  Program_Score: any;
  Program_Trend: any;
  Program_Start_Date: any;
  Program_End_Date: any;
  LCCE: any;
  EAC: any;
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
export class ReportData {
  PARAM_NM: string[];
  PARAM_VAL: string[];
  RESULT: string;
  V_EXE_CD: string[];
  CONT_ON_ERR_FLG: string[];

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
