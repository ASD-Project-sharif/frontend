import { Table, message, theme } from "antd";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../App";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import config from "../config/config";
import { Header } from "antd/es/layout/layout";
import { sliceText } from "../helper/strings";
import ProductCreator from "../components/productCreator";

const ProductsPage = () => {
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    const { state } = useContext(AuthContext);
    const [messageApi, contextHolder] = message.useMessage();
    const navigate = useNavigate();

    const pageSize = 20;
    const [page, setPage] = useState(1);
    const [totalCount, setTotalCount] = useState();
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState([{ "id": 1, "name": "غلامعلی", "description": "این محصول لین محصول میتواندییی تسادف تیتیتن" }]);

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
                            navigate(`/ticket/${record.id}`)
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
        </div>
    )
}

export default ProductsPage;