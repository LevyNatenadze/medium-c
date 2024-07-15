import { HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { LocalStorageService } from "./localStorage.service";


export const AuthInterceptor: HttpInterceptorFn = (request, next) => {
    const localStorageService = inject(LocalStorageService);
    const token = localStorageService.get('accessToken');

    request = request.clone({
        setHeaders: {
            Authorization: token ? `Token ${token}` : ''
        }
    });

    return next(request);
}