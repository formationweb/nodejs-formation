import { DataTypes } from "sequelize";
import { db } from "../../db";
import { User } from "./users.model";

export const Follow = db.define('Follow', {
    dateCreated: {
        type: DataTypes.DATE
    }
})

Follow.belongsTo(User, {
    foreignKey: 'followerId',
    as: 'follower'
})

Follow.belongsTo(User, {
    foreignKey: 'followeeId',
    as: 'followee'
})