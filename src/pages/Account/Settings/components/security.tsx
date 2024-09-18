import { putUserPassword } from '@/services/networktools/loginApi';
import { ActionType, ModalForm, ProFormText } from '@ant-design/pro-components';
import { Button, List, message } from 'antd';
import React, { useRef, useState } from 'react';

type Unpacked<T> = T extends (infer U)[] ? U : T;

/**
 * @en-US Add node
 * @zh-CN 添加节点
 * @param fields
 */
const handleAdd = async (fields: API.UserSecurityPasswordChange) => {
  // const hide = message.loading('正在添加');
  const msg = await putUserPassword({
    ...fields,
  });
  // hide();
  if (msg.msg === 'ok') {
    message.success(msg.data);
    return true;
  }
};

const passwordStrength = {
  strong: <span className="strong">强</span>,
  medium: <span className="medium">中</span>,
  weak: <span className="weak">弱 Weak</span>,
};

const SecurityView: React.FC = () => {
  /**
   * @en-US Pop-up window of new window
   * @zh-CN 新建窗口的弹窗
   *  */
  const [createModalOpen, handleModalOpen] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();

  const getData = () => [
    {
      title: '账户密码',
      description: (
        <>
          当前密码强度：
          {passwordStrength.strong}
        </>
      ),
      actions: [
        <Button
          type="primary"
          key="primary"
          onClick={() => {
            handleModalOpen(true);
          }}
        >
          修改
        </Button>,
      ],
    },
    {
      title: '密保手机',
      description: `已绑定手机：138****8293`,
      actions: [<a key="Set">修改</a>],
    },
    // {
    //   title: '密保问题',
    //   description: '未设置密保问题，密保问题可有效保护账户安全',
    //   actions: [<a key="Set">设置</a>],
    // },
    // {
    //   title: '备用邮箱',
    //   description: `已绑定邮箱：ant***sign.com`,
    //   actions: [<a key="Modify">修改</a>],
    // },
    // {
    //   title: 'MFA 设备',
    //   description: '未绑定 MFA 设备，绑定后，可以进行二次确认',
    //   actions: [<a key="bind">绑定</a>],
    // },
  ];

  const data = getData();
  return (
    <>
      <List<Unpacked<typeof data>>
        itemLayout="horizontal"
        dataSource={data}
        renderItem={(item) => (
          <List.Item actions={item.actions}>
            <List.Item.Meta title={item.title} description={item.description} />
          </List.Item>
        )}
      />

      <ModalForm
        title={'密码修改'}
        width="400px"
        open={createModalOpen}
        onOpenChange={handleModalOpen}
        onFinish={async (value) => {
          const success = await handleAdd(value as API.UserSecurityPasswordChange);
          if (success) {
            handleModalOpen(false);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
      >
        <ProFormText
          rules={[
            {
              required: true,
            },
          ]}
          width="md"
          name="oldpassword"
          label="旧密码"
          placeholder="必填"
        />

        <ProFormText
          rules={[
            {
              required: true,
            },
          ]}
          width="md"
          name="password"
          label="新密码"
          placeholder="必填"
        />

        <ProFormText
          rules={[
            {
              required: true,
            },
          ]}
          width="md"
          name="repassword"
          label="确认新密码"
          placeholder="必填"
        />
      </ModalForm>

    </>
  );
};

export default SecurityView;
