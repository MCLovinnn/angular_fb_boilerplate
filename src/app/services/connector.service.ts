import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TranslationService } from 'formbuilder';

@Injectable({
  providedIn: 'root'
})
export class ConnectorService {
  url = '/api';
  ocr = 'https://api.ocr.space/parse/image';
  constructor(public ts: TranslationService, private http: HttpClient) {}

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

  ocrReq(picture: string, lang = 'ger', options: any = {}) {
    options.apikey = '6efc7233c388957';
    options.base64Image = picture;
    options.language = lang;
    return this.http.post(
      this.ocr,
      options ,
      { headers: { apikey : '6efc7233c388957',
      'Content-Type': 'multipart/form-data' } }
    );
  }
}
