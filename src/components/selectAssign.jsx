import { Select, Space, message } from "antd"
import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../App";
import axios from "axios";
import config from "../config/config";

const SelectAssign = ({ ticket, getTicket }) => {

    const [agents, setAgents] = useState([])
    const { state } = useContext(AuthContext);
    const [messageApi, contextHolder] = message.useMessage();
    const getAgents = async () => {
        try {
            const data = {


            }
            const headers = { "x-access-token": state.token }
            const response = await axios.get(
                `${config.baseUrl}/api/v1/agent`,
                { headers: headers, params: data },
            );
            setAgents(response.data.agents);
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

    useEffect(() => {
        getAgents();
    }, []);


    const handleChange = async (value) => {
        console.log("here")
        try {
            const data = {
                assignee: value

            }
            const headers = { "x-access-token": state.token }
            await axios.post(
                `${config.baseUrl}/api/v1/ticket/assign/${ticket._id}`,
                data,
                { headers: headers },
            );
            getTicket();
        } catch (error) {
            errorMessage(error);
        }
    }
    return (
        <Space wrap>
            {contextHolder}
            <span>مسئول تیکت:</span>
            <Select
                value={ticket.assignee._id}
                style={{ width: 240 }}
                onChange={(value) => handleChange(value)}
                options={agents.map((agent) => ({ label: agent.username, value: agent._id }))}
            />
        </Space>

    )
}


export default SelectAssign;