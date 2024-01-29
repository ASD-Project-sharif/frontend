import { Button, Form, Input } from "antd"
import { useEffect } from "react";

const ProductForm = ({ initialValues = {}, closeModal, onReturnForm }) => {
    const [form] = Form.useForm();

    async function submit(values) {
        onReturnForm(values);
        form.resetFields();
        closeModal();
    }

    useEffect(() => {
        form.setFieldsValue(initialValues);
    }, [initialValues, form]);

    return (
        <Form name="product" onFinish={submit} form={form}>
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
                <Button size="large" block type="primary" htmlType="submit">
                    ثبت
                </Button>
            </Form.Item>
        </Form>
    )
}

export default ProductForm;