import {MatTableDataSource} from '@angular/material';
import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {StorageSessionService} from '../../../../service/storage-session.service';
import {Globals} from '../../../../service/globals';
import {ReportData, ScopeLimiting} from './Classes';

@Component({
  selector: 'app-input-art',
  templateUrl: './Input_Art.component.html',
  styleUrls: ['./Input_Art.component.css'],
})

export class InputArtComponent {
  private dataSource1 = new MatTableDataSource();
  private reportData: ReportData;
  private scope: ScopeLimiting = new ScopeLimiting();
  private domain_name = this.globals.domain_name;
  private apiUrlGet = 'https://' + this.domain_name + '/rest/E_DB/SP?';
  allFiles: string[] = [];
  agencyName: string;
  application: string;
  process: string;
  service: string;
  // @ override
  //public filesUrl: FileUrls;

  constructor(private storage: StorageSessionService,
              private http: HttpClient,
              private globals: Globals,) {
    //this.filesUrl = new FileUrls(this.storage);
    this.reportData = new ReportData(this.storage);
    ('---------------');
    (this.reportData.getProcess());
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
    this.http.get<AllFiles>(this.apiUrlGet + 'V_SRVC_CD=' + this.reportData.getService() + '&V_APP_CD=' +
      this.reportData.getApplication() + '&V_PRCS_CD=' + this.reportData.getProcess() +
      '&V_SRC_CD=' + this.reportData.getAgency() + '&REST_Service=Artifacts&Verb=GET').subscribe(
      res => {
        (res);
        this.allFiles = res['ARTFCT_NM'];
        (this.allFiles);
      });
  }

  /*
Fire this function when user click on upload buttons
*/
  fileChangeEvent(event: any, file: any) {
    this.allFiles = [];
    const fileList: FileList = event.target.files;
    const selectedFile = <File>event.target.files[0];
    //  this.fileName = selectedFile.name;
    //  this.fileType = selectedFile.type;
    const formData: FormData = new FormData();
    const files: any = {};
    //files['File_Path'] = this.filesUrl.getFileUrl();
    files['File_Name'] = selectedFile.name;
    formData.append('Source_File', selectedFile);
    formData.append('FileInfo', JSON.stringify(files));
    ('Upload file info');
    (formData);
    const obj = this.http.post('https://' + this.domain_name + '/FileAPIs/api/file/v1/upload', formData).subscribe(
      res => {
        (res);
        this.oldfiles();
      }
    );

  }

  /*
  1)Build the url for uploading the files where base name is agency name
  2)putting V_SCOPE_LMTNG_LVL and other parameter to ADD and SUBMIT button
  */
  makeurl(values: string) {
    if (values === 'agency') {
      this.scope.setUrl(this.reportData.getAgency());
      this.scope.V_SCOPE_LMTNG_LVL = values;
      this.scope.V_SCOPE_LMTNG_CD = this.reportData.getAgency();
      //this.filesUrl.setFileUrl(this.reportData.getAgency());
    } else if (values === 'application') {
      this.scope.setUrl(this.reportData.getAgency() + '/' + this.reportData.getApplication());
      this.scope.V_SCOPE_LMTNG_LVL = values;
      this.scope.V_SCOPE_LMTNG_CD = this.reportData.getApplication();
      //this.filesUrl.setFileUrl(this.reportData.getAgency() + '/' + this.reportData.getApplication());
    } else if (values === 'process') {
      this.scope.setUrl(this.reportData.getAgency() + '/' + this.reportData.getApplication() + '/' + this.reportData.getProcess());
      this.scope.V_SCOPE_LMTNG_LVL = values;
      this.scope.V_SCOPE_LMTNG_CD = this.reportData.getProcess();
      //this.filesUrl.setFileUrl(this.reportData.getAgency() + '/' +
        this.reportData.getApplication() + '/' + this.reportData.getApplication();
    } else if (values === 'service') {
      this.scope.setUrl(this.reportData.getAgency() + '/' + this.reportData.getApplication() + '/' +
        this.reportData.getProcess() + '/' + this.reportData.getService());
      this.scope.V_SCOPE_LMTNG_LVL = values;
      this.scope.V_SCOPE_LMTNG_CD = this.reportData.getService();
      //this.filesUrl.setFileUrl(this.reportData.getAgency() + '/' + this.reportData.getApplication() + '/' +
        this.reportData.getApplication() + '/' + this.reportData.getService();
    }
    // console.info('The given build file scope URLS:');
    //(this.filesUrl.getFileUrl());
  }

  addbtn_click() {
    ('THE SCOPE is');
    (this.scope.V_SCOPE_LMTNG_CD);
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
    // (body);
    // this.http.post("https://" + this.domain_name + "/rest/E_DB/SP", body).subscribe(
    //   res => {
    //     (res);
    //   });
  }

  uploadBtnClick() {
    document.getElementById('Document_File').click();
  }
  cancelbtn_click() {
    ('cancelbtn_click');
  }
  artfct_submitbtn_click() {
    ('artfct_submitbtn_click');
  }
}

export class AllFiles {
  ARTFCT_NM: string[];

  constructor() {

  }
}
