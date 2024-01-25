import { Menu } from "antd";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { LogoutOutlined } from '@ant-design/icons';
import { useContext } from "react";
import { AuthContext } from "../App";

const MenuCreator = () => {
    const location = useLocation();
    let navigate = useNavigate();
    const { state, dispatch } = useContext(AuthContext);

    const logout = () => {
        if (state.isAuthenticated) {
            dispatch({
                type: "LOGOUT",
            });
            navigate("/login")
        }
    }

    const orgnaizationMenu = (
        <>
            <Menu.SubMenu title="تیکت‌ها" key="/user">
                <Menu.Item
                    key="/user"
                    icon=""
                >
                    <Link to="/user">همه تیکت‌ها</Link>

                </Menu.Item>

                <Menu.Item
                    key="/user/nearDeadline"
                    icon=""
                >
                    <Link to="/user/nearDeadline">ددلاین نزدیک</Link>

                </Menu.Item>

                <Menu.Item
                    key="/user/passedDeadline"
                    icon=""
                >
                    <Link to="/user/passedDeadline">ددلاین رد شده</Link>

                </Menu.Item>

            </Menu.SubMenu>

            <Menu.Item
                key="/user/products"
                icon=""
            >
                <Link to="/user/products">محصولات</Link>

            </Menu.Item>

            <Menu.Item
                key="/user/agents"
                icon=""
            >
                <Link to="/user/agents">ایجنت‌ها</Link>

            </Menu.Item>

            <Menu.Item
                key="exit"
                onClick={logout}
                icon={<LogoutOutlined />}
            >
                خروج
            </Menu.Item>
        </>
    )

    const userMenu = (
        <>
            <Menu.Item
                key="/user"
                icon=""
            >
                <Link to="/user">همه تیکت‌ها</Link>

            </Menu.Item>
            <Menu.Item
                key="exit"
                onClick={logout}
                icon={<LogoutOutlined />}
            >
                خروج
            </Menu.Item>
        </>
    )

    return (
        <Menu selectedKeys={[location.pathname]} mode="inline" defaultOpenKeys={[location.pathname]}>
            {state.role === "ROLE_USER" ? userMenu : orgnaizationMenu}

        </Menu>
    )
}

export default MenuCreator;