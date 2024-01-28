import { Button, Col, Flex, Input } from "antd";
import { Header } from "antd/es/layout/layout";
import { useState } from "react";

const ProfilePage = () => {

    const { TextArea } = Input;
    const [isEditing, setIsEditing] = useState(false);
    const [initialDisabledState, setInitialDisabledState] = useState(true);


    const toggleEditing = () => {
        if (isEditing) {
            setIsEditing(false);
            setInitialDisabledState(true);
        } else {
            setIsEditing(true);
            setInitialDisabledState(false);
        }
    };

    const discardChanges = () => {
        setIsEditing(false);
        setInitialDisabledState(true);
    };

    return (
        <div>
            <Header className="panel-header" style={{ backgroundColor: '#f5f5f5' }}>
                <span>
                    تنظیمات پروفایل
                </span>
                <Flex gap="middle">
                    {isEditing ? (
                        <Button primary onClick={toggleEditing}>
                            ذخیره تغییرات
                        </Button>
                    ) : (
                        <Button primary onClick={toggleEditing}>
                            ویرایش اطلاعات
                        </Button>
                    )}
                    {isEditing && (
                        <Button onClick={discardChanges} danger>
                            لغو تغییرات
                        </Button>
                    )}
                </Flex>
            </Header>
            <Flex vertical gap="small" className="org-info-container" >
                <Flex vertical gap="small">
                    <label>
                        نام سازمان
                    </label>
                    <Input placeholder="organization's name"
                        disabled={!isEditing}
                        defaultValue={"organization's name"}
                    />
                </Flex>
                <Flex vertical gap="small">
                        <label>
                            توضیحات سازمان
                        </label>
                        <TextArea rows={3} placeholder="organization's description" maxLength={500}
                            disabled={!isEditing} style={{ height: 90, resize: "none" }}
                            defaultValue={"organization's description"}
                        />
                    </Flex>
                <Flex vertical gap="small">
                    <label>
                        نام کاربری ادمین
                    </label>
                    <Input placeholder="organization's admin's username"
                        disabled={!isEditing}
                        defaultValue={"organization's admin's username"}
                    />
                </Flex>
                <Flex vertical gap="small">
                    <label>
                        ایمیل سازمانی
                    </label>
                    <Input placeholder="organization's admin's email"
                        disabled={!isEditing}
                        defaultValue="organization's admin's email"

                    />
                </Flex>
                    </Flex>
                    </div>
                )
}

export default ProfilePage;