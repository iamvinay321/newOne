import { StorageSessionService } from '../../../service/storage-session.service';

export class GetFormData {
    private data: Data = new Data();

    public formPass: FormPass;
    V_KEY_NAMEA = "";
    V_KEY_VALUEA = "";
    constructor(private storage: StorageSessionService) {
        this.formPass=new FormPass();

        console.log("======AP DATA++++++++++");
        console.log(this.storage.getCookies("AppData"));
        this.data.PARAM_NM = this.storage.getCookies('report_table')['PARAM_NM'];
        let tmp = this.storage.getCookies('report_table')['PVP'][0];
        this.data.V_SRVC_CD = this.storage.getCookies('report_table')['V_SRVC_CD'];
        console.log(this.storage.getCookies('report_table')['PVP']);
        console.log("------------------STORAGE_FORM_____________");
        console.log(JSON.parse(tmp));
        this.data.PVP = JSON.parse(tmp);

        if("V_Table_Name" in  this.data.PVP){
            if(this.data.PVP['V_Table_Name'][0]!=""){
                this.formPass.V_TABLE_NAME=this.data.PVP['V_Table_Name'][0];
            }else{
                this.formPass.V_TABLE_NAME="";
            }
        }

        if("V_Key_Name" in this.data.PVP){
            if(this.data.PVP['V_Key_Name'].lenght > 0){
                    this.data.PVP['V_Key_Name'].forEach(function(e){
                        this.formPass.V_KEY_NAME+=e+"|";
                    });
            }else{
                this.formPass.V_KEY_NAME="";
            }
        }
        if("V_Schema_Name" in this.data.PVP){
            if(this.data.PVP['V_Schema_Name'][0]!=""){
                this.formPass.V_SCHEMA_NAME=this.data.PVP['V_Schema_Name'][0];
            }else{
                this.formPass.V_SCHEMA_NAME="";
            }
        }
        if("V_Key_Value" in this.data.PVP){
                if(this.data.PVP['V_Key_Value'].lenght > 0){
                    this.data.PVP['V_Key_Value'].forEach(function(e){
                        this.FormPass.V_KEY_VALUE+=e+"|";
                    });
                }else{
                    this.formPass.V_KEY_VALUE="";
                }
        }   
        this.formPass.V_SRVC_CD=this.data.PVP['V_SRVC_CD'][0];
        this.formPass.V_PRCS_ID=this.data.PVP['V_PRCS_ID'][0];

    }
    getFormParameter(): any[] {
        
        return this.data.PARAM_NM;
    }
    getApp(): string{
        return this.storage.getCookies("AppData")['application'];
    }
    getProc(): string{
        return this.storage.getCookies("AppData")['process'];
    }
    getServ() : string {
        return this.storage.getCookies("AppData")['SL_SRVC_CD'];
    }
    
}

export class Data {
    PARAM_NM: string[];
    PVP: any[];
    V_SRVC_CD: any[];
}

export class FormPass {
    V_TABLE_NAME: string="";
    V_SCHEMA_NAME: string="";
    V_KEY_NAMEA: string="";
    V_KEY_NAME: string="";
    V_KEY_VALUE: string="";
    V_SRVC_CD: string="";
    V_PRCS_ID:string="";
    constructor() {

    }
}