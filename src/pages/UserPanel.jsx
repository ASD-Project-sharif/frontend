import { Layout } from "antd";
import Sidebar from "../components/sideBar";
import { Outlet } from "react-router-dom";

const UserPanel = () => {
    return (
        <div>
            <Layout className="layout">
                <Sidebar />
                <Layout>
                    <Layout.Content style={{ margin: '16px' }}>
                        <Outlet />
                    </Layout.Content>

                </Layout>
            </Layout>
        </div>
    )
}

export default UserPanel;