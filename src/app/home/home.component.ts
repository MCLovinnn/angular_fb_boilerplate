import { Component, OnInit } from '@angular/core';
import { ITableViewOptions, TableType } from 'projects/formbuilder/src/public-api';
import { CustomerTable } from '../interfaces/icustomer';
import { ConsultantTable } from '../interfaces/iconsultant';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  viewOptions: ITableViewOptions = {
    type: TableType.GENERIC,
    searchable: true,
    showPaginator: true,
    showActions: true,
    showCSVExport: true,
    showCheckbox: false,
    showDeleteAllButton: false,
    dateStringToDateFilter: 'home_test_date'
  };

  displayedColumns = CustomerTable;
  displayedColumnsConsultant = ConsultantTable;
  data = [];
  dataConsultant = [];
  constructor() { }

  ngOnInit(): void {
  }

}
