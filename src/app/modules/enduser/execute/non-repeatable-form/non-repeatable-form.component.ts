import { Component, OnInit } from '@angular/core';
//import { GetFormData } from '../getDataForm';
import { StorageSessionService } from '../../../../service/storage-session.service';
import { FormComponent } from '../form/form.component';
import { AppComponent } from '../../../../app.component';

import { EndUserService } from '../../../../service/EndUser-service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Globals } from '../../../../service/globals';
import { HttpClient } from '@angular/common/http'
import { Router } from '@angular/router';
import * as dateFormat from 'dateformat';
import { HostListener, ChangeDetectorRef, ViewChild } from "@angular/core";
import { MatTableDataSource } from '@angular/material';
import { getISODayOfWeek } from 'ngx-bootstrap/chronos/units/day-of-week';
import { encode } from 'punycode';
import { CommonUtils } from '../../../../common/utils';
import { ConfigServiceService } from '../../../../service/config-service.service';
@Component({
  selector: 'app-non-repeatable-form',
  templateUrl: './non-repeatable-form.component.html',
  styleUrls: ['./non-repeatable-form.component.css']
})
export class NonRepeatableFormComponent extends FormComponent implements OnInit {

  // domain_name = this.globals.domain_name;
  //  private apiUrlGet = "https://" + this.domain_name + "/rest/E_DB/SP?";
  public param: any;
  mobileView = false;
  editing = true;
  ctrl_variables: any;
  input: any[] = [];
  V_PVP: any;
  Field_Length: any;
  currentDate: string;
  PVP_Updated: any = {};
  date_value: any;
  dateEntry: any;
  screenHeight: number;
  screenWidth: number;
  desktopView: boolean = true;
  @ViewChild('nrpForm') nrpForm: any;
  constructor(
    public StorageSessionService: StorageSessionService,
    public app: AppComponent,
    public http: HttpClient,
    public router: Router,
    public globals: Globals,
    public cdr: ChangeDetectorRef,
    public configService: ConfigServiceService,
  ) {
    super(StorageSessionService, http, router, globals, app, cdr, configService);
  }
  @HostListener('window:resize', ['$event'])
  onResize(event?) {
    this.screenHeight = window.innerHeight;
    this.screenWidth = window.innerWidth;
    if (this.screenWidth <= 900) {
      this.mobileView = true;
      this.desktopView = false;
    } else {
      this.mobileView = false;
      this.desktopView = true;
    }
  }
  ngOnInit() {
    this.registerDataChangeHandler(this.updateInput.bind(this));
    this.screenHeight = window.innerHeight;
    this.screenWidth = window.innerWidth;
    if (this.screenWidth <= 900) {
      this.mobileView = true;
      this.desktopView = false;
    } else {
      this.mobileView = false;
      this.desktopView = true;
    }
    this.getFormData();
    this.updateInput();

  }

  updateInput() {
    for (let i = 0; i < this.RVP_labels.length; i++) {
      this.input[this.RVP_labels[i]] = this.RVP_DataObj[this.RVP_labels[i].split(" ").join("_")][0];
    }

    this.Field_Names = '';
    this.Field_Values = "";
    for (let i = 0; i < this.RVP_Keys.length; i++) {
      if (i != 0) {
        this.Field_Names += '|';
        this.Field_Values += '|';
      }
      this.Field_Names += "`" + this.RVP_Keys[i] + "`";
      this.Field_Values += "'" + this.RVP_DataObj[this.RVP_Keys[i]] + "'";
    }
  }

  prepareFieldValues() {
    let values = [];
    for (let i = 0; i < this.RVP_Keys.length; i++) {
      const Field_Value = "'" + this.input[this.RVP_labels[i]] + "'";
      values.push(Field_Value);
    }
    return values.join("|");
  }

  onSubmit() {
    if (this.nrpForm.valid) {
      if (this.V_TABLE_NAME !== '') {
        this.submit_formsRecord();
      } else {
        this.build_PVP();
      }
    }
  }

  submit_formsRecord() {
    let body_FORMrec = {
      "Field_Names": this.Field_Names,
      "Field_Values": this.prepareFieldValues(),
      "V_Table_Name": this.V_TABLE_NAME,
      "V_Schema_Name": this.V_SCHEMA_NAME,
      // "V_Key_Names": this.V_KEY_NAME,
      // "V_Key_Values": this.V_KEY_VALUE,
      "V_SRVC_CD": this.V_SRVC_CD,
      "V_USR_NM": this.V_USR_NM,
      "V_SRC_CD": this.V_SRC_CD,
      "V_PRCS_ID": this.V_PRCS_ID,
      "REST_Service": "Forms_Record",
      "Verb": "POST"
    }
    this.http.post(this.apiUrlGet, body_FORMrec).subscribe(
      res => {
        ("Response:\n" + res);
        this.build_PVP();
        (body_FORMrec);
      });
    err => {
      ("Error in form record post request:\n" + err);
    }
  }

  build_PVP() {
    this.currentDate = dateFormat(new Date(), "ddd mmm dd yyyy hh:MM:ss TT o");
    //-------Update PVP--------//

    for (let i = 0; i < this.RVP_labels.length; i++) {
      let val = this.input[this.RVP_labels[i]];
      if (CommonUtils.isValidValue(val)) {
        val = val.toString();
      }
      this.PVP_Updated[this.RVP_labels[i].split(" ").join("_")] = val;
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
    
    
    this.http.post("https://" + this.domain_name + "/rest/Submit/FormSubmit", body_buildPVP).subscribe(
      res => {
        (res);
        this.invoke_router(res);
      });
  }

  onCancel() {
    ("Cancelled");
    this.router.navigateByUrl("End_User");
  }

}
