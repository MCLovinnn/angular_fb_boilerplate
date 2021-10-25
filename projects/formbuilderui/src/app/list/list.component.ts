import { Component, OnInit } from '@angular/core';
import {
  ITableViewOptions,
  TableType,
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

  constructor(private fs: FormService,
    private cs: ConnectorService,
    private configS: ConfigService) {}

  ngOnInit(): void {
    let config = (this.configS.configs).home;
    let tmpData = [];
    for (const formN in config) {
      if (config[formN]) {
        for (const elemN in config[formN]) {
          if (config[formN][elemN]) {
            const keys = config[formN][elemN].name.split('_');
            config[formN][elemN].validators = JSON.stringify(config[formN][elemN].validators);
            config[formN][elemN].form = keys[1];

            config[formN][elemN].brand = config[formN][elemN].brand_id
            tmpData.push(config[formN][elemN])
          }
        }
      }
    }
    this.data = tmpData;
  }

  delete(row: any) {
    this.cs.delete('config/', row.name).subscribe((val) => {
      window.location.reload();
      console.log(val);
    });
  }
}
