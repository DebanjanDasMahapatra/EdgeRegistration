export class Admin {
    password: string;
	emaill: string;
    name: string;

    constructor (password: string, emaill: string, name: string) {
        this.password = password;
        this.emaill = emaill;
        this.name = name;
    }
}