import { HttpErrorResponse, HttpInterceptorFn, HttpRequest, HttpHandlerFn, HttpEvent } from "@angular/common/http";
import { inject } from "@angular/core";
import { AuthService } from "../services/auth.service";
import {
  catchError,
  switchMap,
  throwError,
  BehaviorSubject,
  filter,
  take,
  Observable,
} from "rxjs";

let isRefreshing = false;
let refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token = authService.getToken();

  let authReq = req;
  if (token) {
    authReq = req.clone({
      headers: req.headers.set("Authorization", `Bearer ${token}`),
    });
  }

  return next(authReq).pipe(
    catchError((error) => {
      if (
        error instanceof HttpErrorResponse &&
        error.status === 401 &&
        !authReq.url.includes("/auth/login") &&
        !authReq.url.includes("/auth/refresh") &&
        !authReq.url.includes("/auth/logout")
      ) {
        return handle401Error(authReq, next, authService);
      }
      
      // If it's a 401 and we are not handling it (e.g., login or refresh failed), force logout
      if (error instanceof HttpErrorResponse && error.status === 401) {
         authService.forceLogout();
      }

      return throwError(() => error);
    }),
  );
};

function handle401Error(
  request: HttpRequest<unknown>,
  next: HttpHandlerFn,
  authService: AuthService
): Observable<HttpEvent<unknown>> {
  if (!isRefreshing) {
    isRefreshing = true;
    refreshTokenSubject.next(null);

    return authService.refreshToken().pipe(
      switchMap((tokenResponse: any) => {
        isRefreshing = false;
        refreshTokenSubject.next(tokenResponse.accessToken);
        return next(
          request.clone({
            headers: request.headers.set(
              "Authorization",
              `Bearer ${tokenResponse.accessToken}`,
            ),
          }),
        );
      }),
      catchError((err) => {
        isRefreshing = false;
        authService.logout();
        return throwError(() => err);
      }),
    );
  } else {
    return refreshTokenSubject.pipe(
      filter((token) => token != null),
      take(1),
      switchMap((jwt) => {
        return next(
          request.clone({
            headers: request.headers.set("Authorization", `Bearer ${jwt}`),
          }),
        );
      }),
    );
  }
}
