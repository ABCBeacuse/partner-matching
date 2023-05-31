import {UserType} from "./user";

export type TeamType = {
    id: number,
    name: string,
    userId: number,
    description?: string,
    maxNum: number,
    expireTime?: Date,
    password?: string,
    //todo 定义枚举值，更加规范
    status?: number,
    createTime?: Date,
    hasJoin: boolean,
    joinNum?: number,
    createUser?: UserType
}