import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './page/main/main.component';
import { RouterModule, Routes } from '@angular/router';
import { ItemNewsComponent } from './components/item-news/item-news.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { ModalComponent } from './components/modal/modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  { path: '', component: MainComponent },
  // { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  declarations: [MainComponent, ItemNewsComponent, ModalComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [RouterModule],
  providers: [],
})
export class MainModule {}
