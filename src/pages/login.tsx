import React, { useState } from 'react';
import { Button, Form, Input } from 'antd';
import { useRouter } from 'next/router';
import axios from 'axios';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const Login = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const onFinish = (values: any) => {
    setLoading(true);

    axios
      .post('http://127.0.0.1:8000/api/auth/login', values)
      .then((response) => {
        // const { token } = response.data.access_token;
        // console.log(response.data)
        // console.log()
        // Simpan token ke local storage
        localStorage.setItem('token', response.data.access_token);

        // Redirect ke halaman lain atau lakukan tindakan lainnya
        router.push('/dokter/data');
      })
      .catch((error) => {
        console.error('Error logging in:', error);
        setLoading(false);
      });
  };

  return (
    <Form {...layout} name="login-form" onFinish={onFinish}>
      <Form.Item name="email" label="Email" rules={[{ required: true, type: 'email' }]}>
        <Input />
      </Form.Item>
      <Form.Item name="password" label="Password" rules={[{ required: true }]}>
        <Input.Password />
      </Form.Item>
      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
        <Button type="primary" htmlType="submit" loading={loading}>
          Login
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Login;
