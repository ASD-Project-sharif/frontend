import { Card, Avatar, Row, Col, Space } from 'antd';

export default function ShortViewHeader({
    image,
    icon,
    title,
    descriptions,
    actions,
}) {
    return (
        <Card bordered={false} className="shortview-card" size="small">
            <Row align="middle">
                <Col span={6}>
                    <Avatar size={64} shape="square" src={image} icon={icon} />
                </Col>
                <Col span={16}>
                    <h4 className="shortview-header">{title}</h4>
                    <div className="shortview-header-desc">{descriptions}</div>
                </Col>
            </Row>
            <div className="shortview-actions-container">
                <Space>{actions}</Space>
            </div>
        </Card>
    );
}
