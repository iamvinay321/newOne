import { MatTableDataSource } from '@angular/material';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { StorageSessionService } from '../../../../service/storage-session.service';
import * as dateFormat from 'dateformat';
import { Globals } from '../../../../service/globals';
import { Headers, RequestMethod, RequestOptions } from '@angular/http';
import { ReportData ,ScopeLimiting} from './Classes';
import { FileUrls } from '../forms/POJO';
@Component({
  selector: 'Input_Art',
  templateUrl: './Input_Art.component.html',
  styleUrls: ['./Input_Art.component.css'],
})

export class Input_Art_Component {
  private dataSource1 = new MatTableDataSource();
  private reportData: ReportData;
  private scope:ScopeLimiting=new ScopeLimiting();
  private domain_name = this.globals.domain_name;
  private apiUrlGet = "https://" + this.domain_name + "/rest/E_DB/SP?";
  private allFiles: string[] = [];
  private agencyName: string;
  private application: string;
  private process: string;
  private service: string;
  //@ override 
  public filesUrl: FileUrls ;
  constructor(private storage: StorageSessionService,
    private http: HttpClient,
    private globals: Globals,
  ) {
    this.filesUrl= new FileUrls(this.storage);
    this.reportData = new ReportData(this.storage);
    console.log("---------------");
    console.log(this.reportData.getProcess());
    this.agencyName = this.reportData.getAgency();
    this.application = this.reportData.getProcess();
    this.process = this.reportData.getApplication();
    this.service = this.reportData.getService();
    this.oldfiles();
  }

  /*
  Get all old files that are exist in system on server
  */
  oldfiles() {
    // this.filesdata = {};
    // this.fd = [];
    this.http.get<AllFiles>(this.apiUrlGet + "V_SRVC_CD=" + this.reportData.getService() + "&V_APP_CD=" + this.reportData.getApplication() + "&V_PRCS_CD=" + this.reportData.getProcess() + "&V_SRC_CD=" + this.reportData.getAgency() + "&REST_Service=Artifacts&Verb=GET").subscribe(
      res => {
        console.log(res);
        this.allFiles = res['ARTFCT_NM'];
        console.log(this.allFiles);
      });
  }
  /*
Fire this function when user click on upload buttons
*/
  fileChangeEvent(event: any, file: any) {
    this.allFiles=[];
    let fileList: FileList = event.target.files;
    let selectedFile = <File>event.target.files[0];
    //  this.fileName = selectedFile.name;
    //  this.fileType = selectedFile.type;
    let formData: FormData = new FormData();
    let files: any = {};
    files['File_Path'] = this.filesUrl.getFileUrl();
    files['File_Name'] = selectedFile.name;
    formData.append('Source_File', selectedFile);
    formData.append("FileInfo", JSON.stringify(files));
    console.log("Upload file info");
    console.log(formData);
    let obj = this.http.post("https://" + this.domain_name + "/FileAPIs/api/file/v1/upload", formData).subscribe(
      res => {
        console.log(res);
        this.oldfiles();
      }
    );

  }
  /*
  1)Build the url for uploading the files where base name is agency name 
  2)putting V_SCOPE_LMTNG_LVL and other parameter to ADD and SUBMIT button 
  */
  makeurl(values: string) {
    if (values == 'agency') {
      this.scope.setUrl(this.reportData.getAgency());
      this.scope.V_SCOPE_LMTNG_LVL = values;
      this.scope.V_SCOPE_LMTNG_CD = this.reportData.getAgency();
      this.filesUrl.setFileUrl(this.reportData.getAgency());
    }
    else if (values == 'application') {
      this.scope.setUrl(this.reportData.getAgency() + '/' + this.reportData.getApplication());
      this.scope.V_SCOPE_LMTNG_LVL = values;
      this.scope.V_SCOPE_LMTNG_CD = this.reportData.getApplication();
      this.filesUrl.setFileUrl(this.reportData.getAgency() + "/" + this.reportData.getApplication());
    }
    else if (values == 'process') {
      this.scope.setUrl(this.reportData.getAgency() + '/' + this.reportData.getApplication() + '/' + this.reportData.getProcess());
      this.scope.V_SCOPE_LMTNG_LVL = values;
      this.scope.V_SCOPE_LMTNG_CD = this.reportData.getProcess();
      this.filesUrl.setFileUrl(this.reportData.getAgency() + '/' + this.reportData.getApplication() + "/" + this.reportData.getApplication());
    }
    else if (values == 'service') {
      this.scope.setUrl(this.reportData.getAgency() + '/' + this.reportData.getApplication() + '/' + this.reportData.getProcess() + '/' + this.reportData.getService());
      this.scope.V_SCOPE_LMTNG_LVL = values;
      this.scope.V_SCOPE_LMTNG_CD = this.reportData.getService();
      this.filesUrl.setFileUrl(this.reportData.getAgency() + '/' + this.reportData.getApplication() + "/" + this.reportData.getApplication() + "/" + this.reportData.getService());
    }
    console.info("The given build file scope URLS:");
    console.log(this.filesUrl.getFileUrl());
  }
  addbtn_click() {
    console.log("THE SCOPE is");
    console.log(this.scope.V_SCOPE_LMTNG_CD);
    // let body = {
    //   "V_ARTFCT_NM": this.fileName,
    //   "V_ARTFCT_TYP": this.fileType,
    //   "V_SRC_CD": this.V_SRC_CD,
    //   "V_SCOPE_LMTNG_CD": this.V_SCOPE_LMTNG_CD,
    //   "V_SCOPE_LMTNG_LVL": this.V_SCOPE_LMTNG_LVL,
    //   "V_CXN_CD": null,
    //   "V_PHY_LCTN": this.urll,
    //   "V_USR_GRP_ID": this.V_USR_GRP_ID,
    //   "V_USR_NM": this.V_USR_NM,
    //   "V_APP_CD": this.col2,
    //   "V_PRCS_CD": this.col3,
    //   "V_SRVC_CD": this.col4,
    //   "V_LCK": null,
    //   "REST_Service": "Artifacts",
    //   "Verb": "POST"
    // };
    // console.log(body);
    // this.http.post("https://" + this.domain_name + "/rest/E_DB/SP", body).subscribe(
    //   res => {
    //     console.log(res);
    //   });
  }

  uploadBtnClick() {
    document.getElementById('Document_File').click();
  }
}

export class AllFiles {
  ARTFCT_NM: string[];
  constructor() {

  }
}