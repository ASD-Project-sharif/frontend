import { FilterOutlined } from '@ant-design/icons';
import { Button, DatePicker, Drawer, Form, Input, Select } from 'antd';
import { useState } from 'react';

const Filter = ({ setFilterValues }) => {
    const [visible, setVisible] = useState(false);
    function onFinish(values) {
        setFilterValues(values);
        setVisible(false);
    }
    return (
        <>
            <Button
                onClick={() => setVisible(true)}
                type="link"
                icon={<FilterOutlined className="filter-icon" />}
            />
            <Drawer
                width="40%"
                title="فیلتر"
                placement="left"
                onClose={() => setVisible(false)}
                open={visible}
            >
                <Form
                    colon={false}
                    hideRequiredMark={true}
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    name="basic"
                    onFinish={onFinish}
                >
                    <Form.Item label="نوع" name="type">
                        <Select>
                            <Select.Option value="BUG">مشکل</Select.Option>
                            <Select.Option value="SUGGESTION">پیشنهاد</Select.Option>
                            <Select.Option value="QUESTION">سوال</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item label="وضعیت" name="status">
                        <Select>
                            <Select.Option value="ACTIVE">در حال انتظار</Select.Option>
                            <Select.Option value="DONE">انجام شده</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item label="شناسه کاربری" name="assignee">
                        <Input />
                    </Form.Item>

                    <Form.Item label="تاریخ ساخت" name="createdAt">
                        <DatePicker
                            className="startPicker"
                            placeholder="تاریخ ساخت"
                        />
                    </Form.Item>
                    <Form.Item wrapperCol={{ span: 8 }}>
                        <Button type="primary" htmlType="submit">
                            ثبت و جستجو
                        </Button>
                    </Form.Item>
                </Form>
            </Drawer>
        </>
    )
}

export default Filter;