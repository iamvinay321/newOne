import { ChartsModule } from 'ng2-charts';
import 'chartjs-plugin-annotation';
import { ConnectionComponent } from './modules/systemadmin/connection/connection.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AngularMaterial } from './service/Angular.Material';
import { StorageSessionService } from './service/storage-session.service';
import {Globals} from './service/globals';
import { ConfigServiceService } from './service/config-service.service';
import { LoginServiceService } from './service/login-service.service';
import { MAT_DIALOG_DEFAULT_OPTIONS, MatButtonModule, MatCardModule, MatFormFieldModule} from '@angular/material';
import { ToastrModule } from 'ngx-toastr';
import { RouterModule , Routes} from '@angular/router';
import { ProfileComponent } from './modules/login/profile/profile.component';
import { RepeatProcessComponent } from './modules/enduser/execute/repeat-process/repeat-process.component';
import { LoginComponent } from './modules/login/login.component';
import { DialogScheduleComponent } from './modules/enduser/execute/dialog-schedule/dialog-schedule.component';
import { HeaderComponent } from './modules/header/header.component';
import { ParametersComponent } from './modules/developer/parameters/parameters.component';
import 'dateformat';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
// import { SchdActnComponent } from './modules/user/schd-actn/schd-actn.component';
import { ExecuteComponent } from './modules/enduser/execute/execute.component';
// import { PracticeComponent } from './practice/practice.component';
import { ReactiveFormsModule }          from '@angular/forms';
// import { PracticeComponent } from './practice/practice.component';
import { NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {NgAutoCompleteModule} from 'ng-auto-complete';
import {JsonpModule} from '@angular/http';
import { MatAutocompleteModule, MatInputModule, MatTooltipModule } from '@angular/material';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { LoadingModule, ANIMATION_TYPES  } from 'ngx-loading';
import { ReportTableComponent } from './modules/enduser/report-table/report-table.component';
import { FormDataService } from './service/form-data.service';
import { UsernavbarComponent } from './modules/enduser/usernavbar/usernavbar.component';
import { RollserviceService } from './service/rollservice.service';
import { UseradminnavComponent } from './modules/useradmin/useradminnav/useradminnav.component';
import { UseradminuserComponent } from './modules/useradmin/useradminuser/useradminuser.component';
import { UseradmingroupComponent } from './modules/useradmin/useradmingroup/useradmingroup.component';
import { UseradminService } from './service/useradmin.service';
import { RoleComponent } from './modules/useradmin/role/role.component';
import { InstallComponent } from './modules/systemadmin/install/install.component';
import { MachineconnectionComponent } from './modules/systemadmin/machineconnection/machineconnection.component';
import { DeploymentComponent } from './modules/systemadmin/deployment/deployment.component';
import { MachinespecsComponent } from './modules/systemadmin/machinespecs/machinespecs.component';
import { MachineComponent } from './modules/systemadmin/machine/machine.component';
import { DeployStatusComponent } from './modules/systemadmin/deploy-status/deploy-status.component';
import { PlatformComponent } from './modules/systemadmin/platform/platform.component';
import { DeploymentsnavbarComponent } from './modules/systemadmin/deploymentsnavbar/deploymentsnavbar.component';
import {MatListModule} from '@angular/material/list';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { OrganizationComponent } from './modules/useradmin/organization/organization.component';
import { MembershipComponent } from './modules/useradmin/membership/membership.component';
import { MytaskComponent } from './modules/enduser/mytask/mytask.component';
import { ExceptionComponent } from './modules/enduser/exception/exception.component';
import { OrchestrateComponent } from './modules/enduser/orchestrate/orchestrate.component';
import { SchdActnComponent } from './modules/enduser/schd-actn/schd-actn.component';
import { AssignroleComponent } from './modules/useradmin/assignrole/assignrole.component';
import { MyFilterPipe , SplitLastPipe} from './modules/enduser/execute/MyFilterPipe ';
import { AuthorizeroleComponent } from './modules/useradmin/authorizerole/authorizerole.component';
import { MatPaginatorModule, MatSortModule, MatTableModule } from '@angular/material';
import { MyFilterPipe1 } from './modules/enduser/schd-actn/myFilterPipe1';
import { RepeatAfterComponent } from './modules/enduser/schd-actn/repeat-after/repeat-after.component';
import { BsDropdownModule } from 'ngx-bootstrap';
import { ColorPickerModule } from 'ngx-color-picker';
import { DashboardComponent } from './modules/enduser/dashboard/dashboard.component';
import { ProcessComponent } from './modules/enduser/process/process.component';
import { GetMessageService } from './service/get-message.service';
import { WebSocketService } from './service/web-socket.service';
import { DialogChartsComponent } from './modules/enduser/report-table/dialog-charts/dialog-charts.component';
import { DeviceDetectorModule } from 'ngx-device-detector';
import {MatSliderModule} from '@angular/material/slider';
import { ngfModule } from 'angular-file';
import { DeveloperComponent } from './modules/developer/developer.component';
import { EnduserComponent } from './modules/enduser/enduser.component';
import { SystemadminComponent } from './modules/systemadmin/systemadmin.component';
import { UseradminComponent } from './modules/useradmin/useradmin.component';
import {EndUserService } from './service/EndUser-service';

import { RepeatableFormComponent} from './modules/enduser/execute/repeatable-form/repeatable-form.component';

import {NonRepeatableFormComponent} from './modules/enduser/execute/non-repeatable-form/non-repeatable-form.component';
import { SplitFormsPipe } from './split-forms.pipe';
import {InputArtComponent} from './modules/enduser/execute/Input_Art/InputArt.component';
const appRoutes: Routes = [
  { path: '', component: LoginComponent },
	  {path: 'Profile', component: ProfileComponent},
  {path: 'User_Admin', redirectTo: 'UserAdmin', pathMatch: 'full'},
    { path: 'UserAdmin', component: UseradminComponent,
		  children: [
		  { path: '', redirectTo: 'Adminuser', pathMatch: 'full' },
		  { path: 'Adminuser', component: UseradminuserComponent },
		  { path: 'UserGroup', component: UseradmingroupComponent },
		  { path: 'UserRole', component: RoleComponent },
		  { path: 'Organization', component: OrganizationComponent },
		  { path: 'Membership', component: MembershipComponent },
		  { path: 'Assignrole', component: AssignroleComponent},
		  { path: 'Authorizerole', component: AuthorizeroleComponent}
    ]
  },
  {path: 'End_User', redirectTo: 'EndUser', pathMatch: 'full'},
	  {path: 'EndUser', component: EnduserComponent,
		children: [
			{path: '', redirectTo: 'Execute', pathMatch: 'full'},
			{ path: 'Execute', component: ExecuteComponent},
			{path: 'Mytask', component: MytaskComponent },
			{ path: 'Exception', component: ExceptionComponent },
			{ path: 'ScheduleAction', component: SchdActnComponent },
			{ path: 'Process', component: ProcessComponent},
			{ path: 'Orchestrate', component: OrchestrateComponent },
			{ path: 'Dashboard', component: DashboardComponent},
		]
	  },
	  { path: 'ReportTable', component: ReportTableComponent},
	  {path: 'System_Admin', redirectTo: 'SystemAdmin', pathMatch: 'full'},
	  {
		  path: 'SystemAdmin', component: SystemadminComponent,
		  children: [
        {path: '', redirectTo: 'AppDeploy', pathMatch: 'full'},
        {path: 'AppDeploy', component: DeployStatusComponent},
        { path: 'Install', component: InstallComponent },
        { path: 'Machineconnection', component: MachineconnectionComponent },
        { path: 'Deployment', component: DeploymentComponent },
        { path: 'Connection', component: ConnectionComponent },
        { path: 'Machine', component: MachineComponent },
        { path: 'Machinespecs', component: MachinespecsComponent },
        { path: 'Platform', component: PlatformComponent },

		  ]
	  },
  { path: 'Login', component: LoginComponent },{path: '', redirectTo: 'AppDeploy', pathMatch: 'full'},
  {path: 'AppDeploy', component: DeployStatusComponent},
  { path: 'Install', component: InstallComponent },
  { path: 'Machineconnection', component: MachineconnectionComponent },
  { path: 'Deployment', component: DeploymentComponent },
  { path: 'Connection', component: ConnectionComponent },
  { path: 'Machine', component: MachineComponent },
  { path: 'Machinespecs', component: MachinespecsComponent },
  { path: 'Platform', component: PlatformComponent },


  { path: 'Developer', component: DeveloperComponent }, // developer app-dialog-schedule
  { path: 'Parameters', component: ParametersComponent },

  { path: 'Repeat', component: RepeatProcessComponent },
  { path: 'Cl', component: DialogScheduleComponent },


  { path: 'InputArtForm', component: InputArtComponent},
  {path: 'RepeatForm', component: RepeatableFormComponent},
  { path: 'Execute', component: ExecuteComponent},
  {path: 'NonRepeatForm', component: NonRepeatableFormComponent},

  // { path:'organization',component:OrganizationComponent},

  { path: '', component: EnduserComponent , pathMatch: 'full'},
  {path: '**', redirectTo: 'users', pathMatch: 'full'} ,  // UsersComponent

  // ---------------------------------------------user admin
  // { path: 'User', component:UseradminComponent },


];
@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent,
    RepeatProcessComponent,
    DialogScheduleComponent,
    LoginComponent,
    HeaderComponent,
    ParametersComponent,
    MyFilterPipe,
    SplitLastPipe,
	  MyFilterPipe1,
    SchdActnComponent,
    ExecuteComponent,
    ExceptionComponent,
    ReportTableComponent,
    MytaskComponent,
    OrchestrateComponent,
    UsernavbarComponent,
    UseradminnavComponent,
    UseradminuserComponent,
    UseradmingroupComponent,
    RoleComponent,
    InputArtComponent,
    MembershipComponent,
    OrganizationComponent,
    InstallComponent,
    MachineconnectionComponent,
    DeploymentComponent,
    DeployStatusComponent,
    MachineComponent,
    MachinespecsComponent,
    PlatformComponent,
    ConnectionComponent,
    RepeatableFormComponent,
    NonRepeatableFormComponent,
    DeploymentsnavbarComponent,
    OrganizationComponent,
    MembershipComponent,
    AssignroleComponent,
    AuthorizeroleComponent,
    RepeatAfterComponent,
    DashboardComponent,
    ProcessComponent,
    DialogChartsComponent,
    DeveloperComponent,
    EnduserComponent,
    SystemadminComponent,
    UseradminComponent,
    SplitFormsPipe,

    // OrganizationComponent,
    // MembershipComponent
   // PracticeComponent,
  ],
  imports: [
    MatTooltipModule,
    MatInputModule,
    MatButtonModule,
    ChartsModule,
    MatListModule,
    MatExpansionModule,
    ColorPickerModule,
    NgbModule.forRoot(),
    BsDropdownModule.forRoot(),
    MatCardModule,
    BrowserModule,
    MatButtonToggleModule,
    MatSlideToggleModule,
    MatFormFieldModule,
    BrowserAnimationsModule,
    AngularMaterial,
    MatProgressSpinnerModule,
    NgAutoCompleteModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatIconModule,
	  MatPaginatorModule,
    MatSortModule, MatTableModule,
    MatSnackBarModule,
    MatSliderModule,
    ngfModule,
    ToastrModule.forRoot(),
    MatProgressSpinnerModule,
    LoadingModule.forRoot({
      animationType: ANIMATION_TYPES.wanderingCubes,
      backdropBackgroundColour: 'rgba(0,0,0,0.1)',
      backdropBorderRadius: '4px',
      primaryColour: '#ffffff',
      secondaryColour: '#ffffff',
      tertiaryColour: '#ffffff'
  }),
  DeviceDetectorModule.forRoot(),
    JsonpModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true }, // <-- debugging purposes only
    ),
  ],

  providers: [StorageSessionService, ConfigServiceService, LoginServiceService, FormDataService, RollserviceService,
    UseradminService, GetMessageService, WebSocketService, Globals, EndUserService, EnduserComponent,
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}}],
  bootstrap: [AppComponent],
  entryComponents: [DialogScheduleComponent, DialogChartsComponent]
})
export class AppModule { }
