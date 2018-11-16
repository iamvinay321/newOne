import { Component, OnInit } from '@angular/core';
import {GetFormData} from '../getDataForm';
import { StorageSessionService } from '../../../../service/storage-session.service';
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

    private formData:GetFormData;
  constructor(
    private storage:StorageSessionService
  ) { 
      this.formData=new GetFormData(this.storage);
     
  }

  ngOnInit() {
  }

}
