import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Form } from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  private url = 'http://localhost:3000/api/imagen';

    constructor(private http: HttpClient) {}

   uploadImage(image: any): Observable<any> {
        return this.http.post(`${this.url}/upload`, image);
    }
    getImage(filename: string): Observable<Blob> {
        return this.http.get(`${this.url}/get/${filename}` , { responseType: 'blob' });
    }
}