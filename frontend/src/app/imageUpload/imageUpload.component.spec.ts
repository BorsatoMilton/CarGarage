import { Component } from "@angular/core";
import { ImageService } from "./image.service.js";
import { FormsModule } from "@angular/forms";
@Component({
  selector: 'app-image-upload',
  standalone: true,
  templateUrl: './imageUpload.component.html',
  styleUrls: ['./imageUpload.component.css'],
  imports: [FormsModule]
})

export class ImageUploadComponent {
  selectedFile: File | null = null;
  vehiculoId: string = '';

    constructor(private imageService: ImageService) {}
   
    onFileSelected(event:any) {
        const file = event.target.files[0];
        if (file) {
            this.selectedFile = file;
            const reader = new FileReader();
            reader.onload = () => {
                if (reader.result) {
                const base64String = reader.result.toString().split(',')[1];
                this.uploadImage(file.name, file.type, base64String);
            }
        };
            reader.readAsDataURL(file);
    }
}
onUpload() {
    if (this.selectedFile) {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result) {
          const base64String = reader.result.toString().split(',')[1];
          this.uploadImage(this.selectedFile!.name, this.selectedFile!.type, base64String);
        }
      };
      reader.readAsDataURL(this.selectedFile);
    } else {
      console.error('No se ha seleccionado ningún archivo');
    }
  }
    
    uploadImage(filename:string, contentType:string, base64String: string) {
        if (this.vehiculoId && this.selectedFile) {
            const image = {
                filename: this.selectedFile.name,
                contentType: this.selectedFile.type,
                file: base64String,
                vehiculoId:this.vehiculoId
            };
            this.imageService.uploadImage(image).subscribe(
                (response) => {
                    console.log('Imagen cargada correctamente');
                },
                (error) => {
                    console.error('Error al cargar la imagen', error);
                }
            );
        } else {
            console.error('Debe seleccionar un vehiculo');
        }
    }
}
