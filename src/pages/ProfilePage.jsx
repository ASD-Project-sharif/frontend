import { Flex, Input, message } from "antd";
import { Header } from "antd/es/layout/layout";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../App";
import config from "../config/config";
import axios from "axios";

const ProfilePage = () => {
    const [loading, setLoading] = useState(false);
    const { state } = useContext(AuthContext);
    const [organization, setOrganization] = useState({})
    const [messageApi, contextHolder] = message.useMessage();

    const baseUrl = window.location.protocol + "//" + window.location.host;

    const getProfile = async () => {
        try {
            setLoading(true);
            const headers = { "x-access-token": state.token }
            const response = await axios.get(
                `${config.baseUrl}/api/v1/information/organization`,
                { headers: headers },
            );
            console.log(response.data)
            setLoading(false);
            setOrganization(response.data);
        } catch (error) {
            setLoading(false);
            errorMessage(error);
        }
    }

    useEffect(() => {
        getProfile()
    }, []);

    const errorMessage = (error) => {
        messageApi.open({
            type: "error",
            content: error.response.data.message,
        });
    };

    console.log(organization)

    return (
        <div>
            {contextHolder}
            <Header className="panel-header" style={{ backgroundColor: '#f5f5f5' }}>
                <span>
                    تنظیمات پروفایل
                </span>

            </Header>
            <Flex vertical gap="small" className="org-info-container" >
                <Flex vertical gap="small">
                    <label>
                        نام سازمان
                    </label>
                    <Input

                        value={organization?.name}
                    />
                </Flex>
                <Flex vertical gap="small">
                    <label>
                        توضیحات سازمان
                    </label>
                    <Input.TextArea rows={3} maxLength={500}
                        style={{ height: 90, resize: "none" }}
                        value={organization?.description}
                    />
                </Flex>
                <Flex vertical gap="small">
                    <label>
                        لینک
                    </label>
                    <Input
                        value={`${baseUrl}/support/${organization?.id}`}
                    />
                </Flex>
            </Flex>
        </div>
    )
}

export default ProfilePage;