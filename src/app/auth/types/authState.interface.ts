import { BackendErrorInterface } from "src/app/shared/types/backendError.interface";
import { CurrentUserInterface } from "src/app/shared/types/currentUser.interface";

export interface AuthStateInterface {
    isSubmitting: boolean;
    isLoading: boolean;
    currentUser: CurrentUserInterface | null | undefined;
    validationErrors: BackendErrorInterface | null;
}