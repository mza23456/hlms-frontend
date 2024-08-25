import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TextField from '@mui/material/TextField';
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import "../../css/Login.css/Login.css"; // Make sure this path is correct
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "../../img/ttblogo.png";
import bg from "../../img/blur-bank.jpg";

function Login() {
  const navigate = useNavigate();
  const MySwal = withReactContent(Swal);

  const [inputs, setInputs] = useState({ username: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInputs(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(inputs)
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();

      if (result.accessToken) {
        localStorage.setItem('user', JSON.stringify({
          username: result.username,
          role: result.role,
          img: result.img
        }));
        
        await MySwal.fire({
          html: 'เข้าสู่ระบบสำเร็จ',
          icon: "success",
          timer: 1500,
          timerProgressBar: true,
        });

        localStorage.setItem("token", result.accessToken);
        navigate("/dashboard");
      } else {
        await MySwal.fire({
          html: 'บัญชีผู้ใช้หรือรหัสผ่านไม่ถูกต้อง',
          icon: "error",
          timer: 1500,
          timerProgressBar: true,
        });
      }
    } catch (error) {
      setError(error.message);
      console.error('Error:', error);
      await MySwal.fire({
        html: 'เกิดข้อผิดพลาดในการเชื่อมต่อกับเซิร์ฟเวอร์',
        icon: "error",
        timer: 1500,
        timerProgressBar: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <header>
      <img src={bg} className="Login-bg" alt="Background" />
      <div className="text-center" id="container">
        <form onSubmit={handleSubmit} id="form-signin">
          <h1 className="h2 mb-3" id="header">ระบบบริหารจัดการข้อมูลการพิจารณาสินเชื่อบ้าน</h1>
          <div id="icon">
            <img src={logo} alt="Logo" />
          </div>
          <div className="form-group" id="textbox-user">
            <TextField
              type="text"
              id="inputUsername"
              className="form-control"
              label="บัญชีผู้ใช้"
              name="username"
              variant="outlined"
              value={inputs.username}
              onChange={handleChange}
              autoFocus
            />
          </div>
          <div className="form-group" id="textbox-password">
            <TextField
              type="password"
              id="inputPassword"
              className="form-control"
              label="รหัสผ่าน"
              name="password"
              value={inputs.password}
              onChange={handleChange}
            />
          </div>
          <div id="sub-btn">
            <div className="flex items-center" id="remember-btn">
              <input
                type="checkbox"
                className="form-check-input me-2 rounded-circle"
                id="remember-me"
                name="rememberMe"
              />
              <label
                htmlFor="remember-me"
                className="text-xs text-gray-500 ml-3"
                id="rememberLabel"
              >
                จดจำรหัสผ่าน
              </label>
            </div>
            <div id="forget-pass-btn">ลืมรหัสผ่าน</div>
          </div>
          <button id="login-btn" type="submit" disabled={loading}>
            {loading ? 'กำลังเข้าสู่ระบบ...' : 'เข้าสู่ระบบ'}
          </button>
          {error && <p className="error-message">{error}</p>}
        </form>
      </div>
    </header>
  );
}

export default Login;
