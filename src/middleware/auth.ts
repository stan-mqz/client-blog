import { redirect, type MiddlewareFunction } from "react-router-dom";
import { me } from "../services/AuthService";
import { useBlogStore } from "../store/store";

export const protectedMiddleware : MiddlewareFunction = async () => {
    
    const user = await me()

    if (!user) {
        throw redirect('/auth/login')
    }

    // context.set(UserContext, user)

}

export const authMiddleware : MiddlewareFunction = () => {
    
    const {isAuthenticated} = useBlogStore.getState()
//    const user = await me()

    if (isAuthenticated) {
        throw redirect('/home')
    }


}
