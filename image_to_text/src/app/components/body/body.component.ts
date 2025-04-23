import { Component } from '@angular/core';

@Component({
  selector: 'app-body',
  standalone: true,
  imports: [],
  templateUrl: './body.component.html',
  styleUrl: './body.component.css'
})
export class BodyComponent {

  str:string=''
  image:string=''
  event: any;
  selectedFile: File | undefined;
  
  onSubmit(event:any){
    this.str='helloooo'
  }
  
  onFileChange(event:any){
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      // console.log('File selected:', this.selectedFile.name);
      this.image=this.selectedFile.name
    }
  }

}
