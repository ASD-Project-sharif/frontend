import { useNavigate, useParams } from "react-router-dom";
import NavBar from "../components/navBar";
import { Button, Form, Input, Radio, Row, Col, DatePicker, Card, message } from "antd";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import config from "../config/config";
import FormItem from "antd/es/form/FormItem";
import { AuthContext } from "../App";

const TicketRegister = () => {
    const { state } = useContext(AuthContext);
    let navigate = useNavigate();

    useEffect(() => {
        if(!state.isAuthenticated) {
            navigate("/login")

        }
    }, [state.isAuthenticated, navigate]);

    const onChange = (date, dateString) => {
        console.log(date, dateString);
    };

    const [messageApi, contextHolder] = message.useMessage();
    const errorMessage = () => {
        messageApi.open({
            type: "error",
            content: "در ثبت کردن تیکت شما مشکلی رخ داده است. مجدد تلاش کنید.",
        });
    };

    const [organizationInfo, setOrganizationInfo] = useState({
        "name": "نانوایی اصغر آقا",
        "description": "بهترین نانوایی در سطح شهر طهران",
        "logo": <img src="https://mivezendegi.ir/wp-content/uploads/2019/10/COVER.jpg" width={150} />,
        "id" : "111"
    });


    const [loading, setLoading] = useState(false);
    async function submitTicket(values) {
        try {
            setLoading(true);
            await axios.post(
                `${config.baseUrl}/api/v1/ticket/add`,
                {...values, organizationId: organizationInfo.id, userId: state.id}
            );
            setLoading(false);
            navigate("/ticketSubmitted");
        } catch (error) {
            setLoading(false);
            errorMessage();
        }
    }

    const { organizationName } = useParams();
    useEffect(() => {
        (async () => {
            const orgInfo = await axios.get(`${config.baseUrl}/api/v1/organization/${organizationName}`)
            setOrganizationInfo(orgInfo)
        })
    }, [organizationName]);
    return (
        <div>
            {contextHolder}
            <div>
                <div className="site-header-bg"></div>
                <NavBar />
            </div>
            <div className="ticket-form">
                <div>
                    <Card className="card org-card">
                        <Row gutter={16}>
                            <Col span={12}>
                                {organizationInfo.logo}
                            </Col>
                            <Col span={12}>
                                <Row>
                                    {organizationInfo.name}
                                </Row>
                                <Row>
                                    {organizationInfo.description}
                                </Row>
                            </Col>
                        </Row>
                    </Card>
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
                        <Form.Item name="type" label="نوع تیکت" rules={[
                            { required: true, message: "لطفا نوع تیکت را مشخص کنید." },
                        ]}>
                            <Radio.Group>
                                <Radio value="suggestion">پیشنهاد</Radio>
                                <Radio value="bug">مشکل</Radio>
                                <Radio value="question">سوال</Radio>
                            </Radio.Group>
                        </Form.Item >
                        <FormItem name="deadline" label="ددلاین‌ برای پاسخگویی" rules={[
                            { required: true, message: "لطفا توضیحات تیکت را وارد کنید." },
                        ]}>
                            <DatePicker onChange={onChange} />
                        </FormItem>
                        <Form.Item>
                            <Button size="large" block type="primary" htmlType="submit" loading={loading}>
                                ثبت تیکت
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </div>
    )
}

export default TicketRegister;