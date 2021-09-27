import { Token } from "./token";

export interface AuthenticationResponse {
    accessToken: Token;
    refreshToken: Token;
}
