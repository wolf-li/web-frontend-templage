import { ProCard } from '@ant-design/pro-components';
import { useRequest } from 'umi';
import { Card, Descriptions, Divider, Image } from 'antd';
import moment from 'moment';
import { userAvatarDefault } from '@/constant';
import { getUserCurrent } from '@/services/networktools/loginApi';


export default () => {

  const nullData = '无';

  const { data: currentUser } = useRequest(() => {
    return getUserCurrent();
  });

  const userRole = currentUser?.userRole === 0 ? '普通用户' : '管理员';

  const getAvatarURL = () => {
    if (currentUser) {
      if (currentUser.userAvatar) {
        return currentUser.userAvatar;
      }
      
      return userAvatarDefault;
    }
    return '';
  };

  return (
    <ProCard split="vertical">
      <ProCard title="头像" colSpan="23%">
        <Image
          width={300}
          src={getAvatarURL()}
          placeholder={
            <Image
              preview={false}
              src={getAvatarURL()}
              width={200}
            />
          }
        />
      </ProCard>
      <ProCard >
      <Card bordered={false}>
        <Descriptions title="个人信息" style={{ marginBottom: 32 }}>
          <Descriptions.Item label="账户">{currentUser?.account || nullData}</Descriptions.Item>
          <Descriptions.Item label="状态">{currentUser?.account ? '正常' : '异常'}</Descriptions.Item>
          <Descriptions.Item label="创建时间">{moment(currentUser?.createdat).format('YYYY年MM月DD日 HH:mm:ss')}</Descriptions.Item>
          <Descriptions.Item label="电话">{currentUser?.phone || nullData}</Descriptions.Item>
          <Descriptions.Item label="邮箱">{currentUser?.email || nullData}</Descriptions.Item>
          <Descriptions.Item label="性别">{currentUser?.gender === true ? '男' : currentUser?.gender === false ? '女' : '未知'}</Descriptions.Item>
          <Descriptions.Item label="角色">{userRole}</Descriptions.Item>
        </Descriptions>
        <Divider style={{ marginBottom: 32 }} />
        <Descriptions title="自我描述" style={{ marginBottom: 32 }}>
          <Descriptions.Item>{currentUser?.description || nullData}</Descriptions.Item>
        </Descriptions>
      </Card>
      </ProCard>
    </ProCard>
  );
};
