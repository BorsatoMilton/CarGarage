import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Form } from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  private url = 'http://localhost:3000/imagen';

    constructor(private http: HttpClient) {}

    uploadImage(filename: string, contentType: string, data: string, vehiculoId: string): Observable<any> {
        const formData: FormData = new FormData();
        formData.append('filename', filename);
        formData.append('vehiculoId', vehiculoId);
        return this.http.post(`${this.url}/upload`, formData);
    }

    getImage(filename: string): Observable<Blob> {
        return this.http.get(`${this.url}/get/${filename}` , { responseType: 'blob' });
    }
}