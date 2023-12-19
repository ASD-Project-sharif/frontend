import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/navBar";
import header from "../assets/bg.jpg";
import { useContext } from "react";
import { AuthContext } from "../App";

const MainPage = () => {
    let navigate = useNavigate();
    const { state } = useContext(AuthContext);

    const clickButton = () => {
        if (state.isAuthenticated) {
            navigate("/user");
        } else {
            navigate("/login");
        }
    };

    return (
        <div>
            <div>
                <div className="site-header-bg"></div>
                <NavBar />
            </div>
            <div className="header-wrapper">
                <img src={header} height={600} alt="header" className="header-image" />
                <div className="backdropmask"></div>
            </div>

            <div className="header-content">
                <div className="header-text">
                    <h1>پشتیبانی آنلاین مشتریان</h1>
                    <h1>برای کسب و کار خود به پشتیبانی مشتریان نیاز دارید؟</h1>
                    <Button type="primary" size="large" onClick={clickButton}>
                        شروع کنید
                    </Button>
                </div>
            </div>

        </div>
    )
}

export default MainPage;