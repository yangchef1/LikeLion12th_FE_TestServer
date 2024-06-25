export class LoginRequest {

    constructor(id: string, pw: string){
        this.id = id;
        this.pw = pw;
    }

    id : string

    pw : string
}
