import { useNavigate, useSearchParams } from "react-router-dom";
import { Form, Input, Button, Row, Col, Card, message } from "antd";
import NavBar from "../components/navBar";
import axios from "axios";
import config from "../config/config";
import { useContext } from "react";
import { AuthContext } from "../App";
import process from "../../.eslintrc.cjs";

const LoginPage = () => {
    const [searchParams] = useSearchParams();
    const [messageApi, contextHolder] = message.useMessage();
    const { dispatch } = useContext(AuthContext);

    const registerSuccess = searchParams.get("registerSuccess");
    const resetPasswordSuccess = searchParams.get("resetPasswordSuccess");

    let navigate = useNavigate();

    const errorMessage = () => {
        messageApi.open({
            type: "error",
            content: "نام کاربری یا کلمه عبور شما اشتباه است!",
        });
    };


    const submitForm = async (values) => {
        try {
            const response = await axios.post(
                `${process.env.baseUrl}/api/auth/signin/`,
                values
            );
            dispatch({
                type: "LOGIN",
                payload: {
                    token: response.data.token,
                    role: response.data.role,
                    user: values["username"],
                },
            });
            navigate("/user");
        } catch (error) {
            errorMessage();
        }
    }

    return (
        <div>
            {contextHolder}
            <div>
                <div className="site-header-bg"></div>
                <NavBar />
            </div>
            <Row justify="center" align="middle" className="login-form">
                <Col span={6}>
                    <div className="text-center">
                        {registerSuccess === "1" ? (
                            <div style={{ color: "green" }}>
                                ثبت نام شما با موفقیت انجام شد.
                                حالا می‌توانید با استفاده نام کاربری و کلمه عبور خود وارد شوید.
                            </div>
                        ) : ""}
                        {resetPasswordSuccess === "1" ? (
                            <div style={{ color: "green" }}>
                                رمز شما با موفقیت تغییر کرد.
                                حالا می‌توانید با استفاده نام کاربری و کلمه عبور جدید خود وارد شوید.
                            </div>
                        ) : ""}
                        <h1>ورود به صفحه کاربری</h1>
                    </div>
                    <Card className="card">
                        <Form name="auth" onFinish={submitForm}>
                            <Form.Item
                                name="username"
                                rules={[
                                    { required: true, message: "لطفا نام کاربری را وارد کنید" },
                                ]}
                            >
                                <Input size="large" placeholder="نام کاربری" />
                            </Form.Item>
                            <Form.Item
                                name="password"
                                rules={[
                                    { required: true, message: "لطفا کلمه عبور را وارد کنید" },
                                ]}
                            >
                                <Input.Password size="large" type="password" placeholder="کلمه عبور" />
                            </Form.Item>
                            <Form.Item>
                                <Button size="large" block type="primary" htmlType="submit">
                                    ورود
                                </Button>
                            </Form.Item>
                        </Form>
                    </Card>
                    <div className="text-center" style={{ margin: "20px 0px" }}>
                        <h3>
                            هنوز اکانتی نساخته اید؟
                            <Button type="link" onClick={() => navigate("/register")}>ثبت نام</Button>
                        </h3>
                    </div>
                </Col>
            </Row>
        </div>
    )
}

export default LoginPage;