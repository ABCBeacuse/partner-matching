/**
 * 用户类别
 */
export type UserType = {
  id: number,
  username: string,
  userAccount: string,
  avatarUrl?: string,
  userProfile?: string,
  gender: string,
  phone: string,
  email: string,
  planetCode: string,
  tags?: string[]
}