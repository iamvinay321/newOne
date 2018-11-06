import {NgModule} from '@angular/core'

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import 'hammerjs';


import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';

//========for the form 
import { FormsModule } from '@angular/forms';
//for the http 
import { HttpModule } from '@angular/http';
// for the NgIf and NgFor
import { CommonModule } from '@angular/common';
// when you building the reactive form 
import { ReactiveFormsModule} from '@angular/forms';
//For Routing and when you want to use RouterLink,.forRoot(), and .forChild()
import { RouterModule ,Routes} from '@angular/router';
//When you to talk to a server
import { HttpClientModule } from '@angular/common/http';
import {MatSelectModule} from '@angular/material/select';
//-========the service

//checko bx
import {MatRadioModule} from '@angular/material/radio';


import {MatTabsModule} from '@angular/material/tabs';
import {MatCheckboxModule} from '@angular/material/checkbox';
///pag component====================================================
//import{NavBarComponent } from './pageComp/navBar/nav.com';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonToggleModule} from '@angular/material/button-toggle';

//============================================================
import { WebStorageModule } from 'ngx-store';
import { StorageSessionService } from './storage-session.service';

import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatDialogModule} from '@angular/material/dialog';
import {MatProgressBarModule} from '@angular/material/progress-bar';

import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { HttpClientXsrfModule } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import {MatDividerModule} from '@angular/material/divider';
import {MatTableModule} from '@angular/material/table';
import { ConfigServiceService } from './config-service.service';
import { FlexLayoutModule } from "@angular/flex-layout";


;
import { MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material';

import { LoginServiceService } from './login-service.service';
import {MatListModule} from '@angular/material/list';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';;

@NgModule({
imports:[
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
	FormsModule,
	HttpModule,
	CommonModule,
	MatSelectModule,
  MatRadioModule,
  ReactiveFormsModule,
  MatMenuModule,
  WebStorageModule,
  MatAutocompleteModule,
  MatButtonToggleModule,
  MatDialogModule,
  MatProgressBarModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatTabsModule,
  MatCheckboxModule,
  MatDividerModule,
  MatTableModule,
  FlexLayoutModule,
  OwlDateTimeModule,
  OwlNativeDateTimeModule,
  MatListModule,
  HttpClientModule,
],
exports:[
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
	FormsModule,
	HttpModule,
	CommonModule,
	MatSelectModule,
  MatRadioModule,
  ReactiveFormsModule,
  MatMenuModule,
  WebStorageModule,
  MatAutocompleteModule,
  MatButtonToggleModule,
  MatDialogModule,
  MatProgressBarModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatTabsModule,
  MatCheckboxModule,
  MatDividerModule,
  MatTableModule,
  FlexLayoutModule,
  OwlDateTimeModule,
  OwlNativeDateTimeModule,
  MatListModule,
  HttpClientModule,
]
})

export class AngularMaterial {

}