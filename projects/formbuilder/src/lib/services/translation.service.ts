import { HttpClient } from '@angular/common/http';
import { Injectable, Input, Output, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
// tslint:disable-next-line: no-output-on-prefix
  @Output() onLangChange: EventEmitter<string> = new EventEmitter();
// tslint:disable-next-line: no-output-on-prefix
  @Output() onDataChange: EventEmitter<any> = new EventEmitter();

  data: any = {};
  lang = 'de';
  userData = {};

  private _path = '';
  constructor(private http: HttpClient) {
    this.onLangChange.subscribe(val => {
      this.lang = val;
    });
  }

  setPath(path: string) {
    this._path = path;
  }

  addTxtFile(path: string) {
    return new Promise<{}>((resolve, reject) => {
      const langPath = `${path}${this.lang || 'de'}.json`;
      // console.log(langPath);
      this.http.get<{}>(langPath).subscribe(
        translation => {
          // console.log(translation);
          this.updateData(translation);
          this.onDataChange.emit(this.data);
          resolve(this.data);
        },
        error => {
          resolve(this.data);
        }
      );
    });
  }

  getUserData() {
    let txtFile = {};
    for(const key in this.userData) {
      if(this.userData) {
        Object.assign(txtFile, {
          [key]: this.data[key]
        });
      }
    }
    return txtFile;
  }

  setLang(lang: string) {
    this.lang = lang;
    this.use(this.lang);
    this.onLangChange.emit(this.lang);
  }

  updateData(data: any) {
    Object.assign(this.data, data);
    this.onDataChange.emit(this.data);
  }

  use(lang: string): Promise<{}> {
    return new Promise<{}>((resolve, reject) => {
      const langPath = `${this._path}${lang || 'de'}.json`;
      // console.log(langPath);
      this.http.get<{}>(langPath).subscribe(
        translation => {
          // console.log(translation);
          this.data = Object.assign({}, translation || {});
          this.lang = lang;
          this.onDataChange.emit(this.data);
          resolve(this.data);
        },
        error => {
          this.data = {};
          resolve(this.data);
        }
      );
    });
  }

  deleteKeys(data: any) {
    // this.data.
    let newdata = {};
    for (let [key, value] of Object.entries(this.data)) {
      console.log(key + ':' + value);
      let found = false;
      for (let [key2, value2] of Object.entries(data)) {
        if(key !== key2) { found = true; }
        // console.log(key + ':' + value);
      }
      if(!found) {
        Object.assign(newdata, {[key]: value});
      }
    }
    this.data = newdata;
  }

  getFBData() {
    let txtFile = {};
    for(const key in this.data) {
      if(!this.userData[key]) {
        Object.assign(txtFile, {
          [key]: this.data[key]
        });
      }
    }
    return txtFile;
  }
}
