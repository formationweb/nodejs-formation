import { DataTypes } from "sequelize";
import { db } from "../../db";
import { User } from "../users/users.model";

export enum PostStatus {
    Draft = 'draft',
    Pending = 'pending',
    Published = 'published'
}

export const Post = db.define('Post', {
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    content: {
        type: DataTypes.STRING,
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM(PostStatus.Draft, PostStatus.Pending, PostStatus.Published)
    }
})

Post.belongsTo(User, {
    foreignKey: 'userId',
    as: 'user'
})

User.hasMany(Post, {
    foreignKey: 'userId',
    as: 'user',
    foreignKeyConstraint: true
})