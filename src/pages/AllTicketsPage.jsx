
// import { PageHeader } from 'antd';

import { Table, message, theme } from "antd";
import { Header } from "antd/es/layout/layout";
import { limit } from 'stringz';
import dayjs from 'dayjs';
import Filter from "../components/filter";
import { useContext, useEffect, useState } from "react";
import config from "../config/config";
import axios from "axios";
import { AuthContext } from "../App";
import { useNavigate } from "react-router-dom";

const persianNumbers = ['۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹', '۰'];
const englishNumbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];

function toPersianNumbers(value) {
    if (value === 0) {
        return persianNumbers[9];
    }
    if (!value) {
        return;
    }
    value = value.toString();

    for (var i = 0, numbersLen = englishNumbers.length; i < numbersLen; i++) {
        value = value.replace(
            new RegExp(englishNumbers[i], 'g'),
            persianNumbers[i],
        );
    }

    return value;
}

function formatDate(date) {
    return toPersianNumbers(dayjs(date).format('YYYY/MM/DD h:mm'));
}

const AllTicketsPage = () => {
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    const { state } = useContext(AuthContext);
    const [messageApi, contextHolder] = message.useMessage();
    const navigate = useNavigate()

    const pageSize = 20;

    const [filter, setFilter] = useState({});
    const [sortOrder, setSortOrder] = useState("DESC");
    const [sortBy, setSortBy] = useState("created_at")
    const [tickets, setTickets] = useState([{
        "user": "ali",
        "message": "الگویی است که از آن برای تسهیل ارتباط و هماهنگی بین اجزای یک سیستم توزیع شده استفاده می‌شود. در این الگو یک موجودیت مرکزی به نام broker وظیفه ارتباط بین اجزا را برعهده دارد که این امر به decoupling کمک می‌کند.",
        "created_at": 1703613489000,
        "status": "open"
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
                    pageNumber: page

                }
                const headers = { "x-access-token": state.token }
                const response = await axios.get(
                    `${config.baseUrl}/api/v1/ticket/organization/${state.id}`,
                    { headers: headers, params: data },
                    data
                );
                setLoading(false)
                setTotalCount(response.data.count);
                setTickets(response.data.tickets);
            } catch (error) {
                setLoading(false)
                errorMessage(error)
            }
        })();

    }, [filter, sortOrder, sortBy, page]);

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

    function sorter(sortBy, sortOrder) {
        sortOrder = sortOrder === 'descend' ? 'DESC' : 'ASC';

        setSortOrder(sortOrder);
        setSortBy(sortBy);
    }

    function sliceText(value, n = 75) {
        if (!value) {
            return value;
        }

        const sliced = limit(value, n, '');
        if (sliced.length === value.length) {
            return sliced;
        }

        return sliced + '...';
    }

    return (
        <div>
            {contextHolder}
            <Header style={{ padding: "0px 30px", background: colorBgContainer, borderRadius: 15 }}>
                <span>
                    همه تیکت‌ها
                </span>
                <Filter setFilterValues={setFilter} />
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

export default AllTicketsPage;