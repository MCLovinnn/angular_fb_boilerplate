import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.less']
})
export class ConfirmDialogComponent implements OnInit {

  public icon = 'questionmark';
  public errorMsg: string[] = [];
  public message: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<ConfirmDialogComponent>
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

    if (!!this.data.message) {
      this.message = this.data.message;
    } else {
      this.message = 'Sind Sie sicher?';
    }
    console.log(this.message);

  }

}
