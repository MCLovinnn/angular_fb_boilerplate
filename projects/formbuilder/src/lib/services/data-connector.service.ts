import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { timer } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class DataConnectorService {

  url = 'api';

  constructor(private http: HttpClient) {
  }

  getFields() {
    return this.http.get(this.url + '/get');
  }

  insertField(field: any) {
    return this.http.post(this.url + '/insert', field);
  }

  deleteField(id) {
    return this.http.delete(this.url + '/delete', id);
  }

  getAsyncValidation(url: string, body: any) {
    return this.http.post(url, body).pipe(
      map(value => {
        if (value) {
          return value;
        } else {
          return timer(2000).pipe(
            map(() => {
              return {'error': true};
            })
          );
        }
      })
    );
  }
}
