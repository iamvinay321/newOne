import { StorageSessionService } from '../../../../service/storage-session.service';
import { FormsComponent} from './forms.component';
//@ interfaces 
export interface FileUrlProcessing{
    filesUrl:FileUrls;
}

//@ classes------------------------------->
/*
    Files uploading URL processing 
    the base dir is Agency_name 
*/
export class FileUrls {
    private baseUrl: string;

    constructor(private storage:StorageSessionService){

    }

    public setFileUrl(url: string): void {
        this.baseUrl = url;
    }
    public getFileUrl(): string {
        if(this.baseUrl!=undefined)
            return "/opt/tomcat/webapps/"+ this.baseUrl.split(' ').join('_')+"/";
        else 
            return  "/opt/tomcat/webapps/"+this.storage.getSession("agency")+"/Initial_Setup/Upload_PowerPoint/";
    }
    public setDefault(form:FormsComponent){
       if(this.baseUrl==undefined)
            form.V_SCOPE_LMTNG_LVL="process";
            form.V_SCOPE_LMTNG_CD=form.Form_Data["PRCS_CD"][0];
    }
}