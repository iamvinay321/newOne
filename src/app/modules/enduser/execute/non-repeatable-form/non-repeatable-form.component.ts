import { Component, OnInit } from '@angular/core';
import {GetFormData} from '../getDataForm';
import { StorageSessionService } from '../../../../service/storage-session.service';
import { formService} from '../../../../service/form-service';
import { EndUserService } from '../../../../service/EndUser-service';
@Component({
  selector: 'app-non-repeatable-form',
  templateUrl: './non-repeatable-form.component.html',
  styleUrls: ['./non-repeatable-form.component.css']
})
export class NonRepeatableFormComponent implements OnInit {

  public formData:GetFormData;
  private data: Data = new Data();

  public formPass: FormPass;
  constructor(
    private storage:StorageSessionService,
    private form:formService,
    private enduser:EndUserService
  ){
      this.formData=new GetFormData(this.storage);
   
   
} 
searchResult:string[];
getDropDownListValue(e: any) {

  //---------Balraj Code--------
  this.searchResult = [];

  //---------Balraj Code--------


  //   this.http.get(this.apiUrlGet + "V_SRC_CD=" + this.V_SRC_CD + "&V_APP_CD=" + this.SL_APP_CD + "&V_PRCS_CD=" + this.SL_PRC_CD + "&V_PARAM_NM=" + e + "&V_SRVC_CD="+this.SL_SRVC_CD+"&REST_Service=ProcessParametersOptions&Verb=GET")
  this.enduser.getParameterAllOption(this.formData.getApp(), this.formData.getProc(), e, this.formData.getServ())
    .subscribe(
    res => {
      console.log("Parameter option response is :");
      console.log(res.json());
      console.log(res.json()['Agency']);
      this.searchResult = res.json()['Agency'];
    


    }
    );


}
  ngOnInit() {
  }

}


export class Data {
  PARAM_NM: string[];
  PVP: any[];
  V_SRVC_CD: any[];
}

export class FormPass {
  V_TABLE_NAME: string;
  V_SCHEMA_NAME: string;
  V_KEY_NAMEA: string;
  V_KEY_NAME: string;
  V_KEY_VALUE: string;
  V_SRVC_CD: string;
  constructor() {

  }
}