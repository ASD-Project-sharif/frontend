import { Button } from "antd";
import { useNavigate } from "react-router-dom";


const MainPage = () => {
    let navigate = useNavigate();

    const clickButton = () => {
        navigate("/login");
    };

    return (
        <div>
            <Button type="primary" onClick={clickButton}>
                ورود
            </Button>
        </div>
    )
}

export default MainPage;