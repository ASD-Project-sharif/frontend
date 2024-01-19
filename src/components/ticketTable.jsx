import { Table, Tag } from "antd";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import { useContext, useEffect, useState } from "react";
import config from "../config/config";
import axios from "axios";
import { AuthContext } from "../App";
import { formatDate, sliceText } from "../helper/strings";

const TicketTable = ({ filter, deadlineStatus }) => {
    const { state } = useContext(AuthContext);
    const [messageApi, contextHolder] = message.useMessage();

    const pageSize = 20;
    const [sortOrder, setSortOrder] = useState("DESC");
    const [sortBy, setSortBy] = useState("created_at")
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
                    filter: filter,
                    sort: {
                        sortBy: sortBy,
                        sortOrder: sortOrder
                    },
                    pageSize: pageSize,
                    pageNumber: page,
                    deadlineStatus: deadlineStatus

                }
                const headers = { "x-access-token": state.token }
                const response = await axios.get(
                    `${config.baseUrl}/api/v1/ticket/organization/${state.id}`,
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

    }, [filter, sortOrder, sortBy, page, state]);

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
            // sorter: (a, b, sortOrder) => {
            //     sorter('name', sortOrder);
            // },
            render: (value) => value
        },
        {
            title: 'وضعیت',
            dataIndex: 'status',
            // sorter: (a, b, sortOrder) => {
            //     sorter('status', sortOrder);
            // },
            render: (value) => value,
        },
        {
            title: 'وضعیت ددلاین',
            dataIndex: 'deadlineStatus',
            render: (value) => {
                if (value === "near") {
                    return <Tag color="warning">نزدیک به ددلاین</Tag>
                } else if (value === "passed") {
                    return <Tag color="error">ددلاین رد شده</Tag>
                } else {
                    return <Tag color="success">خبری نیس</Tag>
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
            sorter: (a, b, sortOrder) => {
                sorter('created_at', sortOrder);
            },
            render: (value) => formatDate(value),
        },
    ];
    const navigate = useNavigate();

    function sorter(sortBy, sortOrder) {
        sortOrder = sortOrder === 'descend' ? 'DESC' : 'ASC';

        setSortOrder(sortOrder);
        setSortBy(sortBy);
    }

    return (
        <>
            {contextHolder}
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
        </>

    )
}

export default TicketTable;