import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { Injectable } from '@angular/core';

import { MatMenuModule, MatButtonModule, MatIconModule, MatCardModule } from '@angular/material';
import { StorageSessionService } from '../../service/storage-session.service';
import { ConfigServiceService } from '../../service/config-service.service';

@Component({
  selector: 'app-enduser',
  templateUrl: './enduser.component.html',
  styleUrls: ['./enduser.component.css']
})
export class EnduserComponent implements OnInit {

  constructor(private router:Router,private StorageSessionService:StorageSessionService) { }

  display_page=true;
  
  ngOnInit() {
    this.StorageSessionService.session_check();
  }

}
