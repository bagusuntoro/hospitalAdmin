import Template from '../../../components/Layouts/index'
import MenuHorizontal from '../../../components/menu_horizontal'
import { DatabaseOutlined, RestOutlined, StopOutlined, CheckSquareOutlined } from '@ant-design/icons';
import DataDokter from '../../../components/dokter/index'
import ButtonCreate from '../../../components/dokter/buttoncreate';

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

  


export default function DokterData()
{
const apiEndpoint = 'http://127.0.0.1:8000/api/dokter';

  return (
    <Template>
      <MenuHorizontal items={items} />
      <h1>DATA DOKTER PAGE</h1>
      <ButtonCreate/>
      <DataDokter apiEndpoint={apiEndpoint} />
    </Template>
  );
}