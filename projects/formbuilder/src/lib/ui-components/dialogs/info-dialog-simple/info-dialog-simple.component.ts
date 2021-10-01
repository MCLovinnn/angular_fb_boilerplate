import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-info-dialog-simple',
  templateUrl: './info-dialog-simple.component.html',
  styleUrls: ['./info-dialog-simple.component.less']
})
export class InfoDialogSimpleComponent implements OnInit {

  public icon = 'info';
  public infoMsg: string[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<InfoDialogSimpleComponent>
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

    if (!!this.data.infoMsg && Array.isArray(this.data.infoMsg)) {
      this.infoMsg = this.data.infoMsg;
    } else {
      this.infoMsg = [String(this.data.infoMsg)];
    }

  }

}
