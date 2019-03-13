export class User {
    name: string;
    college: string;
    stream: string;
    contact: number;

    constructor (name: string,
        college: string,
        stream: string,
        contact: number) {
        this.name = name;
        this.college = college;
        this.stream = stream;
        this.contact = contact;
    }
}