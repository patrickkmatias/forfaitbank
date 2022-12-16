import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
   providedIn: "root",
})
export class ApiService {
   constructor(private http: HttpClient) {}

   private _apiUrl = environment.apiUrl;

   // create a helper function that accepts the data to be posted and the URL
   public postFormData(url: string, data: any): Observable<any> {
      const formData = new URLSearchParams();
      for (const key of Object.keys(data)) {
         formData.append(key, data[key]);
      }

      const headers = new HttpHeaders({
         "Content-Type": "application/x-www-form-urlencoded",
      });

      return this.http.post(this._apiUrl + url, formData, { headers });
   }

   public get<T>(url: string): Observable<T> {
    return this.http.get<T>(this._apiUrl + url);
   }


  }
