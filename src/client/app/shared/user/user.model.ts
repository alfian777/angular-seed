export class User {
    public status : string;
    constructor(
        public name: string,
        public email: string,
        public joinDate : number,
        public statusNum : number,
        public id : string        
    ){
        switch(statusNum){
            case 0: this.status = "Not Activated"; break;
            case 1: this.status = "Activated"; break;
            case 2: this.status = "Disabled"; break;
            default : this.status = "Undefined, are you hacker?"; break;
        }
    }
}
