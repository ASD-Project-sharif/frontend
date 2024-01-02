import { Button, Col, Row } from "antd";
import { useState } from "react";
import { useParams } from "react-router-dom";

const ticketStatus = {
    "waiting_for_admin": "در انتظار اساین شدن",
    "closed": "بسته شده",
    "in_progress": "در جریان"
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
        "updated_at": "2024-01-02T22:20:57.390+00:00"
    });


    return (
        <div>
            <Row>
                <Col span={20}>
                    <h1>
                        تیکت 11011
                    </h1>
                </Col>
                <Col span={4} className="ticket-title">
                    <Button size="large" block type="primary" htmlType="submit" >
                        بستن تیکت
                    </Button>
                </Col>
            </Row>
            <Row>
                <Col span={8} className="indicator-col">
                    فرستنده
                </Col>
                <Col span={8} className="indicator-col">
                    زمان ارسال
                </Col>
                <Col span={8} className="indicator-col">
                    نوع تیکت
                </Col>
            </Row>
            <Row>
                <Col span={8} className="value-col">
                    {ticketInfo["created_by"].name}
                </Col>
                <Col span={8} className="value-col">
                    {ticketInfo.created_at}
                </Col>
                <Col span={8} className="value-col">
                    {ticketStatus[ticketInfo.status]}
                </Col>
            </Row>
        </div>
    )
}

export default TicketPage;