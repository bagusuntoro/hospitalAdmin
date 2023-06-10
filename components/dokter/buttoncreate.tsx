import React, { useState } from 'react';
import { Button, Modal, Form, Input } from 'antd';

const ModalCreate: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const handleOk = () => {
    form.validateFields().then((values) => {
      const token = localStorage.getItem('token');
      // Kirim data ke API menggunakan fetch atau library lain
      const apiUrl = 'http://127.0.0.1:8000/api/auth/dokter'; // Ganti dengan URL API yang sesuai
      fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(values),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log('Response from API:', data);
          // Lakukan tindakan lainnya jika perlu
          setModalOpen(false); // Tutup modal setelah berhasil mengirim data ke API
        })
        .catch((error) => {
          console.error('Error sending data:', error);
        });
    });
  };

  const handleCancel = () => {
    // Tutup modal saat mengklik tombol Batal
    setModalOpen(false);
  };

  const [form] = Form.useForm();

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 10 }}>
        <Button type="primary" onClick={() => setModalOpen(true)}>
          Create Dokter
        </Button>
        <Modal
          title="Tambah Dokter"
          visible={modalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <Form form={form}>
            <Form.Item label="Nama Dokter" name="nama_dokter" rules={[{ required: true, message: 'Silakan masukkan nama dokter' }]}>
              <Input />
            </Form.Item>
            <Form.Item label="Keahlian" name="keahlian" rules={[{ required: true, message: 'Silakan masukkan keahlian dokter' }]}>
              <Input />
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </>
  );
};

export default ModalCreate;
