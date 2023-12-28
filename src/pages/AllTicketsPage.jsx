
// import { PageHeader } from 'antd';

import { Table, theme } from "antd";
import { Header } from "antd/es/layout/layout";
import { limit } from 'stringz';
import dayjs from 'dayjs';

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

    const tickets = [{
        "user": "ali",
        "message": "الگویی است که از آن برای تسهیل ارتباط و هماهنگی بین اجزای یک سیستم توزیع شده استفاده می‌شود. در این الگو یک موجودیت مرکزی به نام broker وظیفه ارتباط بین اجزا را برعهده دارد که این امر به decoupling کمک می‌کند.",
        "createdAt": 1703613489000
    }]

    const columns = [
        {
            title: 'کاربر',
            dataIndex: 'user',
            sorter: (a, b, sortOrder) => {
                sorter('name', sortOrder);
            },
            render: (value) => value
        },
        // {
        //     title: 'وضعیت',
        //     dataIndex: 'status',
        //     sorter: (a, b, sortOrder) => {
        //         sorter('status', sortOrder);
        //     },
        //     render: (value) => <FeedbackStatus status={value} />,
        // },
        {
            title: 'پیام',
            dataIndex: 'message',
            render: (value) => sliceText(value),
        },
        {
            title: 'تاریخ ارسال',
            dataIndex: 'createdAt',
            sorter: (a, b, sortOrder) => {
                sorter('createdAt', sortOrder);
            },
            render: (value) => formatDate(value),
        },
    ];

    function sorter(sortBy, sortOrder) {
        sortOrder = sortOrder === 'descend' ? 'desc' : 'asc';

        // dispatch(
        //   setFeedbacksSort({
        //     sortBy,
        //     sortOrder,
        //   }),
        // );
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
            <Header style={{ padding: "0px 30px", background: colorBgContainer, borderRadius: 15 }}>
                همه تیکت‌ها
            </Header>
            <Table
                // onRow={(record) => {
                //     return {
                //         onClick: () => {
                //             setSelected(record);
                //             setVisible(true);
                //         },
                //     };
                // }}
                size="small"
                rowKey="id"
                // loading={loading}
                columns={columns}
                dataSource={tickets}
            // pagination={{
            //     pageSize,
            //     total: count,
            //     onChange: (page, pageSize) => {
            //         dispatch(
            //             changeFeedbacksPagination({
            //                 page,
            //                 pageSize,
            //             }),
            //         );
            //     },
            // }}
            />
        </div>
    )
}

export default AllTicketsPage;