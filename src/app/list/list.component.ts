import { Component, OnInit } from '@angular/core';
import {
  ITableViewOptions,
  TableType,
  ITableHeader,
  FormService
} from '../../../projects/formbuilder/src/public-api';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  viewOptions: ITableViewOptions = {
    type: TableType.GENERIC,
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

  data = [
    {
      Test: 'Test',
      Test2: 'Hii',
      Test3: 'Buuu'
    },
    {
      Test: 'Allo',
      Test2: 'Hix',
      Test3: 'Bosom'
    },
    {
      Test: 'XYZ',
      Test2: 'AAA01',
      Test3: 'broo'
    },
    {
      Test: 'test2',
      Test2: 'drei',
      Test3: 'poi'
    }
  ];
  constructor(private fs: FormService) {}

  ngOnInit(): void {
    let config = this.fs.getConfigs().home;
    let tmpData = [];
    console.log(config);
    for (const formN in config) {
      if (config[formN]) {
        for (const elemN in config[formN]) {
          if (config[formN][elemN]) {
            const keys = config[formN][elemN].name.split('_');
            config[formN][elemN].validators = JSON.stringify(config[formN][elemN].validators);
            config[formN][elemN].form = keys[1];


            config[formN][elemN].brand = config[formN][elemN].brand_id
            tmpData.push(config[formN][elemN])
            // console.log(config[formN][elemN]);
          }
        }
      }
    }
    console.log(tmpData);

    this.data = tmpData;
  }
}
