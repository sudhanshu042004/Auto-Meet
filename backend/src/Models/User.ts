// src/models/User.ts
export interface User {
    id?: string;
    name: string;
    email: string;
    password: string; // This would be hashed in production
    createdAt?: Date;
}