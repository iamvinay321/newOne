import { Component, OnInit } from '@angular/core';
import {GetFormData} from '../getDataForm';
import { StorageSessionService } from '../../../../service/storage-session.service';
import { formService} from '../../../../service/form-service';
@Component({
  selector: 'app-repeatable-form',
  templateUrl: './repeatable-form.component.html',
  styleUrls: ['./repeatable-form.component.css']
})
export class RepeatableFormComponent implements OnInit {


  public formData:GetFormData;
  private data: Data = new Data();

  public formPass: FormPass;
  constructor(
    private storage:StorageSessionService,
    private form:formService
  ){
      this.formData=new GetFormData(this.storage);
   
   
}
updateFieldValues(fieldName:any,filedValues:any){
  console.log("The field name is"+fieldName);
  console.log("The field values is"+filedValues);
  this.form.updateFormField(this,fieldName,filedValues);
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