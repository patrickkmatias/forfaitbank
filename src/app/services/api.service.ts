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
   public postFormData<T>(url: string, data: any): Observable<T> {
      const formData = this.setupFormData(data);

      const headers = new HttpHeaders({
         "Content-Type": "application/x-www-form-urlencoded",
      });

      return this.http.post<T>(this._apiUrl + url, formData, { headers });
   }

   public post<T>(url: string, data: any): Observable<T> {
      return this.http.post<T>(this._apiUrl + url, data);
   }

   public get<T>(url: string): Observable<T> {
      return this.http.get<T>(this._apiUrl + url);
   }

   public patchFormData<T>(url: string, data: any): Observable<T> {
      const formData = this.setupFormData(data);

      const headers = new HttpHeaders({
         "Content-Type": "application/x-www-form-urlencoded",
      });

      return this.http.patch<T>(this._apiUrl + url, formData, { headers });
   }

   public delete(url: string) {
      return this.http.delete(this._apiUrl + url);
   }

   private setupFormData(data: any): URLSearchParams {
      const formData = new URLSearchParams();
      for (const key of Object.keys(data)) {
         formData.append(key, data[key]);
      }

      return formData
   }
}
