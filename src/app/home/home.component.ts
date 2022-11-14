import { Component, OnInit } from '@angular/core';
import { ITableViewOptions, TableType } from 'projects/formbuilder/src/public-api';
import { CustomerTable } from '../interfaces/icustomer';
import { ConsultantTable } from '../interfaces/iconsultant';
import { AuthenticationService } from '../services/auth.service';
import { FormularService } from '../services/formular.service';

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
  constructor(
    private auth: AuthenticationService,
    private formS: FormularService
  ) {
  }

  ngOnInit(): void {
    this.auth.callApi('customer').subscribe((result: any) => {
       this.transformCustomerData(result.data);
      // console.log(result);
    });
    this.auth.callApi('consultant').subscribe((result: any) => {
      this.transformConsultantData(result.data);
    //  console.log(result);
   });
  }

  transformCustomerData(data: any[]) {
    let newArr = [];
    data.forEach((val, index, array) => {
      val.customerid = val.idcustomer;
      val.id = val.user_iduser;
      val.firstname = val.name;
      newArr.push(this.formS.customerToForm(val));
    });
    this.data = newArr;
    // console.log(this.data);

  }
  transformConsultantData(data: any[]) {
    let newArr = [];
    data.forEach((val, index, array) => {
      val.consultantid = val.idconsultant;
      val.id = val.user_iduser;
      val.firstname = val.name;
      newArr.push(this.formS.consultantToForm(val));
    });
    this.dataConsultant = newArr;
    // console.log(this.dataConsultant);

  }

  doIt() {
    this.auth.callApi('consultant');
  }
}
