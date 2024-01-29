import { Table, Tag } from "antd";
import { formatDate } from "../helper/strings";

const TicketInfoTable = ({ticketInfo}) => {

    const columns = [
        {
            title: 'فرستنده',
            dataIndex: 'sender',
            key: 'sender',
        },
        {
            title: 'زمان ارسال',
            dataIndex: 'send_time',
            key: 'send_time',
        },
        {
            title: 'نوع تیکت',
            dataIndex: 'ticket_type',
            key: 'ticket_type',
            render: (value) => {
                if (value === "bug") {
                    return <Tag color="error"> باگ</Tag>
                } else if (value === "suggestion") {
                    return <Tag color="warning">پیشنهاد </Tag>
                } else if (value === "question") {
                    return <Tag color="success">سوال </Tag>
                }
            }
        },
        {
            title: 'وضعیت تیکت',
            dataIndex: 'ticket_status',
            key: 'ticket_status',
            render: (value) => {
                console.log(value)
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
            title: 'ایجنت مربوطه ',
            dataIndex: 'assigned_agent',
            key: 'assigned_agent',
        },
        {
            title: 'ددلاین پاسخگویی',
            key: 'ticket_deadline',
            dataIndex: 'ticket_deadline',
        },
    ];

    const data = [
        {
            key: '1',
            sender: ticketInfo.created_by.username,
            send_time: formatDate(ticketInfo.created_at),
            ticket_type: ticketInfo.type,
            ticket_status: ticketInfo.status,
            assigned_agent: ticketInfo.assignee.username,
            ticket_deadline: formatDate(ticketInfo.deadline)
        }
    ];

    return(   <Table columns={columns} dataSource={data} pagination={false} />) 
}
export default TicketInfoTable;