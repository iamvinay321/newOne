import {MatTableDataSource,MatPaginator} from '@angular/material';
import {SelectionModel} from '@angular/cdk/collections';

import {Component, OnInit, ViewChild, AfterViewInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {StorageSessionService} from '../../../../service/storage-session.service';
import {Globals} from '../../../../service/globals';
import {ReportData, ScopeLimiting} from './Classes';

import {DataSource} from '@angular/cdk/typings/collections';

@Component({
  selector: 'app-input-art',
  templateUrl: './Input_Art.component.html',
  styleUrls: ['./Input_Art.component.css'],
})

export class InputArtComponent implements OnInit, AfterViewInit{
  // private dataSource1 = new MatTableDataSource();
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

  // mat-table
    displayedColumns: string[] = ['File', 'Description', 'SizeinMB', 'DateUploaded', 'FileScope', 'Include', 'Delete'];
    dataSource1 = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
    selection = new SelectionModel<PeriodicElement>(true, []);
    // dataSource1 = ELEMENT_DATA;
    isAllSelected() {
        const numSelected = this.selection.selected.length;
        const numRows = this.dataSource1.data.length;
        return numSelected === numRows;
    }
    masterToggle() {
        this.isAllSelected() ?
            this.selection.clear() :
            this.dataSource1.data.forEach(row => this.selection.select(row));
    }
    @ViewChild(MatPaginator) paginator: MatPaginator;
  //
    ngOnInit() {
        this.dataSource1.paginator = this.paginator;
        console.log('dataSource', this.paginator);
    }
    ngAfterViewInit() {

    }
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
    // new Date(elem.timestamp)
     var now = new Date();
    // console.log('filename', selectedFile.name,'file', files, 'fileList', fileList, now,'selectedFile', selectedFile, selectedFile.lastModifiedDate) ;
    formData.append('Source_File', selectedFile);
    formData.append('FileInfo', JSON.stringify(files));
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
      console.log('uploadBtn', document.getElementById('Document_File').click());
  }
  cancelbtn_click() {
    ('cancelbtn_click');
  }
  artfct_submitbtn_click() {
    ('artfct_submitbtn_click');
  }
  addfunction(){
      console.log('add');
  }
}

export class AllFiles {
  ARTFCT_NM: string[];

  constructor() {

  }
}

export interface PeriodicElement {
    // name: string;
    // position: number;
    // weight: number;
    // symbol: string;

    File: string;
    Description: string;
    SizeinMB: number;
    DateUploaded: string;
    FileScope: string;
    Include: boolean;
    Delete: boolean;
}

const ELEMENT_DATA: PeriodicElement[] = [
    {File: 'Ab.txt', Description: 'For adding records', SizeinMB: 1.2, DateUploaded: "28/02/2019", FileScope: 'Application', Include: true, Delete: true},
    {File: 'Xy.xls', Description: 'Has account info', SizeinMB: 0.2, DateUploaded: "02/23/2019", FileScope: 'Service',Include: true, Delete: false},

    // {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
    // {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
    // {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
    // {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
    // {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
    // {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
    // {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
    // {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
    // {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
    // {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
    // {position: 11, name: 'Sodium', weight: 22.9897, symbol: 'Na'},
    // {position: 12, name: 'Magnesium', weight: 24.305, symbol: 'Mg'},
    // {position: 13, name: 'Aluminum', weight: 26.9815, symbol: 'Al'},
    // {position: 14, name: 'Silicon', weight: 28.0855, symbol: 'Si'},
    // {position: 15, name: 'Phosphorus', weight: 30.9738, symbol: 'P'},
    // {position: 16, name: 'Sulfur', weight: 32.065, symbol: 'S'},
    // {position: 17, name: 'Chlorine', weight: 35.453, symbol: 'Cl'},
    // {position: 18, name: 'Argon', weight: 39.948, symbol: 'Ar'},
    // {position: 19, name: 'Potassium', weight: 39.0983, symbol: 'K'},
    // {position: 20, name: 'Calcium', weight: 40.078, symbol: 'Ca'},
];

