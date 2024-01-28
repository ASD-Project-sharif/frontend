import { Button, Col, Row, Table, Card, Flex, Modal, Input, message } from "antd";
import { useContext, useEffect, useState } from "react";
import { redirect, useParams } from "react-router-dom";
import { formatDate } from "../helper/strings";
import { AuthContext } from "../App";
import axios from "axios";
import config from "../config/config";

const ticketStatus = {
    "waiting_for_admin": "در انتظار اساین شدن",
    "closed": "بسته شده",
    "in_progress": "در جریان",
}

const TicketPage = () => {

    const { ticketId } = useParams();
    const [loading, setLoading] = useState(false);
    const { state } = useContext(AuthContext);
    const [messageApi, contextHolder] = message.useMessage();

    const [ticketInfo, setTicketInfo] = useState({
        "_id": "110011",
        "title": "کند شدن تیغه مخلوط‌کن",
        "description": "تیغه مخلوط‌کن من کند شده الان باید چیکار کنم؟",
        "created_by": { "username": "غلام" },
        "assignee": { "username": "پاسخگوی ۱۱" },
        "organization": { "name": "پارس خزر" },
        "status": "waiting_for_admin",
        "type": "bug",
        "deadline": "2024-01-22T22:20:57.390+00:00",
        "created_at": "2024-01-01T22:20:57.390+00:00",
        "updated_at": "2024-01-02T22:20:57.390+00:00",
        "comments": [{ "created_by": { "username": "ممد", "_id": "0098" }, "created_at": "2024-01-02T22:20:57.390+00:00", "text": "نمیدانم به مولا", "updated_at": "2024-01-02T22:20:57.390+00:00" }],
    });
    
    useEffect(() => {
        (async () => {
            try {
                setLoading(true);
                const headers = { "x-access-token": state.token }
                const response = await axios.get(
                    `${config.baseUrl}/api/v1/ticket/${ticketId}`,
                    { headers: headers },
                );
                console.log(response.data.ticket)
                setLoading(false);
                setTicketInfo(response.data.ticket);
            } catch (error) {
                setLoading(false);
                errorMessage(error);
            }
        })();

    });

    const errorMessage = (error) => {
        messageApi.open({
            type: "error",
            content: error.response.data.message,
        });
    };

   

    const header = "تیکت" + ticketInfo._id;
    const agentName =ticketInfo.comments && ticketInfo.comments.length > 0 ? ticketInfo.comments[0].created_by.username : '';
    const commentCreationTime =ticketInfo.comments && ticketInfo.comments.length > 0 ? formatDate(ticketInfo.comments[0].created_at) : '';
    const commentHeader = agentName + "     " + commentCreationTime
    const comments = ticketInfo.comments && ticketInfo.comments.map((comment, index) => (
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
            sender: [ticketInfo.created_by.username],
            send_time: [formatDate(ticketInfo.created_at)],
            ticket_type: [ticketStatus[ticketInfo.status]],
            assigned_agent: [ticketInfo.assignee.username],
            ticket_deadline: [formatDate(ticketInfo.deadline)]
        }
    ];

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newCommentText, setNewCommentText] = useState('');

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        const newComment = {
            created_by: { username: "New Commenter", _id: "99999" }, // Example: Replace with actual user info
            created_at: new Date().toISOString(),
            text: newCommentText,
            updated_at: new Date().toISOString()
        };

        setTicketInfo(prevTicketInfo => ({
            ...prevTicketInfo,
            comments: [...prevTicketInfo.comments, newComment]
        }));

        console.log("Updated Comments:", [...ticketInfo.comments, newComment]);

        setIsModalOpen(false);
        setNewCommentText(''); // Clear the text area after adding the comment
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
        <>
            {contextHolder}
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
            <Card title={ticketInfo.title} >
                <p>{ticketInfo.description}</p>
                <Card title="پاسخ به تیکت کاربر" classname="comment-card">
                    {ticketInfo.comments && ticketInfo.comments.map((comment, index) => (
                        <Card key={index} type="inner" title={comment.created_by.username} classname="ticket-card">
                            <p>{comment.text}</p>
                        </Card>
                    ))}
                    <Modal title="ثبت پاسخ جدید" visible={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                        <Input.TextArea
                            value={newCommentText}
                            onChange={(e) => setNewCommentText(e.target.value)}
                            rows={4}
                            placeholder="متن پاسخ"
                        />
                    </Modal>
                </Card>
            </Card>
        </>
    )
}

export default TicketPage;