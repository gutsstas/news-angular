import { INews } from './../../../core/interfaces/interfaces';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, Subscription } from 'rxjs';
import { DataService } from 'src/app/core/services/data.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss'],
})
export class NewsComponent implements OnInit, OnDestroy {
  href!: string;

  data!: INews;
  subscription!: Subscription;

  constructor(private router: Router, private dataService: DataService) {}
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit() {
    this.href = this.router.url;
    this.subscription = this.dataService.getCurrentNews(this.href).subscribe({
      next: (res) => {
        this.data = res;
      },
      error: () => this.router.navigateByUrl(''),
    });
  }
}
