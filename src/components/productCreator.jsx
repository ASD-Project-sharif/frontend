import { Button, Form, Input, Modal, message } from "antd";
import { PlusOutlined } from '@ant-design/icons';
import { useContext, useState } from "react";
import axios from "axios";
import config from "../config/config";
import { AuthContext } from "../App";

const ProductCreator = ({ getTickets }) => {
    const [messageApi, contextHolder] = message.useMessage();
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const { state } = useContext(AuthContext);

    const [form] = Form.useForm();

    const openModal = () => {
        setOpen(true);
    }

    const closeModal = () => {
        setOpen(false);
    }

    const submitProductForm = async (values) => {
        setLoading(true);
        try {
            const headers = { "x-access-token": state.token }
            await axios.post(
                `${config.baseUrl}/api/v1/product/add`,
                {
                    ...values,
                },
                { headers: headers },
            );
            setLoading(false);
            form.resetFields();
            closeModal();
            await getTickets();
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
            <Button type="primary" onClick={openModal} icon={<PlusOutlined />}>افزودن محصول</Button>
            <Modal
                style={{
                    top: 20,
                }}
                title="افزودن محصول جدید"
                footer={null}
                width={576}
                open={open}
                onCancel={closeModal}
            >
                <Form name="product" onFinish={submitProductForm}>
                    <Form.Item
                        name="name"
                        rules={[
                            { required: true, message: "لطفا نام محصول را وارد کنید." },
                        ]}
                    >
                        <Input size="large" placeholder="نام محصول" />
                    </Form.Item>
                    <Form.Item
                        name="description"
                        rules={[
                            { required: true, message: "لطفا توضیحات را وارد کنید." },
                        ]}
                    >
                        <Input.TextArea size="large" placeholder="معرفی محصول" rows={4} />
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

export default ProductCreator;