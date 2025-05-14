import { DataTypes } from "sequelize";
import { db } from "../../db";

export enum Role {
    Admin = 'admin',
    Author = 'author',
    Reader = 'reader'
}

// export type Role = 'admin' | 'author' | 'reader'

export const User = db.define('User', {
    name: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING
    },
    password: {
        type: DataTypes.STRING
    },
    role: {
        type: DataTypes.ENUM(Role.Admin, Role.Author, Role.Reader)
    }
})