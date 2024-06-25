export class TokenResponse {

    constructor(accessToken: string, refreshToken: string){
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
    }

    accessToken : string

    refreshToken : string
}
