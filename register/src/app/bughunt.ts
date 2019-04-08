export class Bughunt {
    name: string;
    password: string;
    members: {mem1: string, mem2: string};

    constructor (name: string,
        password: string,
        members: {mem1: string, mem2: string}) {
        this.name = name;
        this.password = password;
        this.members = members;
    }
}