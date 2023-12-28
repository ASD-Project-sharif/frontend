import { Menu } from "antd";
import { Link, useLocation } from "react-router-dom";
import { LogoutOutlined } from '@ant-design/icons';

const MenuCreator = () => {
    const location = useLocation();
    return (
        <Menu selectedKeys={[location.pathname]}>
            <Menu.Item
                key="all-tickets"
                icon=""
            >
                <Link to="/user">همه تیکت‌ها</Link>
            </Menu.Item>

            <Menu.Item
                key="exit"
                onClick={() => { }}
                icon={<LogoutOutlined />}
            >
                خروج
            </Menu.Item>
        </Menu>
    )
}

export default MenuCreator;