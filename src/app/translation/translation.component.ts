import { Component, OnInit } from '@angular/core';
import { FormService, TranslationService } from '../../../projects/formbuilder/src/public-api';

@Component({
  selector: 'app-translation',
  templateUrl: './translation.component.html',
  styleUrls: ['./translation.component.scss']
})
export class TranslationComponent implements OnInit {
  dataSource = [];
  configs: any;
  constructor(private fs: FormService,
    private ts: TranslationService) {
      this.configs = ts.data;
      ts.onDataChange.subscribe(res => {
        this.configs = res;
        // console.log(res);
      });

  }

  changeTxt(key: string, event) {
    this.configs[key] = event.target.value;
  }

  ngOnInit(): void {
    // this.configs = Array.from(this.ts.data);
    //  console.log(this.configs);
  }

}
