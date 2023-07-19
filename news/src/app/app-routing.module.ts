import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/page/main/main.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('src/app/main/main.module').then((m) => m.MainModule),
  },
  {
    path: '**',
    loadChildren: () =>
      import('src/app/news/news.module').then((m) => m.NewsModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
