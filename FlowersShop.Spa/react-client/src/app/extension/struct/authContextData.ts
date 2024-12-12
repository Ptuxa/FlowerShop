export interface AuthContextData {
    isAuthorized: boolean;
    setIsAuthorized: (isAuthorized: boolean) => void;
}