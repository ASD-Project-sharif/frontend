import { Avatar, Table, message, theme } from "antd";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../App";
import axios from "axios";
import config from "../config/config";
import { Header } from "antd/es/layout/layout";
import { sliceText } from "../helper/strings";
import ProductCreator from "../components/productCreator";
import { CloudUploadOutlined } from '@ant-design/icons';
import ProductDetail from "../components/productDetail";

const ProductsPage = () => {
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    const { state } = useContext(AuthContext);
    const [messageApi, contextHolder] = message.useMessage();

    const pageSize = 20;
    const [page, setPage] = useState(1);
    const [totalCount, setTotalCount] = useState();
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState([
        { "id": 1, "name": "غلامعلی", "description": "این محصول لین محصول میتواندییی تسادف تیتیتن" },
        { "id": 1, "name": "غلامعلی", "description": "این محصول لین محصول میتواندییی تسادف تیتیتن", "image": "https://dkstatics-public.digikala.com/digikala-products/727d1cda829f06559649634c9bc27f742ecefd93_1685250629.jpg?x-oss-process=image/resize,m_lfit,h_800,w_800/format,webp/quality,q_90" }]);

    const [visible, setVisible] = useState(false);
    const [selected, setSelected] = useState({});

    const getProducts = async () => {
        try {
            setLoading(true);
            const data = {
                pageSize: pageSize,
                pageNumber: page,

            }
            const headers = { "x-access-token": state.token }
            const response = await axios.get(
                `${config.baseUrl}/api/v1/agents`,
                { headers: headers, params: data },
            );
            setLoading(false);
            setTotalCount(response.data.count);
            setProducts(response.data.products);
        } catch (error) {
            setLoading(false);
            errorMessage(error);
        }
    }

    const errorMessage = (error) => {
        messageApi.open({
            type: "error",
            content: error.response.data.message,
        });
    };

    useEffect(() => {
        getProducts();
    });

    const columns = [
        {
            title: ' ',
            dataIndex: 'id',
            render: (value, record) => {
                if (!record.image) {
                    return (
                        <Avatar icon={<CloudUploadOutlined />} size={48} shape="square" />
                    );
                } else {
                    return <Avatar src={record.image} size={48} shape="square" />;
                }
            },
        },
        {
            title: 'نام محصول',
            dataIndex: 'name',
            render: (value) => value
        },
        {
            title: 'توضیحات',
            dataIndex: 'description',
            render: (value) => sliceText(value),
        },

    ];
    return (
        <div>
            {contextHolder}
            <Header style={{ background: colorBgContainer }} className="panel-header">
                <h3>
                    محصولات
                </h3>
                <ProductCreator />
            </Header>
            <Table
                onRow={(record) => {
                    return {
                        onClick: () => {
                            setSelected(record);
                            setVisible(true);
                        },
                    };
                }}
                size="small"
                rowKey="id"
                loading={loading}
                columns={columns}
                dataSource={products}
                pagination={{
                    pageSize,
                    total: totalCount,
                    onChange: (page, pageSize) => {
                        setPage(page);
                    },
                }}
            />
            <ProductDetail
                visible={visible}
                setVisible={setVisible}
                selected={selected}
            />
        </div>
    )
}

export default ProductsPage;