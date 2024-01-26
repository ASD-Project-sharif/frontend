import { Button, Col, Row, Table, Card } from "antd";
import { useState } from "react";
import { useParams } from "react-router-dom";

const ticketStatus = {
    "waiting_for_admin": "در انتظار اساین شدن",
    "closed": "بسته شده",
    "in_progress": "در جریان",
}

const TicketPage = () => {

    const { ticketId } = useParams();

    const [ticketInfo, setTicketInfo] = useState({
        "id": "110011",
        "title": "کند شدن تیغه مخلوط‌کن",
        "description": "تیغه مخلوط‌کن من کند شده الان باید چیکار کنم؟",
        "created_by": { "name": "غلام" },
        "asignee": { "name": "پاسخگوی ۱۱" },
        "organization": { "name": "پارس خزر" },
        "status": "waiting_for_admin",
        "type": "bug",
        "deadline": "2024-01-22T22:20:57.390+00:00",
        "created_at": "2024-01-01T22:20:57.390+00:00",
        "updated_at": "2024-01-02T22:20:57.390+00:00",
        "comments": [{ "created_by": { "name": "ممد", "id": "0098" }, "created_at": "2024-01-02T22:20:57.390+00:00", "text": "نمیدانم به مولا", "updated_at": "2024-01-02T22:20:57.390+00:00" }],
    });

    const header = "تیکت" + ticketInfo.id;
    const agentName = ticketInfo.comments.length > 0 ? ticketInfo.comments[0].created_by.name : '';
    const commentCreationTime = ticketInfo.comments.length > 0 ? ticketInfo.comments[0].created_at : '';
    const commentHeader = agentName + "     " + commentCreationTime
    const comments = ticketInfo.comments.map((comment, index) => (
        <div key={index}>
            <p>{comment.text}</p>
        </div>
    ));



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
            key: 'ticket-type',
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
            sender: [ticketInfo.created_by.name],
            send_time: [ticketInfo.created_at],
            ticket_type: [ticketStatus[ticketInfo.status]],
            ticket_deadline: [ticketInfo.deadline]
        }
    ];


    return (
        <div>
            <Row>
                <Col span={20}>
                    <h1>
                        {header}
                    </h1>
                </Col>
                <Col span={4} className="ticket-title">
                    <Button size="large" block type="primary" htmlType="submit" >
                        بستن تیکت
                    </Button>
                </Col>
            </Row>
            <Table columns={columns} dataSource={data} pagination={false} />
            <Card title={ticketInfo.title}>
                <p style={{marginBottom: 16, marginTop: 0}}>
                {ticketInfo.description}
                </p>

                <Card type="inner" title= {commentHeader} style={{marginBottom: 16}} >
                    {comments}
                </Card>
            </Card>
        </div>
    )
}

export default TicketPage;