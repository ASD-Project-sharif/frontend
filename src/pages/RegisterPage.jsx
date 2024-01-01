import { Button, Card, Col, Form, Input, Row, Segmented, message } from "antd";
import { useState } from "react";
import NavBar from "../components/navBar";
import axios from "axios";
import config from "../config/config";
import { useNavigate } from "react-router-dom";
import OrganizationRegisterForm from "../components/OrganizationRegisterForm";


const RegisterPage = () => {
  const [value, setValue] = useState('user');
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();

  const submitUserForm = async (values) => {
    setLoading(true);
    try {
      await axios.post(
        `${config.baseUrl}/api/v1/auth/signup/user`,
        {
          ...values,
          role: "admin",
        }
      );
      setLoading(false);
      navigate("/login?registerSuccess=1");
    } catch (error) {
      errorMessage(error);
      setLoading(false);
    }
  }

  const errorMessage = (error) => {
    console.log(error)
    const data = error.response.data
    const fields = []
    Object.keys(data).forEach((field) => {
      fields.push({
        name: field,
        errors: data[field],
      })
    })
    form.setFields(fields)
    messageApi.open({
      type: "error",
      content: error.response.data.message,
    });
  }
  const userForm = (
    <Form name="auth" onFinish={submitUserForm} form={form}>
      <Form.Item
        name="username"
        rules={[
          { required: true, message: "لطفا نام کاربری را وارد کنید." },
        ]}
      >
        <Input size="large" placeholder="نام کاربری" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          { required: true, message: "لطفا کلمه عبور را وارد کنید." },
        ]}
      >
        <Input.Password size="large" placeholder="کلمه عبور" />
      </Form.Item>
      <Form.Item
        name="confirm"
        dependencies={['password']}
        hasFeedback
        rules={[
          {
            required: true,
            message: 'تکرار کلمه عبور را وارد کنید!',
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('تکرار کلمه عبور با خود آن یکسان نیست.'));
            },
          }),
        ]}
      >
        <Input.Password size="large" placeholder="تکرار کلمه عبور" />
      </Form.Item>
      <Form.Item
        name="email"
        rules={[
          { required: true, message: "لطفا ایمیل را وارد کنید." },
          { type: "email", message: "فرمت ایمیل درست نیست." }
        ]}
      >
        <Input size="large" placeholder="ایمیل" />
      </Form.Item>
      <Form.Item>
        <Button size="large" block type="primary" htmlType="submit" loading={loading}>
          ثبت نام
        </Button>
      </Form.Item>
    </Form>
  )

  return (
    <div>
      {contextHolder}
      <div>
        <div className="site-header-bg"></div>
        <NavBar />
      </div>

      <Row justify="center" align="middle" className="login-form">
        <Col span={6}>
          <div className="text-center">
            <h1>ثبت نام</h1>
          </div>
          <Card className="card">

            <Segmented
              options={[
                { label: 'مشتری', value: 'user' },
                { label: 'سازمان', value: 'organization' },
              ]}
              value={value} onChange={setValue}
              block
              style={{ marginBottom: "30px" }}
            />
            {value === "user" ? userForm : <OrganizationRegisterForm />}
          </Card>

        </Col>
      </Row>

    </div>
  )
}

export default RegisterPage;
