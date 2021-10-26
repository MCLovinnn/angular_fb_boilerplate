import { Injectable } from '@angular/core';
import { DataFlattnerService } from './data-flattner.service';
import { IField } from '../interfaces/ifield';
import { AutoSearch } from '../interfaces/imenu';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { merge } from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  flatControlls: any[];
  dataChange = new BehaviorSubject<AutoSearch[]>([]);
  configs: any;
  emptyObj: IField = {
    name: 'home_ui_new'
  };


  constructor(private http: HttpClient) {
    this.flatControlls = [];
    // console.log(this.flatControlls);
  }

  buildTree(config: any) {
    // console.log(config);
    const entries = [];
    for (const page in config) {
      if (page) {
        for (const formN in config[page]) {
          if (config[page][formN]) {
            const subLvl = [];
            const form: IField[] = config[page][formN];
            // console.log(form);
            for (const [key, value] of Object.entries(form)) {
              // console.log(`${key}: ${value}`);
              subLvl.push(value.name);
              // children.push(value.name);
            }
            const tmpData = [
              {
                name: formN,
                children: subLvl
              }
            ];
            entries.push(tmpData);
          }
        }
      }
    }
    // DataFlattnerService.flatten(tmpData)
    // this.flatControlls = tmpData;
    // console.log("newtree", this.flatControlls);
  }

  get data(): AutoSearch[] {
    return this.dataChange.value;
  }
  /**
   * Build the file structure tree. The `value` is the Json object, or a sub-tree of a Json object.
   * The return value is the list of `AutoSearch`.
   */
  buildFileTree(obj: { [key: string]: any }, level: number): AutoSearch[] {
    return Object.keys(obj).reduce<AutoSearch[]>((accumulator, key) => {
      const value = obj[key];
      // console.log(value);

      const node = new AutoSearch();
      node.name = key;
      if (value != null) {
        if (typeof value === 'object' && level < 2) {
          node.children = this.buildFileTree(value, level + 1);
        } else {
          if (level === 2) {
            node.name = value.name;
          } else {
            node.name = value;
          }
        }
      }
      const data = accumulator.concat(node);
      this.dataChange.next(data);
      return accumulator.concat(node);
    }, []);
  }

  getControlls() {
    return this.flatControlls;
  }

  getFlatControlls() {
    return DataFlattnerService.flatten(this.flatControlls);
  }

  getConfigByName(name: string) {
    const keys = name.split('_');
    const page = keys[0];
    const form = keys[1];
    const key = keys[2];

    if (this.configs[page] && this.configs[page][form]) {
      return this.configs[page][form][key]
        ? (this.configs[page][form][key] as IField)
        : this.emptyObj;
    } else {
      return this.emptyObj;
    }
  }

  getAppConfigs(appData: any[]) {
    let data = {};
    Object.keys(appData).forEach(page => {
      const newForm = {};
      const formObj = appData[page];
      if (formObj) {
        Object.keys(formObj).forEach(form => {
          const formArray = {};
          const forM: any = formObj[form];
          Object.keys(forM).forEach(key => {
            const field: IField = forM[key];

            if(this.configs[page] && this.configs[page][form] && this.configs[page][form][key]) {
              // data[page][form][key] = field;
              merge(data, {[page]: {[form]: {[key]: field}}});
            }
          });
        });
      }
    });
    return data;
  }
}
