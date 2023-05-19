import Template from '../../../components/Layouts/index';
import MenuHorizontal from '../../../components/menu_horizontal';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import DataDokter from '../../../components/dokter/index';
import ButtonCreate from '../../../components/dokter/buttoncreate';

const items = [
    {
      label: 'Data',
      key: 'data',
      icon: <MailOutlined />,
      link: '/dokter/data',
    },
    {
      label: 'Istirahat',
      key: 'istirahat',
      icon: <AppstoreOutlined />,
      link: '/dokter/istirahat',
    },
    {
      label: 'Cuti',
      key: 'cuti',
      icon: <AppstoreOutlined />,
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