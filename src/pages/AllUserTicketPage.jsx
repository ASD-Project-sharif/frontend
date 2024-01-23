import { Table, message, theme } from "antd";
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
    const [tickets, setTickets] = useState([{
        "id": "123",
        "user": "ali",
        "description": "الگویی است که از آن برای تسهیل ارتباط و هماهنگی بین اجزای یک سیستم توزیع شده استفاده می‌شود. در این الگو یک موجودیت مرکزی به نام broker وظیفه ارتباط بین اجزا را برعهده دارد که این امر به decoupling کمک می‌کند.",
        "created_at": 1703613489000,
        "status": "open",
        "deadlineStatus": "near"
    },
    {
        "id": "123",
        "user": "ali",
        "description": "الگویی است که از آن برای تسهیل ارتباط و هماهنگی بین اجزای یک سیستم توزیع شده استفاده می‌شود. در این الگو یک موجودیت مرکزی به نام broker وظیفه ارتباط بین اجزا را برعهده دارد که این امر به decoupling کمک می‌کند.",
        "created_at": 1703613489000,
        "status": "open",
        "deadlineStatus": "passed"
    }]);

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
                    `${config.baseUrl}/api/v1/ticket/user/${state.id}`,
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
            dataIndex: 'user',
            render: (value) => value
        },
        {
            title: 'وضعیت',
            dataIndex: 'status',
            render: (value) => value,
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
                <span>
                    همه تیکت‌ها
                </span>
            </Header>

            <Table
                onRow={(record) => {
                    return {
                        onClick: () => {
                            navigate(`/ticket/${record.id}`)
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