import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormService, TranslationService, DataConnectorService } from '../../projects/formbuilder/src/public-api';
import { ConnectorService } from './services/connector.service';
import { AuthenticationService } from 'projects/formbuilder/src/public-api';
import { FormularService } from './services/formular.service';
// @ts-ignore
import fst from '../assets/config/fst.json';
// @ts-ignore
import disa from '../assets/config/disa.json';


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
    public ts: TranslationService,
    public as: AuthenticationService,
    private formS: FormularService) {

      as.checkIfUserIsAlreadyLoggedIn();

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
    this.formS.addTeilNetz(fst);
    this.formS.addTeilNetz(disa);
  }

  logout() {
    this.as.logout(true);
  }

  isLoggedIn() {
    return this.as.isLoggedIn;
  }
}

