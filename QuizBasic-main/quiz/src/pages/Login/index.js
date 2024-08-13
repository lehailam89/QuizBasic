import { useNavigate } from "react-router-dom";
import { login } from "../../services/usersService";
import { setCookie } from "../../helpers/cookie";
import { useDispatch } from "react-redux";
import { checkLogin } from "../../actions/login";
import './login.css';

function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const email = e.target[0].value;
        const password = e.target[1].value;

        const response = await login(email, password);
        if(response.length > 0) {
            console.log(response);
            setCookie("id", response[0].id, 1);
            setCookie("fullName", response[0].fullName, 1);
            setCookie("email", response[0].email, 1);
            setCookie("token", response[0].token, 1);
            dispatch(checkLogin(true));
            navigate("/");
        } else {
            alert("Sai thông tin tài khoản hoặc mật khẩu");
        }
    }

    return(
        <div className="login-container">
            <form onSubmit={handleSubmit} className="login-form">
                <h2>Login</h2>
                <div className="input-group">
                    <input type="email" placeholder="Nhập email" required/>
                </div>
                <div className="input-group">
                    <input type="password" placeholder="Nhập mật khẩu" required/>
                </div>
                <button type="submit" className="login-button">Login</button>
            </form>
        </div>
    )
}
export default Login;