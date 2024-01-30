import { useNavigate, useParams } from "react-router-dom";
import NavBar from "../components/navBar";
import { Button, Form, Input, Radio, Row, Col, DatePicker, Card, message, Select } from "antd";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import config from "../config/config";
import FormItem from "antd/es/form/FormItem";
import { AuthContext } from "../App";

const TicketRegister = () => {
    const { organizationId } = useParams();
    const { state } = useContext(AuthContext);
    const [organizationInfo, setOrganizationInfo] = useState({
        "name": "نانوایی اصغر آقا",
        "description": "بهترین نانوایی در سطح شهر طهران",
        "logo": <img src="https://mivezendegi.ir/wp-content/uploads/2019/10/COVER.jpg" width={150} />,
        "id": "111"
    });

    let navigate = useNavigate();


    useEffect(() => {
        if (!state.isAuthenticated) {
            navigate("/login")
        }
    }, [state.isAuthenticated, navigate]);

    useEffect(() => {
        (async () => {
            try {
                const headers = { "x-access-token": state.token }
                const response = await axios.get(
                    `${config.baseUrl}/api/v1/information/organization/${organizationId}`,
                    { headers: headers }
                );
                setOrganizationInfo(response.data);
            } catch (error) {
                navigate("/user")
            }
        })();
    }, [organizationId, navigate, state]);

    const onChange = (date, dateString) => {
        console.log(date, dateString);
    };

    const [messageApi, contextHolder] = message.useMessage();
    const errorMessage = (error) => {
        messageApi.open({
            type: "error",
            content: error.response.data.message,
        });
    };

    const [loading, setLoading] = useState(false);
    async function submitTicket(values) {
        try {
            setLoading(true);
            const headers = { "x-access-token": state.token }
            await axios.post(
                `${config.baseUrl}/api/v1/ticket/add`,
                { ...values, organizationId: organizationInfo.id, userId: state.id, token: state.token },
                { headers: headers }
            );
            setLoading(false);
            navigate("/user");
        } catch (error) {
            setLoading(false);
            console.log(error)
            errorMessage(error);
        }
    }

    const [products, setProducts] = useState([]);

    const getProducts = async () => {
        try {
            const headers = { "x-access-token": state.token }
            const response = await axios.get(
                `${config.baseUrl}/api/v1/product/organization/${organizationId}`,
                { headers: headers },
            );
            setProducts(response.data.products);
        } catch (error) {
            errorMessage(error);
        }
    }

    useEffect(() => {
        getProducts()
    }, []);

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
                        <Form.Item label="محصول" name="product">
                            <Select
                                style={{ width: 240 }}
                                options={products.map((product) => ({ label: product.name, value: product._id }))}
                            />
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