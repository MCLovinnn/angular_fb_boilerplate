import { Component, OnInit } from '@angular/core';
import { FormService, TranslationService } from '../../../../formbuilder/src/public-api';
import { ConnectorService } from '../services/connector.service';

@Component({
  selector: 'app-translation',
  templateUrl: './translation.component.html',
  styleUrls: ['./translation.component.scss']
})
export class TranslationComponent implements OnInit {
  dataSource = [];
  configs: any;
  constructor(private fs: FormService,
    private ts: TranslationService,
    private cs: ConnectorService) {
      // this.configs = ts.data;
      // ts.onDataChange.subscribe(res => {
      //   this.configs = res;
      //   // console.log(res);
      // });

  }

  changeTxt(key: string, event: any) {
    this.configs[key] = event.target.value;
    this.ts.updateData(this.configs);
  }

  ngOnInit(): void {
    this.cs.getTxtKeys(this.ts.lang).subscribe(val => {
      // console.log(val);
      this.configs = val;
    });
    // this.configs = Array.from(this.ts.data);
    //  console.log(this.configs);
  }

}
