import { Component, OnInit } from '@angular/core';
import {
  ITableViewOptions,
  TableType,
  ITableHeader
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
      collumnName: 'Test'
    },
    {
      collumnName: 'Test2'
    },
    {
      collumnName: 'Test3'
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
  constructor() {}

  ngOnInit(): void {}
}
