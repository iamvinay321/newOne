import { Injectable} from '@angular/core';
@Injectable()
export class Form_data {
    SL_APP_CD:string="";
    SL_PRC_CD:string="";
            constructor( SL_APP_CD:string, SL_PRC_CD:string){
                        this.SL_APP_CD=SL_APP_CD;
                        this.SL_PRC_CD=SL_PRC_CD;
            }
}