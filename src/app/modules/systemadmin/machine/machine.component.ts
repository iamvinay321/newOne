import { Component, OnInit } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { HttpClient, HttpEvent, HttpEventType } from '@angular/common/http';

import { MatCardModule } from '@angular/material/card';
import { DataSource } from '@angular/cdk/table';
import { Observable } from 'rxjs';
import { CdkTableModule } from '@angular/cdk/table';
import { forEach } from '@angular/router/src/utils/collection';
import {
  MatPaginator, MatSort, MatTable, MatTableModule, MatTabHeader,
  MatHeaderRow, MatHeaderCell, MatHeaderCellDef, MatHeaderRowDef,
  MatSortHeader, MatRow, MatRowDef, MatCell, MatCellDef
} from '@angular/material';

import { MatTableDataSource } from '@angular/material';
import { StorageSessionService } from '../../../service/storage-session.service';
import { ConfigServiceService } from '../../../service/config-service.service';
import {Globals} from './../../../service/globals';
import { SelectionModel } from '@angular/cdk/collections';
import { UseradminService } from '../../../service/useradmin.service';

@Component({
  selector: 'app-machine',
  templateUrl: './machine.component.html',
  styleUrls: ['./machine.component.css']
})
export class MachineComponent implements OnInit {

  V_SRC_CD: string = this.StorageSessionService.getSession("agency");
  V_USR_NM: string = this.StorageSessionService.getSession("email");
  V_BASE_ID: string[] = null;

  constructor(private http: HttpClient,
    private data2:UseradminService,private globals:Globals,
    private StorageSessionService: StorageSessionService,
    private data: ConfigServiceService) { }

  domain_name=this.globals.domain_name; private apiUrlGet = "https://"+this.domain_name+"/rest/E_DB/SP?";
  private apiUrlAdd = "https://"+this.domain_name+"/rest/E_DB/SP";
  private apiUrldelete = "https://"+this.domain_name+"/rest/E_DB/SP";


  PLF_DATA = [];
  PLF_DETAILS = [];
  PLATFORM_CD = "";
  PLATFORM_DSC = "";
  PLATFORM_CAP = "";
  RATING = "";
  VRTL_FLG = "";
  EFF_END_DT_TM = "";
  EFF_STRT_DT_TM = "";
  MODESTATUS = "";
  STATE_FLG = "";
  // virtual: boolean = false;



  PLF = "";

  Label:any[]=[];
  MachineCode() {
    ("Machine List!");
    this.data.getMachineCode().subscribe(res => {
      ("Machine List!");
      this.PLF_DATA = res.json();
      (this.PLF_DATA);

    });
  }
  machineDetails() {
    ("Hello");
    ("Machine DETAILS");
    this.data.getMachineDetails(this.PLATFORM_CD).subscribe(res => {
      // ("Machine List!");
      this.PLF_DETAILS = res.json();
      (this.PLF_DETAILS);
      this.PLATFORM_DSC = this.PLF_DETAILS['PLATFORM_DSC'];
      this.PLATFORM_CAP = this.PLF_DETAILS['PLATFORM_CAP'];
      this.RATING = this.PLF_DETAILS['RATING'];
      this.EFF_STRT_DT_TM = this.PLF_DETAILS['EFF_STRT_DT_TM'];
      this.EFF_END_DT_TM = this.PLF_DETAILS['EFF_END_DT_TM'];
      this.VRTL_FLG = this.PLF_DETAILS['VRTL_FLG'];
      this.MODESTATUS = this.PLF_DETAILS['MODESTATUS'];

      this.STATE_FLG = this.PLF_DETAILS['STATE_FLG'];

      // if (this.VRTL_FLG == "Y") {
      //   this.virtual = true;
      // }

    });
  }
  ngOnInit() {
    this.MachineCode();
    this.data2.getJSON().subscribe(data2 => { 
    this.Label=data2.json();    
        })
  }

}
