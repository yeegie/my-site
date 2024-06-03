export interface IUser {
    id: number
    username: string
    email: string
    hashed_password: string
    type: string
    refresh_token: string
}