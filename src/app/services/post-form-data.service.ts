import { environment } from './../../environments/environment';
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
   providedIn: "any",
})
export class PostFormDataService {
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
}
