import { Table } from "antd";
import { message } from "antd";
import { useContext, useEffect, useState } from "react";
import config from "../config/config";
import axios from "axios";
import { AuthContext } from "../App";
import { formatDate } from "../helper/strings";
import { json } from "react-router-dom";

const LogTable = ({ id }) => {
    const { state } = useContext(AuthContext);
    const [messageApi, contextHolder] = message.useMessage();


    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        (async () => {
            try {
                setLoading(true);
                const headers = { "x-access-token": state.token }
                const response = await axios.get(
                    `${config.baseUrl}/api/v1/ticket/log/${id}`,
                    { headers: headers },
                );
                setLoading(false);
                setLogs(response.data.logs)
            } catch (error) {
                setLoading(false);
                errorMessage(error);
            }
        })();

    }, []);

    const errorMessage = (error) => {
        messageApi.open({
            type: "error",
            content: error.response.data.message,
        });
    };

    const columns = [
        {
            title: 'شرح تغییر',
            dataIndex: 'description',
            width: 60,
            fixed: "right"
        },
        {
            title: 'تغییر',
            dataIndex: 'changes',
            render: (value) => JSON.stringify(value),
            width: 60,

        },
        {
            title: 'مسئول',
            dataIndex: 'created_by',
            render: (value) => value.username,
            width: 60,
         },
        {
            title: 'زمان ایجاد تغییر',
            dataIndex: 'created_at',
            render: (value) => formatDate(value),
            width: 60,
            fixed: "left"
        },

    ];

    return (
        <>
            {contextHolder}
            <Table
                size="small"
                rowKey="id"
                loading={loading}
                columns={columns}
                dataSource={logs}
                pagination={false}
                scroll={{ x: 1300 }}
            />
        </>

    )
}

export default LogTable;