import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './page/main/main.component';
import { RouterModule, Routes } from '@angular/router';
import { ItemNewsComponent } from './components/item-news/item-news.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';

const routes: Routes = [
  { path: '', component: MainComponent },
  // { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  declarations: [MainComponent, ItemNewsComponent],
  imports: [CommonModule, HttpClientModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class MainModule {}
