export class User {
    constructor(
        public id: UserId,
        public name: string,
        public email: string,
        public password: string,
    ) { }
}

export type UserId = string;
