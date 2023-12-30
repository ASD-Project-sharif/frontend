import { useParams } from "react-router-dom";
import NavBar from "../components/navBar";
import { Button, Form, Input, Radio } from "antd";
import { useState } from "react";

const TicketRegister = () => {
    const [loading, setLoading] = useState(false);
    function submitTicket(values) {

    }
    const { organizationName } = useParams();
    return (
        <div>
            <div>
                <div className="site-header-bg"></div>
                <NavBar />
            </div>
            <div>{organizationName}
                <Form name="ticket" onFinish={submitTicket}>
                    <Form.Item
                        name="title"
                        rules={[
                            { required: true, message: "لطفا عنوان تیکت را وارد نمایید." },
                        ]}
                    >
                        <Input size="large" placeholder="عنوان تیکت" />
                    </Form.Item>
                    <Form.Item
                        name="description"
                        rules={[
                            { required: true, message: "لطفا توضیحات تیکت را وارد کنید." },
                        ]}
                    >
                        <Input.TextArea size="large" placeholder="توضیحات تیکت" rows={4} />
                    </Form.Item>
                    <Form.Item name="ticketType" label="نوع تیکت">
                        <Radio.Group>
                            <Radio value="suggestion">پیشنهاد</Radio>
                            <Radio value="bug">مشکل</Radio>
                            <Radio value="question">سوال</Radio>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item>
                        <Button size="large" block type="primary" htmlType="submit" loading={loading}>
                            ثبت تیکت
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}

export default TicketRegister;