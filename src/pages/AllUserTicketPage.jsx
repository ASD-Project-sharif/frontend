import { Table, Tag, message, theme } from "antd";
import { Header } from "antd/es/layout/layout"
import { useNavigate } from "react-router-dom";
import { formatDate, sliceText } from "../helper/strings";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../App";
import config from "../config/config";
import axios from "axios";

const AllUserTicketPage = () => {
    const { state } = useContext(AuthContext);
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    const [messageApi, contextHolder] = message.useMessage();
    const navigate = useNavigate();

    const pageSize = 20;
    const [tickets, setTickets] = useState([]);

    const [page, setPage] = useState(1);
    const [totalCount, setTotalCount] = useState();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        (async () => {
            try {
                setLoading(true);
                const data = {
                    sort: {
                        sortBy: "created_at",
                        sortOrder: "DESC"
                    },
                    pageSize: pageSize,
                    pageNumber: page,
                }
                const headers = { "x-access-token": state.token }
                const response = await axios.get(
                    `${config.baseUrl}/api/v1/ticket/user/`,
                    { headers: headers, params: data },
                    data
                );
                setLoading(false);
                setTotalCount(response.data.count);
                setTickets(response.data.tickets);
            } catch (error) {
                setLoading(false);
                errorMessage(error);
            }
        })();

    }, [page, state]);

    const errorMessage = (error) => {
        messageApi.open({
            type: "error",
            content: error.response.data.message,
        });
    };

    const columns = [
        {
            title: 'کاربر',
            dataIndex: 'created_by',
            render: (value) => value?.username
        },
        {
            title: 'وضعیت',
            dataIndex: 'status',
            render: (value) => {
                if (value === "closed") {
                    return <Tag color="#87d068">بسته شده</Tag>
                } else if (value === "in_progress") {
                    return <Tag color="#2db7f5">در جریان</Tag>
                } else if (value === "waiting_for_admin") {
                    return <Tag color="#f50">منتظر ادمین</Tag>
                }
            }
        },
        {
            title: 'پیام',
            dataIndex: 'description',
            render: (value) => sliceText(value),
        },
        {
            title: 'تاریخ ارسال',
            dataIndex: 'created_at',
            render: (value) => formatDate(value),
        },
    ];

    return (
        <div>
            {contextHolder}
            <Header style={{ background: colorBgContainer }} className="panel-header">
                <h3>
                    همه تیکت‌ها
                </h3>
            </Header>

            <Table
                onRow={(record) => {
                    return {
                        onClick: () => {
                            navigate(`ticket/${record._id}`)
                        },
                    };
                }}
                size="small"
                rowKey="id"
                loading={loading}
                columns={columns}
                dataSource={tickets}
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

export default AllUserTicketPage;