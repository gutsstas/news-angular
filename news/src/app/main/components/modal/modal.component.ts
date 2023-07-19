import { DataService } from 'src/app/core/services/data.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { KeyLocalStorage } from 'src/app/core/constants/constants';
import { INews } from 'src/app/core/interfaces/interfaces';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
  addForm!: FormGroup;
  file!: File;

  onSubmit() {
    if (this.file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageBase64 = reader.result as string;
        const local = localStorage.getItem(KeyLocalStorage.Key);
        let array: INews[] = [];

        if (local) {
          array = JSON.parse(local);
        }
        const news = {
          title: this.addForm.controls['title'].value,
          description: this.addForm.controls['description'].value,
          url: '',
          titleImageUrl: imageBase64,
          publishedDate: new Date().toString(),
        };

        this.dataService.listNews.unshift(news);

        array.unshift(news);

        localStorage.setItem(KeyLocalStorage.Key, JSON.stringify(array));
      };
      reader.readAsDataURL(this.file);
      this.modalService.close();
    }
  }

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;

    if (!input.files?.length) {
      return;
    }

    this.file = input.files[0];
  }

  constructor(
    private fb: FormBuilder,
    public modalService: ModalService,
    private dataService: DataService
  ) {}
  ngOnInit() {
    this.addForm = this.fb.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      img: [],
      image: [''],
    });
  }
}
