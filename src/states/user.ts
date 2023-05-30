import { UserType } from "../models/user";

/**
 * 不引入 pinia、vuex 的情况下缓存用户登录状态
 */
let currentUser: UserType

const setCurrentUserState = (user: UserType) => {
  currentUser = user
}

const getCurrentUserState = (): UserType => {
  return currentUser
}

export {
  setCurrentUserState,
  getCurrentUserState
}