import { generateToken } from "../../helpers/generateToken";
import { checkExits, register } from "../../services/usersService";
import { useNavigate } from "react-router-dom";
import './register.css'; // Sử dụng file CSS riêng biệt cho trang đăng ký

function Register() {
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const fullName = e.target[0].value;
        const email = e.target[1].value;
        const password = e.target[2].value;

        const checkExistEmail = await checkExits("email", email);

        if(checkExistEmail.length > 0) {
            alert("Email đã tồn tại: ");
        }else{
            const options = {
                fullName: fullName,
                email: email,
                password: password,
                token: generateToken(),
            };

            const response = await register(options);
            console.log('API response:', response);  // Kiểm tra phản hồi từ API
            
            if(response) {
                console.log(response);
                navigate("/login");
            } else {
                alert("Đăng ký thất bại");
            }
        }
    };

    return(
        <div className="register-container">
            <form onSubmit={handleSubmit} className="register-form">
                <h2>SignUp</h2>
                <div className="input-groupr">
                    <input type="text" placeholder="Nhập họ và tên" required/>
                </div>
                <div className="input-groupr">
                    <input type="email" placeholder="Nhập email" required/>
                </div>
                <div className="input-groupr">
                    <input type="password" placeholder="Nhập mật khẩu" required/>
                </div>
                <button type="submit" className="register-button">Đăng ký</button>
            </form>
        </div>
    )
}
export default Register;