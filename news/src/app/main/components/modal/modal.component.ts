import { DataService } from 'src/app/core/services/data.service';
import { Component, OnInit, forwardRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { KeyLocalStorage } from 'src/app/core/constants/constants';
import { INews } from 'src/app/core/interfaces/interfaces';
import { ModalService } from '../../services/modal.service';
import { MessageService } from 'primeng/api';

interface UploadEvent {
  originalEvent: Event;
  files: File[];
}

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  providers: [MessageService],
})
export class ModalComponent implements OnInit {
  addForm!: FormGroup;
  file: File | null = null;
  binding!: File;

  onSubmit() {
    console.log(this.binding);

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
        this.removeValue();
      };
      reader.readAsDataURL(this.file);
      this.modalService.close();
    }
  }

  onFileChange(event: UploadEvent) {
    if (!event.files?.length) {
      return;
    }

    this.file = event.files[0];

    this.messageService.add({
      severity: 'info',
      summary: 'Success',
      detail: 'File Uploaded with Auto Mode',
    });
  }

  constructor(
    private fb: FormBuilder,
    public modalService: ModalService,
    private dataService: DataService,
    public messageService: MessageService
  ) {}

  removeValue(): void {
    this.addForm.controls['title'].setValue('');
    this.addForm.controls['description'].setValue('');
    this.file = null;
  }

  ngOnInit(): void {
    this.addForm = this.fb.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      img: [],
    });
  }
}
