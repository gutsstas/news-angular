import { INews } from 'src/app/core/interfaces/interfaces';
import { DataService } from './../../../core/services/data.service';
import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit, OnDestroy {
  page = 1;
  pageSize = 10;

  sub: Subscription[] = [];

  constructor(private dataService: DataService) {}

  data: INews[] = [];

  ngOnInit(): void {
    this.loadContent();
  }

  @HostListener('window:scroll', ['$event'])
  onScroll() {
    const windowHeight = document.documentElement.clientHeight;
    const documentHeight = document.documentElement.offsetHeight;
    const scrollTop =
      document.documentElement.scrollTop || document.body.scrollTop || 0;

    if (Math.ceil(windowHeight + scrollTop) >= documentHeight) {
      this.page++;
      this.loadContent();
    }
  }

  loadContent() {
    const data = this.dataService
      .getAllNews(this.page, this.pageSize)
      .subscribe((res) => this.data.push(...res));
    this.sub.push(data);
  }

  ngOnDestroy(): void {
    this.sub.forEach((sub) => sub.unsubscribe());
  }
}
