import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-error-dialog-simple',
  templateUrl: './error-dialog-simple.component.html',
  styleUrls: ['./error-dialog-simple.component.less']
})
export class ErrorDialogSimpleComponent implements OnInit {

  public icon = 'error';
  public errorMsg: string[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<ErrorDialogSimpleComponent>
  ) {
  }

  ngOnInit() {

    if (!this.data) {
      return;
    }

    this.dialogRef.disableClose = true;

    if (!!this.data.icon) {
      this.icon = this.data.icon;
    }

    if (!!this.data.errorMsg && Array.isArray(this.data.errorMsg)) {
      this.errorMsg = this.data.errorMsg;
    } else {
      this.errorMsg = [String(this.data.errorMsg)];
    }

  }

}
