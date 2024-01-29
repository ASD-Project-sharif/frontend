import { Table, message, theme } from "antd";
import { Header } from "antd/es/layout/layout";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AgentCreator from "../components/agentCreator";
import { AuthContext } from "../App";
import axios from "axios";
import config from "../config/config";

const AgentsPage = () => {
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    const { state } = useContext(AuthContext);
    const [messageApi, contextHolder] = message.useMessage();
    const navigate = useNavigate();

    const pageSize = 20;
    const [page, setPage] = useState(1);
    const [totalCount, setTotalCount] = useState();
    const [loading, setLoading] = useState(false);
    const [agents, setAgents] = useState([]);

    const getAgents = async () => {
        try {
            setLoading(true);
            const data = {
                pageSize: pageSize,
                pageNumber: page,

            }
            const headers = { "x-access-token": state.token }
            const response = await axios.get(
                `${config.baseUrl}/api/v1/agent`,
                { headers: headers, params: data },
            );
            setLoading(false);
            setTotalCount(response.data.count);
            setAgents(response.data.agents);
        } catch (error) {
            setLoading(false);
            errorMessage(error);
        }
    }

    const errorMessage = (error) => {
        messageApi.open({
            type: "error",
            content: error.response.data.message,
        });
    };

    const columns = [
        {
            title: 'نام کاربری',
            dataIndex: 'username',
            render: (value) => value
        },
        {
            title: 'اسم',
            dataIndex: 'name',
            render: (value) => value,
        },
    ];

    useEffect(() => {
        getAgents();
    }, []);

    return (
        <div>
            {contextHolder}
            <Header style={{ background: colorBgContainer }} className="panel-header">
                <span>
                    ایجنت‌ها
                </span>
                <AgentCreator getAgents={getAgents} />
            </Header>
            <Table
                size="small"
                rowKey="id"
                loading={loading}
                columns={columns}
                dataSource={agents}
                pagination={{
                    pageSize,
                    total: totalCount,
                    onChange: (page, pageSize) => {
                        setPage(page);
                    },
                }}
            />
        </div>

    )
}

export default AgentsPage;