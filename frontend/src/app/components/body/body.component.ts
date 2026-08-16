import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

const MAX_FILE_SIZE_BYTES = 1024 * 1024 * 1024; // 1GB, matches the UI copy

@Component({
  selector: 'app-body',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './body.component.html',
  styleUrl: './body.component.css',
})
export class BodyComponent {
  constructor(private http: HttpClient) {}

  selectedFile: File | undefined;
  extractedText: string = '';

  // --- UI state (new, purely presentational) ---
  isLoading = false;
  isDragging = false;
  errorMessage = '';
  showCopyConfirm = false;

  get fileSizeLabel(): string {
    if (!this.selectedFile) return '';
    const kb = this.selectedFile.size / 1024;
    return kb < 1024 ? `${kb.toFixed(0)} KB` : `${(kb / 1024).toFixed(1)} MB`;
  }

  get wordCount(): number {
    return this.extractedText.trim() ? this.extractedText.trim().split(/\s+/).length : 0;
  }

  get charCount(): number {
    return this.extractedText.length;
  }

  // --- Original logic, kept as-is ---

  onFileChange(event: any) {
    const file = event.target.files[0];
    this.setSelectedFile(file);
  }

  onSubmit(event: any) {
    event.preventDefault();

    if (!this.selectedFile) {
      console.error('No file selected');
      this.errorMessage = 'Please choose an image first.';
      return;
    }

    this.errorMessage = '';
    this.isLoading = true;

    const formData = new FormData();
    formData.append('file', this.selectedFile);

    this.http.post('http://localhost:5000/extract', formData).subscribe(
      (res: any) => {
        this.extractedText = res.text;
        console.log('res', res.text);
        this.isLoading = false;
      },
      (error) => {
        console.error('Error---', error);
        this.errorMessage = 'Something went wrong while extracting text. Please try again.';
        this.isLoading = false;
      }
    );
  }

  copyText() {
    const textArea: any = document.getElementById('textArea') as HTMLTextAreaElement;

    if (textArea && textArea.value.trim() !== '') {
      navigator.clipboard
        .writeText(textArea.value)
        .then(() => {
          this.showCopyConfirm = true;
          setTimeout(() => (this.showCopyConfirm = false), 1500);
        })
        .catch((err) => {
          console.error('Failed to copy text:', err);
          this.errorMessage = 'Could not copy text to clipboard.';
        });
    } else {
      this.errorMessage = 'No text found to copy.';
    }
  }

  clearText() {
    this.extractedText = '';
  }

  // --- New: drag & drop support for the upload zone ---

  onDragOver(event: DragEvent) {
    event.preventDefault();
    this.isDragging = true;
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    this.isDragging = false;
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    this.isDragging = false;
    const file = event.dataTransfer?.files?.[0];
    this.setSelectedFile(file);
  }

  // --- New: shared validation for both click-select and drag-drop ---

  private setSelectedFile(file: File | undefined) {
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      this.errorMessage = 'Please upload an image file (PNG, JPG, or WEBP).';
      return;
    }

    if (file.size > MAX_FILE_SIZE_BYTES) {
      this.errorMessage = 'That file is larger than the 1GB limit.';
      return;
    }

    this.errorMessage = '';
    this.selectedFile = file;
  }
}