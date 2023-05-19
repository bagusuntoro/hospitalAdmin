import Template from '../../../components/Layouts/index'
import MenuHorizontal from '../../../components/menu_horizontal'
import { DatabaseOutlined, MailOutlined, StopOutlined } from '@ant-design/icons';
import DataDokter from '../../../components/dokter/index'

const items = [
    {
      label: 'Data',
      key: 'data',
      icon: <DatabaseOutlined />,
      link: '/dokter/data',
    },
    {
      label: 'Istirahat',
      key: 'istirahat',
      icon: <MailOutlined />,
      link: '/dokter/istirahat',
    },
    {
      label: 'Cuti',
      key: 'cuti',
      icon: <StopOutlined />,
      link: '/dokter/cuti',
    },
  ];

export default function DokterCuti()
{
  const apiEndpoint = 'http://127.0.0.1:8000/api/dokter-cuti';
    return(
        <Template>
            <MenuHorizontal items={items} />
            <h1>DOKTER CUTI PAGE</h1>
            <DataDokter apiEndpoint={apiEndpoint} />
        </Template>
    );
}