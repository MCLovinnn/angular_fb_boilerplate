import { SelectionModel } from '@angular/cdk/collections';
import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSort } from '@angular/material/sort';
import { AngularCsv } from '../../classes/angular-csv';
import { TranslatePipe } from '../../services/translation.pipe';
import * as moment from 'moment';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

export enum TableType {
  USER = 'USER',
  FILE = 'FILE',
  GENERIC = 'GENERIC'
}

export interface ITableViewOptions {
  type: TableType;

  searchable: boolean;

  showPaginator: boolean;

  showCheckbox: boolean;

  showActions: boolean;

  showCSVExport: boolean;

  csvName?: string;

  showDeleteAllButton?: boolean;

  dateStringToDateFilter?: string;

  paginatorOptions?: {
    steps?: number[];
    step?: number;
  };
}

export interface ITableHeader {
  collumnName: string;

  collumnKey?: string;

  widthInPercentage?: number;
}
export enum ExportType {
  ALL = 'all',
  FILTERED = 'filter',
  SELECTED = 'selected'
}

export interface CSVOptions {
  fieldSeparator: string;
  quoteStrings: string;
  decimalseparator: string;
  showLabels: boolean;
  showTitle: boolean;
  title: string;
  headers?: {};
  useBom?: boolean;
  noDownload?: boolean;
  exportAll?: ExportType;
}

// TODO: A structure that helps generation the table
// TODO: Make the action buttons configurable. Eg.: disabled
// TODO: add for CodeTables an entry in getDisplayRepresentation()

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, OnChanges, AfterViewInit {
  selection = new SelectionModel<any>(true, []);
  collumnsToBeDisplayed: string[] = [];
  initialColumns: string[] = [];
  @Output() dataSource: MatTableDataSource<any[]> = new MatTableDataSource<any[]>([]);
  resultsLength = 0;
  filterControl = new FormControl('');
  actionsAdded = false;
  @Input() displayedColumns: ITableHeader[] = [];
  @Input() viewOptions: ITableViewOptions;
  @Input() data = [];
  @Input() csvOptions: CSVOptions;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @Output() edit: EventEmitter<any> = new EventEmitter<any>();
  @Output() download: EventEmitter<any> = new EventEmitter<any>();
  @Output() delete: EventEmitter<any> = new EventEmitter<any>();
  @Output() deleteBulk: EventEmitter<any> = new EventEmitter<any>();
  @Output() selectionChange: EventEmitter<any> = new EventEmitter<any>();

  constructor(private dialog: MatDialog, private ts: TranslatePipe) {
    this.actionsAdded = false;
    this.displayedColumns.forEach((value: ITableHeader) => {
      if (value.collumnName === 'actions') {
        this.actionsAdded = true;
      }
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = (event.target as HTMLInputElement).value;
    this.selection.clear();
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.filteredData.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.filteredData.forEach(row => this.selection.select(row));
  }

  ngOnInit() {
    if (!this.viewOptions.paginatorOptions) {
      this.viewOptions.paginatorOptions = {};
    }
    if (!this.viewOptions.paginatorOptions.steps) {
      this.viewOptions.paginatorOptions.steps = [5, 25, 50];
    }
    if (!this.viewOptions.paginatorOptions.step) {
      this.viewOptions.paginatorOptions.step = 5;
    }
    this.dataSource.data = this.data || [];

    if (this.viewOptions.showDeleteAllButton !== false) {
      this.viewOptions.showDeleteAllButton = true;
    }
    if (this.viewOptions.showCheckbox) {
      this.displayedColumns.unshift({ collumnName: 'select' });
    }
    if (this.viewOptions.showActions) {
      this.displayedColumns.push({ collumnName: 'actions' });
    }
    this.collumnsToBeDisplayed = this.displayedColumns.map(
      header => header.collumnName
    );
    this.initialColumns = this.displayedColumns
      .filter(column => column.collumnName !== '')
      .map(column => column.collumnName);
    this.dataSource.filterPredicate = (data: any, filter: string) =>
      this.customFilterBasedOnDisplayColumns(data, filter);
    this.selection.changed.subscribe(vale => {
      this.selectionChange.emit(vale);
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    if (this.viewOptions.dateStringToDateFilter) {
      this.dataSource.sortingDataAccessor = (
        item,
        property
      ): string | number => {
        switch (property) {
          case this.viewOptions.dateStringToDateFilter: {
            return moment(item[property], 'L', 'de', true).unix();
          }
          default:
            return item[property];
        }
      };
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    this.selection.clear();
    if (changes['data']) {
      this.data = changes.data.currentValue || [];
      this.dataSource.data = this.data;
      this.resultsLength = this.data.length;
      this.dataSource.filter = '';
      this.filterControl.patchValue('');
      if (this.paginator) {
        this.dataSource.paginator.firstPage();
      }
    }
  }

  onEdit(row: any) {
    this.edit.emit(row);
  }

  onDownload(row: any) {
    this.download.emit(row);
  }

  onDeleteRecord(row: any) {
    this.delete.emit(row);
    this.selection.clear();
  }

  onDeleteSelectedRecords() {
    const filteredDatasource = this.dataSource.filteredData.filter(
      item => this.selection.selected.indexOf(item) >= 0
    );
    this.deleteBulk.emit(filteredDatasource);
    this.selection.clear();
  }

  customFilterBasedOnDisplayColumns(data: any, filter: string) {
    for (const columnName of this.initialColumns) {
      // console.log(data);
      // console.log(columnName);

      if (
        data[columnName] &&
        data[columnName]
          .toString()
          .trim()
          .toLowerCase()
          .indexOf(filter.toLowerCase()) >= 0
      ) {
        return true;
      }
    }
    return false;
  }

  getDisplayData(colums, csv = false) {
    const result = [];
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < this.data.length; i++) {
      const row = {};
      // tslint:disable-next-line: prefer-for-of
      for (let y = 0; y < colums.length; y++) {
        if (csv && this.csvOptions && this.csvOptions.fieldSeparator === ',') {
          row[colums[y].collumnName] = this.data[i][colums[y].collumnName]
            ? this.data[i][colums[y].collumnName].split(',').join(';')
            : ' ';
        } else {
          row[colums[y].collumnName] = this.data[i][colums[y].collumnName]
            ? this.data[i][colums[y].collumnName]
            : ' ';
        }
      }
      // console.log('row', row);
      result.push(row);
    }
    // console.log('result', result);
    return result;
  }

  getFilteredDisplayData(colums, csv = false) {
    const result = [];
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < this.dataSource.filteredData.length; i++) {
      const row = {};
      // tslint:disable-next-line: prefer-for-of
      for (let y = 0; y < colums.length; y++) {
        if (csv && this.csvOptions.fieldSeparator === ',') {
          row[colums[y].collumnName] = this.data[i][colums[y].collumnName]
            ? this.data[i][colums[y].collumnName].split(',').join(';')
            : ' ';
        } else {
          row[colums[y].collumnName] = this.dataSource.filteredData[i][
            colums[y].collumnName
          ];
        }
      }
      // console.log('row', row);
      result.push(row);
    }
    // console.log('result', result);
    return result;
  }

  getSelectedDisplayData(colums, csv = false) {
    const result = [];
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < this.selection.selected.length; i++) {
      const row = {};
      // tslint:disable-next-line: prefer-for-of
      for (let y = 0; y < colums.length; y++) {
        if (csv && this.csvOptions.fieldSeparator === ',') {
          row[colums[y].collumnName] = this.data[i][colums[y].collumnName]
            ? this.data[i][colums[y].collumnName].split(',').join(';')
            : ' ';
        } else {
          row[colums[y].collumnName] = this.dataSource.filteredData[i][
            colums[y].collumnName
          ];
        }
      }
      // console.log('row', row);
      result.push(row);
    }
    // console.log('result', result);
    return result;
  }

  refresh() {
    this.dataSource.data = this.data;
  }

  csvExport() {
    let columns = Object.assign([], this.displayedColumns);
    let columnNames = Object.assign(
      [],
      this.displayedColumns.map(header =>
        header.collumnKey
          ? this.ts.transform(header.collumnKey)
          : header.collumnName
      )
    );
    columns = columns.filter(el => {
      return (
        el.collumnName !== '' &&
        el.collumnName !== 'select' &&
        el.collumnName !== 'actions'
      );
    });
    columnNames = columnNames.filter(el => {
      return el !== '' && el !== 'select' && el !== 'actions';
    });

    let csvData = [];
    if (this.csvOptions.exportAll === ExportType.SELECTED) {
      csvData = this.getSelectedDisplayData(columns, true);
    } else if (this.csvOptions.exportAll === ExportType.FILTERED) {
      csvData = this.getFilteredDisplayData(columns, true);
    } else {
      csvData = this.getDisplayData(columns, true);
    }
    const tmpData = csvData;

    const name = this.viewOptions.csvName
      ? this.viewOptions.csvName
      : 'Formbuilder';
    let options: CSVOptions;
    if (this.csvOptions) {
      options = this.csvOptions;
      options.headers = columnNames;
    } else {
      options = {
        fieldSeparator: ';',
        quoteStrings: '"',
        decimalseparator: '.',
        showLabels: true,
        showTitle: false,
        title: name,
        useBom: true,
        noDownload: false,
        headers: columnNames
      };
    }

    // console.log(columns);
    const file = new AngularCsv(tmpData, name, options);
    // console.log('csv', file);
  }
}
