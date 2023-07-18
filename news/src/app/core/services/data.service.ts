import { URLNews } from './../constants/constants';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { INews, IResponse } from '../interfaces/interfaces';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  getAllNews(page: number, pageSize: number) {
    return this.http
      .get<IResponse>(`${URLNews.All}${page}/${pageSize}`)
      .pipe(map((i) => i.news));
  }

  getCurrentNews(url: string) {
    return this.http.get<INews>(URLNews.Current + url);
  }

  constructor(public http: HttpClient) {}
}
