export class User {
    name: string;
    rcid: string;
    college: string;
    stream: string;
    contact: number;
	emaill: string;
	year: string;
    events: {flawless: boolean, bughunt: boolean, cryptoquest: boolean, webdesign: boolean};

    constructor (name: string,
        rcid: string,
        college: string,
        stream: string,
        contact: number,
		emaill: string,
		year: string,
        event: {flawless: boolean, bughunt: boolean, cryptoquest: boolean, webdesign: boolean}) {
        this.name = name;
        this.rcid = rcid;
        this.college = college;
        this.stream = stream;
        this.contact = contact;
        this.events = event;
        this.emaill = emaill;
        this.year = year;
    }
}