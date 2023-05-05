import { Component, OnInit, Inject } from '@angular/core';
import { FormService } from '../../../../../formbuilder/src/public-api';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-move-elements',
  templateUrl: './move-elements.component.html',
  styleUrls: ['./move-elements.component.scss']
})
export class MoveElementsComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<MoveElementsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fs: FormService
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {}

  isValid() {
    const page = this.fs.getFormControl({ name: 'home_ui_moveElementsPage' })
      .valid;
    console.log(page);

    const form = this.fs.getFormControl({ name: 'home_ui_moveElementsForm' })
      .valid;
    return page && form;
  }
}
