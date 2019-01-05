import {Component, OnInit} from '@angular/core';
import {GetFormData} from '../getDataForm';
import {StorageSessionService} from '../../../../service/storage-session.service';

import {EndUserService} from '../../../../service/EndUser-service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Globals} from '../../../../service/globals';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

@Component({
  selector: 'app-repeatable-form',
  templateUrl: './repeatable-form.component.html',
  styleUrls: ['./repeatable-form.component.css']
})
export class RepeatableFormComponent implements OnInit {
// domain_name = this.globals.domain_name;
  //  private apiUrlGet = "https://" + this.domain_name + "/rest/E_DB/SP?";
  formData: GetFormData;
  public form: FormGroup;
  public tableDispl: FormGroup;
  public param: any[] = [];
  public keys: any[] = [];
  public dynamicForm: any[] = [];
  public dynamicFormRe: any[] = [];

  constructor(private storage: StorageSessionService,
              private http: HttpClient,
              private router: Router) {
    this.formData = new GetFormData(this.storage, this.http);
    this.param = this.formData.getFormParameter();
    this.getFormParAndTableCheck();
    const group: any = {};
    this.param.forEach((e) => {
      group[e] = new FormControl();
    });
    this.form = new FormGroup(group);
  }

  getFormParAndTableCheck() {
    let form = new ReportData();
    console.info('Table name and form checking in PVP');
    const tmp = this.storage.getCookies('report_table')['PVP'][0];
    console.log(JSON.parse(tmp));
    form = JSON.parse(tmp);
    console.log('Data=');
    console.log(form);

    if (form.V_Table_Name[0] != '' && form.V_Table_Name[0] != undefined) {
      this.formData.fetchingFormData(form, this);
    }
  }

  onSubmit() {
    console.log(JSON.stringify(this.form.value));
    this.formData.submitForm(JSON.stringify(this.form.value), this);
  }

  displayTableForm(data: any[]): void {
    const dt = JSON.stringify(data);
    const dt1: any[] = JSON.parse(dt);
    const keys: any[] = Object.keys(data);
    this.keys = Object.keys(data);
    const dt2: any[] = dt1[keys[0]];
    const dynamicForm: any[] = [];
    // iterating for keys values
    dt2.forEach(function (e, i) {
      //iterating for keys each time
      const group: any = {};
      keys.forEach(function (el, j) {
        console.log('the key name is =' + el + ' the values is=' + dt1[el][i]);
        group[el] = dt1[el][i];
      });
      dynamicForm.push(group);
    });
    this.dynamicForm = dynamicForm;
  }

  checkBoxClickValue(form, value): void {
    console.log('a form is =');
    console.log(form);
    console.log(value);
    console.log('array contains or not form');
    console.log(this.dynamicForm.includes(form));
  }

  /*
    add form
  */
  addForm(form): void {
    console.log('add form call');
    console.log(form);
  }

  /*
    update form
  */
  updateForm(form): void {
    console.log('update form call');
    console.log(form);
  }

  /*
   delete form
  */
  deleteForm(form): void {
    console.log('delete form call');
    console.log(form);
  }

  /*
    call again getFormParameter method after form
    submited , and its contains the table name
  */
  formSubmitResponse(result, data: any[]): void {
    if (result) {
      let reportData = new ReportData();
      console.log(data);
      const dt = JSON.stringify(data);
      reportData = JSON.parse(dt);
      console.log(reportData);
      if (reportData.RESULT == 'INPUT_ARTFCT_TASK') {

        this.router.navigateByUrl('InputArtForm');

      } else if (reportData.RESULT == 'FORM' && reportData.V_EXE_CD[0] == 'NONREPEATABLE_MANUAL_TASK') {
        // non-Repeatable NonRepeatForm
        this.router.navigateByUrl('NonRepeatForm');

      } else if (reportData.RESULT == 'FORM' && reportData.V_EXE_CD[0] == 'REPEATABLE_MANUAL_TASK') {
        //Repeatable

        this.router.navigateByUrl('RepeatForm');
      } else if (reportData.RESULT == 'TABLE') {

        this.router.navigateByUrl('ReportTable');
      }
    }
  }

  ngOnInit() {
  }
  cancelbtn_click() {
    console.log('cancelbtn_click');
  }
  submitbtn_click() {
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
