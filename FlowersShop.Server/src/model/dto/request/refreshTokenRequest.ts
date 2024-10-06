export interface RefreshTokenRequest {
    user_id: string;
    value: string;
    expiryDate: Date;
}