export class Flawless {
    name: string;
    password: string;
    members: {mem1: string, mem2: string, mem3: string};

    constructor (name: string,
        password: string,
        members: {mem1: string, mem2: string, mem3: string}) {
        this.name = name;
        this.password = password;
        this.members = members;
    }
}