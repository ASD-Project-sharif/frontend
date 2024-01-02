import { FilterOutlined } from '@ant-design/icons';
import { Button, DatePicker, Drawer, Form, Select } from 'antd';
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
                            <Select.Option value="bug">مشکل</Select.Option>
                            <Select.Option value="suggestion">پیشنهاد</Select.Option>
                            <Select.Option value="question">سوال</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item label="وضعیت" name="status">
                        <Select>
                            <Select.Option value="in_progress">در جریان</Select.Option>
                            <Select.Option value="closed">بسته شده</Select.Option>
                            <Select.Option value="waiting_for_admin">در انتظار اساین</Select.Option>
                        </Select>
                    </Form.Item>

                    <Form.Item label="تاریخ ساخت(شروع بازه)" name="intervalStart">
                        <DatePicker
                            className="startPicker"
                            placeholder="شروع بازه"
                        />
                    </Form.Item>
                    <Form.Item label="تاریخ ساخت(شروع بازه)" name="intervalEnd">
                        <DatePicker
                            className="startPicker"
                            placeholder='انتهای بازه'
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