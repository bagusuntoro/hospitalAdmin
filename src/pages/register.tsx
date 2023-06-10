import React, { useState } from 'react';
import { Button, Form, Input } from 'antd';
import Link from 'next/link';
import axios from 'axios';
import { useRouter } from 'next/router';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const App = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const onFinish = (values: any) => {
    setLoading(true);
    // Kirim data ke API menggunakan axios
    axios
      .post('http://127.0.0.1:8000/api/auth/register', values)
      .then((response) => {
        console.log('Response from API:', response.data);
        router.push('/login');
      })
      .catch((error) => {
        console.error('Error sending data:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Form {...layout} name="nest-messages" onFinish={onFinish} style={{ maxWidth: 600 }}>
      <Form.Item name="name" label="Name" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name="email" label="Email" rules={[{ type: 'email' }]}>
        <Input />
      </Form.Item>
      <Form.Item name="password" label="Password">
        <Input.Password />
      </Form.Item>
      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
        <Button type="primary" htmlType="submit" loading={loading}>
          Submit
        </Button>
        <Link href="/login">
          <p>Already have an account? Log in</p>
        </Link>
      </Form.Item>
    </Form>
  );
};

export default App;
