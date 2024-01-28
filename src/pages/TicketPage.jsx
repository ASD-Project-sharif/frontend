import { Button, Col, Row, Card, Flex, Modal, Input, message } from "antd";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { formatDate } from "../helper/strings";
import { AuthContext } from "../App";
import axios from "axios";
import config from "../config/config";
import TicketInfoTable from "../components/ticketInfoTable";

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

    const[comments, setComments] =useState ({

    })
    
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
                setComments(response.data.comments)
            } catch (error) {
                setLoading(false);
                errorMessage(error);
            }
        })();

    },[]);

    const errorMessage = (error) => {
        messageApi.open({
            type: "error",
            content: error.response.data.message,
        });
    };

    const header = "تیکت" + ticketInfo._id;
    // const agentName =comments && comments.length > 0 ? comments[0].created_by.username : '';
    // const commentCreationTime =comments && comments.length > 0 ? formatDate(ticketInfo.comments[0].created_at) : '';
    // const commentHeader = agentName + "     " + commentCreationTime


   
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
        setNewCommentText('');
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

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
            <TicketInfoTable ticketInfo={ticketInfo}/>
            <Card title={ticketInfo.title} >
                <p>{ticketInfo.description}</p>
                <Card title="کامنت‌ها " className="comment-card">
                    {comments.length > 0 && comments.map((comment, index)  => (
                        <Card key={index} type="inner" title={comment.created_by.username} className="ticket-card">
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