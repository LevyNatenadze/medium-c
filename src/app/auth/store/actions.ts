import { createActionGroup, props } from "@ngrx/store";
import { BackendErrorInterface } from "src/app/shared/types/backendError.interface";
import { CurrentUserInterface } from "src/app/shared/types/currentUser.interface";
import { RegisterRequestInterface } from "../types/registerRequest.interface";
import { LoginRequestInterface } from "../types/loginRequest.interface";


export const authActions = createActionGroup({
    source: 'auth',
    events: {
        Register: props<{request: RegisterRequestInterface}>(),
        'Register success': props<{currentUser: CurrentUserInterface}>(),
        'Register Failure': props<{errors: BackendErrorInterface}>(),

        Login: props<{request: LoginRequestInterface}>(),
        'Login success': props<{currentUser: CurrentUserInterface}>(),
        'Login Failure': props<{errors: BackendErrorInterface}>(),
    }

})