import { createContext } from "react-router-dom";
import type { AuthUser } from "./types/userTypes";


export const UserContext = createContext<AuthUser | null>(null)