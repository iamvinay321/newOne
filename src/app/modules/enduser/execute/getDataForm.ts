import { StorageSessionService } from '../../../service/storage-session.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http'
import * as dateFormat from 'dateformat';
import { Globals } from './../../../service/globals';
export class GetFormData {
    private data: Data = new Data();
    // domain_name = this.globals.domain_name;
    // private apiUrlGet = "https://" + this.domain_name + "/rest/E_DB/SP?";
    public formPass: FormPass;
    public formPass1: FormPass1;
    V_KEY_NAMEA = "";
    V_KEY_VALUEA = "";
    V_SRC_CD = this.storage.getSession("agency");
    V_USR_NM = this.storage.getSession("email");
    constructor(
        private storage: StorageSessionService,
        private http: HttpClient,

    ) {
        this.formPass = new FormPass();
        this.formPass1 = new FormPass1();
        console.log("======AP DATA++++++++++");
        console.log(this.storage.getCookies("AppData"));
        this.data.PARAM_NM = this.storage.getCookies('report_table')['PARAM_NM'];
        let tmp = this.storage.getCookies('report_table')['PVP'][0];
        this.data.V_SRVC_CD = this.storage.getCookies('report_table')['V_SRVC_CD'];
        console.log(this.storage.getCookies('report_table')['PVP']);
        console.log("------------------STORAGE_FORM_____________");
        console.log(JSON.parse(tmp));
        this.data.PVP = JSON.parse(tmp);

        if ("V_Table_Name" in this.data.PVP) {
            if (this.data.PVP['V_Table_Name'][0] != "") {
                this.formPass.V_TABLE_NAME = this.data.PVP['V_Table_Name'][0];
            } else {
                this.formPass.V_TABLE_NAME = "";
            }
        }

        if ("V_Key_Name" in this.data.PVP) {
            if (this.data.PVP['V_Key_Name'].lenght > 0) {
                this.data.PVP['V_Key_Name'].forEach(function (e) {
                    this.formPass.V_KEY_NAME += e + "|";
                });
            } else {
                this.formPass.V_KEY_NAME = "";
            }
        }
        if ("V_Schema_Name" in this.data.PVP) {
            if (this.data.PVP['V_Schema_Name'][0] != "") {
                this.formPass.V_SCHEMA_NAME = this.data.PVP['V_Schema_Name'][0];
            } else {
                this.formPass.V_SCHEMA_NAME = "";
            }
        }
        if ("V_Key_Value" in this.data.PVP) {
            if (this.data.PVP['V_Key_Value'].lenght > 0) {
                this.data.PVP['V_Key_Value'].forEach(function (e) {
                    this.FormPass.V_KEY_VALUE += e + "|";
                });
            } else {
                this.formPass.V_KEY_VALUE = "";
            }
        }
        this.formPass.V_SRVC_CD = this.data.PVP['V_SRVC_CD'][0];
        this.formPass.V_PRCS_ID = this.data.PVP['V_PRCS_ID'][0];

    }
    /*
      Return the parameter name in PVP response report object
      Replacing the V_ starting character 
    */
    getFormParameter(): any[] {
        let group: any[] = [];
        this.data.PARAM_NM.forEach((e) => {
            if (e.charAt(0) != "V")
                group.push(e);
        })
        return group;
    }
 
    fetchingFormData(form:ReportData,obj){
        let formData=new ReportData();
        formData=form;
        let url="https://enablement.us/Enablement/rest/E_DB/SP?V_Table_Name=" + formData.V_Table_Name + "&V_Schema_Name=" + formData.V_Schema_Name + "&V_Key_Names=" + form.V_Key_Names + "&V_Key_Values=" + formData.V_Key_Values + "&V_SRVC_CD=" + formData.V_SRVC_CD + "&V_USR_NM=" + formData.V_USR_NM + "&V_SRC_CD=" + formData.V_SRC_CD + "&V_PRCS_ID=" + formData.V_PRCS_ID + "&REST_Service=Forms_Record&Verb=GET";
        this.http.get(url).subscribe(res=>{
            console.info("The response from cheking table values");
            console.log(res);
            obj.displayTableForm(res);
        });
    }
/*
    Submit the form 
*/
    submitForm(form: string, obj: any) {
        let formSub = new FormPass();
        let formSub1 = new FormPass1();
        let dt = JSON.stringify(this.storage.getCookies('report_table'));
        formSub1 = JSON.parse(dt);
        let V_UNIQUE_ID = formSub1.UNIQUE_ID[0];
        let V_EXE_CD = formSub1.V_EXE_CD[0];
        let V_SRVC_ID = formSub1.SRVC_ID[0];
        formSub = JSON.parse(this.storage.getCookies('report_table')['PVP'][0]);
        let body = {
            "V_USR_NM": this.V_USR_NM,
            "V_EXE_CD": V_EXE_CD,
            "V_PRCS_TXN_ID": formSub.V_PRCS_TXN_ID,
            "V_APP_ID": formSub.V_APP_ID,
            "V_PRCS_ID": formSub.V_PRCS_ID,
            "V_SRVC_ID": V_SRVC_ID,
            "V_PVP": form,
            "V_RELEASE_RSN": "Submitted manual input",
            "V_SRC_ID": formSub.V_SRC_ID,
            "V_OPERATION": "MANUALSUBMIT",
            "V_UNIQUE_ID": V_UNIQUE_ID,
            "TimeZone": dateFormat(new Date(), "ddd mmm dd yyyy hh:MM:ss TT o"),
        }
        console.log(body);
        this.http.post("https://" + "enablement.us/Enablement" + "/rest/Submit/FormSubmit", body).subscribe(
            res => {
               
                    this.storage.setCookies("report_table", res);
                    obj.formSubmitResponse(true, res);
             

            }
        );
    }
    getReportPr(pr): string {
        return JSON.parse(this.storage.getCookies('report_table')['PVP'][0])[pr];
    }
    /*
        get the 
    */
    getApp(): string {
        return this.storage.getCookies("AppData")['application'];
    }
    getProc(): string {
        return this.storage.getCookies("AppData")['process'];
    }
    getServ(): string {
        return this.storage.getCookies("AppData")['SL_SRVC_CD'];
    }
    removeWht(string:string){
        return string.split(" ").join("");
    }

}

export class Data {
    PARAM_NM: string[];
    PVP: any[];
    V_SRVC_CD: any[];
}
export class FormPass {
    V_TABLE_NAME: string = "";
    V_SCHEMA_NAME: string = "";
    V_KEY_NAMEA: string = "";
    V_KEY_NAME: string = "";
    V_KEY_VALUE: string = "";
    V_SRVC_CD: string = "";
    V_PRCS_ID: string = "";

    V_PRCS_TXN_ID: string = "";
    V_APP_ID: string = "";

    V_RELEASE_RSN: string = "";
    V_SRC_ID: string = "";
    V_OPERATION: string = "";

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

export class ReportData{
    PARAM_NM: string[];
    PARAM_VAL: string[];
    RESULT:string;
    V_EXE_CD:string[];
    CONT_ON_ERR_FLG: string[];
    V_Table_Name:string[];
    V_Schema_Name:string[];
    V_Key_Names:string[];
    V_Key_Values:string[];
    V_SRVC_CD:string[];
    V_USR_NM:string[];
    V_SRC_CD:string[];
    V_PRCS_ID:string[];
  
    constructor(){
        
    }
  
  }