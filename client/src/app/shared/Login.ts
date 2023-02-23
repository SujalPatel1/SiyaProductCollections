export class LoginRequest {
    username!: string;
    password!: string;
}

export class LoginResponse {
    token!: string;
    expiration!: Date;
    isAuthSuccessful!: boolean;
    errorMessage!: string;
}