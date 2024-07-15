import { inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { AuthService } from "../services/auth.service";
import { authActions } from "./actions";
import { catchError, map, of, switchMap, tap } from "rxjs";
import { CurrentUserInterface } from "src/app/shared/types/currentUser.interface";
import { HttpErrorResponse } from "@angular/common/http";
import { LocalStorageService } from "src/app/shared/services/localStorage.service";
import { Router } from "@angular/router";


export const registerEffects = createEffect(
    (
        actions$ = inject(Actions), 
        authService = inject(AuthService),
        localStorageService = inject(LocalStorageService)
    ) => {
    return actions$.pipe(
        ofType(authActions.register),
        switchMap(({request}) => {
            return authService.register(request).pipe(
                map((currentUser: CurrentUserInterface) => {
                    localStorageService.set('accessToken', currentUser.token)
                    return authActions.registerSuccess({currentUser});
                }),
                catchError((errorResponse: HttpErrorResponse) => {
                   return of(authActions.registerFailure({
                    errors: errorResponse.error.errors
                   }))
                })
            )
        })
    )
}, {functional: true});

export const getCurrentUserEffects = createEffect(
    (
        actions$ = inject(Actions), 
        authService = inject(AuthService),
        localStorageService = inject(LocalStorageService)
    ) => {
    return actions$.pipe(
        ofType(authActions.getCurrentUser),
        switchMap(() => {
            const token = localStorageService.get('accessToken');
            if(!token) {
                return of(authActions.getCurrentUserFailure());
            }
            return authService.getCurrentUser().pipe(
                map((currentUser: CurrentUserInterface) => {
                    return authActions.getCurrentUserSuccess({currentUser});
                }),
                catchError(() => {
                   return of(authActions.getCurrentUserFailure())
                })
            )
        })
    )
}, {functional: true});


export const redirectAfterRegister = createEffect(
    (actions$ = inject(Actions), router = inject(Router)) => {
        return actions$.pipe(
            ofType(authActions.registerSuccess),
            tap(_ => {
              router.navigateByUrl('/');
            })
        )
    }, {functional: true, dispatch: false}
)

export const loginEffects = createEffect(
    (
        actions$ = inject(Actions), 
        authService = inject(AuthService),
        localStorageService = inject(LocalStorageService)
    ) => {
    return actions$.pipe(
        ofType(authActions.login),
        switchMap(({request}) => {
            return authService.login(request).pipe(
                map((currentUser: CurrentUserInterface) => {
                    localStorageService.set('accessToken', currentUser.token)
                    return authActions.loginSuccess({currentUser});
                }),
                catchError((errorResponse: HttpErrorResponse) => {
                   return of(authActions.loginFailure({
                    errors: errorResponse.error.errors
                   }))
                })
            )
        })
    )
}, {functional: true});


export const redirectAfterLogin = createEffect(
    (actions$ = inject(Actions), router = inject(Router)) => {
        return actions$.pipe(
            ofType(authActions.loginSuccess),
            tap(_ => {
              router.navigateByUrl('/');
            })
        )
    }, {functional: true, dispatch: false}
)