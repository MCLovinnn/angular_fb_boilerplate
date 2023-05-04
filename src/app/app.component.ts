import { Component, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { ConnectorService } from './services/connector.service';
import { DataConnectorService, FormService, TranslationService } from 'projects/formbuilder/src/public-api';
import { MatTabGroup } from '@angular/material/tabs';


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
    public fb: UntypedFormBuilder,
    public fs: FormService,
    private cs: ConnectorService,
    public ts: TranslationService,) {

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
  }

  logout() {
  }

  isLoggedIn() {
  }
}

