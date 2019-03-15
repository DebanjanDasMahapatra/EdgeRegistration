export class User {
    name: string;
    college: string;
    stream: string;
    contact: number;
    events: {flawless: boolean, bughunt: boolean, cryptoquest: boolean, webdesign: boolean};

    constructor (name: string,
        college: string,
        stream: string,
        contact: number,
        event: {flawless: boolean, bughunt: boolean, cryptoquest: boolean, webdesign: boolean}) {
        this.name = name;
        this.college = college;
        this.stream = stream;
        this.contact = contact;
        this.events = event;
    }
}