import { Component, OnInit } from '@angular/core';
import { ITableViewOptions, ITableHeader, optionsConfig, TableType } from 'projects/formbuilder/src/public-api';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {
  autoCompleteConfig: optionsConfig = {
    groupBy: true
  };

  autocompleteOptions = [
    {
      name: 'Test',
      children: [
        {name: 'Option1'},
        {name: 'Test'},
        {name: 'aaaaaaa'}
      ]
    }
  ];

  viewOptions: ITableViewOptions = {
    type: TableType.GENERIC,
    searchable: true,
    showPaginator: true,
    showActions: true,
    showCSVExport: true,
    showCheckbox: true,
    showDeleteAllButton: false
  };

  displayedColumns: ITableHeader[] = [
    {
      collumnName: 'name',
      collumnKey: 'test_table_name'
    },
    {
      collumnName: 'form',
      collumnKey: 'test_table_form'
    }
  ];

  data: any[] = [
    {name: 'TestName', form: 'TestForm'},
    {name: 'TestName2', form: 'TestForm2'},
    {name: 'TestName3', form: 'TestForm3'},
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
