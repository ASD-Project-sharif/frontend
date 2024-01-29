import { Button, Col, Row, Card, Flex, message } from "antd";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../App";
import axios from "axios";
import config from "../config/config";
import TicketInfoTable from "../components/ticketInfoTable";
import CommentModal from "../components/commentModal";
import SelectAssign from "../components/selectAssign";

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

    const [comments, setComments] = useState({})

    const getTicket = async () => {
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
    }

    useEffect(() => {
        getTicket()
    }, []);

    const errorMessage = (error) => {
        messageApi.open({
            type: "error",
            content: error.response.data.message,
        });
    };

    const [loadingChangeStatus, setLoadingChangeStatus] = useState(false);

    const toggleTicketStatus = async () => {
        setLoadingChangeStatus(true);
        try {
            const headers = { "x-access-token": state.token }
            const data = {
                open: ticketInfo.status === "closed" ? true : false
            }
            await axios.post(
                `${config.baseUrl}/api/v1/ticket/change/status/${ticketInfo._id}`,
                data,
                { headers: headers }
            );

            const newStatus = ticketInfo.status === "closed" ? "in_progress" : "closed";
            setTicketInfo({
                ...ticketInfo,
                status: newStatus,
            });
            setLoadingChangeStatus(false);
        } catch (error) {
            errorMessage(error);
            setLoadingChangeStatus(false);
        }
    }

    const header = "تیکت" + " " + ticketInfo._id;
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = async (value) => {
        const newComment = {
            created_by: { username: state.user, _id: state.id }, // Example: Replace with actual user info
            created_at: new Date().toISOString(),
            text: value,
            updated_at: new Date().toISOString()
        };

        try {
            const headers = { "x-access-token": state.token }
            const data = {
                text: value
            }
            await axios.post(
                `${config.baseUrl}/api/v1/comment/add/${ticketInfo._id}`,
                data,
                { headers: headers }
            );
            setComments(prevComments => [...prevComments, newComment]);
            setIsModalOpen(false);
        } catch (error) {
            errorMessage(error);
        }
    };

    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedComment, setSelectedComment] = useState({})


    const onClickEdit = (comment) => {
        setSelectedComment(comment);
        setIsEditModalOpen(true);
    }

    const handleEdit = async (text) => {
        try {
            const headers = { "x-access-token": state.token }
            const data = {
                text: text
            }
            await axios.post(
                `${config.baseUrl}/api/v1/comment/edit/${selectedComment._id}`,
                data,
                { headers: headers }
            );
            setIsEditModalOpen(false);
            getTicket();
        } catch (error) {
            errorMessage(error);
        }
    }

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
                        <Button size="large" block type="default" loading={loadingChangeStatus} onClick={toggleTicketStatus} className={ticketInfo.status === 'in_progress' ? 'primary' : 'destructive'}>
                            {ticketInfo.status === 'closed' ? 'باز کردن تیکت' : 'بستن تیکت'}
                        </Button>
                    </Flex>

                </Col>
                <Col>
                    <SelectAssign getTicket={getTicket} ticket={ticketInfo} />
                </Col>

            </Row>
            <TicketInfoTable ticketInfo={ticketInfo} />
            <Card title={ticketInfo.title} >
                <p>{ticketInfo.description}</p>
                <Card title="کامنت‌ها " className="comment-card">
                    {comments.length === 0 && " :( کامنتی موجود نیست"}
                    {comments.length > 0 && comments.map((comment, index) => (
                        <Card key={index} type="inner" title={comment.created_by.username} className="ticket-card">
                            <p>{comment.text}</p>
                            {comment.created_by._id === state.id && <Button onClick={() => onClickEdit(comment)}>ویرایش</Button>}

                        </Card>
                    ))}

                </Card>
            </Card>

            <CommentModal handleSubmit={handleOk} title='ثبت پاسخ جدید' open={isModalOpen} setOpen={setIsModalOpen} />
            <CommentModal handleSubmit={handleEdit} title='ویرایش پاسخ' open={isEditModalOpen} setOpen={setIsEditModalOpen} initialText={selectedComment.text} />

        </>
    )
}

export default TicketPage;