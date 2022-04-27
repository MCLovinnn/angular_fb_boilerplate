import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormService, TranslationService, DataConnectorService, AuthenticationService } from 'formbuilder';
import { ConnectorService } from './services/connector.service';


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

  constructor(private ds: DataConnectorService,
    public fb: FormBuilder,
    public fs: FormService,
    private cs: ConnectorService,
    public as: AuthenticationService,
    public ts: TranslationService) {

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

  ngOnInit() {
  }

  logout() {
    this.as.logout(true, '/api/logout');
  }

  isLoggedIn() {
    return this.as.isLoggedIn;
  }
}

