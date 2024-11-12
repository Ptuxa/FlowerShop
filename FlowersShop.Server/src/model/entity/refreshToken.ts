export interface RefreshToken {
    id: string;
    value: string;
    expirationTimestamp: number;
    userId: string;
}