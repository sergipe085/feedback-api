import { useAdmin } from "./useAdmin";
import { useAuth } from "./useAuth";

const middlewares = {
    useAuth: useAuth,
    useAdmin: useAdmin
}

export default middlewares;