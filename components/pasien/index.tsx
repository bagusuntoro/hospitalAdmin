import React, { useEffect, useState } from 'react';
import { Space, Table, Tag } from 'antd';
import Swal from 'sweetalert2';
import type { ColumnsType } from 'antd/es/table';

interface DataType {
  nomor_antrian: number;
  nama_pasien: string;
  keluhan: string;
  alamat: string;
  no_hp: string;
  no_ktp: string;
  nama_dokter: string;
  status: string;
}

interface AppProps {
  apiEndpoint: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: 'Antrian',
    dataIndex: 'nomor_antrian',
    key: 'nomor_antrian',
    // render: (text) => <a>{text}</a>,
  },
  {
    title: 'Nama Pasien',
    dataIndex: 'nama_pasien',
    key: 'nama_pasien',
    // render: (text) => <a>{text}</a>,
  },
  {
    title: 'Keluhan',
    dataIndex: 'keluhan',
    key: 'keluhan',
  },
  {
    title: 'Alamat',
    dataIndex: 'alamat',
    key: 'alamat',
  },
  {
    title: 'Nomor HP',
    dataIndex: 'no_hp',
    key: 'no_hp',
  },
  {
    title: 'Nomor KTP',
    dataIndex: 'no_ktp',
    key: 'no_ktp',
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    render: (status) => {
      let color;
      if(status === 'selesai')
      {
        color = 'green'
      }else if(status === 'masuk')
      {
        color = 'orange'
      }else if(status === 'apotek')
      {
        color = 'blue'
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
    title: 'Nama Dokter',
    dataIndex: 'nama_dokter',
    key: 'nama_dokter',
  },
  {
    title: 'Action',
    key: 'action',
    render: (_, record) => (
      <Space size="middle">
        <a onClick={() => handleAction(record.nomor_antrian, 'masuk')}>Masuk</a>
        <a onClick={() => handleAction(record.nomor_antrian, 'apotek')}>Apotek</a>
        <a onClick={() => handleAction(record.nomor_antrian, 'selesai')}>Selesai</a>
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
          const pasien = data.data;
          if (Array.isArray(pasien)) {
            const formattedData = pasien.map((item) => ({
              nomor_antrian: item.id,
              nama_pasien: item.nama_pasien,
              keluhan: item.keluhan,
              alamat: item.alamat,
              no_hp: item.no_hp,
              no_ktp: item.no_ktp,
              nama_dokter: item.nama_dokter,
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
      const apiURL = `http://127.0.0.1:8000/api/auth/statuspasien/${id}`;

      fetch(apiURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
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

