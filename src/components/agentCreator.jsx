import { Button, Form, Input, Modal, message } from "antd"
import { PlusOutlined } from '@ant-design/icons';
import { useState } from "react";
import axios from "axios";
import config from "../config/config";

const AgentCreator = ({ getAgents }) => {
    const [messageApi, contextHolder] = message.useMessage();
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const [form] = Form.useForm();

    const openModal = () => {
        setOpen(true);
    }

    const closeModal = () => {
        setOpen(false);
    }

    const submitAgentForm = async (values) => {
        setLoading(true);
        try {
            await axios.post(
                `${config.baseUrl}/api/v1/add/agent`,
                {
                    ...values,
                }
            );
            setLoading(false);
            form.resetFields();
            await getAgents();
            closeModal();
        } catch (error) {
            errorMessage(error);
            setLoading(false);
        }
    }

    const errorMessage = (error) => {
        messageApi.open({
            type: "error",
            content: error.response.data.message,
        });
    };

    return (
        <>
            {contextHolder}
            <Button type="primary" onClick={openModal} icon={<PlusOutlined />}>افزودن ایجنت</Button>
            <Modal
                style={{
                    top: 20,
                }}
                title="افزودن ایجنت جدید"
                footer={null}
                width={576}
                open={open}
                onCancel={closeModal}
            >
                <Form name="agent" onFinish={submitAgentForm}>
                    <Form.Item
                        name="name"
                        rules={[
                            { required: true, message: "لطفا نام ایجنت را وارد کنید." },
                        ]}
                    >
                        <Input size="large" placeholder="نام ایجنت" />
                    </Form.Item>
                    <Form.Item
                        name="username"
                        rules={[
                            { required: true, message: "لطفا نام کاربری ایجنت را وارد کنید." },
                        ]}
                    >
                        <Input size="large" placeholder="نام کاربری ایجنت" />
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
                    <Form.Item>
                        <Button size="large" block type="primary" htmlType="submit" loading={loading}>
                            افزودن
                        </Button>
                    </Form.Item>
                </Form>

            </Modal>
        </>
    )
}

export default AgentCreator;