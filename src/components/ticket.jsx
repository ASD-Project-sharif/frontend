import { Card, Row } from "antd";

const ticket = () => {
    <Card className="card ticket-card">
        <Row className="ticket-owner">
            {ticketInfo.created_by.name}:
        </Row>
        <Row>
            {ticketInfo.description}
        </Row>
    </Card>
}
export default ticket;