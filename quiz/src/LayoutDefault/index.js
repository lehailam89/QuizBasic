import "./LayoutDefault.scss";
import { NavLink, Outlet } from "react-router-dom";
import { getCookie } from "../helpers/cookie";
import { useSelector } from "react-redux";

function LayoutDefault() {
    const token = getCookie("token");
    const isLogin = useSelector(state => state.loginReducer);
    


    return(
        <>
            <div className="layout-default">
                <header className="layout-default__header">
                    <div className="layout-default__logo">FrontEnd Test</div>
                    <div className="menu">
                        <ul>
                            <li>
                                <NavLink to="/">Home</NavLink>
                            </li>
                            {token && (
                                <>
                                    <li>
                                        <NavLink to="/topics">Topic</NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/answers">Answers</NavLink>
                                    </li>    
                                </>
                            )}
                        </ul>
                    </div>
                    <div className="layout-default__account">
                        {token ? (<>
                            <NavLink to="/logout">Đăng xuất</NavLink>
                        </>) : (<>
                            <NavLink to="/login">Đăng nhập</NavLink>
                            <NavLink to="/register">Đăng ký</NavLink>
                        </>)}
                    </div>
                </header>
                <main className="layout-default__main">
                <Outlet/> 
                    {/* muốn components con hiển thị ở đâu của components cha thì ta sẽ thêm phần Outlet */}
                </main>
                <footer className="layout-default__footer">
                    copyright @2024 by LamFullStack
                </footer>
            </div>
        </>
    )
}
export default LayoutDefault;   