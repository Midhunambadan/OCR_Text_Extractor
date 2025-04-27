import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-body',
  standalone: true,
  imports: [],
  templateUrl: './body.component.html',
  styleUrl: './body.component.css',
})
export class BodyComponent {
  constructor(private http: HttpClient) {}

  event: any;
  selectedFile: File | undefined;
  extractedText: string = '';

  onFileChange(event: any) {
    this.selectedFile = event.target.files[0];
    // console.log(this.selectedFile)
  }

  onSubmit(event: any) {
    event.preventDefault();

    if (!this.selectedFile) {
      console.error('No file selected');
      return;
    }

    const formData = new FormData();
    formData.append('file', this.selectedFile);

    this.http.post('http://localhost:5000/extract', formData).subscribe(
      (res: any) => {
        this.extractedText = res.text;
        console.log('res', res.text);
      },
      (error) => {
        console.error('Error---', error);
      }
    );
  }

  copyText() {
    const textArea: any = document.getElementById('textArea') as HTMLTextAreaElement;

    if (textArea && textArea.value.trim() !== '') {
      navigator.clipboard
        .writeText(textArea.value)
        .then(() => {
          alert('Text copied successfully!');
        })
        .catch((err) => {
          console.error('Failed to copy text:', err);
        });
    } else {
      alert('No Text found !');
    }
  }

  clearText() {
    this.extractedText = '';
  }
}
