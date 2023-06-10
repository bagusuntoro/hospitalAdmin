import React, { useEffect, useState } from 'react';
import { Space, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import Swal from 'sweetalert2';

interface DataType {
  id: number;
  nama_dokter: string;
  keahlian: string;
  jumlah_pasien: number;
  status: string;
}

interface AppProps {
  apiEndpoint: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: 'Nama Dokter',
    dataIndex: 'nama_dokter',
    key: 'nama_dokter',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Keahlian',
    dataIndex: 'keahlian',
    key: 'keahlian',
  },
  {
    title: 'Jumlah Pasien',
    dataIndex: 'jumlah_pasien',
    key: 'jumlah_pasien',
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    render: (status) => {
      let color;
      if(status === 'standby')
      {
        color = 'green'
      }else if(status === 'istirahat')
      {
        color = 'orange'
      }else
      {
        color = 'red'
      }
      // let color = status === 'stanby' ? 'green' : 'red';
      return (
        <Tag color={color} key={status}>
          {status}
        </Tag>
      );
    },
  },
  {
    title: 'Action',
    key: 'action',
    render: (_, record) => (
      <Space size="middle">
        <a onClick={() => handleAction(record.id, 'standby')}>Stanby</a>
        <a onClick={() => handleAction(record.id, 'istirahat')}>Istirahat</a>
        <a onClick={() => handleAction(record.id, 'cuti')}>Cuti</a>
      </Space>
    ),
  },
];

const App: React.FC<AppProps> = ({ apiEndpoint }) => {
  const [dataSource, setDataSource] = useState<DataType[]>([]);

  useEffect(() => {
    const token = localStorage.getItem('token'); // Ambil token dari localStorage

    const fetchData = () => {
      fetch(apiEndpoint, {
        headers: {
          Authorization: `Bearer ${token}`, // Sertakan token di header Authorization
        },
      })
        .then((response) => response.json())
        .then((data) => {
          const dokter = data.data;
          if (Array.isArray(dokter)) {
            const formattedData = dokter.map((item) => ({
              id: item.id,
              nama_dokter: item.nama_dokter,
              keahlian: item.keahlian,
              jumlah_pasien: item.jumlah_pasien,
              status: item.status,
            }));
            setDataSource(formattedData);
          } else {
            console.error('Invalid data format: expected an array');
          }
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
    };

    if (token) {
      fetchData();
    }
  }, [apiEndpoint]);

  

  return <Table columns={columns} dataSource={dataSource} />;
};

export default App;

const handleAction = (id: number, status: string) => {
  const token = localStorage.getItem('token');
  Swal.fire({
    title: 'Konfirmasi',
    text: `Anda yakin ingin mengubah status menjadi ${status}?`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'OK',
    cancelButtonText: 'Batal',
  }).then((result) => {
    if (result.isConfirmed) {
      const apiURL = `http://127.0.0.1:8000/api/auth/statusdokter/${id}`;

      fetch(apiURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log('Response from API:', data);
          // Lakukan tindakan lainnya jika perlu, seperti memperbarui status dokter di tabel
        })
        .catch((error) => {
          console.error('Error sending data:', error);
        });
    }
  });
};
