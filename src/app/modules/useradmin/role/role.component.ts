import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { UseradminService } from '../../../service/useradmin.service';
import { ToastrService } from 'ngx-toastr';
import { HostListener } from "@angular/core";

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css']
})
export class RoleComponent implements OnInit {
  screenHeight=0;
  screenWidth=0;
  mobileView=false;
  desktopView=true;
  @HostListener('window:resize', ['$event'])
    onResize(event?) {
      this.screenHeight = window.innerHeight;
      this.screenWidth = window.innerWidth;
      if(this.screenWidth<=767)
      {
        this.mobileView=true;
        this.desktopView=false;
      }else{
        this.mobileView=false;
        this.desktopView=true;
      }
  }
  constructor(
    private toastr:ToastrService,
    private data:UseradminService,
    
  ) {this.onResize();
    this.onpselect = function(index){
      this.selectedrole = index;} }

Roll_CD:any[]=[];
ROLL_CD_R:any;;
RollR:any;
ROll_DSC_R:any;
addBtn:boolean=true;
deleteBtn:boolean=true;
progress:boolean=false;
onpselect:Function;
selectedrole:Number;
  getRoll(){
    this.progress=true;
      this.data.getRoll().subscribe(
              res=>{
                console.log(res);
                this.Roll_CD=res.json()['ROLE_CD'];
                this.progress=false;
              }
      );
}

/*
	Fire method when user click on upload button
*/
 uploadBtnClick() {
    document.getElementById('Document_File').click();
  }
/* File upload API
*/
  fileChangeEvent(event: any,file:any) {
    let fileList: FileList = event.target.files;
    console.log("User selected file details :");
    console.log(fileList.item(0));
    console.log("File uploading.......");
    this.data.fileUpload(fileList.item(0),"RoleDL.xlsx","role").subscribe(
      res=>{
        console.log("File uploaded success, the response of file upload :")
        console.log(res);
        // called this method after file uploaded success
        this.getRoll();
      }
      ,
      error=>{
        console.log("File uploading failed :")
        console.error(error);
      }
       );   
  }
  /*
  Close file upload API
  */
  /* Download the files 
  */
  downloadFile(){
    console.log("File download event called");
	 this.data.downloadFile("RoleDL.xlsx");
}

//----------------------------------
selected(e){
  
}
getRollDSCR(Roll_CD:any){
  this.progress=true;
  if(Roll_CD!=""){
    this.deleteBtn=false;
  //  this.progress=false;
  }
        this.data.getRollDSCR(Roll_CD).subscribe(
                res=>{
                  console.log(res);
                  this.RollR=res.json()['ROLE_CD'];
                  this.ROll_DSC_R=res.json()['ROLE_DSC'];
                this.progress=false;
                }
        );
}
//---------------------
addRole(){
  this.progress=true;
  if(this.RollR==undefined){
      this.toastr.warning("Field","Please enter Role ...!");
      this.progress=false;
  }else if(this.ROll_DSC_R==undefined){
        this.toastr.warning("Field","Please enter description of Role ...1");
        this.progress=false;
  }else{
        this.data.addRoll(this.RollR,this.ROll_DSC_R).subscribe(
          res=>{
            if(res.status==200){
                  this.toastr.info("Roll Add","The role "+this.RollR+" is added....!");
            }
              this.ClearField();
                this.getRoll();
                this.addBtn=true;
                this.progress=false;
          }
        );
      } 
        }
//-------------------
dogo(e){
          this.ROLL_CD_R=e;
          console.log(this.ROLL_CD_R);
}
Delete(){
  this.progress=true;
      this.data.DeleteRoll(this.ROLL_CD_R).subscribe(
        res=>{
          if(res.status==200){
            this.toastr.info("Roll Delete","The role "+this.RollR+"  deleted....!");
          }
          this.ClearField();
          this.getRoll();
          this.deleteBtn=true;
          this.progress=false;
        }
      );
}

ClearField(){
  this.RollR="";
  this.ROll_DSC_R="";
}
bbb:any;
bbbb(b:any){
this.RollR=b;
}
addBothfield(){
  this.ROll_DSC_R=this.RollR;
  this.addBtn=false;
for(let i=0;i<this.Roll_CD.length;i++){
      if(this.Roll_CD[i]==this.RollR){
              this.toastr.warning("ROLE","ROLE "+this.RollR+" is already exist...!");
              this.addBtn=true;
      }
}

  if(this.RollR==""){
        this.addBtn=true;
  }
}
Label:any[]=[];
  ngOnInit() {
    this.data.getJSON().subscribe(data => {
      console.log(data.json());
      this.Label=data.json();
      console.log(this.Label);
  })
    this.getRoll();
  }

}
