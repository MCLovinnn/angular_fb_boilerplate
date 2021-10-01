import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../ui-components/dialogs/confirm-dialog/confirm-dialog.component';
import { ErrorDialogSimpleComponent } from '../ui-components/dialogs/error-dialog-simple/error-dialog-simple.component';
import { InfoDialogSimpleComponent } from '../ui-components/dialogs/info-dialog-simple/info-dialog-simple.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private dialog: MatDialog) { }

  public showDataImportErrorDialog(errorDataArray: any[],
    afterDialogCallback: Function
  ): MatDialogRef<any> {

    const dialogData = {
      dataImportErrors: errorDataArray
    };

    const dialogRef = this.dialog.open(MatDialog, {
      data: dialogData
    });

    dialogRef.afterClosed().subscribe((result:any) => {
      afterDialogCallback(result);
    });

    return dialogRef;
  }

  public showErrorDialog(errorMsg: any, afterDialogCallback?: Function): MatDialogRef<any> {

    const dialogData = {
      errorMsg: errorMsg
    };

    const dialogRef = this.dialog.open(ErrorDialogSimpleComponent, {
      data: dialogData
    });

    dialogRef.afterClosed().subscribe((result:any) => {
      if (!!afterDialogCallback) {
        afterDialogCallback(result);
      }
    });

    return dialogRef;
  }

  public showInfoDialog(infoMsg: any, afterDialogCallback?: Function): MatDialogRef<any> {

    const dialogData = {
      infoMsg: infoMsg
    };

    const dialogRef = this.dialog.open(InfoDialogSimpleComponent, {
      data: dialogData,
    });

    dialogRef.afterClosed().subscribe((result:any) => {
      if (!!afterDialogCallback) {
        afterDialogCallback(result);
      }
    });

    return dialogRef;
  }

  /**
   * messageString may also be an html String like:
   * <b>Are you sure?</b>
   *
   * @param {string} messageString
   * @param {Function} positiveCallback
   * @param {Function} negativeCallback
   */
  public confirm(messageString: string, positiveCallback: Function, negativeCallback?: Function): void {
    const dialogData = {
      message: messageString
    };
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: dialogData
    });

    dialogRef.afterClosed().subscribe((result:any) => {
      if (result === true) {
        positiveCallback();
      } else {
        if (!!negativeCallback) {
          negativeCallback();
        }
      }
    });
  }

  public xmlExport(positiveCallback: Function, negativeCallback?: Function): void {
    const dialogRef = this.dialog.open(MatDialog);

    dialogRef.afterClosed().subscribe((result:any) => {
      if (result) {
        positiveCallback(result);
      } else {
        if (!!negativeCallback) {
          negativeCallback();
        }
      }
    });
  }

  public setValid(positiveCallback: Function, negativeCallback?: Function): void {
    const dialogRef = this.dialog.open(MatDialog, {width: '350px'});

    dialogRef.afterClosed().subscribe((result:any) => {
      if (result) {
        positiveCallback(result);
      } else {
        if (!!negativeCallback) {
          negativeCallback();
        }
      }
    });
  }
}
