import Template from "../../../components/Layouts";
import MenuHorizontal from '../../../components/menu_horizontal'
import { NumberOutlined, LoginOutlined, PlusSquareOutlined, CheckCircleOutlined } from '@ant-design/icons';
import DataPasien from '../../../components/pasien/index'

const items = [
    {
      label: 'Antri',
      key: 'antri',
      icon: <NumberOutlined />,
      link: '/pasien/antri',
    },
    {
      label: 'Masuk',
      key: 'masuk',
      icon: <LoginOutlined />,
      link: '/pasien/masuk',
    },
    {
      label: 'Apotek',
      key: 'apotek',
      icon: <PlusSquareOutlined />,
      link: '/pasien/apotek',
    },
    {
      label: 'Selesai',
      key: 'selesai',
      icon: <CheckCircleOutlined />,
      link: '/pasien/selesai',
    },
  ];


export default function PasienApotek()
{
  const apiEndpoint = 'http://127.0.0.1:8000/api/auth/pasien-apotek';
    return(
        <Template>
            <MenuHorizontal items={items} />
            <h1>PASIEN APOTEK PAGE</h1>
            <DataPasien apiEndpoint={apiEndpoint}/>
        </Template>
    );
}