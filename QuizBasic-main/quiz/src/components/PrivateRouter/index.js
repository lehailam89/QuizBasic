import { Outlet } from "react-router-dom";
import { Navigate } from "react-router-dom";

function PrivateRouter(){
    const isLogin = true;
    return(
        <>
            {isLogin ? (<Outlet />) : (<Navigate to="/login" />)}
        </>
    )
}
export default PrivateRouter;