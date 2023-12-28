import { useContext } from "react";
import { AuthContext } from "../App";
import { Layout } from "antd";
import Sidebar from "../components/sideBar";
import { Outlet } from "react-router-dom";

const UserPage = () => {
    const { state } = useContext(AuthContext);
    return (
        <div>
            <Layout className="layout">
                <Sidebar />
                <Layout>
                    <Layout.Content style={{ margin: '16px' }}>
                        {state.name}
                        <Outlet />
                    </Layout.Content>

                </Layout>
            </Layout>
        </div>
    )
}

export default UserPage;