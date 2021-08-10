import { Component, OnInit, Input } from '@angular/core';
import { BaseFieldComponent } from '../../classes/field';
import { FormBuilder } from '@angular/forms';
import { FormService } from '../../services/form.service';
import { TranslationService } from '../../services/translation.service';

@Component({
  selector: 'app-file-input',
  templateUrl: './file-input.component.html',
  styleUrls: ['./file-input.component.scss']
})
export class FileInputComponent extends BaseFieldComponent implements OnInit {

  @Input() srcResult: any;
  constructor(public fb: FormBuilder,
    public fs: FormService,
    public ts: TranslationService) {
    super(fb, fs, ts);
  }

  ngOnInit() {
    super.ngOnInit();
    // console.log(this.name);
    // console.log(this.control);
    // console.log(this.form);
  }

  onFileSelected() {
    const inputNode: any = document.querySelector('#file');

    if (typeof (FileReader) !== 'undefined' && typeof (inputNode.files[0]) !== 'undefined') {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        // console.log(e);

        this.srcResult = e.target.result;
      };

      reader.readAsArrayBuffer(inputNode.files[0]);
      // console.log(reader);

    }
  }
}
