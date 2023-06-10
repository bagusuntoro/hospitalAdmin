import Template from '../../../components/Layouts/index'
import MenuHorizontal from '../../../components/menu_horizontal'
import { DatabaseOutlined, RestOutlined, StopOutlined, CheckSquareOutlined } from '@ant-design/icons';
import DataDokter from '../../../components/dokter/index'

const items = [
    {
      label: 'Data',
      key: 'data',
      icon: <DatabaseOutlined />,
      link: '/dokter/data',
    },
    {
      label: 'Standby',
      key: 'standby',
      icon: <CheckSquareOutlined />,
      link: '/dokter/standby',
    },
    {
      label: 'Istirahat',
      key: 'istirahat',
      icon: <RestOutlined />,
      link: '/dokter/istirahat',
    },
    {
      label: 'Cuti',
      key: 'cuti',
      icon: <StopOutlined />,
      link: '/dokter/cuti',
    },
  ];

export default function DokterStandby()
{
  const apiEndpoint = 'http://127.0.0.1:8000/api/auth/dokter-standby';
    return(
        <Template>
            <MenuHorizontal items={items} />
            <h1>DOKTER STANDBY PAGE</h1>
            <DataDokter apiEndpoint={apiEndpoint} />
        </Template>
    );
}