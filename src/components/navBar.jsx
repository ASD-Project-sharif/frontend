import { Row, Col, Button } from "antd";
import logo from "../assets/logo.svg";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
    let navigate = useNavigate();

    const clickButton = () => {
        navigate("/login");
    };

    return (

        <Row align="middle" className="site-navbar">
            <Col span={6}></Col>
            <Col span={12} className="nav-item">
                <Link to="/">
                    {/* <img className="logo" src={logo} width={50} height={50} alt="logo" /> */}
                    تیکت آنلاین
                </Link>
            </Col>
            <Col span={6}>
                <Button type="primary" onClick={clickButton}>
                    ورود
                </Button>
            </Col>
        </Row>
    )
}

export default NavBar;