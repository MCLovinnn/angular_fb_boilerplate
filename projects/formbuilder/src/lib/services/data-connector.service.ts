import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { timer } from 'rxjs';
import { map } from 'rxjs/operators';

export interface searchObj {
  id?: string;
  categories?: string[];
  text?: string;
}

@Injectable({
  providedIn: 'root'
})
export class DataConnectorService {

  url = 'api';

  constructor(private http: HttpClient) {
  }


  create(post: any, itemType: string) {
    return this.http.post(
      '/api/'+ itemType,
      { ['item']: post },
      { headers: { 'Content-Type': 'application/json' } }
    );
}

update(id: string, post: any, itemType: string) {
  if (post) {
    return this.http.put(
      '/api/'+ itemType,
      { ['item']: post },
      { headers: { 'Content-Type': 'application/json' } }
    );
  }
  return 'incoorect input';
}

get(itemType: string, id: string = "0", kat: string[] = [], txt: string = '') {
  let res: any[];
  res = [];
  let search: searchObj = {};

  if (id !== '0') {
    search.id = id;
  }

  if (kat && kat.length > 0) {
    search.categories = kat;
  }

  if (txt !== '') {
    search.text = txt;
  }

  let options: {
    headers: HttpHeaders;
    params?: any;
  } = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    params: search
  };
  return this.http.get('/api/' + itemType, options);
}

delete(id: string, itemType: string) {
  if (id) {
    return this.http.delete('/api/'+ itemType, {
      headers: { 'Content-Type': 'application/json' },
      params: {id: id}
    });
  }
  return 'no id';
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
