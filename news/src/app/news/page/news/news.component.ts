import { INews } from './../../../core/interfaces/interfaces';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { DataService } from 'src/app/core/services/data.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss'],
})
export class NewsComponent implements OnInit {
  href!: string;
  data$!: Observable<INews>;

  constructor(private router: Router, private dataService: DataService) {}

  ngOnInit() {
    this.href = this.router.url;
    console.log(this.router.url);
    this.data$ = this.dataService.getCurrentNews(this.href);
    this.dataService.getCurrentNews(this.href).subscribe((i) => console.log(i));
  }
}
