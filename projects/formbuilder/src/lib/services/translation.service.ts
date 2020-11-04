import { HttpClient } from '@angular/common/http';
import { Injectable, Input, Output, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  // @ts-ignore
  @Output() onLangChange: EventEmitter<string> = new EventEmitter();

  data: any = {};
  lang: string;

  private _path: string;
  constructor(private http: HttpClient) {
  }

  setPath (path: string) {
    this._path = path;;
  }

  setLang(lang: string) {
    this.lang = lang;
    this.use(this.lang);
    this.onLangChange.emit(this.lang);
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
