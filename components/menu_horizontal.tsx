import React, { useState } from 'react';
import { Menu, MenuProps } from 'antd';
import { useRouter } from 'next/router';

interface MenuItem {
  label: string | JSX.Element;
  key: string;
  icon?: JSX.Element;
  link?: string;
}

interface MenuHorizontalProps {
  items: MenuItem[];
}

const MenuHorizontal: React.FC<MenuHorizontalProps> = ({ items }) => {
  const [current, setCurrent] = useState<string>('mail');
  const router = useRouter();

  const onClick: MenuProps['onClick'] = (e) => {
    console.log('click ', e.key);
    setCurrent(e.key as string);

    const selectedItem = items.find((item) => item.key === e.key);
    if (selectedItem?.link) {
      router.push(selectedItem.link);
    }
  };

  const renderMenuItem = (item: MenuItem) => {
    return (
      <Menu.Item key={item.key} icon={item.icon}>
        {item.label}
      </Menu.Item>
    );
  };

  return (
    <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal">
      {items.map((item) => renderMenuItem(item))}
    </Menu>
  );
};

export default MenuHorizontal;
