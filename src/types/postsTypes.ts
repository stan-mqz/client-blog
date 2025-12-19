import {type  authUserData } from "./userTypes"

type UserPostData = Omit<authUserData, 'email'>

export type PostsData = {
    id_post : number,
    title: string,
    content: string,
    image: string,
    user: UserPostData
    likesCount : number,
    likedByUser : boolean
}