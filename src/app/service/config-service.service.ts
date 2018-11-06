import { Injectable } from '@angular/core';
import { HttpClient,HttpEvent,HttpEventType ,HttpHeaders } from '@angular/common/http';
import { Http,Response,Headers } from '@angular/http';
import { StorageSessionService } from './storage-session.service';
import { Observable } from 'rxjs/Observable';
import {Globals} from './globals';

@Injectable()
export class ConfigServiceService {
  domain_name=this.globals.domain_name;
  
  V_SRC_CD:string=this.StorageSessionService.getSession("agency");
  V_USR_NM:string=this.StorageSessionService.getSession("email");
  constructor(private http:Http,private https:HttpClient,
    private StorageSessionService:StorageSessionService, private globals:Globals) { }

   private apiUrlGet = "https://"+this.domain_name+"/rest/E_DB/SP?";
  private apiUrlPost = "https://"+this.domain_name+"/";
//-------------TAB GROU
public getJSON(): Observable<any> {
  return this.http.get("./assets/label/label.json")
}

  checkUserPwd(email:any){
    return this.http.get(this.apiUrlGet + "V_USR_NM="+email+"&V_ACTN_NM=LOGIN&REST_Service=UserValidity&Verb=GET")
      .map((data: Response) => data.json());
  }
  // async getPrice(currency: string): Promise<number> {
  //   const response = await this.http.get('http://api.coindesk.com/v1/bpi/currentprice.json').toPromise();
  //   return response.json().bpi[currency].rate;
  // }
checkLoginPassword(data:any){
  let body = {
      "V_USR_NM": data.email,
      "V_PSWRD": data.pass,
      "V_ACTN_NM": "LOGIN",
      "RESULT": "@RESULT"
    };
    var aa = JSON.stringify(body);
  return this.http.post(this.apiUrlPost + "CheckUsr",aa)
    .map((data: Response) => data.json());
}

checkOrganization(organization:any){
  let body = {
      "V_SRC_CD": organization,
      "RESULT": "@RESULT"
    };
  var aa = JSON.stringify(body);
  return this.http.post(this.apiUrlPost + "CheckSrc",aa)
    .map((data: Response) => data.json());
}

sendConfirmMail(data:any){
  let body = {
      "V_USR_NM": data.email,
      "V_PSWRD": data.pass,
      "SRC_CD": data.agency,
      "message": "Please confirm your login..."
    };
    var aa = JSON.stringify(body);
  return this.http.post(this.apiUrlPost + "SendEmail",aa)
    .map((data: Response) => data.json());
}

Execute_Now(){
      var headers = new Headers();
      headers.append('application', 'json');
  let body = {
      "V_APP_CD":'Federal Contracts',
      "V_PRCS_CD":'Federal Opportunities',
      "V_SRVC_CD":'START',
      "V_SRC_CD":'local13',
      "V_USR_NM":'local13@adventbusiness.com'

    };
       var aa = JSON.stringify(body);
      return  this.https.post("https://"+this.domain_name+"/rest/Process/Execute", aa)
   ;
   
}

onPause(TriggerKey,JobKey){
  console.log('onPause!!!');
  // console.log(TriggerKey);

  var headers = new Headers();
  headers.append('application','json');
  let body = { 
    "TriggerKey": TriggerKey, 
    "JobKey": JobKey, 
    "Operation": ["Pause"] 
  };

  // var aa = JSON.stringify(body);
  return this.https.post("https://"+this.domain_name+"/rest/Hold/ScheduleAction",body)
}

  onResume(TriggerKey, JobKey) {
    console.log('RESUME!!!');

    var headers = new Headers();
    headers.append('application', 'json');
    let body = {
      "TriggerKey": TriggerKey,
      "JobKey": JobKey, 
      "Operation": ["Resume"]
    };

    return this.https.post("https://"+this.domain_name+"/rest/Hold/ScheduleAction", body)
  }

  onKill(TriggerKey, JobKey) {
    console.log('KILL!!!');
    var headers = new Headers();
    headers.append('application', 'json');
    let body = {
      "TriggerKey": TriggerKey,
      "JobKey": JobKey, 
      "Operation": ["Kill"]
    };

    return this.https.post("https://"+this.domain_name+"/rest/Hold/ScheduleAction", body)
  }

getUserId(data:any) {
  return this.http.get(this.apiUrlGet + "V_CD_TYP=SRC&V_SRC_CD="+ data +"&SCREEN=PROFILE&REST_Service=Masters&Verb=GET")
    .map((data: Response) => data.json());
}

getExecutableType(){
    return this.http.get(this.apiUrlGet+"V_CD_TYP=EXE&V_SRC_CD="+this.V_SRC_CD+"&SCREEN=PROFILE&REST_Service=Masters&Verb=GET");
}

  getPlatformType() {
    return this.http.get(this.apiUrlGet + "V_CD_TYP=server&V_SRC_CD=" + this.V_SRC_CD + "&SCREEN=PROFILE&REST_Service=Masters&Verb=GET");
  //  V_CD_TYP=server&V_SRC_CD=Advent%20Business%20Company%20Inc.%20&SCREEN=PROFILE&REST_Service=Masters&Verb=GET


    // return this.http.get(this.apiUrlGet + "V_EXE_CD="+EXE_CD+"&V_SRC_CD=" + this.V_SRC_CD +"&V_APP_CD="+this.V_APP_CD+"&SCREEN=PROFILE&REST_Service=Masters&Verb=GET");

  }
//  /E_DB/SP?V_EXE_CD=GetRefulingDistanceTimeFuel&V_SRC_CD=local&V_APP_CD=ALL&V_PRCS_CD=Contracts%20Opportunities&V_USR_NM=local@adventbusiness.com&V_TRIGGER_STATE=ALL&REST_Service= Exe_Server&Verb=GET

  getPlatformDescription(PLF_CD){
    return this.http.get(this.apiUrlGet + "V_CD_TYP=SERVER&V_CD=" + PLF_CD+ "&V_SRC_CD=" + this.V_SRC_CD + "&REST_Service=Description&Verb=GET");
    // return this.http.get("https://"+this.domain_name+"/rest/E_DB/SP?V_CD_TYP=ROLE&V_SRC_CD=Advent%20Business%20Company%20Inc.&REST_Service=Masters&Verb=GET")
  }

  getRoleCode(){
    return this.http.get(this.apiUrlGet + "V_CD_TYP=ROLE&V_SRC_CD=" + this.V_SRC_CD + "&REST_Service=Masters&Verb=GET");
  }

  getRoleDescription(ROLE_CD){
    return this.http.get(this.apiUrlGet + "V_CD_TYP=ROLE&V_CD=" + ROLE_CD + "&V_SRC_CD=" + this.V_SRC_CD + "&REST_Service=Description&Verb=GET");

  }

  getAccessRights(ROLE_CD,EXE_CD_R,EXE_TYPE_R)
  {
    return this.http.get(this.apiUrlGet + "V_CD_TYP=EXE&V_SRC_CD="+this.V_SRC_CD +"&V_CODE="+ EXE_CD_R +"&V_ROLE_CD=" + ROLE_CD + "&V_APP_CD=&V_PRCS_CD=&V_EXE_TYP="+ EXE_TYPE_R +"&V_ASSET_TYP=&REST_Service=Access&Verb=GET");

  }  

  sendParams(body) {
    // return this.http.put(this.apiUrlGet + "V_EXE_CD=" + EXE[] + "&V_SRC_CD=" + this.V_SRC_CD + "&REST_Service=Description&Verb=GET");
    return this.http.put("https://"+this.domain_name+"/rest/E_DB/SP", body);

  }

  getDeploymentStatus() {

  }

  // }getExecutableCode
getExecutableCode(EXE_TYPE:any){
  return this.http.get(this.apiUrlGet+"V_SRC_CD="+this.V_SRC_CD+"&V_EXE_TYP="+EXE_TYPE+"&V_USR_NM="+this.V_USR_NM+"&REST_Service=User_Executables&Verb=GET");
}

getExecutableAll(EXE_TYPE,EXE_CD:any){
  return this.http.get(this.apiUrlGet+"V_UNIQUE_ID=&V_EXE_TYP="+EXE_TYPE+"&V_EXE_CD="+EXE_CD+"&V_SRC_CD="+this.V_SRC_CD+"&REST_Service=Exe_Detail&Verb=GET");
}

//Undefine Button executables
  doDelete(EXE_TYPE, EXE_CD){
  console.log("UNDEFINE");
    return this.http.delete(this.apiUrlGet + "V_EXE_TYP=" + EXE_TYPE +"&V_EXE_CD="+EXE_CD+"&V_SRC_CD=" + this.V_SRC_CD + "&REST_Service=Exe&Verb=DELETE");
  // { "V_EXE_TYP": ["VARCHAR"], "V_EXE_CD": ["VARCHAR"], "V_SRC_CD": ["VARCHAR"], "REST_Service": ["Exe"], "Verb": ["DELETE"] }


}

// ____________DEPLOYMENT- MACHINE_______________

getMachineCode()
{
  return this.http.get(this.apiUrlGet + "V_SRC_CD=" + this.V_SRC_CD +  "&V_USR_NM=" + this.V_USR_NM + "&REST_Service=Users_Machines&Verb=GET");

}

getMachineDetails(PLF_CD){
  return this.http.get(this.apiUrlGet + "V_PLATFORM_CD=" + PLF_CD + "&V_SRC_CD=" + this.V_SRC_CD + "&REST_Service=Machine&Verb=GET");
  

}
// deleteSelectedMachine(PLF_CD){
//   return this.http.delete(this.apiUrlGet + "V_PLATFORM_CD=" + PLF_CD + "&V_SRC_CD=" + this.V_SRC_CD + "&REST_Service=Machine&Verb=DELETE");
// }

  getAddMachineDetails(PLF_CD) {
    return this.http.get(this.apiUrlGet + "V_PLATFORM_CD=" + PLF_CD + "&V_SRC_CD=" + this.V_SRC_CD + "&REST_Service=Machine_Detail&Verb=GET");
 }
//_____________________________LAKVERR
getApplicationSelectBoxValues(){
  let agency = this.V_SRC_CD;
  let body = {
    "V_SRC_CD":agency,
    "RESULT":"@RESULT"
    };
  var aa = JSON.stringify(body);
  return this.http.post(this.apiUrlPost + "/SubmitSrcCode",aa)
    .map((data: Response) => data.json());
}

getProcessSelectBoxValues(appName:any){
  let agency = this.V_SRC_CD;
  let email = this.V_USR_NM;
  let body = {
    "V_SRC_CD":agency,
    "V_APP_CD" : appName,
    "V_USR_NM":email
    };
  var aa = JSON.stringify(body);
  return this.http.post(this.apiUrlPost + "/SubmitAppCode", aa)
    .map((data: Response) => data.json());
}

newScheduleJobCtl(data:any){
  var aa = JSON.stringify(data);
  return this.http.post(this.apiUrlPost + "/NewScheduleJobCtl", aa)
    .map((data: Response) => data.json());
}

manualSubmitCtl(data:any){
  var aa = JSON.stringify(data);
  return this.http.post(this.apiUrlPost + "/ManualSubmitCtl", aa)
    .map((data: Response) => data.json());
}



getAppId(data:any) {
  return this.http.get(this.apiUrlGet + "V_CD_TYP=APP&V_SRC_CD="+ data +"&SCREEN=PROFILE&REST_Service=Masters&Verb=GET")
    .map((data: Response) => data.json());
}

SLCT_MANUAL_INPUT_DBDATA(){
  return this.http.get(this.apiUrlGet + "V_SRC_ID=198&V_APP_ID=136&V_PRCS_ID=287&V_PRCS_TXN_ID=3042&V_UNIQUE_ID=1569&%20&REST_Service=Form&Verb=GET")
    .map((data: Response) => data.json());

}
//--------------------------------------------
//______________USER___________________________________________________________
  applicationCode() {
    return this.http.get(this.apiUrlGet + "V_SRC_CD=" + this.V_SRC_CD + "&V_USR_NM=" + this.V_USR_NM + "&REST_Service=SourceApps&Verb=GET")
  }

  processCode(SL_APP_CD) {
    return this.http.get(this.apiUrlGet + "V_APP_CD=" + SL_APP_CD + "&V_SRC_CD=" + this.V_SRC_CD + "&V_USR_NM=" + this.V_USR_NM + "&REST_Service=AppProcesses&Verb=GET")
  }

  serviceCode(SL_APP_CD, SL_PRCS_CD) {
    return this.http.get(this.apiUrlGet + "V_APP_CD=" + SL_APP_CD + "&V_SRC_CD=" + this.V_SRC_CD + "&V_PRCS_CD=" + SL_PRCS_CD + "&V_USR_NM=" + this.V_USR_NM + "&REST_Service=ProcessServices&Verb=GET")

  }

  getID(SL_APP_CD, SL_PRCS_CD, SL_SRVC_CD) {
    return this.http.get(this.apiUrlGet + "V_SRVC_CD=" + SL_SRVC_CD + "&V_PRCS_CD=" + SL_PRCS_CD + "&V_APP_CD=" + SL_APP_CD + "&V_SRC_CD=" + this.V_SRC_CD + "&REST_Service=Service_Ids&Verb=GET")
    //V_SRVC_CD=Load%20Contracts%20to%20DB&V_PRCS_CD=Contract%20Opportunities&V_APP_CD=Federal%20Contracts&V_SRC_CD=Angular%20Migration&REST_Service=Service_Ids&Verb=GET

  }


 
  getDeployStatus(UNIQUE_ID, SL_SRC_ID, SL_APP_ID, SL_PRCS_ID, SL_SRVC_ID) {

    return this.http.get(this.apiUrlGet + "V_UNIQUE_ID="+UNIQUE_ID+"&V_SRC_ID=" + SL_SRC_ID + "&V_APP_ID=" + SL_APP_ID + "&V_PRCS_ID=" + SL_PRCS_ID + "&V_SRVC_ID=" + SL_SRVC_ID + "&FULL_DTL_FLG=Y&AVL_DTL_FLG=N&REST_Service=DeploymentStatus&Verb=GET")
  }
getAppCode(){
return  this.http.get(this.apiUrlGet+"V_CD_TYP=APP&V_SRC_CD="+this.V_SRC_CD+"&SCREEN=PROFILE&REST_Service=Masters&Verb=GET");
}
getProcessCD(V_APP_CD:any){
	//V_CD_TYP=PRCS&V_SRC_CD="+this.V_SRC_CD+"&SCREEN=PROFILE&REST_Service=Masters&Verb=GET
	//"
  return this.http.get(this.apiUrlGet+"V_APP_CD="+V_APP_CD+"&V_SRC_CD="+this.V_SRC_CD+"&V_USR_NM="+this.V_USR_NM+"&REST_Service=AppProcesses&Verb=GET");
}

find_process(ApplicationCD,ProcessCD,StatusCD){  
  
  return this.https.get<data>(this.apiUrlGet + "V_SRC_CD=" + this.V_SRC_CD + "&V_APP_CD=" + ApplicationCD + "&V_PRCS_CD=" + ProcessCD + "&V_USR_NM=" + this.V_USR_NM + "&V_TRIGGER_STATE=" + StatusCD + "&REST_Service=ScheduledJobs&Verb=GET"
);
  // this.apiUrlGet + "V_SRC_CD=" + this.V_SRC_CD + "&V_APP_CD=" + ApplicationCD + "&V_PRCS_CD=" + ProcessCD + "&V_USR_NM=" + this.V_USR_NM + "&V_TRIGGER_STATE=" + StatusCD + "&REST_Service=ScheduledJobs&Verb=GET"


  //  https://enablement.us/rest/E_DB/SP?V_SRC_CD=local&V_APP_CD=ALL&V_PRCS_CD=Contracts%20Opportunities&V_USR_NM=local@adventbusiness.com&V_TRIGGER_STATE=ALL&REST_Service=ScheduledJobs&Verb=GET
}
Execute_AP_PR(SL_APP_CD,SL_PRC_CD){
return  this.http.get(this.apiUrlGet+"V_APP_CD="+SL_APP_CD+"&V_PRCS_CD="+SL_PRC_CD+"&V_SRC_CD="+this.V_SRC_CD+"&REST_Service=PorcessParameters&Verb=GET");
}

functionDemo(){
  return this.http.get("https://"+this.domain_name+"/rest/E_DB/SP?V_SRC_CD=exeserver&V_EXE_TYP=E_REST&V_USR_NM=exeserver@adventbusiness.com&REST_Service=UserExes&Verb=GET");
}

//__________________________________________________User >> execute page ALL REST API________

getDropDownListValue(V_APP_CD:any,V_PRCS_CD:any,V_PARAM_NM:any){
 this.http.get(this.apiUrlGet+"V_SRC_CD="+this.V_SRC_CD+"&V_APP_CD="+V_APP_CD+"&V_PRCS_CD="+V_PRCS_CD+"&V_PARAM_NM="+V_PARAM_NM+"&V_SRVC_CD=Pull%20FPDS%20Contracts&REST_Service=ProcessParametersOptions&Verb=GET").subscribe(
   res=>{
     return res.json();
   }
 );
}


//_______________________________CHART STYLING CONFIG____________________________________

getchartstyling(V_APP_ID,V_PRCS_ID,V_SRC_ID) {
  return this.http.get(this.apiUrlGet+"V_USR_NM="+this.V_USR_NM +"&V_SRC_ID="+V_SRC_ID+"&V_APP_ID="+V_APP_ID+"&V_PRCS_ID="+V_PRCS_ID+"&REST_Service=User_Preference&Verb=GET");
 }

 setchartstyling(V_APP_ID,V_PRCS_ID,V_SRC_ID,V_PRF_NM,V_PRF_VAL) {
  return this.http.get(this.apiUrlGet+"V_USR_NM="+this.V_USR_NM +"&V_PRF_NM="+V_PRF_NM+"&V_PRF_VAL="+V_PRF_VAL+"&V_SRC_ID="+V_SRC_ID+"&V_APP_ID="+V_APP_ID+"&V_PRCS_ID="+V_PRCS_ID+"&REST_Service=User_Preference&Verb=PATCH");
 }

//________________________________________________________________________________________
}



export interface data{
  APP_CD:string;
  PRCS_CD:string;
  ser_cd_data:string[];
 
  // ======================find process
  CREATE:string[];
  CRON_EXPRESSION:string[];
  DELETE:string[];
  DESCRIPTION:string[];
  EXECUTE:string[];
  JOB_NAME:string[];
  NEXT_FIRE_TIME:string[];
  PREV_FIRE_TIME:string[];
  READ:string[];
  SRVC_CD:string[];
  TRIGGER_STATE:string[];
  UPDATE:string[];
 
  // ==================================
}