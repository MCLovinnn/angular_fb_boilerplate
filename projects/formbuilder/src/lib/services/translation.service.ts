import { HttpClient } from "@angular/common/http";
import { Injectable, Input, Output, EventEmitter } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class TranslationService {
  @Output() onLangChange: EventEmitter<string> = new EventEmitter();
  @Output() onDataChange: EventEmitter<any> = new EventEmitter();

  data: any = {};
  lang: string;

  private _path: string;
  constructor(private http: HttpClient) {
    this.onDataChange.subscribe(val => {
      this.updateData(val);
    });
    this.onLangChange.subscribe(val => {
      this.lang = val;
    });
  }

  setPath(path: string) {
    this._path = path;
  }

  setLang(lang: string) {
    this.lang = lang;
    this.use(this.lang);
    this.onLangChange.emit(this.lang);
  }

  updateData(data: any) {
    Object.assign(this.data, data);
    // this.onDataChange.emit(this.data);
  }

  use(lang: string): Promise<{}> {
    return new Promise<{}>((resolve, reject) => {
      const langPath = `${this._path}${lang || "de"}.json`;
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
}
