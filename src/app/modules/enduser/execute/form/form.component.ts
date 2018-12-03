import {Component, OnInit} from '@angular/core';
import {GetFormData} from '../getDataForm';
import {StorageSessionService} from '../../../../service/storage-session.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Globals} from '../../../../service/globals';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  // domain_name = this.globals.domain_name;
  //  private apiUrlGet = "https://" + this.domain_name + "/rest/E_DB/SP?";
  formData: GetFormData;
  public form: FormGroup;
  public param: any[] = [];

  constructor(private storage: StorageSessionService,
              private http: HttpClient) {
    this.formData = new GetFormData(this.storage, this.http);
    this.param = this.formData.getFormParameter();
    let group: any = {};

    this.param.forEach((e) => {
      group[e] = new FormControl();
    });
    this.form = new FormGroup(group);
  }

  onSubmit() {
    console.log(JSON.stringify(this.form.value));
    this.formData.submitForm(JSON.stringify(this.form.value), this);
  }

  ngOnInit() {
  }
  cancelbtn_click() {
    console.log('cancelbtn_click');
  }
  submitbtn_click() {
    console.log('submitbtn_click');
  }
}
