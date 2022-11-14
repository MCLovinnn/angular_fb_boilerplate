import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ConnectorService } from './services/connector.service';
import { DataConnectorService, FormService, TranslationService } from 'projects/formbuilder/src/public-api';
import { MatTabGroup } from '@angular/material/tabs';
import { AuthService } from '@auth0/auth0-angular';
import { AuthenticationService } from './services/auth.service';


export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  tabs = ['Customer', 'Consultants']; // , 'Projekte'
  profileJson: any;
  @ViewChild('menubar', { static: false }) menu = {} as MatTabGroup;

  constructor(private ds: DataConnectorService,
    public fb: FormBuilder,
    public fs: FormService,
    private cs: ConnectorService,
    public as: AuthenticationService,
    public ts: TranslationService,
    public auth: AuthService) {

    // cs.get('config').subscribe(val => console.log(val));

    // fs.addConfig(
    //   {
    //     home: {
    //       control: controlPanelConfig,
    //       ui: fieldConfig,
    //       tree: homeTreeConfig
    //     }
    //   });

  }
  scroll(index) {
    // console.log(index);
    // console.log(this.menu);

    this.menu.selectedIndex = index;
  }

  ngOnInit() {

  }

  doIt() {
    this.as.callApi('customer');
  }

  logout() {
    this.auth.logout();
  }

  isLoggedIn() {
    return this.as.isLoggedIn;
  }
}

