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

    const pageSize = 10;
    const [sortOrder, setSortOrder] = useState("DESC");
    const [sortBy, setSortBy] = useState("updated_at")
    const [tickets, setTickets] = useState([]);

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
                    `${config.baseUrl}/api/v1/ticket/organization/`,
                    { headers: headers, params: data },
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
            dataIndex: 'created_by',
            render: (value) => value?.username
        },
        {
            title: 'عنوان',
            dataIndex: 'title',
            render: (value) => sliceText(value, 15),
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
            title: 'مسئول',
            dataIndex: 'assignee',
            render: (value) => value.username,
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
                            navigate(`/user/ticket/${record._id}`)
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