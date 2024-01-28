import { Button, Form, Modal, message } from "antd";
import { PlusOutlined } from '@ant-design/icons';
import { useContext, useState } from "react";
import axios from "axios";
import config from "../config/config";
import { AuthContext } from "../App";
import ProductForm from "./productForm";

const ProductCreator = ({ getProducts }) => {
    const [messageApi, contextHolder] = message.useMessage();
    const [open, setOpen] = useState(false);
    const { state } = useContext(AuthContext);

    const openModal = () => {
        setOpen(true);
    }

    const closeModal = () => {
        setOpen(false);
    }

    const submitProductForm = async (values) => {
        try {
            const headers = { "x-access-token": state.token }
            await axios.post(
                `${config.baseUrl}/api/v1/product/add`,
                {
                    ...values,
                },
                { headers: headers },
            );
            closeModal();
            await getProducts();
        } catch (error) {
            errorMessage(error);
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
                <ProductForm closeModal={closeModal} onReturnForm={submitProductForm} />
            </Modal>
        </>

    )
}

export default ProductCreator;