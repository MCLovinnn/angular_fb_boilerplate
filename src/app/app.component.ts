import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormService, TranslationService, DataConnectorService } from '../../projects/formbuilder/src/public-api';
import { FieldService } from './services/field.service';
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
    public ts: TranslationService,
    private fieldS: FieldService) {

    // cs.get('config').subscribe(val => console.log(val));

    // fs.addConfig(
    //   {
    //     home: {
    //       control: controlPanelConfig,
    //       ui: fieldConfig,
    //       tree: homeTreeConfig
    //     }
    //   });

      fieldS.set('home_ui_new');
  }

  ngOnInit() {
  }

}

