import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { AuthService } from './auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
    const authService = inject(AuthService);
    const token = authService.getAccessToken();

    let authReq = req;

    if (token && !req.url.includes('/auth/login')) {
        authReq = req.clone({
            setHeaders: { Authorization: `Bearer ${token}` }
        });
    }

    return next(authReq).pipe(
        catchError((error: HttpErrorResponse) => {
            // Logic to handle 401 Unauthorized for Token Refresh
            if (error.status === 401 && !req.url.includes('/auth/login')) {
                return authService.refreshToken().pipe(
                    switchMap((tokens) => {
                        // Retry the failed request with the new access token
                        const retriedReq = req.clone({
                            setHeaders: { Authorization: `Bearer ${tokens.accessToken}` }
                        });
                        return next(retriedReq);
                    }),
                    catchError((refreshErr) => {
                        // Refresh failed, logout
                        authService.logout();
                        return throwError(() => refreshErr);
                    })
                );
            }

            return throwError(() => error);
        })
    );
};
