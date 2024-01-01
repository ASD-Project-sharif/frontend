import { Button, Form, Input, message } from "antd";
import axios from "axios";
import { useState } from "react";
import config from "../config/config";
import { useNavigate } from "react-router-dom";

const OrganizationRegisterForm = () => {
    const [form] = Form.useForm();
    const [messageApi, contextHolder] = message.useMessage();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const submitOrganizationForm = async (values) => {
        setLoading(true);
        try {
            await axios.post(
                `${config.baseUrl}/api/v1/auth/signup/organization`,
                {
                    ...values,
                    role: "user",
                }
            );
            setLoading(false);
            navigate("/login?registerSuccess=1");
        } catch (error) {
            errorMessage(error);
            setLoading(false);
        }
    }
    const errorMessage = (error) => {
        const data = error.response.data
        const fields = []
        Object.keys(data).forEach((field) => {
            fields.push({
                name: field,
                errors: data[field],
            })
        })
        form.setFields(fields)
        console.log(error.message)
        messageApi.open({
            type: "error",
            content: error.response.data.message,
        });
    }

    return (
        <>
            {contextHolder}
            <Form name="auth" onFinish={submitOrganizationForm}>
                <Form.Item
                    name="organizationName"
                    rules={[
                        { required: true, message: "لطفا نام سازمان را وارد کنید." },
                    ]}
                >
                    <Input size="large" placeholder="نام سازمان" />
                </Form.Item>
                <Form.Item
                    name="username"
                    rules={[
                        { required: true, message: "لطفا نام کاربری ادمین را وارد کنید." },
                    ]}
                >
                    <Input size="large" placeholder="نام کاربری ادمین" />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[
                        { required: true, message: "لطفا کلمه عبور را وارد کنید." },
                    ]}
                >
                    <Input.Password size="large" placeholder="کلمه عبور" />
                </Form.Item>
                <Form.Item
                    name="confirm"
                    dependencies={['password']}
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: 'تکرار کلمه عبور را وارد کنید!',
                        },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('تکرار کلمه عبور با خود آن یکسان نیست.'));
                            },
                        }),
                    ]}
                >
                    <Input.Password size="large" placeholder="تکرار کلمه عبور" />
                </Form.Item>
                <Form.Item
                    name="email"
                    rules={[
                        { required: true, message: "لطفا ایمیل را وارد کنید." },
                        { type: "email", message: "فرمت ایمیل درست نیست." }
                    ]}
                >
                    <Input size="large" placeholder="ایمیل سازمانی" />
                </Form.Item>
                <Form.Item
                    name="organizationDescription"
                    rules={[
                        { required: true, message: "لطفا ایمیل را وارد کنید." },
                    ]}
                >
                    <Input.TextArea size="large" placeholder="معرفی سازمان" rows={4} />
                </Form.Item>
                {/* <Form.Item
                name="organizationLogo"
                label="لوگوی سازمان"
                rules={[
                    { required: true, message: "لطفا لوگو سازمان را وارد کنید." },
                ]}
            >
                <Upload>
                    <Button icon={<UploadOutlined />}>Click to Upload</Button>
                </Upload>
            </Form.Item> */}
                <Form.Item>
                    <Button size="large" block type="primary" htmlType="submit" loading={loading}>
                        ثبت نام
                    </Button>
                </Form.Item>
            </Form>
        </>
    )
}

export default OrganizationRegisterForm;