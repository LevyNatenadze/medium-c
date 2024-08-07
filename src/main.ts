import {bootstrapApplication} from "@angular/platform-browser";
import {AppComponent} from "./app/app.component";
import { provideRouter } from "@angular/router";
import { appRoutes } from "./app/app.routes";
import { provideState, provideStore } from "@ngrx/store";
import { provideStoreDevtools } from "@ngrx/store-devtools";
import { isDevMode } from "@angular/core";
import { authFeature, authReducer } from "./app/auth/store/reducer";
import {provideHttpClient, withInterceptors} from '@angular/common/http';
import { provideEffects } from "@ngrx/effects";
import * as authEffects from './app/auth/store/effects';
import { provideRouterStore, routerReducer } from "@ngrx/router-store";
import { AuthInterceptor } from "./app/shared/services/authInterceptor";

bootstrapApplication(AppComponent, {
    providers: [
        provideHttpClient(
            withInterceptors([AuthInterceptor])
        ),
        provideRouter(appRoutes), 
        provideStore({
            router: routerReducer
        }),
        provideRouterStore(),
        provideStoreDevtools({
            maxAge: 25,
            logOnly: isDevMode(),
            autoPause: true,
            trace: false,
            traceLimit: 75
        }),
        provideEffects(authEffects),
        provideState(authFeature, authReducer)
    ]
});
