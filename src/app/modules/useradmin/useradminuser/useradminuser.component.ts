import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UseradminService } from '../../../service/useradmin.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { HostListener } from "@angular/core";
import { ngfModule, ngf } from "angular-file"
import { Subscription } from 'rxjs';
import { HttpRequest, HttpResponse, HttpEvent, HttpHeaders, HttpClient } from '@angular/common/http';
import { Http } from '@angular/http';

import { saveAs as importedSaveAs } from "file-saver";
@Component({
  selector: 'app-useradminuser',
  templateUrl: './useradminuser.component.html',
  styleUrls: ['./useradminuser.component.css']
})
export class UseradminuserComponent implements OnInit {
  public screenHeight = 0;
  public screenWidth = 0;
  public mobileView = false;
  public desktopView = true;
  public USR_NM: any[] = [];
  public USR_NM_RR: any;
  public addBtn: boolean = true;
  public deleteBtn: boolean = true;
  public USR_NM_R: any;
  public USR_DSC_R: any;
  public USR_PASS: any;
  public USRC_STATUS_R: any;
  public progress: boolean = false;
  public onpselect: Function;
  public selecteduser: Number;
  public emailMessage: string;
  public updateBtn: boolean = true;
  public accept = '*';
  public files: File[] = [];
  public url = 'https://evening-anchorage-3159.herokuapp.com/api/';
  hasBaseDropZoneOver: boolean = false;
  httpEmitter: Subscription;
  httpEvent: HttpEvent<Event>;
  lastFileAt: Date;
  Label: any[] = [];
  sendableFormData: FormData;//populated via ngfFormData directive
  // end 
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
  constructor(
    private toastr: ToastrService,
    private userAdminService: UseradminService,
    private http: HttpClient
  ) {
    this.getUser();
    this.onResize();
    this.onpselect = function (index) {
      this.selecteduser = index;
    }
  }


  // Code by manav

  //code by dharmraj begin
  uploadBtnClick() {
    document.getElementById('Document_File').click();
  }

  emailOption: boolean = false;
  /*
    Fire this function when user click on upload buttons
  */
  fileChangeEvent(event: any, file: any) {
    let fileList: FileList = event.target.files;
    console.log("====================");
    console.log(fileList.item(0));
    this.userAdminService.fileUpload(fileList.item(0), "UserDL.xlsx", "user").subscribe(
      res => {
        console.log(res);
        setTimeout(()=>{   
          this.getUser();
     }, 3000);
    },
      error => {
        console.error(error);
       
      }
    );
  }
  /*
    Send the email to adding the new user
    , email will send if the admin user 
    check the input checkbox
  */
  sendEmailToUser(checkBoxStatus: any): void {
    console.log(checkBoxStatus.checked);
    if (!checkBoxStatus.checked) {
      console.log("condition checked");
      console.log(this.USR_NM_R);
      this.emailOption = true;

    }

  }
  //code by dharmraj end
  downloadFile() {
    this.userAdminService.downloadFile("UserDL.xlsx");
  }
  getDate() {
    return new Date()
  }

  /*
   Get the all available user
 */
  getUser() {
    this.progress = true;
    this.userAdminService.getUser().subscribe(
      res => {
        console.log(res.json());
        this.USR_NM = res.json()['USR_NM'];

        this.progress = false;
      }
    );

  }
  /*
    Get the specific user 
    details
  */
  getUserDetails(USR_NM: any) {
    this.progress = true;
    this.userAdminService.getUSerDetails(USR_NM).subscribe(
      res => {
        this.USR_NM_R = res.json()['USR_NM'];

        this.USR_DSC_R = res.json()['USR_DSC'];

        this.USRC_STATUS_R = res.json()['STS'];

        // this.USR_PASS=res.json()[];

        this.progress = false;
      }
    );
  }
  fooo(e) {
    this.USR_NM_RR = e;
  }
  /*
  Add the new user in existing user 
  */
  AddUSer() {
    this.progress = true;
    let randPass = Math.random().toString(36).slice(-8);
    this.userAdminService.AddUser(this.USR_NM_R, this.USR_DSC_R, randPass, this.USRC_STATUS_R).subscribe(
      res => {
        if (res.status == 200) {
          //this.toastr.info("User", "The user " + this.USR_DSC_R + " is added..!");
          if (this.emailOption && this.USR_NM_R != undefined && this.USR_NM_R != "") {
            this.userAdminService.sendEmailStatus(this, this.USR_NM_R, randPass);
          }
        }
        this.ClearField();
        this.getUser();
        this.progress = false;

      }
    );
  }
  /*
  update the existing user
  */
  updateUser() {
    this.userAdminService.updateExistingUser(this);
  }
	/*
		update button should be visible when user changing 
		something in description field and statues field
	*/
  changinUserInfo(userDscr: any): void {
    //this.updateBtn=false;
    if (this.USR_DSC_R === userDscr)
      this.updateBtn = true;
    else
      this.updateBtn = false;
  }

	/*
	*/
  doBothField() {
    this.addBtn = false;
    this.USR_DSC_R = this.USR_NM_R;
    if (this.USR_NM_R == "") {
      this.addBtn = true;

    }

    for (let i = 0; i < this.USR_NM.length; i++) {
      if (this.USR_NM[i] == this.USR_NM_R) {
        this.addBtn = true;
        // this.toastr.warning("User", "The user " + this.USR_NM_R + " is already exist...!");
      }
    }
  }

  ClearField() {
    this.USR_NM_R = "";
    this.USR_DSC_R = "";
    this.USRC_STATUS_R = "";
  }

  ngOnInit() {
    // set defaul values 
    this.USRC_STATUS_R = "ACTIVE";
    this.userAdminService.getJSON().subscribe(data => {
      console.log(data.json());
      this.Label = data.json();
      console.log(this.Label);
    })

  }

}
