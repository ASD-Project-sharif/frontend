import { Button, Col, Collapse, Descriptions, Drawer, Row, Tabs } from "antd"
import UpdateProduct from "./updateProduct";
import ShortViewHeader from "./shortViewHeader";

const ProductDetail = ({ setVisible, visible, selected }) => {
    const updateButton = (
        <UpdateProduct key="update" product={selected} setDrawerVisibility={setVisible} />
    );

    const deleteProduct = () => {

    }

    const deleteButton = (
        <Button size="small" onClick={deleteProduct}>حذف محصول</Button>
    )

    const headerDiscription = (
        <Row>
            <Col span={24}>{selected.id}</Col>
        </Row>
    );
    return (
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
    )
}

export default ProductDetail;