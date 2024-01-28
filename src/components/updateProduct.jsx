import { Button, Modal, message } from "antd";
import ProductForm from "./productForm";
import { useContext, useState } from "react";
import { AuthContext } from "../App";
import axios from "axios";
import config from "../config/config";

const UpdateProduct = ({ product, setDrawerVisibility, getProducts }) => {
    const [updateModalVisible, setVisible] = useState(false);
    const { state } = useContext(AuthContext);
    const [messageApi, contextHolder] = message.useMessage();

    console.log(product)
    function showModal() {
        setDrawerVisibility(false);
        setVisible(true);
    }

    function closeModal() {
        return setVisible(false);
    }

    async function onSubmit(values) {
        try {
            const headers = { "x-access-token": state.token }
            await axios.post(
                `${config.baseUrl}/api/v1/product/edit/${product._id}`,
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
            <Button onClick={showModal} size="small" type="primary" ghost>
                ویرایش
            </Button>
            <Modal
                title="ویرایش محصول"
                footer={null}
                width={576}
                open={updateModalVisible}
                onCancel={closeModal}
                style={{
                    top: 20,
                }}
            >
                <ProductForm initialValues={product} onReturnForm={onSubmit} closeModal={closeModal} />
            </Modal>
        </>
    )
}

export default UpdateProduct;