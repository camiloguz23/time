export type Login = {
    email: string;
    password: string;
}

export type Register = {
    email: string;
    password: string;
}

export type StateInitTypeAuth = {
    status: boolean,
    message:{
        email:string;
        password:string;
        messageDB:string;
    }
    inputs: {
        email:string;
        password:string;
        confirmPassword:string;
    }
}