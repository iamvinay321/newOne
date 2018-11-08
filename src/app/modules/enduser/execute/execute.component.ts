import { Component, OnInit, AfterViewInit } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { Chart } from 'chart.js';
import { DialogScheduleComponent } from './dialog-schedule/dialog-schedule.component';
import { WebSocketService } from '../../../service/web-socket.service';
import { GetMessageService } from '../../../service/get-message.service';
import { FormBuilder } from '@angular/forms';
import { HostListener } from "@angular/core";
import { Injectable } from '@angular/core';
import { EnduserComponent } from '../enduser.component';
import { Form_data } from './Form_data';
import { StorageSessionService } from '../../../service/storage-session.service';
import { ConfigServiceService } from '../../../service/config-service.service';
import { AppComponent } from '../../../app.component';
import { RollserviceService } from '../../../service/rollservice.service';
import { Observable } from 'rxjs/Observable';
import { Globals } from './../../../service/globals';
import { MatTableDataSource } from '@angular/material';
import { unescape } from 'querystring';
import { ReportData ,ReportGenerate } from './APP_DATA';
@Injectable()
@Component({
  selector: 'app-execute',
  templateUrl: './execute.component.html',
  styleUrls: ['./execute.component.css'],

})
@Injectable()
export class ExecuteComponent implements OnInit , ReportGenerate {

  domain_name = this.globals.domain_name; private apiUrlGet = "https://" + this.domain_name + "/rest/E_DB/SP?";
  private aptUrlPost_report = "https://" + this.domain_name + "/rest/Process/Report";
  SL_APP_CD = "";
  SL_PRC_CD = "";
  screenHeight = 0;
  screenWidth = 0;
  mobileView = false;
  desktopView = true;
  @HostListener('window:resize', ['$event'])
  onResize(event?) {
    this.screenHeight = window.innerHeight;
    this.screenWidth = window.innerWidth;
    if (this.screenWidth <= 767) {
      this.mobileView = true;
      this.desktopView = false;
    } else {
      this.mobileView = false;
      this.desktopView = true;
    }
  }
  offset(el) {
    var rect = el.getBoundingClientRect(),
      scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
      scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
  }

  constructor(private Router: Router,
    private http: HttpClient,
    private https: Http,
    private StorageSessionService: StorageSessionService,
    private data: ConfigServiceService,
    public dialog: MatDialog,
    private app: AppComponent,
    private PFrame: EnduserComponent,
    private roll: RollserviceService,
    public snackBar: MatSnackBar,
    private wSocket: WebSocketService,
    private msg: GetMessageService,
    private globals: Globals
  ) {
    this.onResize();
    this.getAppCode();
  }
  selectedEmoji: string;
  openEmojiDialog() {
    let dialog = this.dialog.open(DialogScheduleComponent, {
      height: '150px',
      width: '300px'
    });

    dialog.afterClosed()
      .subscribe(selection => {
        if (selection) {
          this.selectedEmoji = selection;
        } else {
          // User clicked 'Cancel' or clicked outside the dialog
        }
      });
  }

  //----------------GET APP CODE
  V_SRC_CD = this.StorageSessionService.getSession("agency");
  V_USR_NM = this.StorageSessionService.getSession("email");
  get_cxn: boolean = true;
  APP_CD = [];
  PRC_CD = [];
  PRCS_DATA = [];
  PRCS_CD = [];
  k = 0;
  ts = {};
  SL_PRCS_CD = "";
  SRVC_DATA = [];
  SRVC_CD = [];
  SL_SRVC_CD = "";
  deployTableDT: any[] = [];
  deployData: any[];
  ID_DATA = [];
  APP_ID = [];
  PRCS_ID = [];
  SRVC_ID = [];
  SRC_ID = [];
  SL_APP_ID = "";
  SL_PRCS_ID = "";
  SL_SRVC_ID = "";
  SL_SRC_ID = "";
  deployService = [];
  countonerror = [];
  //-------Balraj Code--------
  result = {}
  currentKey: any;
  currentVal: any;

  // =========== CHARTS FLAGS ( Toggle these to display or hide charts at loading page )=========
  show_PIE: boolean = false;
  show_BAR: boolean = false;
  show_Gantt: boolean = false;
  show_ALL: boolean = false;
  show_SM_PIE: boolean = false;
  // ==================================

  //-------Balraj Code--------

  ResetOptimised: boolean = false;
  Lazyload: boolean = false;

  check_data = {};
  executedata = {};
  _backgroundColor = "rgba(34,181,306,0.2)";
  // Application_box:boolean=true;
  // Application_label:boolean=false;
  // Process_box:boolean=false;
  // Process_label:boolean=false;
  Service_box: boolean;
  Schedule_btn: boolean = false;
  Execute_Now_btn: boolean = false;
  repeatProcess() {
    this.Router.navigateByUrl("repeat");
    this.dialog.closeAll();
  }
  //// 1) call application CD
  selectedapp: string = null;
  selectedprcs: string = null;
  fooo(u) {
    if (this.mobileView)
      u = u.value;
    if (u == null) { }
    else {
      this.SL_APP_CD = u;
      this.selectedapp = u;
      this.app.selected_APPLICATION = u;
      this.app.selected_PROCESS = 'ALL';
      this.app.selected_SERVICE = 'ALL';
      this.selectedprcs = null;
      this.getAppCode();
    }
  }
  position_datepicker(event) {
    /*    var div = document.querySelector('div');
        var divOffset = this.offset(div);
        console.log(divOffset.left, divOffset.top);*/
    console.log("Hello");
  }
  //_____________________________1_____________________
  getAppCode() {

    this.https.get(this.apiUrlGet + "V_CD_TYP=APP&V_SRC_CD=" + this.V_SRC_CD + "&SCREEN=PROFILE&REST_Service=Masters&Verb=GET").subscribe(res => {
      this.APP_CD = res.json();
      //this.app.APP_CD_GLOBAL=this.APP_CD;
      //------------get lenght 
      console.log(this.APP_CD);

      if (this.APP_CD['APP_CD'].length == 1) {
        //hide the application select box
        this.SL_APP_CD = this.APP_CD['APP_CD'][0];
        // this.Application_box=false;
        // this.Application_label=true;

      }
      //console.log("START= "+this.app.START+"; selectedapp="+this.selectedapp);
      if (this.selectedapp != null && this.app.START == false && this.app.selected_APPLICATION != 'ALL') {
        //console.log("calling getProcess");
        this.SL_APP_CD = this.selectedapp;
        if (this.desktopView)
          this.getProcessCD(this.selectedapp);
        else if (this.mobileView)
          this.getProcessCD({ value: this.selectedapp });
      }

    });

    // this.data.getAppCode().subscribe(res => {
    //   this.APP_CD = res.json();
    //   //this.app.APP_CD_GLOBAL=this.APP_CD;
    //   //------------get lenght 
    //   console.log(this.APP_CD);

    //   if (this.APP_CD['APP_CD'].length == 1) {
    //     //hide the application select box
    //     this.SL_APP_CD = this.APP_CD['APP_CD'][0];
    //     // this.Application_box=false;
    //     // this.Application_label=true;

    //   }
    //   //console.log("START= "+this.app.START+"; selectedapp="+this.selectedapp);
    //   if (this.selectedapp != null && this.app.START == false && this.app.selected_APPLICATION != 'ALL') {
    //     //console.log("calling getProcess");
    //     this.SL_APP_CD = this.selectedapp;
    //     if (this.desktopView)
    //       this.getProcessCD(this.selectedapp);
    //     else if (this.mobileView)
    //       this.getProcessCD({ value: this.selectedapp });
    //   }

    // });
  }
  //___________________________close 2______________________
  //__________________________________________2__________________
  data_form: Form_data;
  form_dl_data: any[] = [];
  displayedNames = ['Service', 'Platform', 'Machine', 'Limited Job', 'Instances', 'Limited', 'Capacity', 'Rating', 'Used Capacity', 'Limited Machine Use', 'Dummy', 'Status', 'State', 'Cxn Type'];

  displayedColumns = ['Service', 'Platform', 'Machine', 'Lim_Job', 'Instances', 'Limited', 'Capacity', 'Rating', 'Used_Cap', 'Lim_Mach_Use', 'Dummy', 'Status', 'State', 'Cxn_Type'];
  dataSource = new MatTableDataSource();
  getProcessCD(V_APP_CD) {
    if (this.mobileView) {
      V_APP_CD = V_APP_CD.value;
      console.log(V_APP_CD);
    }
    if (V_APP_CD == null) {

    } else {
      this.b = false;
      this.Execute_Now_btn = false;
      this.Schedule_btn = false;
      this.Data = [];
      // this.Process_box=true;
      // this.Process_label=false;
      this.https.get(this.apiUrlGet+"V_APP_CD="+V_APP_CD+"&V_SRC_CD="+this.V_SRC_CD+"&V_USR_NM="+this.V_USR_NM+"&REST_Service=AppProcesses&Verb=GET").subscribe(res => {
        this.PRC_CD = res.json();
        //this.app.PRC_CD_GLOBAL=this.PRC_CD;
        //console.log(this.PRC_CD);
        //console.log(V_APP_CD);
        if (this.PRC_CD['PRCS_CD'].length == 1) {
          this.SL_PRC_CD = this.PRC_CD['PRCS_CD'][0];
          // this.Process_box=false;
          // this.Process_label=true;

          this.data_form = new Form_data(this.SL_APP_CD, this.SL_PRC_CD);

          // this.Execute_AP_PR();

        }
      });
    }
  }
  /////////////////////////////////////////////////////////////////////////////////////////////////////


  UNIQUE_ID = [];
  SL_UNIQUE_ID = "";
  p: number;
  q: number;
  c: number;
  getServiceCode(V_PRCS_CD) {
    // if(this.get_cxn==false){
    if (this.mobileView)
      V_PRCS_CD = V_PRCS_CD.value;
    if (V_PRCS_CD == null) {

    } else {
      this.b = false;
      this.Execute_Now_btn = true;
      this.Schedule_btn = true;
      this.SRVC_CD = [];
      this.SL_PRCS_CD = V_PRCS_CD;
      this.selectedprcs = V_PRCS_CD;

      this.data.serviceCode(this.SL_APP_CD, this.SL_PRCS_CD).subscribe(res => {
        //console.log(res.json());
        this.SRVC_DATA = res.json();
        this.SRVC_CD = this.SRVC_DATA['SRVC_CD'];

        //console.log(this.SRVC_CD);
        this.getIdCode();
      });
    }
    // }

    // this.Execute_Now_btn = true;
    // this.Schedule_btn = true;
  }

  getIdCode() {
    this.ID_DATA = [];
    this.SRVC_DATA = [];
    //console.log("getidcode function");
    this.deployService = [];
    this.p = 0;
    this.c = 0;
    this.q = 0;
    for (let j = 0; j < this.SRVC_CD.length; j++) {
      this.SL_SRVC_CD = this.SRVC_CD[j];
      //console.log(this.SL_SRVC_CD);
      this.data.getID(this.SL_APP_CD, this.SL_PRCS_CD, this.SL_SRVC_CD).subscribe(res => {
        // //console.log(res.json());
        this.SRVC_DATA = res.json();
        this.SRVC_CD.push(this.SRVC_DATA['SRVC_CD']);
        // //console.log(this.SRVC_CD);

        this.executedata = { SL_APP_CD: this.SL_APP_CD, SL_PRC_CD: this.SL_PRC_CD };
        console.log(this.executedata);
        this.StorageSessionService.setCookies("executedata", this.executedata);
        this.ID_DATA = res.json();
        this.StorageSessionService.setCookies("iddata", this.ID_DATA);
        console.log(this.ID_DATA);
        this.APP_ID = this.ID_DATA['V_APP_ID'];

        this.PRCS_ID = this.ID_DATA['V_PRCS_ID'];


        this.SRC_ID = this.ID_DATA['V_SRC_ID'];

        this.SRVC_ID = this.ID_DATA['V_SRVC_ID'];
        this.UNIQUE_ID = this.ID_DATA['V_UNIQUE_ID'];

        this.getDeployment();
      });

    }

  }


  getDeployment() {
    this.deployService = [];
    this.deployData = [];
    //console.log("getDeployment function");
    //console.log(this.SL_SRVC_ID);
    this.data.getDeployStatus(this.UNIQUE_ID, this.SRC_ID, this.APP_ID, this.PRCS_ID, this.SRVC_ID).subscribe(res => {
      // //console.log(res.json());
      this.deployData = res.json();

      if (this.deployData['CXN_ID'].length === 0) {
        //console.log("inside if");
        this.deployService[this.p] = this.SRVC_CD[this.q];
        //console.log(this.deployService[this.p]);

        //         for(let h=0;h<this.deployService.length;h++){
        //         this.http.get<data>(this.apiUrlGet+"V_PRDCR_SRC_CD="+this.V_SRC_CD+"&V_PRDCR_APP_CD="+this.SL_APP_CD+"&V_PRDCR_PRCS_CD="+this.SL_PRC_CD+"&V_PRDCR_SRVC_CD="+this.deployService[h]+"&V_DIRECTION=A&REST_Service=Orchestration&Verb=GET").subscribe(
        //           res=>{
        // //console.log(res);
        // this.countonerror=res.CONT_ON_ERR_FLG;
        // });
        // }
        // if(this.countonerror.length===0){

        //         this.deployService.splice(this.deployService.indexOf(this.deployService[h]), 1);      
        // }

        this.p++;
        //this.b = false;
        // this.Service_box = true;
        // this.Execute_Now_btn = true;
        // this.Schedule_btn = true;
        // this.snackBar.open("Cannot Execute because of Undeployed Services","", {
        //   duration: 3000,
        // });


        this.q++;
      }
      // else {
      //   this.b = false;
      //   this.Service_box = true;     
      //   this.Execute_Now_btn = false;
      //   this.Schedule_btn = false;

      // }


    });









  }

  /////////////////////////////////////////////////////////////////////////////////////////////////////
  //--------------this is for report table 
  Execute_both() {
    this.getAppCode();
    this.getProcessCD(this.APP_CD);
  }
  //________________________________CLOSE 2___________________________
  fooo1(u) {
    if (this.mobileView)
      u = u.value;
    if (u == null) {

    } else {
      this.SL_PRC_CD = u;
      this.app.selected_PROCESS = u;
    }

  }
  b = false;
  ParametrValue: any[];
  ParameterName: any[];
  FormData: any[];
  Data: any[] = [];
  Data1: any[] = [];
  myFormData;
  searchResult: any[];

  createDyanamicForm() {

    this.b = false;
    this.Data = [];
    this.currentKey = [];
    this.currentVal = [];

    //this.https.get(this.apiUrlGet + "V_APP_CD=" + this.SL_APP_CD + "&V_PRCS_CD=" + this.SL_PRC_CD + "&V_SRC_CD=" + this.V_SRC_CD + "&REST_Service=ProcessParameters&Verb=GET").subscribe(

    //------- Changed the Rest call for Parameters (By : Balraj Saini) Added Two flags --------

    this.https.get(this.apiUrlGet + "V_APP_CD=" + this.SL_APP_CD + "&V_PRCS_CD=" + this.SL_PRC_CD + "&V_SRC_CD=" + this.V_SRC_CD + "&ResetOptimised=" + this.ResetOptimised + "&Lazyload=" + this.Lazyload + "&REST_Service=ProcessParameters&Verb=GET").subscribe(
      res => {
        console.log(res.json());
        this.FormData = res.json();
        this.ParametrValue = this.FormData['PARAM_VAL'];
        this.ParameterName = this.FormData['PARAM_NM'];


        for (let i = 0; i < this.ParametrValue.length; i++) {
          //-----------Balraj Code---------
          this.currentVal = this.ParametrValue[i].split(',');
          this.currentKey = this.ParameterName[i];
          this.result[this.currentKey] = this.currentVal;
          console.log(this.result);

          if (this.ParameterName[i].includes('Date') && !(this.ParameterName[i].includes('DateTime'))) {
            this.Data[i] = {
              type: 'date',
              name: Object.keys(this.result)[i],
              value: Object.values(this.result)[i][0],
              placeholder: Object.keys(this.result)[i]

            };

          }
          else if (this.ParameterName[i].charAt(0) == '?') {
            this.Data[i] = {
              type: 'radio',
              name: Object.keys(this.result)[i],
              value: Object.values(this.result)[i][0],
              placeholder: Object.keys(this.result)[i]
            };
          }
          else if (this.ParameterName[i].charAt(this.ParameterName[i].length - 1) == '?') {
            this.Data[i] = {
              type: 'checkbox',
              name: Object.keys(this.result)[i],
              value: Object.values(this.result)[i][0],
              placeholder: Object.keys(this.result)[i]
            };
          }
          else if (this.ParameterName[i].includes('Time') && !(this.ParameterName[i].includes('DateTime'))) {
            this.Data[i] = {
              type: 'time',
              name: Object.keys(this.result)[i],
              value: Object.values(this.result)[i][0],
              placeholder: Object.keys(this.result)[i]
            };
          }
          else if (this.ParameterName[i].includes('DateTime')) {
            this.Data[i] = {
              type: 'datetime',
              name: Object.keys(this.result)[i],
              value: Object.values(this.result)[i][0],
              placeholder: Object.keys(this.result)[i]
            };
          }
          else if (this.ParameterName[i].includes('Password')) {
            this.Data[i] = {
              type: 'password',
              name: Object.keys(this.result)[i],
              value: Object.values(this.result)[i][0],
              placeholder: Object.keys(this.result)[i]
            };
          }
          else if (this.ParameterName[i].includes('Range')) {
            this.Data[i] = {
              type: 'range',
              name: Object.keys(this.result)[i],
              value: Object.values(this.result)[i][0],
              placeholder: Object.keys(this.result)[i]
            };
          }
          else if (this.ParameterName[i].includes('Color')) {
            this.Data[i] = {
              type: 'color',
              name: Object.keys(this.result)[i],
              value: Object.values(this.result)[i][0],
              placeholder: Object.keys(this.result)[i]
            };
          }
          else {
            this.Data[i] = {
              type: 'input',
              name: Object.keys(this.result)[i],
              value: Object.values(this.result)[i][0],
              placeholder: Object.keys(this.result)[i]
            };
          }
          //---------Balraj Code--------

          // if(this.ParameterName[i].includes('Date')&& !(this.ParameterName[i].includes('DateTime'))){
          //   this.Data[i] = {
          //     type: 'date',
          //     name: this.ParameterName[i],
          //     value: this.ParametrValue[i],
          //     placeholder: this.ParameterName[i].split('_').join(' '),

          //   };

          // }
          // else if(this.ParameterName[i].charAt(0)=='?'){
          //   this.Data[i] = {
          //     type: 'radio',
          //     name: this.ParameterName[i],
          //     value: this.ParametrValue[i],
          //     placeholder: this.ParameterName[i].split('_').join(' '),
          //   };
          // }
          // else if(this.ParameterName[i].charAt(this.ParameterName[i].length-1)=='?'){
          //   this.Data[i] = {
          //     type: 'checkbox',
          //     name: this.ParameterName[i],
          //     value: this.ParametrValue[i],
          //     placeholder: this.ParameterName[i].split('_').join(' '),
          //   };
          // }
          // else if(this.ParameterName[i].includes('Time') && !(this.ParameterName[i].includes('DateTime'))){
          //   this.Data[i] = {
          //     type: 'time',
          //     name: this.ParameterName[i],
          //     value: this.ParametrValue[i],
          //     placeholder: this.ParameterName[i].split('_').join(' '),
          //   };
          // }
          // else if(this.ParameterName[i].includes('DateTime')){
          //   this.Data[i] = {
          //     type: 'datetime',
          //     name: this.ParameterName[i],
          //     value: this.ParametrValue[i],
          //     placeholder: this.ParameterName[i].split('_').join(' '),
          //   };
          // }
          // else if(this.ParameterName[i].includes('Password')){
          //   this.Data[i] = {
          //     type: 'password',
          //     name: this.ParameterName[i],
          //     value: this.ParametrValue[i],
          //     placeholder: this.ParameterName[i].split('_').join(' '),
          //   };
          // }
          // else if(this.ParameterName[i].includes('Range')){
          //   this.Data[i] = {
          //     type: 'range',
          //     name: this.ParameterName[i],
          //     value: this.ParametrValue[i],
          //     placeholder: this.ParameterName[i].split('_').join(' '),
          //   };
          // }
          // else if(this.ParameterName[i].includes('Color')){
          //   this.Data[i] = {
          //     type: 'color',
          //     name: this.ParameterName[i],
          //     value: this.ParametrValue[i],
          //     placeholder: this.ParameterName[i].split('_').join(' '),
          //   };
          // }
          // else{
          //   this.Data[i] = {
          //     type: 'input',
          //     name: this.ParameterName[i],
          //     value: this.ParametrValue[i],
          //     placeholder: this.ParameterName[i].split('_').join(' '),

          //   };
          // }

          this.k = i;
        }
        (this.ParametrValue.length > 0) ? this.b = true : this.b = false;
        //console.log("Parameter names :"+this.Data);
        //console.log("Parameter names :"+this.Data['value']);
      }

    );

    console.info("Dynamic form :");
    console.log(this.Data);
   for(let i=0;i<=this.Data.length;i++){
          this.Data['name'][i]=this.Data['name'][i].split("_").join(" ");
   }
  }
  /*
	Filter the drop down autocomplete list 
  */
  FilterAutoValue: any;
  private mouse: MouseState = new MouseState();
  Update_value(v: any, n: any) { //v=value and n=paramter name
    if (this.mouse.mouseClick && this.mouse.mouseOut && this.mouse.parameterName != undefined && this.mouse.parameterValue != undefined) {
      console.log("both event fired");
      console.log("Parameter name :" + this.mouse.parameterName);
      console.log("Parameter value :" + this.mouse.parameterValue);
      this.http.get(this.apiUrlGet + "V_APP_CD=" + this.SL_APP_CD + "&V_PRCS_CD=" + this.SL_PRC_CD + "&V_SRC_CD=" + this.V_SRC_CD + "&V_USR_NM=" + this.V_USR_NM + "&V_PARAM_NM=" + n + "&V_PARAM_VAL=" + v + "&REST_Service=ProcessParameters&Verb=PATCH").subscribe(
        res => {
          console.log(res);
        }
      );

      this.mouse.mouseClick = false;
      this.mouse.mouseOut = false;
    }
    //   if(this.mouseOutState){
    //     console.log(v);
    //    this.FilterAutoValue = v;
    //   this.http.get(this.apiUrlGet + "V_APP_CD=" + this.SL_APP_CD + "&V_PRCS_CD=" + this.SL_PRC_CD + "&V_SRC_CD=" + this.V_SRC_CD + "&V_USR_NM=" + this.V_USR_NM + "&V_PARAM_NM=" + n + "&V_PARAM_VAL=" + v + "&REST_Service=ProcessParameters&Verb=PATCH").subscribe(
    //     res => {
    //       //  console.log(res);
    //     }
    //   );
    //   this.mouseOutState=false;
    //   this.mouseClickState=false;
    // }
  }
  /*
    Update the dynami input value when the user click on 
    autocomplete dropdown list item 
  */
  updateParameterValue(parameterValue: any, parameterName: any) {
    this.mouse.mouseClick = true;
    this.mouse.mouseOut = true;
    console.log("autolist click parameter vlaue :" + parameterValue);
    console.log("autolist click parameter name :" + parameterName);
    this.Update_value(parameterValue, parameterName);
  }

  keyUpEventActive(parameterValue: any, parameterName: any) {
    this.FilterAutoValue = parameterValue;
    this.mouse.parameterName = parameterName;
    console.log("parameter name :" + this.mouse.parameterName)

    this.mouse.parameterValue = parameterValue;
    console.log("parameter value " + this.mouse.parameterValue);
    //  this.getDropDownListValue(parameterValue);
  }
  /*
    When the user click on input tag
  */
  makeFilterValueEmpty() {
    this.searchResult = [];
    this.mouse.mouseClick = true;
  }
  /*
    When user mouse out on the input 
  */
  mouseOutEventActive(value: any, name: any) {
    this.mouse.mouseOut = true;
    this.Update_value(value, name);
  }
  /*
	Get the drop down list autocomplete 
	in dynamic form 
  */
  filteredOptions: Observable<string[]>;
  getDropDownListValue(e: any) {
    //  this.searchResult = [];
    // console.log(this.result[e]);
    this.searchResult = Object.values(this.result[e]);
    //  this.http.get(this.apiUrlGet + "V_SRC_CD=" + this.V_SRC_CD + "&V_APP_CD=" + this.SL_APP_CD + "&V_PRCS_CD=" + this.SL_PRC_CD + "&V_PARAM_NM=" + e + "&V_SRVC_CD="+this.SL_SRVC_CD+"&REST_Service=ProcessParametersOptions&Verb=GET")
    //    .subscribe(
    //      res => {
    //       console.log(res[e]);
    //       this.searchResult = res[e];
    //       this.app.loading = false;
    //     }
    //    );
  }

  //____________CLOSE APP CODE FUN
  add() {
    for (let i = 0; i <= this.k; i++) {
      if (this.Data[i].value != "" && this.Data[i].value != null) {
        this.ts[this.Data[i].name] = this.Data[i].value;
      }
    }
    //console.log(this.ts);
    this.StorageSessionService.setCookies("ts", this.ts);
  }
  /*
  Calling this method when user click on execute button to 
  and its will return the report required data and we should have to pass
  that daa in generate report method 
  */
  Execute_res_data: any[];
  //@override ReportGenerate interface
  executeNow() {
    console.info("executing the form and generating report ");
    let body = {
      "V_APP_CD": this.SL_APP_CD,
      "V_PRCS_CD": this.SL_PRC_CD,
      "V_SRVC_CD": 'START',
      "V_SRC_CD": this.V_SRC_CD,
      "V_USR_NM": this.V_USR_NM
    };
    console.log("The payload that are you sending :");
    console.log(body);
    Object.assign(body, this.ts)
    this.https.post("https://" + this.domain_name + "/rest/Process/Start", body).subscribe(
      res => {
        console.log("Response of execute :");
        console.log(res.json());
        this.Execute_res_data = res.json();
        this.StorageSessionService.setCookies("executeresdata", this.Execute_res_data);
        this.PFrame.display_page = false;
        this.generateReportTable();
      }
    );
  }
  /*
    Generate the final report call when user click on execute now 
    button 
    
  */
  //@override ReportGenerate interface
  public report: ReportData = new ReportData;
  //@override ReportGenerate interface
  generateReportTable(): void {
    console.info("Generating report ");
    this.app.loadingCharts = true;
    let body = {
      V_SRC_ID: this.Execute_res_data['V_SRC_ID'],
      V_UNIQUE_ID: this.Execute_res_data['V_UNIQUE_ID'],
      V_APP_ID: this.Execute_res_data['V_APP_ID'],
      V_PRCS_ID: this.Execute_res_data['V_PRCS_ID'],
      V_PRCS_TXN_ID: this.Execute_res_data['V_PRCS_TXN_ID'],
      V_NAV_DIRECTION: this.Execute_res_data['V_NAV_DIRECTION'],
      V_DSPLY_WAIT_SEC: 100,
      V_MNL_WAIT_SEC: 180,
      REST_Service: 'Report',
      Verb: 'POST'
    }
    console.log("The payload that for report generate is :");
    console.log(body);
    this.https.post(this.aptUrlPost_report, body)
      .subscribe(
      res => {
        this.StorageSessionService.setCookies("report_table", res.json());
        this.check_data = res.json();
        this.app.loadingCharts = false;
        this.report = res.json();
        console.info("This is report generated data :");
        console.log(this.report);
        console.info("The URL to redirecting form is :");
        console.log(this.report.RESULT);
        if (this.report.RESULT[0] == "INPUT_ARTFCT_TASK" || this.report.RESULT[0] == "FORM"|| this.report.V_EXE_CD[0] == "V_EXE_CD" ||this.report.V_EXE_CD[0] =="NONREPEATABLE_MANUAL_TASK" )
          this.Router.navigateByUrl('Forms');
        else
          this.Router.navigateByUrl('ReportTable');
        // if(this.report.RESULT == "INPUT_ARTFCT_TASK"){
          
        //   this.Router.navigateByUrl('Input_Art');
        // }
      }
      );
    if (this.app.loadingCharts && this.show_ALL)
      this.chart_JSON_call();
  }
  ColorGantt = [];
  Colorpie = [];
  Colorpie_boder = [];
  ColorBar = [];
  ColorBar_border = [];

  time_to_sec(time): any {
    return parseInt(time.substring(0, 2)) * 3600 + parseInt(time.substring(3, 5)) * 60 + (parseInt(time.substring(6)));
  }

  show_gantt_chart(Process, start_time, end_time) {
    var count = 0, flag = false, val1;
    var mydataset = [];
    for (let i = 0; i < Process.length; i++) {
      var R = Math.floor(Math.random() * 200);
      var G = Math.floor(Math.random() * 200);
      var B = Math.floor(Math.random() * 200);
      if (this.ColorGantt.length < i + 1)
        this.ColorGantt[i] = "rgba(" + R + ',' + G + ',' + B + ")";
      //console.log((this.time_to_sec(start_time[i]) - this.time_to_sec(start_time[0])));
      //console.log((this.time_to_sec(end_time[i]) - this.time_to_sec(start_time[0])));
      mydataset[Process.length - i - 1] = {
        backgroundColor: this.ColorGantt[i],
        borderColor: this.ColorGantt[i],
        fill: false,
        borderWidth: 20,
        pointRadius: 0,
        data: [
          {
            x: (this.time_to_sec(start_time[i]) - this.time_to_sec(start_time[0])),
            y: Process.length - i - 1
          }, {
            x: (this.time_to_sec(end_time[i]) - this.time_to_sec(start_time[0])),
            y: Process.length - i - 1
          }
        ]
      }
    }
    var element = (<HTMLCanvasElement>document.getElementById("myGanttchart"));
    if (element != null) {
      var ctx = element.getContext('2d');
      var scatterChart = new Chart(ctx, {
        type: 'line',
        data: {
          datasets: mydataset
        },
        options: {
          animation: {
            duration: 0
          },
          legend: {
            display: false
          },
          scales: {
            yAxes: [{
              scaleLabel: {
                display: true,
                labelString: 'Processes',
                fontStyle: 'bold'
              },
              gridLines: {
                display: false,
              },
              ticks: {
                beginAtZero: true,
                callback: function (value, index, values) {
                  return Process[Process.length - value - 1];
                }
              }
            }],
            xAxes: [{
              type: 'linear',
              position: 'top',
              display: true,
              scaleLabel: {
                display: true,
                labelString: 'Time',
                fontStyle: 'bold'
              },
              ticks: {
                //beginAtZero :true,
                callback: function (value, index, values) {
                  if (value == Math.floor(value)) {
                    var beg_str = start_time[0].substring(0, 2);
                    var begstr = parseInt(beg_str);
                    var mid_str = (start_time[0][3] + start_time[0][4]);
                    var midstr = parseInt(mid_str);
                    var end_str = start_time[0].substring(6);
                    var endstr = parseInt(end_str);
                    endstr += value;
                    midstr += Math.floor(endstr / 60);
                    endstr = endstr - 60 * Math.floor(endstr / 60);
                    begstr += Math.floor(midstr / 60);
                    midstr = midstr - 60 * Math.floor(midstr / 60);
                    //console.log(index);

                    if (midstr < 10)
                      mid_str = '0' + midstr;
                    if (endstr < 10)
                      end_str = '0' + endstr;
                    if (begstr < 10)
                      beg_str = '0' + begstr;
                    //console.log(count);
                    return beg_str + ':' + mid_str + ':' + end_str;
                  }
                  //return value/val1;
                  //return index;
                },
              }

            }],
          }
        }
      });
    }
  }

  show_pie(Process, start_time, end_time) {
    var mydata = [];
    var color = [], bcolor = [];
    var borderwidth_ = [];
    for (let i = 0; i < Process.length; i++) {
      var R = Math.floor(Math.random() * 200);
      var G = Math.floor(Math.random() * 200);
      var B = Math.floor(Math.random() * 200);
      if (this.Colorpie.length < i + 1) {
        this.Colorpie[i] = 'rgb(' + R + ',' + G + ',' + B + ',0.8)';
        this.Colorpie_boder[i] = 'rgb(' + Math.floor(R * 0.8) + ',' + Math.floor(G * 0.8) + ',' + Math.floor(B * 0.8) + ')';
      }
      var temp = (this.time_to_sec(end_time[i]) - this.time_to_sec(start_time[i]));
      mydata[i] = temp;
      color[i] = this.Colorpie[i];
      bcolor[i] = this.Colorpie_boder[i];
      borderwidth_[i] = 1;
    }
    var data2 = {
      labels: Process,
      datasets: [
        {
          data: mydata,
          backgroundColor: color,
          borderColor: bcolor,
          borderWidth: borderwidth_
        }
      ]
    };
    var element = (<HTMLCanvasElement>document.getElementById("myPie"));
    if (element != null) {
      var ctx = element.getContext('2d');
      var chart1 = new Chart(ctx, {
        type: "pie",
        data: data2,
        options: {
          animation: {
            duration: 0
          },
          responsive: true,
          tooltips: {
            callbacks: {
              title: function (tooltipItem, data) {
                return data['labels'][tooltipItem[0]['index']];
              },
              label: function (tooltipItem, data) {
                //console.log(tooltipItem);
                //console.log(data['datasets'][0]['data'][tooltipItem['index']]);
                var ret = mydata[tooltipItem['index']];
                ret = Math.floor(ret * 100) / 100;
                return ret + ' sec';
              }
            },
            backgroundColor: '#FFF',
            titleFontSize: 16,
            titleFontColor: '#0066ff',
            bodyFontColor: '#000',
            bodyFontSize: 14,
            displayColors: false
          },
          title: {
            display: true,
            position: "top",
            text: "Current Processes",
            fontSize: 12,
            fontColor: "#111"
          },
          legend: {
            display: true,
            position: "right",
            labels: {
              fontColor: "#333",
              fontSize: 10
            }
          }
        },
      });
    }
  }

  show_bar_chart(Process, start_time, end_time) {
    var val1, flag = false;
    var duration = [];
    var color = [];
    var bcolor = [];
    var temp_HH, temp_MM, temp_SS;
    for (let i = 0; i < Process.length; i++) {
      let len_temp = Process[i].length;
      Process[i] = Process[i].substring(0, 11);
      if (len_temp > Process[i].length)
        Process[i] = Process[i] + '...';
      var temp = this.time_to_sec(end_time[i]) - this.time_to_sec(start_time[i]);
      duration[i] = temp;
      //console.log(duration);
      var R = Math.floor(Math.random() * 200);
      var G = Math.floor(Math.random() * 200);
      var B = Math.floor(Math.random() * 200);
      if (this.ColorBar.length < i + 1) {
        this.ColorBar[i] = 'rgba(' + R + ',' + G + ',' + B + ',0.6)';
        this.ColorBar_border[i] = 'rgb(' + Math.floor(R * 0.8) + ',' + Math.floor(G * 0.8) + ',' + Math.floor(B * 0.8) + ')';
      }
      color[i] = this.ColorBar[i];
      bcolor[i] = this.ColorBar_border[i];
    }
    var element = (<HTMLCanvasElement>document.getElementById("myBarchart"));
    if (element != null) {
      var ctx = element.getContext('2d');
      var myBarChart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: Process,
          datasets: [
            {
              data: duration,
              backgroundColor: color,
              borderColor: bcolor,
              borderWidth: 1
            }]
        },
        options: {
          animation: {
            duration: 0
          },
          responsive: true,
          legend: {
            display: false,
            position: "bottom",
            labels: {
              fontColor: "#333",
              fontSize: 16
            }
          },
          tooltips: {
            callbacks: {
              title: function (tooltipItem, data) {
                return data['labels'][tooltipItem[0]['index']];
              },
              label: function (tooltipItem, data) {
                //console.log(tooltipItem);
                //console.log(data['datasets'][0]['data'][tooltipItem['index']]);
                var ret = duration[tooltipItem['index']];
                ret = Math.floor(ret * 100) / 100;
                return ret + ' sec';
              }
            },
            backgroundColor: '#FFF',
            titleFontSize: 16,
            titleFontColor: '#0066ff',
            bodyFontColor: '#000',
            bodyFontSize: 14,
            displayColors: false
          },
          scales: {
            yAxes: [{
              display: true,
              scaleLabel: {
                display: true,
                labelString: 'Duration',
                fontStyle: 'bold'
              },
              ticks: {
                min: 0,
                callback: function (value, index, values) {
                  if (value == Math.floor(value)) {
                    var begstr = 0;
                    var midstr = 0;

                    var endstr = value;
                    //console.log(index*value);
                    midstr += Math.floor(endstr / 60);
                    endstr = endstr - 60 * Math.floor(endstr / 60);
                    begstr += Math.floor(midstr / 60);
                    midstr = midstr - 60 * Math.floor(midstr / 60);
                    //console.log(index);
                    let beg_str = begstr.toString(), mid_str = midstr.toString(), end_str = endstr.toString();
                    if (midstr < 10)
                      mid_str = '0' + midstr;
                    if (endstr < 10)
                      end_str = '0' + endstr;
                    if (begstr < 10)
                      beg_str = '0' + begstr;
                    //console.log(min);
                    return beg_str + ':' + mid_str + ':' + end_str;
                  }
                  //return value;
                  //return index;
                },
              }
            }],
            xAxes: [{
              display: true,
              gridLines: {
                display: false,
              },
              scaleLabel: {
                display: true,
                labelString: 'Processes',
                fontStyle: 'bold'
              },
            }]
          }
        }
      });
    }
  }
  chart_JSON_call() {
    this.http.get(this.apiUrlGet + "V_SRC_ID=" + this.Execute_res_data['V_SRC_ID'] + "&V_APP_ID=" + this.Execute_res_data['V_APP_ID'] + "&V_PRCS_ID=" + this.Execute_res_data['V_PRCS_ID'] + "&V_PRCS_TXN_ID=" + this.Execute_res_data['V_PRCS_TXN_ID'] + "&REST_Service=ProcessStatus&Verb=GET").subscribe(res => {
      console.log(res);
      var start_time = [], end_time = [], Process = [];

      for (let i = 0; i < res['INS_DT_TM'].length; i++) {
        start_time[i] = res['INS_DT_TM'][i].substring(11);
        end_time[i] = res['LST_UPD_DT_TM'][i].substring(11);
        Process[i] = res['PRDCR_SRVC_CD'][i];
      }
      if (this.show_Gantt) {
        this.show_gantt_chart(Process, start_time, end_time);
      }
      if (this.show_PIE) {
        this.show_pie(Process, start_time, end_time);
      }
      if (this.show_BAR) {
        this.show_bar_chart(Process, start_time, end_time);
      }
      // if(this.show_SM_PIE){
      //   this.show_sm_pie_chart(Process, start_time, end_time);
      //   }
      //delay
      var exec = this;
      if (this.app.loadingCharts)
        setTimeout(function () { exec.chart_JSON_call(); }, 500);
    });
  }
  repeatURL() {

    this.form_dl_data[0] = {
      APP_CD: this.SL_APP_CD,
      PRC_CD: this.SL_PRC_CD
    }

    this.StorageSessionService.setSession("Exe_data", this.form_dl_data[0]);
    //console.log(this.form_dl_data[0]);
    // this.Router.navigateByUrl("repeat");
  }
  ///data11='{PIID=[W56JSR14C0050, W9124916F0057, HSHQDC17F0002…280001, 200370001], Country=[USA, USA, USA, USA],balaji=[IND, IND, IND, IND]}';
  Roll_cd: any[] = [];
  Label: any[] = [];


  ngOnInit() {
    let exec = this;
    setTimeout(function () {
      exec.wSocket.listenOn = '102';
      exec.msg.getMessage.subscribe(res => {
        console.log(res);

      });
    }, 5000);
    //this.APP_CD=this.app.APP_CD_GLOBAL;
    //this.PRC_CD=this.app.PRC_CD_GLOBAL;
    this.Service_box = false;
    if (this.app.selected_APPLICATION != 'ALL' && !this.app.START)
      this.selectedapp = this.app.selected_APPLICATION;
    if (this.app.selected_PROCESS != 'ALL' && !this.app.START)
      this.selectedprcs = this.app.selected_PROCESS;
    this.data.getJSON().subscribe(data => {
      //console.log(data.json());
      this.Label = data.json();
      //console.log(this.Label);
    })

    //-----------------------------for checking the role cd 
    this.roll.getRollCd().subscribe(
      res => {
        this.Roll_cd = res['ROLE_CD'];

        let l = this.Roll_cd.length;
        let ex_btn1: any[] = [];
        let ex_btn2: any[] = [];
        let ex_tab: any[] = [];
        let ex_pro: any[] = [];
        for (let i = 0; i < l; i++) {
          if (this.Roll_cd[i] == 'Process Execute' || this.Roll_cd[i] == 'Service Execute' || this.Roll_cd[i] == 'Enablement Workflow Schedule Role' || this.Roll_cd[i] == 'End User Role') {
            if (this.Roll_cd[i] == 'Process Execute') {
              ex_btn1.push('Process Execute');
            } else if (this.Roll_cd[i] == 'Service Execute') {
              ex_btn2.push('Service Execute');
            } else if (this.Roll_cd[i] == 'Enablement Workflow Schedule Role') {
              ex_tab.push('Enablement Workflow Schedule Role')
            } else if (this.Roll_cd[i] == 'End User Role') {
              ex_pro.push('End User Role');
            }
          }
        }
        //----if both roll cd not empty then show the execute now button
        if (ex_btn1.length != 0 && ex_btn2.length != 0 && ex_pro.length != 0) {
          // this.Execute_Now_btn = false;
        }
        //---for schedule 3 Roll must here 
        if (ex_btn1.length != 0 && ex_btn2.length != 0 && ex_tab.length != 0 && ex_pro.length != 0) {
          // this.Schedule_btn = false;
        }

        // //console.log("asdasdasdsad"+ex_btn1[0]+ex_btn2[0]+ex_tab[0]+ex_pro[0]);

      }
    );




  }
}
export class MouseState {
  mouseClick: boolean;
  mouseOut: boolean;
  parameterValue: string;
  parameterName: string;
}
export interface data {
  PARAM_NM: string[];
  PARAM_VAL: string[];
  RESULT: string[];
  CONT_ON_ERR_FLG: string[];
}
