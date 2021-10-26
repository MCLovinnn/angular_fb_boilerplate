import { Component, OnInit } from '@angular/core';
import {
  ITableViewOptions,
  ITableHeader,
  FormService,
  ConfigService
} from '../../../../formbuilder/src/public-api';
import { ConnectorService } from '../services/connector.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  viewOptions: ITableViewOptions = {
    searchable: true,
    showPaginator: true,
    showActions: true,
    showCSVExport: true,
    showCheckbox: true,
    showDeleteAllButton: true
  };

  displayedColumns: ITableHeader[] = [
    {
      collumnName: 'name',
      collumnKey: 'config_table_name'
    },
    {
      collumnName: 'form',
      collumnKey: 'config_table_form'
    },
    {
      collumnName: 'htmlType',
      collumnKey: 'config_table_htmlType'
    },
    {
      collumnName: 'value'
    },
    {
      collumnName: 'validators'
    }
  ];

  data: any[] = [];

  constructor(
    private fs: FormService,
    private cs: ConnectorService,
    private configS: ConfigService
  ) {}

  ngOnInit(): void {
    let config = this.configS.configs;
    let tmpData = [];
    for (const page in config) {
      if (config[page]) {
        for (const formN in config[page]) {
          if (config[page][formN]) {
            for (const elemN in config[page][formN]) {
              if (config[page][formN][elemN]) {
                const keys = config[page][formN][elemN].name.split('_');
                config[page][formN][elemN].validators = JSON.stringify(
                  config[page][formN][elemN].validators
                );
                config[page][formN][elemN].form = keys[1];

                config[page][formN][elemN].brand = config[page][formN][elemN].brand_id;
                tmpData.push(config[page][formN][elemN]);
              }
            }
          }
        }
      }
    }
    this.data = tmpData;
  }

  delete(row: any, end = false) {
    this.cs.delete('config/', row.name).subscribe(val => {
      if (end) {
      window.location.reload();
      }
      // console.log(val);
    });
  }

  deleteAll(data) {
    data.forEach((element, index, array) => {
    // console.log(element);
    // console.log(index);
    // console.log(array);
      if(index === (array.length - 1)) {
      this.delete(element, true);
      }
      this.delete(element);
    });
  }
}
