import { Component, OnInit, Input } from "@angular/core";
import { BaseFieldComponent } from "../../classes/field";
import { UntypedFormBuilder } from "@angular/forms";
import { FormService } from "../../services/form.service";
import { TranslationService } from "../../services/translation.service";

@Component({
  selector: "app-file-input",
  templateUrl: "./file-input.component.html",
  styleUrls: ["./file-input.component.scss"]
})
export class FileInputComponent extends BaseFieldComponent implements OnInit {
  file: any = null;
  fileFormatError = false;

  @Input() srcResult: any;

  constructor(
    public override fb: UntypedFormBuilder,
    public override fs: FormService,
    public override ts: TranslationService
  ) {
    super(fb, fs, ts);
  }

  override ngOnInit() {
    super.ngOnInit();
    // console.log(this.name);
    // console.log(this.control);
    // console.log(this.form);
  }

  onFileSelected() {
    const inputNode: any = document.querySelector("#file");
    // console.log(inputNode.files);
    if (inputNode.files.length > 0) {
      const regex = new RegExp(
        ".*.(?<fileending>txt|pdf|zip|doc|docx|xlsx|xls|ppt|pptx)$"
      );
      // console.log(!regex.test(inputNode.files[0].name));
      if (!regex.test(inputNode.files[0].name)) {
        this.fileFormatError = true;
      } else {
        this.fileFormatError = false;
      }
      this.file = inputNode.files[0];
      this.fs.getFormControl({ name: this.name }).patchValue(this.file);
      // console.log(this.fileFormatError);
    } else {
      this.emptyFile();
    }
  }

  emptyFile() {
    const inputNode: any = document.querySelector("#file");
    inputNode.value = "";
    this.file = null;
    this.fs.getFormControl({ name: this.name }).patchValue("");
    this.fileFormatError = false;
  }
}
