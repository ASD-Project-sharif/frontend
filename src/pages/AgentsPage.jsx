import { Table, message, theme } from "antd";
import { Header } from "antd/es/layout/layout";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AgentsPage = () => {
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    const [messageApi, contextHolder] = message.useMessage();
    const navigate = useNavigate();

    const pageSize = 20;
    const [page, setPage] = useState(1);
    const [totalCount, setTotalCount] = useState();
    const [loading, setLoading] = useState(false);
    const [agents, setAgents] = useState();

    const columns = [
        {
            title: 'کاربر',
            dataIndex: 'username',
            render: (value) => value
        },
        {
            title: 'اسم',
            dataIndex: 'name',
            render: (value) => value,
        },
        // {
        //     title: 'وضعیت ددلاین',
        //     dataIndex: 'deadlineStatus',
        //     render: (value) => {
        //         if (value === "near") {
        //             return <Tag color="warning">نزدیک به ددلاین</Tag>
        //         } else if (value === "passed") {
        //             return <Tag color="error">ددلاین رد شده</Tag>
        //         } else {
        //             return <Tag color="success">خبری نیس</Tag>
        //         }

        //     }
        // },
    ];

    return (
        <div>
            {contextHolder}
            <Header style={{ background: colorBgContainer }} className="panel-header">
                <span>
                    ایجنت‌ها
                </span>
            </Header>


            <Table
                onRow={(record) => {
                    return {
                        onClick: () => {
                            navigate(`/agnet/${record.id}`)
                        },
                    };
                }}
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