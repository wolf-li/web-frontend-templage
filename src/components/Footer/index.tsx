import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-components';
import React from 'react';

const Footer: React.FC = () => {
  const footerstr = new Date().getFullYear() + " wolf-li 制作"
  return (
    <DefaultFooter
      style={{
        background: 'none',
      }}
      copyright={footerstr}
      links={[
        // {
        //   key: 'Ant Design Pro',
        //   title: 'Ant Design Pro',
        //   href: 'https://pro.ant.design',
        //   blankTarget: true,
        // },
        {
          key: 'github',
          title: <GithubOutlined />,
          href: 'https://github.com/wolf-li/web-frontend-templage.git',
          blankTarget: true,
        },
        {
          key: 'web frontend template',
          title: 'web frontend template',
          href: 'https://github.com/wolf-li/web-frontend-templage.git',
          blankTarget: true,
        },
      ]}
    />
  );
};

export default Footer;
