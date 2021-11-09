import { Component, OnInit, ViewChild } from '@angular/core';
import { ITableViewOptions, ITableHeader, TableType, FormService, TableComponent } from 'projects/formbuilder/src/public-api';
import { FormularService } from '../services/formular.service';
import { IFormular } from '../formular';


@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {
  @ViewChild('table') table : TableComponent;
  viewOptions: ITableViewOptions = {
    type: TableType.GENERIC,
    searchable: true,
    showPaginator: true,
    showActions: true,
    showCSVExport: true,
    showCheckbox: true,
    showDeleteAllButton: false,
    dateStringToDateFilter: true
  };

  displayedColumns: ITableHeader[] = [
    {
      collumnName: 'home_test_date',
      collumnKey: 'home_test_date#label'
    },
    {
      collumnName: 'home_test_select',
      collumnKey: 'home_test_select#label'
    },
    {
      collumnName: 'home_test_text',
      collumnKey: 'home_test_text#label'
    },
    {
      collumnName: 'home_test_autocomplete',
      collumnKey: 'home_test_autocomplete#label'
    }
  ];

  data: any[] = [];

  constructor(private fs: FormService, private formS: FormularService) { }

  ngOnInit(): void {
    this.formS.get().subscribe((data: IFormular[]) => {
      // console.log(data);
      // data.forEach((row: IFormular) => {
      //   // console.log(row.home_test_date);
      //   // console.log(row);

      //   // row.home_test_date = moment(row.home_test_date).format('DD.MM.YYYY');
      // });
      this.data = data;
      this.table.refresh();
    });
  }
}
