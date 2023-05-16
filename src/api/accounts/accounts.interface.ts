export interface IAccount {
    id: string;
    firstName: string;
    lastName: string;
    userName: string;
    email: string;
    role: Role;
    isVerified: boolean;
}

export enum Role {
    ADMIN = 'Admin',
    USER = 'User',
    VISITOR = 'Visitor',
}
