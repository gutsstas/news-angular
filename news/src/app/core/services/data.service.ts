import { KeyLocalStorage, URLNews } from './../constants/constants';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { INews, IResponse } from '../interfaces/interfaces';
import { map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  listNews: INews[] = [];

  getAllNews(page: number, pageSize: number) {
    return this.http.get<IResponse>(`${URLNews.All}${page}/${pageSize}`).pipe(
      map((i) => i.news),
      tap((news) => this.listNews.push(...news))
    );
  }

  getCurrentNews(url: string) {
    return this.http.get<INews>(URLNews.Current + url);
  }

  getListLocalStorage() {
    const local = localStorage.getItem(KeyLocalStorage.Key);
    if (local) {
      const array = JSON.parse(local);
      this.listNews.unshift(...array);
    }
  }

  constructor(public http: HttpClient) {}
}
