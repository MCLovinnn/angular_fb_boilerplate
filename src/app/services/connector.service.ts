import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TranslationService } from '../../../projects/formbuilder/src/public-api';

@Injectable({
  providedIn: 'root'
})
export class ConnectorService {

  constructor(public ts: TranslationService,
    private http: HttpClient) {

  }

  toggleLang() {
    const newLang = this.ts.setLang(this.ts.lang === 'de' ? 'en' : 'de');
  }

  generateTextFile(name: string, data: any) {
    if (data && name) {
      return this.http.post('/api/generatede',
        { [name]: data }, { headers: { 'Content-Type': 'application/json' } });
    }
  }

  getTxtKeys(name) {
    return this.http.get('/api/lang' + name);
  }
}
