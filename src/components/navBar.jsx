import { Row, Col, Button } from "antd";
import { useContext } from "react";
// import logo from "../assets/logo.svg";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../App";

const NavBar = () => {
    let navigate = useNavigate();
    const { state, dispatch } = useContext(AuthContext);

    const clickButton = () => {
        if (state.isAuthenticated) {
            navigate("/user");
        } else {
            navigate("/login");
        }
    };

    const logout = () => {
        if (state.isAuthenticated) {
            dispatch({
                type: "LOGOUT",
            });
            navigate("/login")
        }
    }

    return (

        <Row align="middle" className="site-navbar">
            <Col span={6}></Col>
            <Col span={12} className="nav-item">
                <Link to="/">
                    تیکت آنلاین
                    {/* <img className="logo" src={logo} width={100} height={100} alt="logo" /> */}
                </Link>
                {/* <div>
                    تماس با ما
                </div> */}
            </Col>
            <Col span={6}>
                <Button type="primary" onClick={clickButton}>
                    {state.isAuthenticated ? "صفحه کاربری" : "ورود"}
                </Button>
                {state.isAuthenticated ? (
                    <Button type="primary" onClick={logout} className="logout-button">
                        خروج
                    </Button>
                ) : ""}
            </Col>
        </Row>
    )
}

export default NavBar;