import { HttpEvent, HttpHandler, HttpHandlerFn, HttpHeaders, HttpRequest, type HttpInterceptorFn } from '@angular/common/http';
import { Observable } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next:HttpHandlerFn): Observable<HttpEvent<any>> => {
  const token = localStorage.getItem('access_token'); 

  if (token) {
    const cloned = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
    return next(cloned);
  }
  console.warn('Solicitud sin token:', req);
  return next(req);

};
