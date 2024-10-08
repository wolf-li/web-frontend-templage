import { Footer } from '@/components';
import { Auth } from '@/utils';
import {
  LockOutlined,
  UserOutlined,
} from '@ant-design/icons';
import {
  LoginForm,
  ProFormText,
} from '@ant-design/pro-components';
import { Helmet, history, Link, useModel } from '@umijs/max';
import {  message, Space, Tabs } from 'antd';
import { createStyles } from 'antd-style';
import React, { useState } from 'react';
import Settings from '../../../../config/defaultSettings';
import { Divider } from 'antd';
import { postUserLogin } from '@/services/networktools/loginApi';
const useStyles = createStyles(({ token }) => {
  return {
    action: {
      marginLeft: '8px',
      color: 'rgba(0, 0, 0, 0.2)',
      fontSize: '24px',
      verticalAlign: 'middle',
      cursor: 'pointer',
      transition: 'color 0.3s',
      '&:hover': {
        color: token.colorPrimaryActive,
      },
    },
    lang: {
      width: 42,
      height: 42,
      lineHeight: '42px',
      position: 'fixed',
      right: 16,
      borderRadius: token.borderRadius,
      ':hover': {
        backgroundColor: token.colorBgTextHover,
      },
    },
    container: {
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      overflow: 'auto',
      backgroundImage:
        "url('https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/V-_oS6r-i7wAAAAAAAAAAAAAFl94AQBr')",
      backgroundSize: '100% 100%',
    },
  };
});


const Login: React.FC = () => {
  // const [userLoginState, setUserLoginState] = useState<API.Response>({});
  const [type, setType] = useState<string>('account');
  const { initialState, setInitialState } = useModel('@@initialState');
  const { styles } = useStyles();
  const handleSubmit = async (values: API.UserLogin) => {
    // try {
      // 登录
      const msg = await postUserLogin({
        ...values,
      });
      if (msg.msg === 'ok') {
        const defaultLoginSuccessMessage = '登录成功！';
        message.success(defaultLoginSuccessMessage);
        // await fetchUserInfo();

        // 认证token
        if (msg.data?.token) {
          Auth.setToken(msg.data?.token, msg.data?.userRole);
        }

        setInitialState({
          ...initialState,
          currentUser: msg.data
        })

        // https://blog.csdn.net/LucklyTiger/article/details/131742896 前端框架问题
        setTimeout(()=>{
          const urlParams = new URL(window.location.href).searchParams;
          history.push(urlParams.get('redirect') || '/');
        },100)

        return;
      }
  };
  // const { status, type: loginType } = userLoginState;
  return (
    <div className={styles.container}>
      <Helmet>
        <title>
          {'登录'}- {Settings.title}
        </title>
      </Helmet>
      <div
        style={{
          flex: '1',
          padding: '32px 0',
        }}
      >
        <LoginForm
          contentStyle={{
            minWidth: 280,
            maxWidth: '75vw',
          }}
          logo={<img alt="logo" src="/logo.svg" />}
          title="前端模板"
          subTitle={'模板'}
          // initialValues={{
          //   autoLogin: true,
          // }}
          onFinish={async (values) => {
            await handleSubmit(values as API.UserLogin);
          }}
        >
          <Tabs
            activeKey={type}
            onChange={setType}
            centered
            items={[
              {
                key: 'account',
                label: '账户密码登录',
              },
            ]}
          />

          {/* {status === 'error' && loginType === 'account' && (
            <LoginMessage content={'错误的用户名和密码(admin/ant.design)'} />
          )} */}
          {type === 'account' && (
            <>
              <ProFormText
                name="account"
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined />,
                }}
                placeholder={'用户名: admin or user'}
                rules={[
                  {
                    required: true,
                    message: '用户名是必填项！',
                  },
                ]}
              />
              <ProFormText.Password
                name="password"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined />,
                }}
                placeholder={'密码: ant.design'}
                rules={[
                  {
                    required: true,
                    message: '密码是必填项！',
                  },
                ]}
              />
            </>
          )}

          {/* {status === 'error' && loginType === 'mobile' && <LoginMessage content="验证码错误" />} */}
        
          <div
            style={{
              marginBottom: 24,
            }}
          >
            <Space split={<Divider type='vertical'/>}>
            {/* <ProFormCheckbox noStyle name="autoLogin">
              自动登录
            </ProFormCheckbox> */}    
            <Link to="/user/register">新用户注册</Link>        
            <a
              style={{
                float: 'right',
              }}
            >
              忘记密码 ?
            </a>
            </Space>
          </div>
        </LoginForm>
      </div>
      <Footer />
    </div>
  );
};
export default Login;


