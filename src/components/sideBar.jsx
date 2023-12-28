import { Layout } from "antd";
import MenuCreator from "./menuCreator";

const Sidebar = () => {
    return (
        <>
            <Layout.Sider
                className="sidebar"
                trigger={null}
                theme="light"
            >
                <MenuCreator />
            </Layout.Sider>
        </>
    )
}

export default Sidebar;