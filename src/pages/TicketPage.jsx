import { Button, Col, Row, Table, Card, Flex, Modal, Input } from "antd";
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
            sender: [ticketInfo.created_by.name],
            send_time: [ticketInfo.created_at],
            ticket_type: [ticketStatus[ticketInfo.status]],
            assigned_agent: [ticketInfo.asignee.name],
            ticket_deadline: [ticketInfo.deadline]
        }
    ];

    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    // const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    //     console.log('Change:', e.target.value);
    //   };

    const { TextArea } = Input;

    const [isOpen, setIsOpen] = useState(false);

    const toggleTicketStatus = () => {
        setIsOpen(!isOpen);
        const newStatus = ticketInfo.status === "closed" ? "in_progress" : "closed";
        setTicketInfo({
            ...ticketInfo,
            status: newStatus,
        });
        console.log(ticketInfo.status);
    };



    return (
        <div>
            <Row>
                <Col span={16}>
                    <h1>
                        {header}
                    </h1>
                </Col>
                <Col span={8} className="ticket-title">
                    <Flex gap="middle">
                        <Button size="large" block type="primary" onClick={showModal}>
                            ثبت پاسخ جدید
                        </Button>
                        <Button size="large" block type="default" htmlType="submit" onClick={toggleTicketStatus} className={ticketInfo.status === 'in_progress' ? 'primary' : 'destructive'}>
                            {ticketInfo.status === 'in_progress' ? 'باز کردن تیکت' : 'بستن تیکت'}
                        </Button>
                    </Flex>
                </Col>
            </Row>
            <Table columns={columns} dataSource={data} pagination={false} />
            <Card title={ticketInfo.title}>
                <p style={{ marginBottom: 16, marginTop: 0 }}>
                    {ticketInfo.description}
                </p>
                <Card type="inner" title={commentHeader} style={{ marginBottom: 16 }} >
                    {comments}
                </Card>
            </Card>
            <Modal title="ثبت پاسخ جدید" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <p>متن پاسخ خود را وارد کنید.</p>
                <TextArea
                    showCount
                    maxLength={500}
                    // onChange={onChange}
                    placeholder="متن پاسخ"
                    style={{ height: 120, resize: 'none', marginBottom: 16 }}
                />
            </Modal>
        </div>
    )
}

export default TicketPage;