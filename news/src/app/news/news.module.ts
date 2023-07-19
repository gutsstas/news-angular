import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsComponent } from './page/news/news.component';
import { RouterModule, Routes } from '@angular/router';
import { SafePipe } from './pipes/safe.pipe';

const routes: Routes = [
  { path: '', component: NewsComponent },
  // { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  declarations: [NewsComponent, SafePipe],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewsModule {}
