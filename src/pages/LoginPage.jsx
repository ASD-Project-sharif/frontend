import { useNavigate, useSearchParams } from "react-router-dom";
import { Form, Input, Button, Row, Col, Card, message } from "antd";
import NavBar from "../components/navBar";

const LoginPage = () => {
    const [searchParams] = useSearchParams();

    const registerSuccess = searchParams.get("registerSuccess");
    const resetPasswordSuccess = searchParams.get("resetPasswordSuccess");

    let navigate = useNavigate();

    const submitForm = () => {
        return 0;
    }

    return (
        <div>
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
                                <Input size="large" type="password" placeholder="کلمه عبور" />
                            </Form.Item>
                            <Form.Item>
                                <Button size="large" block type="primary" htmlType="submit">
                                    ورود
                                </Button>
                            </Form.Item>
                        </Form>
                        {/* <Button className="mr-auto ml-auto" type="link" onClick={() => navigate("/forgot-password")} block>
                            رمز عبور خود را فراموش کرده اید؟
                        </Button> */}
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