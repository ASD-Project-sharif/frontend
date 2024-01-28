import { Button, Col, Collapse, Descriptions, Drawer, Row, Tabs, message } from "antd"
import UpdateProduct from "./updateProduct";
import ShortViewHeader from "./shortViewHeader";
import axios from "axios";
import config from "../config/config";
import { useContext } from "react";
import { AuthContext } from "../App";

const ProductDetail = ({ setVisible, visible, selected, getProducts }) => {
    const { state } = useContext(AuthContext);
    const [messageApi, contextHolder] = message.useMessage();


    const updateButton = (
        <UpdateProduct key="update" product={selected} setDrawerVisibility={setVisible} getProducts={getProducts} />
    );

    const deleteProduct = async () => {
        try {
            const headers = { "x-access-token": state.token }
            await axios.post(
                `${config.baseUrl}/api/v1/product/delete/${selected._id}`,
                {},
                { headers: headers },
            );
            setVisible(false);
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


    const deleteButton = (
        <Button size="small" onClick={deleteProduct}>حذف محصول</Button>
    )

    const headerDiscription = (
        <Row>
            <Col span={24}>{selected.id}</Col>
        </Row>
    );
    return (
        <>
            {contextHolder}
            <Drawer
                width='40%'
                placement="left"
                closable={true}
                onClose={() => setVisible(false)}
                open={visible}
            >
                <>
                    <ShortViewHeader
                        image={selected.image}
                        title={selected.title}
                        descriptions={headerDiscription}
                        key="updateButton"
                        actions={[updateButton, deleteButton]}
                    />
                    <Tabs defaultActiveKey="1">
                        <Tabs.TabPane tab="اطلاعات" key="1">
                            <Collapse defaultActiveKey={['1']}>
                                <Collapse.Panel header="اطلاعات پایه" key="1">
                                    <Descriptions column={1} size="default" colon={false} bordered>
                                        <Descriptions.Item label="عنوان">
                                            {selected.name}
                                        </Descriptions.Item>
                                        <Descriptions.Item label="لینک">

                                        </Descriptions.Item>
                                    </Descriptions>
                                    <br />
                                </Collapse.Panel>
                            </Collapse>
                        </Tabs.TabPane>
                    </Tabs>
                </>
            </Drawer>
        </>

    )
}

export default ProductDetail;