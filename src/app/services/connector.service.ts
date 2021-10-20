import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TranslationService } from '../../../projects/formbuilder/src/public-api';

@Injectable({
  providedIn: 'root'
})
export class ConnectorService {
  url = '/api';
  constructor(public ts: TranslationService, private http: HttpClient) {}

  toggleLang() {
    const newLang = this.ts.setLang(this.ts.lang === 'de' ? 'en' : 'de');
  }

  generateTextFile(lang: string, data: any) {
    return this.http.post(
      '/api/generate/' + lang,
      data,
      { headers: { 'Content-Type': 'application/json' } }
    );
  }

  updateTxtFile(lang: string, data: any) {
    return this.http.post(
      '/api/update/' + lang,
      data ,
      { headers: { 'Content-Type': 'application/json' } }
    );
  }

  getTxtKeys(name) {
    return this.http.get('/api/lang/' + name);
  }

  doPost(url: string, lang: string, data: any) {
    return this.http.post(
      '/api/' + url + lang,
      data ,
      { headers: { 'Content-Type': 'application/json' } }
    );
  }

  doPut(url: string, lang: string, data: any) {
    return this.http.put(
      '/api/' + url + lang,
      data ,
      { headers: { 'Content-Type': 'application/json' } }
    );
  }

  get(entity) {
    return this.http.get('/api/' + entity);
  }

  delete(url: string, name: string) {
    return this.http.delete(
      '/api/' + url + name,
      { headers: { 'Content-Type': 'application/json' } }
    );
  }

  load(path: string) {
    return new Promise<{}>((resolve, reject) => {
      const langPath = `${path}.json`;
      // console.log(langPath);
      this.http.get<{}>(langPath).subscribe(
        config => {
          resolve(config);
        },
        error => {
          resolve({error});
        }
      );
    });
  }
}
