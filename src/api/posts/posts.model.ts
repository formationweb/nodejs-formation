import { DataTypes } from "sequelize";
import { db } from "../../db";
import { User } from "../users/users.model";

export const Post = db.define('Post', {
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    content: {
        type: DataTypes.STRING,
        allowNull: false
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