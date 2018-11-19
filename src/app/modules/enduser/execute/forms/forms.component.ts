import { MatTableDataSource } from '@angular/material';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { StorageSessionService } from '../../../../service/storage-session.service';
import * as dateFormat from 'dateformat';
import { Globals } from './../../../../service/globals';
import { Headers, RequestMethod, RequestOptions } from '@angular/http';
import { FileUrls,FileUrlProcessing } from './POJO';
import  { Http} from '@angular/http';
import { FormBuild } from './FormBuild';
import { EndUserService} from '../../../../service/EndUser-service';
@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.css'],
})

export class FormsComponent implements OnInit,FileUrlProcessing {
  domain_name = this.globals.domain_name; private apiUrlGet = "https://" + this.domain_name + "/rest/E_DB/SP?";
  // url='http://54.84.87.15/home/ubuntu/apache-tomcat-900M26/webapps';
  url = "http://ec2-54-84-87-15.compute-1.amazonaws.com/home/ubuntu/apache-tomcat-9.0.0.M26/webapps";
  progress: boolean = false;
  fileName = "";
  fileType = "";
  tnames: any;
  tvalues: any;
  selectedradiobtn: string = "";
  initvalues = {};
  initvalues1 = {};
  PVPS = "";
  PVP = {};
  filesdata = {};
  fd: any[] = [];
  Form_Data: any;
  Field_Data: any[];
  FormData: any[];
  DisplayFields: any[] = [];
  Check_RPT_NRPT: string = "";
  srvc_cd: any[];
  srvc_cd_sl = "";
  tabledata: Array<any> = [];
  tm = {};
  tp = {};
  td: any[] = [];
  dataSource = new MatTableDataSource();
  dataSource1 = new MatTableDataSource();
  newAttribute: any = [];
  a: boolean;
  checkinput = "";
  Data: any[] = [];
  SL_APP_CD: any[] = [];
  SL_PRC_CD: any[] = [];
  options: any[] = [];
  displayedColumns: any[] = [];
  displayedColumns1: any[] = [];
  dat: string = "";
  V_PRCS_TXN_ID: string = "";
  V_SRVC_ID: any[];
  V_APP_ID: string = "";
  V_SRC_ID: string = "";
  V_UNIQUE_ID: string = "";
  V_PRCS_ID: string = "";
  V_SRVC_CD: string = "";
  V_PVP: string = "";
  V_TABLE_NAME = '';
  V_SCHEMA_NAME = '';
  V_KEY_NAME = '';
  V_KEY_NAMEA = "";
  V_KEY_VALUE = '';
  V_KEY_VALUEA = '';
  V_PVPP = "";
  V_ID = "";
  Field_Names = "";
  Field_Values = "";
  d = "";
  g = 0;
  f = 0;
  s_data: any[];
  artf: boolean = false;
  result: any = "";
  col1: string = "";
  col2: string = "";
  col3: string = "";
  col4: string = "";
  urll = "";
  artfct_nm: any[] = []
  V_SCOPE_LMTNG_CD: string = "";
  V_SCOPE_LMTNG_LVL: string = "";
  V_USR_GRP_ID = 0;
  //@ override 
  public filesUrl: FileUrls;
  constructor(private dataStored: StorageSessionService,
    private route: Router, private globals: Globals,
    private http: HttpClient,
    private htp:Http,
    private StorageSessionService: StorageSessionService,
    private endUser:EndUserService
  ) {
    this.filesUrl = new FileUrls(this.StorageSessionService);
   }
  V_SRC_CD = this.StorageSessionService.getSession("agency");
  V_USR_NM = this.StorageSessionService.getSession("email");
  
  public formBuild:FormBuild=new FormBuild();
  getFormData() {
    this.Form_Data = this.dataStored.getCookies('report_table');
    console.info("The form data stored in local storage: ");
    console.log(this.Form_Data);
    this.formBuild.buildFormData(this);
    this.result = this.Form_Data["RESULT"][0];
    if (this.result == "INPUT_ARTFCT_TASK") {
      this.PVPS = this.Form_Data['PVP'][0];
      this.PVP = JSON.parse(this.PVPS);
      this.artf = true;
      this.srvc_cd = this.Form_Data['SRVC_CD'];
      this.srvc_cd_sl = this.srvc_cd[0];
      this.col1 = this.V_SRC_CD;
      this.col2 = this.Form_Data["APP_CD"][0];
      this.col3 = this.Form_Data["PRCS_CD"][0];
      this.col4 = this.Form_Data['SRVC_CD'][0];
      this.V_USR_GRP_ID = this.Form_Data['USR_GRP_ID'][0];
      this.V_UNIQUE_ID = this.Form_Data['TEMP_UNIQUE_ID'][0];
      this.V_PRCS_TXN_ID = this.PVP["V_PRCS_TXN_ID"][0];
      this.V_APP_ID = this.PVP['V_APP_ID'][0];
      this.V_SRC_ID = this.PVP['V_SRC_ID'][0];
      this.V_PRCS_ID = this.PVP['V_PRCS_ID'][0];
      console.log(this.col1 + this.col2 + this.col3 + this.col4 + this.V_USR_GRP_ID + this.V_UNIQUE_ID + this.V_PRCS_TXN_ID + this.V_PRCS_ID + this.V_SRC_ID + this.V_APP_ID);
      this.oldfiles();
      this.displayedColumns1 = ["Select Files-"]
    }
    else {
      this.PVPS = this.Form_Data['PVP'][0];
      this.PVP = JSON.parse(this.PVPS);
      console.info("----------------------->");
        console.log(this.PVP);
/*
      Checking the old table 
*/
      if ("V_Table_Name" in this.PVP) {
        this.V_TABLE_NAME = this.PVP["V_Table_Name"][0];
        console.info("V_TABLE_NAME --------------------->");
        console.log(this.V_TABLE_NAME);
        if (this.V_TABLE_NAME == null) {
          this.V_TABLE_NAME = "";
        }
      }
      if ("V_Schema_Name" in this.PVP) {
        this.V_SCHEMA_NAME = this.PVP["V_Schema_Name"][0];
        if (this.V_SCHEMA_NAME == null) {
          this.V_SCHEMA_NAME = "";
        }
      }
      if ("V_Key_Names" in this.PVP) {
        this.V_KEY_NAMEA = this.PVP["V_Key_Names"];
        for (var i = 0; i < this.V_KEY_NAMEA.length; i++) {
          this.V_KEY_NAME += this.V_KEY_NAMEA[i] + "|";
        }

        if (this.V_KEY_NAME == null || this.V_KEY_NAME == "|") {
          this.V_KEY_NAME = "";
        }
        this.V_KEY_NAME = this.V_KEY_NAME.slice(0, -1);
      }

      if ("0" in this.PVP) {
        this.V_KEY_VALUEA = this.PVP["V_Key_Values"];
        for (var i = 0; i < this.V_KEY_VALUEA.length; i++) {
          this.V_KEY_VALUE += this.V_KEY_VALUEA[i] + "|";
        }

        if (this.V_KEY_VALUE == null || this.V_KEY_VALUE == "|") {
          this.V_KEY_VALUE = "";
        }
        this.V_KEY_VALUE = this.V_KEY_VALUE.slice(0, -1);
      }

      this.V_SRVC_CD = this.PVP["V_SRVC_CD"][0];
      console.info("This is completed data of V_TABLE_NAME parameter :");
      console.log("V_SRVC_CD=>" + this.V_SRVC_CD + "V_TABLE_NAME=>" + this.V_TABLE_NAME + "V_KEY_NAME=>" + this.V_KEY_NAME + "V_KEY_VALUE=>" + this.V_KEY_VALUE + "V_SCHEMA_NAME=>" + this.V_SCHEMA_NAME);



      this.V_PRCS_TXN_ID = this.PVP["V_PRCS_TXN_ID"][0];

      this.V_APP_ID = this.PVP['V_APP_ID'][0];

      this.V_SRC_ID = this.PVP['V_SRC_ID'][0];

      this.V_PRCS_ID = this.PVP['V_PRCS_ID'][0];

      this.Check_RPT_NRPT = this.dataStored.getCookies('report_table')['V_EXE_CD'][0];

      this.Field_Data = this.dataStored.getCookies('report_table')['PARAM_NM'];

      this.V_SRVC_ID = this.dataStored.getCookies('report_table')['SRVC_ID'][0];

      this.V_UNIQUE_ID = this.dataStored.getCookies('report_table')['UNIQUE_ID'];

      this.SL_APP_CD = this.dataStored.getCookies('executedata')['SL_APP_CD'];

      this.SL_PRC_CD = this.dataStored.getCookies('executedata')['SL_PRC_CD'];

      this.s_data = this.Field_Data;

      this.Field_Data.push("V_abcd");
      console.log(this.Field_Data);

      this.Field_Data = this.Field_Data.filter(function (item) {
        return item.indexOf("V_" || "v_") !== 0;
      });

      var l = this.s_data.length - this.Field_Data.length;
      if (this.s_data.length > l) {
        this.s_data.splice(0, this.s_data.length - l);
      }
      this.s_data.pop();
      for (var i = 0; i < this.s_data.length; i++) {
        this.s_data[i] = this.s_data[i].split(" ").join("_");
      }
      for (var i = 0; i < this.s_data.length; i++) {
        if (this.s_data[i] in this.PVP) {
          if (this.PVP[this.s_data[i]][0] == null || this.PVP[this.s_data[i]][0] == "") {
            this.tp[this.s_data[i]] = "||";
          }
          else {
            this.tp[this.s_data[i]] = this.PVP[this.s_data[i]][0];
          }
        }
      }

      for (let k = 0; k < this.Field_Data.length; k++) {
        console.log("spliting");
        this.Field_Data[k] = this.Field_Data[k].split("_").join(" ");
      }

      this.displayedColumns = this.Field_Data;
      this.displayedColumns.push("action");

      console.log(this.tp);
      console.log(this.Field_Data);

      this.srvc_cd = this.Form_Data['SRVC_CD'];
      this.srvc_cd_sl = this.srvc_cd[0];
      for (let i = 0; i < this.Field_Data.length; i++) {
        this.tm[this.Field_Data[i]] = ' ';
      }
      this.Check_RPT_NRPT == "NONREPEATABLE_MANUAL_TASK" ? this.a = false : this.a = true;
      console.log(this.Check_RPT_NRPT);
      this.tableFieldValue();
    }
  }
  makeurl(r: string) {
    if (r == 'agency') {
      this.urll = this.url + '/' + this.V_SRC_CD.split(' ').join('_');
      this.V_SCOPE_LMTNG_LVL = r;
      this.V_SCOPE_LMTNG_CD = this.V_SRC_CD;
      this.filesUrl.setFileUrl(this.V_SRC_CD);
    }
    else if (r == 'application') {
      this.urll = this.url + '/' + this.V_SRC_CD.split(' ').join('_') + '/' + this.Form_Data["APP_CD"][0].split(' ').join('_');
      this.V_SCOPE_LMTNG_LVL = r;
      this.V_SCOPE_LMTNG_CD = this.Form_Data["APP_CD"][0];
      this.filesUrl.setFileUrl(this.V_SRC_CD + "/" + '/' + this.Form_Data["APP_CD"][0]);
    }
    else if (r == 'process') {
      this.urll = this.url + '/' + this.V_SRC_CD.split(' ').join('_') + '/' + this.Form_Data["APP_CD"][0].split(' ').join('_') + '/' + this.Form_Data["PRCS_CD"][0].split(' ').join('_');
      this.V_SCOPE_LMTNG_LVL = r;
      this.V_SCOPE_LMTNG_CD = this.Form_Data["PRCS_CD"][0];
      this.filesUrl.setFileUrl(this.V_SRC_CD + "/" + '/' + this.Form_Data["APP_CD"][0] + "/" + this.Form_Data["PRCS_CD"][0]);
    }
    else if (r == 'service') {
      this.urll = this.url + '/' + this.V_SRC_CD.split(' ').join('_') + '/' + this.Form_Data["APP_CD"][0].split(' ').join('_') + '/' + this.Form_Data["PRCS_CD"][0].split(' ').join('_') + '/' + this.Form_Data['SRVC_CD'][0].split(' ').join('_');
      this.V_SCOPE_LMTNG_LVL = r;
      this.V_SCOPE_LMTNG_CD = this.Form_Data["SRVC_CD"][0];
      this.filesUrl.setFileUrl(this.V_SRC_CD + "/" + '/' + this.Form_Data["APP_CD"][0] + "/" + this.Form_Data["PRCS_CD"][0] + "/" + this.Form_Data['SRVC_CD'][0]);
    }
    console.log(encodeURI(this.urll));
    this.urll = encodeURI(this.urll);
    console.log(this.urll);
    console.info("This is File URSL:");
    console.log(this.filesUrl.getFileUrl());
  }
  selectedFile: File = null;
  onFileSelected(event) {
    console.log(event.target.files);
    this.selectedFile = <File>event.target.files[0];
    this.fileName = this.selectedFile.name;
    this.fileType = this.selectedFile.type;
    console.log(this.selectedFile + this.fileName + this.fileType);
    /*
    @Calling both API on ADD Button Click 
    */
    this.onUpload();
    this.addbtn_click();
    setTimeout(()=>{    
      this.oldfiles();
 }, 3000);
   
  }
  /*
    Upload the file
  */
  onUpload() {
    console.log("This is file url :" + this.filesUrl.getFileUrl());

    let formData: FormData = new FormData();
    let file: any = {};
    file['File_Path'] = this.filesUrl.getFileUrl();
    file['File_Name'] = this.fileName;
    formData.append('Source_File', this.selectedFile);
    formData.append("FileInfo", JSON.stringify(file));
    console.log("Upload file info");
    console.log(formData);
    let obj = this.http.post("https://" + this.domain_name + "/FileAPIs/api/file/v1/upload", formData).subscribe(
      res => {
        console.log(res);
      }
    );
  }

  addbtn_click() {
    let body = {
      "V_ARTFCT_NM": this.fileName,
      "V_ARTFCT_TYP": this.fileType,
      "V_SRC_CD": this.V_SRC_CD,
      "V_SCOPE_LMTNG_CD": this.V_SCOPE_LMTNG_CD,
      "V_SCOPE_LMTNG_LVL": this.V_SCOPE_LMTNG_LVL,
      "V_CXN_CD": null,
      "V_PHY_LCTN": this.urll,
      "V_USR_GRP_ID": this.V_USR_GRP_ID,
      "V_USR_NM": this.V_USR_NM,
      "V_APP_CD": this.col2,
      "V_PRCS_CD": this.col3,
      "V_SRVC_CD": this.col4,
      "V_LCK": null,
      "REST_Service": "Artifacts",
      "Verb": "POST"
    };
    console.log(body);
    this.http.post("https://" + this.domain_name + "/rest/E_DB/SP", body).subscribe(
      res => {
        console.log(res);
      });
  }
  oldFileData:string[]=[];
  oldfiles() {
    this.filesUrl.setDefault(this);
    this.filesdata = {};
    this.fd = [];
    this.http.get(this.apiUrlGet + "V_SRVC_CD=" + this.col4 + "&V_APP_CD=" + this.col2 + "&V_PRCS_CD=" + this.col3 + "&V_SRC_CD=" + this.col1 + "&REST_Service=Artifacts&Verb=GET").subscribe(
      res => {
       // this.oldFileData=res.js;
        this.artfct_nm = res["ARTFCT_NM"];
        console.log("---------old file-----------");
        console.log(this.artfct_nm);
        console.log(this.artfct_nm);
        for (var i = 0; i < this.artfct_nm.length; i++) {
          this.filesdata = {};
          this.filesdata["name"] = this.artfct_nm[i];
          this.filesdata["checked"] = false;
          this.filesdata["id"] = this.g++;
          this.fd.push(this.filesdata);
        }
        console.log("This is already existing file data : ");
        console.log(this.fd);
        this.dataSource1 = new MatTableDataSource(this.fd);
      });
  }
  artfct_submitbtn_click() {
    this.V_PVP = "";
    for (let i = 0; i < this.fd.length; i++) {
      if (this.fd[i]["checked"] == true) {
        this.V_PVP += this.fd[i]["name"] + '|';
      }
    }
    let body = {
      "V_PVP": { "Add Supporting Docs PipeDelimitedFileNames": this.V_PVP },
      "V_SRC_ID": this.V_SRC_ID,
      "V_APP_ID": this.V_APP_ID,
      "V_PRCS_ID": this.V_PRCS_ID,
      "V_PRCS_TXN_ID": this.V_PRCS_TXN_ID,
      "V_UNIQUE_ID": this.V_UNIQUE_ID,
      "V_NAV_DIRECTION": "FORWARD"
    }
    console.log(body);
    this.http.post("https://" + this.domain_name + "/rest/Submit/FormSubmit/", body).subscribe(
      res => {
        console.log(res);
      });
  }
  checked(r: number) {
    if (this.fd[r]["checked"] == true) {
      this.fd[r]["checked"] = false;
    }
    else if (this.fd[r]["checked"] == false) {
      this.fd[r]["checked"] = true;
    }
    console.log(this.fd[r]["checked"]);
  }
  /*
    get dropn down parameter option values
  */
  
  checkoptions(opt) {
    this.progress = true;
    this.options = [];
    // getParameterAllOption(application:string,process:string,paramName:string,srcCode:string)
   this.http.get(this.apiUrlGet + "V_SRVC_CD=" + this.V_SRVC_CD + "&V_APP_CD=" + this.StorageSessionService.getCookies("AppData")['application'] + "&V_PRCS_CD=" + this.StorageSessionService.getCookies("AppData")['process']+ "&V_PARAM_NM=" + opt + "&V_SRVC_CD=" + this.srvc_cd_sl + "&REST_Service=ProcessParametersOptions&Verb=GET")
  
   .subscribe(
      res => {
        console.log(res[opt]);
        this.options = res[opt];
      });

    this.progress = false;
  }
  change(r: number) {
    var i = this.td.length;
    for (var t = 0; t < i; t++) {
      if (this.td[t]["id"] == r) {
        console.log(this.td[t]["id"]);
        if (this.td[t]["show"] == true) {
          this.td[t]["show"] = false;
        }
        else if (this.td[t]["show"] == false) {
          this.td[t]["show"] = true;
        }
      }
    }
  }

  cancelbtn_click() {
    this.route.navigateByUrl("End_User");
  }

  submitbtn_click() {
    this.V_PVP = "";
    var now = new Date();
    this.dat = dateFormat(now, "ddd mmm dd yyyy hh:MM:ss TT o");
    let q = 1;
    for (var j = 0; j < this.displayedColumns.length - 1; j++) {
      this.tnames = "";
      this.tvalues = "";
      let r = 1;
      for (var i = 0; i < this.td.length; i++) {
        let k = this.displayedColumns[j].split(' ').join('_');
        if (r == 1) {
          r = 2;
          if (q == 1) {
            this.tnames += "{\"" + k + "\":";
            q = 2
          }
          else {
            this.tnames += "\"" + k + "\":";
          }
        }
        if (this.tvalues == "") { this.tvalues += "\"" + this.td[i][this.displayedColumns[j]]; }
        else { this.tvalues += "|" + this.td[i][this.displayedColumns[j]]; }
      }
      this.tvalues += "\"";
      this.V_PVPP = "";
      this.V_PVPP = this.tnames + this.tvalues;
      if (this.V_PVP.length != 0) {
        this.V_PVP += ',' + this.V_PVPP;
      }
      else { this.V_PVP += this.V_PVPP; }
    }

    for (const [key, value] of Object.entries(this.tp)) {
      this.tnames = "";
      this.tvalues = "";
      this.V_PVPP = "";
      this.tnames += "\"" + key + "\":";
      this.tvalues += "\"" + value + "\"";
      this.V_PVPP = this.tnames + this.tvalues;
      if (this.V_PVP.length != 0) {
        this.V_PVP += ',' + this.V_PVPP;
      }
      else { this.V_PVP += this.V_PVPP; }
    }
    this.V_PVP += "}";
    console.log(this.V_PVP);
    let body = {
      "V_USR_NM": this.V_USR_NM,
      "V_EXE_CD": this.Check_RPT_NRPT,
      "V_PRCS_TXN_ID": this.V_PRCS_TXN_ID,
      "V_APP_ID": this.V_APP_ID,
      "V_PRCS_ID": this.V_PRCS_ID,
      "V_SRVC_ID": this.V_SRVC_ID,
      "V_PVP": this.V_PVP,
      "V_RELEASE_RSN": "Submitted manual input",
      "V_SRC_ID": this.V_SRC_ID,
      "V_OPERATION": "MANUALSUBMIT",
      "V_UNIQUE_ID": this.V_UNIQUE_ID,
      "TimeZone": this.dat
    }
    console.log(body);
    this.http.post("https://" + this.domain_name + "/rest/Submit/FormSubmit", body).subscribe(
      res => {
        console.log(res);
        this.StorageSessionService.setCookies("report_table", res);
        this.getFormData();
      }
    );

  }
/*
 This is getting from table values 
 @NONREPUTABLE_MANUAL_TASK
*/
tableData:string[]=[];
  tableFieldValue() {
    if (this.V_TABLE_NAME !== "") {
      var url = this.apiUrlGet + "V_Table_Name=" + this.V_TABLE_NAME + "&V_Schema_Name=" + this.V_SCHEMA_NAME + "&V_Key_Names=" + this.V_KEY_NAME + "&V_Key_Values=" + this.V_KEY_VALUE + "&V_SRVC_CD=" + this.V_SRVC_CD + "&V_USR_NM=" + this.V_USR_NM + "&V_SRC_CD=" + this.V_SRC_CD + "&V_PRCS_ID=" + this.V_PRCS_ID + "&REST_Service=Forms_Record&Verb=GET";
      var ul = encodeURI(url);
      console.log(ul);
      this.http.get(ul).subscribe(
        res => {
          console.info("This is old Table response API:");
          console.log(res);
          this.initvalues = res;
          for (var i = 0; i < this.displayedColumns.length; i++) {
            let k = this.displayedColumns[i].split(' ').join('_');
            if (k in this.initvalues) {
              this.initvalues1[this.displayedColumns[i]] = this.initvalues[k];
            }
          }
          this.initvalues1["V_ID"] = this.initvalues["V_ID"];
          console.log(this.initvalues1);


          this.td = [];
          let l = this.initvalues1[this.displayedColumns[0]].length;
          console.log(l);
          for (var j = 0; j < l; j++) {
            this.tm = {};
            for (var i = 0; i < this.displayedColumns.length - 1; i++) {
              this.tm[this.displayedColumns[i]] = this.initvalues1[this.displayedColumns[i]][j];
            }
            this.tm["id"] = this.g;
            this.tm["show"] = true;
            this.tm["up"] = false;
            this.tm["V_ID"] = this.initvalues1["V_ID"][j];
            this.g = this.g + 1;
            this.td.push(this.tm);
          }
          this.g = this.g - 1;
          console.log(this.td);
          this.tableData=this.td;
          console.info("Test table-------------->");
          console.log(this.tabledata);
          this.dataSource = new MatTableDataSource(this.td);
          if (this.td.length == 0) {
            this.tm = {};
            this.td = [];

            for (let i = 0; i < this.displayedColumns.length - 1; i++) {
              this.tm[this.displayedColumns[i]] = '';
            }
            this.tm["id"] = this.g;
            this.tm["show"] = false;
            this.tm["up"] = false;
            this.td.push(this.tm);
            console.log(this.td);
            this.dataSource = new MatTableDataSource(this.td)
          }
        });
    }
    else {
      this.tm = {};
      this.td = [];

      for (let i = 0; i < this.displayedColumns.length - 1; i++) {
        this.tm[this.displayedColumns[i]] = '';
      }
      this.tm["id"] = this.g;
      this.tm["show"] = false;
      this.tm["up"] = false;
      this.td.push(this.tm);
      console.log(this.td);
      this.dataSource = new MatTableDataSource(this.td);
    }
  }

  addFieldValue() {
    this.tm = {};
    for (let i = 0; i < this.Field_Data.length; i++) {
      this.tm[this.Field_Data[i]] = '';
    }
    this.tm["id"] = ++this.g;
    this.tm["show"] = false;
    this.tm["up"] = false;
    this.td.push(this.tm);
    console.log(this.td);
    this.dataSource = new MatTableDataSource(this.td);
  }

  FieldValue(r: number) {
    if (this.td[r]["up"] == false) {
      this.td[r]["up"] = true;
    }
    console.log(this.td[r]["up"]);
  }
  sendFieldValue(r: number) {
    if (this.td[r]["up"] == true) {
      this.UpdateFieldValue(r);
    }
    else {
      this.Field_Names = "";
      this.Field_Values = "";
      for (var s = 0; s < this.displayedColumns.length - 1; s++) {
        this.Field_Names += this.displayedColumns[s].split(' ').join('_');
        this.Field_Names += "|";
        this.Field_Values += this.td[r][this.displayedColumns[s]];
        this.Field_Values += "|";
      }
      this.Field_Names = this.Field_Names.slice(0, -1);
      this.Field_Values = this.Field_Values.slice(0, -1);
      console.log(this.Field_Names + "==" + this.Field_Values);
      if (this.V_TABLE_NAME !== "") {
        let body = {
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
        console.log(body);
        this.http.post(this.apiUrlGet, body).subscribe(
          res => {
            console.log(res);
            this.td[r]["V_ID"] = res["V_ID"][0];
          });
      }
      console.log(this.V_ID);
    }
  }


  removeByAttr = function (arr, attr, value) {
    var i = arr.length;
    while (i--) {
      if (arr[i]
        && arr[i].hasOwnProperty(attr)
        && (arguments.length > 2 && arr[i][attr] === value)) {

        arr.splice(i, 1);

      }
    }
    return arr;
  }
  deleteorCancelvalue(r: number) {
    this.V_ID = this.td[r]["V_ID"];
    console.log(this.V_ID);
    if (this.V_TABLE_NAME !== "") {
      this.http.delete(this.apiUrlGet + "V_Table_Name=" + this.V_TABLE_NAME + "&V_Schema_Name=" + this.V_SCHEMA_NAME + "&V_ID=" + this.V_ID + "&V_SRVC_CD=" + this.V_SRVC_CD + "&V_USR_NM=" + this.V_USR_NM + "&V_SRC_CD=" + this.V_SRC_CD + "&V_PRCS_ID=" + this.V_PRCS_ID + "&REST_Service=Forms_Record&Verb=DELETE").subscribe(
        res => {
          console.log(res);
        });
    }
    this.removeByAttr(this.td, 'id', r);
    for (var i = r; i < this.td.length; i++) {
      this.td[i]["id"] = i;
      console.log(this.td[i]["id"]);
      this.g = i;
    }
    if (r == 0 && this.td.length == 0) {
      this.g = -1;
    }

    this.dataSource = new MatTableDataSource(this.td);
    console.log(this.td);
  }
  UpdateFieldValue(r: number) {
    this.V_ID = this.td[r]["V_ID"];
    console.log(this.V_ID);
    var i = this.td.length;
    this.Field_Names = "";
    this.Field_Values = ""
    for (var s = 0; s < this.displayedColumns.length - 1; s++) {
      this.Field_Names += this.displayedColumns[s].split(' ').join('_');
      this.Field_Names += "|";
      this.Field_Values += this.td[r][this.displayedColumns[s]];
      this.Field_Values += "|";
    }
    this.Field_Names = this.Field_Names.slice(0, -1);
    this.Field_Values = this.Field_Values.slice(0, -1);

    console.log(this.Field_Names + "==" + this.Field_Values);
    if (this.V_TABLE_NAME !== "") {
      let body = {
        "Field_Names": this.Field_Names,
        "Field_Values": this.Field_Values,
        "V_Table_Name": this.V_TABLE_NAME,
        "V_Schema_Name": this.V_SCHEMA_NAME,
        "V_ID": this.V_ID,
        "V_SRVC_CD": this.V_SRVC_CD,
        "V_USR_NM": this.V_USR_NM,
        "V_SRC_CD": this.V_SRC_CD,
        "V_PRCS_ID": this.V_PRCS_ID,
        "REST_Service": "Forms_Record",
        "Verb": "PATCH"
      }
      this.http.patch(this.apiUrlGet, body).subscribe(
        res => {
          console.log(res);
        });
    }
  }
  uploadBtnClick() {
    document.getElementById('Document_File').click();
  }

  ngOnInit() {
    this.getFormData();

  }
}

