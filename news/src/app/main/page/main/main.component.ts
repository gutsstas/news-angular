import { INews } from 'src/app/core/interfaces/interfaces';
import { DataService } from './../../../core/services/data.service';
import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit, OnDestroy {
  page = 1;
  pageSize = 10;

  sub: Subscription[] = [];

  constructor(
    public dataService: DataService,
    public modalService: ModalService
  ) {}

  ngOnInit(): void {
    this.dataService.getListLocalStorage();
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
      .subscribe();
    this.sub.push(data);
  }

  ngOnDestroy(): void {
    this.sub.forEach((sub) => sub.unsubscribe());
  }
}
