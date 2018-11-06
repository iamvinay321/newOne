import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { UseradminService } from '../../../service/useradmin.service';
import { ToastrService } from 'ngx-toastr';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpEvent, HttpEventType } from '@angular/common/http';
import { HostListener } from "@angular/core";

@Component({
  selector: 'app-useradmingroup',
  templateUrl: './useradmingroup.component.html',
  styleUrls: ['./useradmingroup.component.css']
})
export class UseradmingroupComponent implements OnInit {
  public screenHeight = 0;
  public screenWidth = 0;
  public mobileView = false;
  public desktopView = true;
  public USR_GRP_CD: any[] = [];
  public start_date: any;
  public end_date: any;
  public USR_GRP_CDR: any;
  public USR_GRP_DSCR: any;
  public USR_GRP_CD_SELC: any;
  public addBtn: boolean = true;
  public deleteBtn: boolean = true;
  public progress: boolean = false;
  public onpselect: Function;
  public selectedgroup: Number;
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
    private data: UseradminService,
    private http: Http) {
    this.onResize();
    this.onpselect = function (index) {
      this.selectedgroup = index;
    }
  }

  /*
    Fire method when user click on upload button
  */
  uploadBtnClick() {
    document.getElementById('Document_File').click();
  }
  /* File upload API
  */
  fileChangeEvent(event: any, file: any) {
    let fileList: FileList = event.target.files;
    console.log("====================");
    console.log(fileList.item(0));
    this.data.fileUpload(fileList.item(0), "GroupDL.xlsx", "group").subscribe(
      res => {
        console.log(res);
        this.AvailableGroup();
      }
      ,
      error => {
        console.error(error);
      }
    );
  }

  /* Download the files 
  */
  downloadFile() {
    this.data.downloadFile("GroupDL.xlsx");
  }
  /* Close download API 
  */
  Availabel_group_label: any;
  AvailableGroup() {
    this.progress = true;
    this.data.AvaiableGroup().subscribe(
      res => {
        console.log(res);
        this.USR_GRP_CD = res['USR_GRP_CD'];
        if (this.USR_GRP_CD) {

        }
        this.progress = false;
      }
    );
  }

  getAvailableGroup(USR_GRP_CD: any) {
    this.progress = true;
    if (USR_GRP_CD == "") {
      this.deleteBtn = true;
    } else {
      this.deleteBtn = false;
    }
    this.data.getAvailableGroup(USR_GRP_CD).subscribe(
      res => {
        console.log(res);
        this.start_date = new Date(res['EFF_STRT_DT_TM']);
        this.end_date = new Date(res['EFF_END_DT_TM']);
        console.log(this.start_date + this.end_date);
        this.USR_GRP_CDR = res['USR_GRP_CD'];
        this.USR_GRP_DSCR = res['USR_GRP_DSC'];
        this.progress = false;
      }
    );
  }
  selected(e) {
    this.USR_GRP_CD_SELC = e;
  }
  /*
    Delete the selected group
  */
  Delete() {
    this.progress = true;
    if (this.USR_GRP_CD_SELC == undefined) {
      this.toastr.warning("Field", "Please Group field must not empty..!");
      return;
    } else {
      this.data.Delete(this.USR_GRP_CD_SELC).subscribe(
        res => {
          console.log("Deleted " + res);
          if (res.status == 200) {
            this.progress = false;
            this.toastr.info("Delete", "Group " + this.USR_GRP_CD_SELC + " is deleted..!");
          }
          this.AvailableGroup();
          this.putInDescription('d');
          this.ClearField();
          this.deleteBtn = true;
        }
      );
    }
  }
  /*
  Add new group in existing group
  */
  AddGroup() {
    this.progress = true;
    let sdate = new Date(this.start_date);
    let edate = new Date(this.end_date);
    if (this.USR_GRP_CDR == undefined) {
      this.toastr.warning("Field", "Please Group field must not empty..!");
      this.progress = false;
      return;
    } else if (this.USR_GRP_DSCR == undefined) {
      this.toastr.warning("Field", "Please Group Description field must not empty..!");
      this.progress = false;
      return;
    } else if (this.start_date == undefined && this.end_date != undefined) {
      this.toastr.warning("Date", "without start date , no end date allowed...!");
      this.progress = false;
      return;
    } else if (sdate > edate) {
      this.toastr.warning("Date", "Please select correct start and end date...!");
      this.progress = false;
      this.addBtn = true;
      return;
    } else {
      if (this.start_date == undefined) {
        this.start_date = new Date();
      } else if (this.end_date == undefined) {
        let today = new Date();
        let dd = today.getDate();
        let mm = today.getMonth();
        let yyyy = today.getFullYear() + 10;

        let tedoday = dd + '/' + mm + '/' + yyyy

        this.end_date = new Date(tedoday);
      }

      this.data.AddGroup(this.end_date, this.start_date, this.USR_GRP_DSCR, this.USR_GRP_CDR).subscribe(
        res => {
          console.log("Add Group" + res);
          if (res.status == 200) {
            this.toastr.info("Add", "Group " + this.USR_GRP_CDR + " is added..!");
          }
          this.AvailableGroup();
          this.ClearField();
          this.addBtn = true;
          this.deleteBtn = true;
          this.progress = false;
        }
      );
    }
  }
  /*
    Clear the input add group fields 
    and start date and end date
  */
  ClearField() {
    this.end_date = "";
    this.start_date = "";
    this.USR_GRP_CDR = "";
    this.USR_GRP_DSCR = "";
  }
  putInDescription(event: any) {
    console.log(event);
    this.addBtn = false;
    this.USR_GRP_DSCR = this.USR_GRP_CDR;

    for (let i = 0; i < this.USR_GRP_CD.length; i++) {
      if (this.USR_GRP_CD[i] == this.USR_GRP_CDR) {
        this.addBtn = true;
        this.toastr.warning("alert", "Role " + this.USR_GRP_CDR + " is already exist ...!");
      }
    }
    //----this is for if field is empty
    if (this.USR_GRP_CDR == "") {
      this.addBtn = true;
      this.toastr.warning("alert", "Field Group is empty ...!");
    }
  }
  Label: any[] = [];
  ngOnInit() {
    this.AvailableGroup();
    this.data.getJSON().subscribe(data => {
      console.log(data.json());
      this.Label = data.json();
      console.log(this.Label);
    });
  }


}
