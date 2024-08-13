import { generateToken } from "../../helpers/generateToken";
import { checkExits, register } from "../../services/usersService";
import { useNavigate } from "react-router-dom";

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
        <>
            <form onSubmit={handleSubmit}>
                <h2>Register</h2>
                <div>
                    <input type="fullName" placeholder="Nhập họ và tên"/>
                </div>
                <div>
                    <input type="email" placeholder="Nhập email"/>
                </div>
                <div>
                    <input type="password" placeholder="Nhập mật khẩu"/>
                </div>
                <button type="submit">Đăng ký</button>
            </form>
        </>
    )
}
export default Register;