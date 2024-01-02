import { useState } from "react";

const ticketStatus = {
    "waiting_for_admin" : "در انتظار اساین شدن",
    "closed" : "بسته شده",
    "in_progress" : "در جریان"
}

const TicketPage = () => {

    const [ticketInfo, setTicketInfo] = useState({
        "id" : "110011",
        "title": "کند شدن تیغه مخلوط‌کن",
        "description" : "تیغه مخلوط‌کن من کند شده الان باید چیکار کنم؟",
        "created_by" : {"name" : "غلام"},
        "asignee" : {"name" : "پاسخگوی ۱۱"},
        "organization" : {"name" : "پارس خزر"},
        "status" : "waiting_for_admin",
        "type" : "bug",
        "deadline" : "2024-01-22T22:20:57.390+00:00",
        "created_at" : "2024-01-01T22:20:57.390+00:00",
        "updated_at" : "2024-01-02T22:20:57.390+00:00"
    });
    return (
        <div>
        </div>
    )
}

export default TicketPage;