import { AuthenticationService } from "src/app/services/authentication.service";
import { Injectable } from "@angular/core";
import {
   HttpRequest,
   HttpHandler,
   HttpEvent,
   HttpInterceptor,
} from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {
   constructor(private authService: AuthenticationService) {}

   intercept(
      request: HttpRequest<unknown>,
      next: HttpHandler
   ): Observable<HttpEvent<unknown>> {
      const accessToken = this.authService.getSession();

      if (accessToken) {
         const authRequest = request.clone({
            headers: request.headers.set(
               "Authorization",
               "Bearer " + accessToken
            ),
         });
         return next.handle(authRequest);
      }

      return next.handle(request);
   }
}
