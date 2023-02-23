export class RegisterRequest {
    firstName!: string;
    lastName!: string;
    email!: string;
    password!: string;
    confirmPassword!: string;
}

export class RegisterResponse {
    isSuccessfulRegistration!: boolean;
    errros!: string[];
}