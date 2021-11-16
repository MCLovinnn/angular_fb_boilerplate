import { Component, OnInit, ViewChild } from '@angular/core';
import { ITableViewOptions, ITableHeader, TableType, FormService, TableComponent } from 'projects/formbuilder/src/public-api';
import { FormularService } from '../services/formular.service';
import { IZugKopfFormular } from '../formular';
import { FormularComponent } from '../formular/formular.component';
import * as moment from 'moment';


@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {
  @ViewChild('formular') formular: FormularComponent;
  @ViewChild('testtable') table : TableComponent;
  viewOptions: ITableViewOptions = {
    type: TableType.GENERIC,
    searchable: true,
    showPaginator: true,
    showActions: true,
    showCSVExport: true,
    showCheckbox: true,
    showDeleteAllButton: false,
    dateStringToDateFilter: 'home_test_date'
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
    },
    {
      collumnName: 'home_test_slider',
      collumnKey: 'home_test_slider#label'
    }
  ];

  data: any[] = [];

  constructor(private fs: FormService, private formS: FormularService) { }

  ngOnInit(): void {
    this.formS.get().subscribe((data: IZugKopfFormular[]) => {
      this.data = data;
      this.table.refresh();
    });
  }

  delete(row: IZugKopfFormular) {
      // console.log(val);
      this.formS.delete(row);
  }

  deleteAll(data: IZugKopfFormular[]) {
    data.forEach((element: IZugKopfFormular, index, array) => {
      this.delete(element);
    });
  }

  edit(row: IZugKopfFormular) {
    let tmpForm: any = Object.assign({}, row);
    tmpForm.home_test_date = moment(tmpForm.home_test_date, 'L', 'de', true);
    this.formular.setForm(tmpForm);
  }

}
