import { Tiny } from '@ant-design/charts';
import { Line } from '@ant-design/plots';
import { ProCard, ProDescriptions, StatisticCard } from '@ant-design/pro-components';
import { useState } from 'react';
const { Statistic } = StatisticCard;

const Dashboard: React.FC = () => {
  const [responsive, setResponsive] = useState(false);
  const [date, setDate] = useState('');
  const getNewDate = () => {
    const time = new Date();
    const year = time.getFullYear();
    const month = time.getMonth() + 1;
    const day = time.getDate();
    const hours = time.getHours();
    const minuate = time.getMinutes();
    const seconde = time.getSeconds();
    const t = year + '年' + month + '月' + day + '日' + ' ' + hours + ':' + minuate + ':' + seconde;
    setDate(t);
  };
  setInterval(getNewDate, 1000);

  const data = [
    264, 417, 438, 887, 309, 397, 550, 575, 563, 430, 525, 592, 492, 467, 513, 546, 983, 340, 539,
    243, 226, 192,
  ].map((value, index) => ({ value, index }));
  const config1 = {
    data,
    width: 460,
    height: 100,
    padding: 8,
    shapeField: 'smooth',
    xField: 'index',
    yField: 'value',
    style: {
      fill: '#d6e3fd',
      fillOpacity: 0.6,
    },
  };

  const labelMap = {
    disk: '硬盘',
    raid: 'RAID类型',
  };

  const systemInfo = {
    systemSoftware: {
      version: 'v0.0.2',
      os: {
        name: 'CentOS Linux',
        version: '8.3.2011',
        kernel: '4.18.0-305.el8.x86_64',
      },
      database: {
        name: 'MySQL',
        version: '5.7.33',
      },
      webserver: {
        name: 'Apache',
        version: '2.4.41',
      },
      other: ['nginx', 'php', 'python', 'java'],
    },
    systemHardware: {
      cpu: {
        manufacturer: 'Intel',
        model: 'Xeon Gold 6248',
        cores: 20,
        threads: 40,
        frequency: '2.4 GHz',
        cache: '38.5 MB',
      },
      memory: {
        size: '128 GB',
        type: 'DDR4',
        speed: '2666 MHz',
        swapsize: '1 GB',
      },
      storage: {
        disk: [
          {
            type: 'SSD',
            size: '480 GB',
            interface: 'NVMe',
            rpm: '',
          },
          {
            type: 'HDD',
            size: '4 TB',
            interface: 'SATA',
            rpm: '7200 rpm',
          },
        ],
        raid: 'RAID 1',
      },
      network: {
        interfaces: [
          {
            name: 'eth0',
            speed: '10 Gbps',
          },
          {
            name: 'eth1',
            speed: '1 Gbps',
          },
        ],
      },
    },
  };

  const percent = 0.7;
  const config = {
    percent,
    width: 120,
    height: 120,
    color: ['#E8EFF5', '#66AFF4'],
    annotations: [
      {
        type: 'text',
        style: {
          text: `${percent * 100}%`,
          x: '50%',
          y: '50%',
          textAlign: 'center',
          fontSize: 16,
          fontStyle: 'bold',
        },
      },
    ],
  };

  return (
    <>
      <ProCard
        gutter={[16, 16]}
        title="系统运行情况"
        extra={date}
        split={responsive ? 'horizontal' : 'vertical'}
        headerBordered
      ></ProCard>

      <br />

      <ProCard gutter={[16, 16]}>
        <ProCard split="horizontal" colSpan="70%" title="资源使用" headerBordered>
          <ProCard split="vertical">
            <StatisticCard
              chartPlacement="right"
              statistic={{
                title: 'CPU使用率',
                value: 17,
                precision: 2,
                suffix: '%',
              }}
              chart={<Tiny.Ring {...config} />}
              footer={
                <>
                  <Statistic
                    value={systemInfo.systemHardware.cpu.threads}
                    title="CPU核数:"
                    layout="horizontal"
                  />
                </>
              }
            />
            <StatisticCard
              chartPlacement="right"
              statistic={{
                title: '内存占用率',
                value: 13.2,
                precision: 2,
                suffix: '%',
              }}
              chart={<Tiny.Ring {...config} />}
              footer={
                <>
                  <Statistic
                    value={systemInfo.systemHardware.memory.size}
                    title="物理内存:"
                    layout="horizontal"
                  />
                  <Statistic
                    value={systemInfo.systemHardware.memory.swapsize}
                    title="交换分区:"
                    layout="horizontal"
                  />
                </>
              }
            />
            <StatisticCard
              chartPlacement="right"
              statistic={{
                title: '磁盘使用率',
                value: 17,
                precision: 2,
                suffix: '%',
              }}
              chart={<Tiny.Ring {...config} />}
              footer={
                <>
                  {systemInfo.systemHardware.storage.disk.map((item, index) => (
                    <div key={index}>
                      <Statistic
                        value={item.size}
                        title={'磁盘' + index + '的容量: '}
                        layout="horizontal"
                      />
                    </div>
                  ))}
                </>
              }
            />
          </ProCard>
          <ProCard>
            <StatisticCard title="网卡1状态" chart={<Line {...config1} />} />
            <StatisticCard title="网卡2状态" chart={<Line {...config1} />} />
          </ProCard>
        </ProCard>

        <ProCard direction="column">
          <ProCard title="系统硬件信息" type="inner" bordered>
            <ProDescriptions column={1}>
              <ProDescriptions.Item label="CPU 型号">
                {systemInfo.systemHardware.cpu.manufacturer +
                  ' ' +
                  systemInfo.systemHardware.cpu.model +
                  '' +
                  systemInfo.systemHardware.cpu.frequency +
                  ' ' +
                  systemInfo.systemHardware.cpu.cache}
              </ProDescriptions.Item>
              <ProDescriptions.Item label="内存型号">
                {Object.entries(systemInfo.systemHardware.memory).map(([key, value]) => (
                  <div key={key}>{value}&nbsp;</div>
                ))}
              </ProDescriptions.Item>
              {Object.entries(systemInfo.systemHardware.storage).map(([key, value]) => (
                <ProDescriptions.Item label={labelMap[key] || key} key={key}>
                  {typeof value === 'object' ? (
                    <ul>
                      {Object.values(value).map((item, index) => (
                        <li key={index}>
                          {Object.values(item).join(' ')} {/* 使用空格分隔各个属性值 */}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <span>{value}</span>
                  )}
                </ProDescriptions.Item>
              ))}
            </ProDescriptions>
          </ProCard>
          <br />
          <ProCard title="系统软件信息" type="inner" bordered>
            <ProDescriptions column={1}>
              <ProDescriptions.Item label="系统版本">
                {systemInfo.systemSoftware.version}
              </ProDescriptions.Item>
              <ProDescriptions.Item label="操作系统">
                {systemInfo.systemSoftware.os.name + ' ' + systemInfo.systemSoftware.os.version}
              </ProDescriptions.Item>
              <ProDescriptions.Item label="内核版本">
                {systemInfo.systemSoftware.os.kernel}
              </ProDescriptions.Item>
              <ProDescriptions.Item label="MySQL数据库">
                {systemInfo.systemSoftware.database.name +
                  ' ' +
                  systemInfo.systemSoftware.database.version}
              </ProDescriptions.Item>
              <ProDescriptions.Item label="Web服务">
                {systemInfo.systemSoftware.webserver.name +
                  ' ' +
                  systemInfo.systemSoftware.webserver.version}
              </ProDescriptions.Item>
              <ProDescriptions.Item label="其他">
                {Object.entries(systemInfo.systemSoftware.other).map(([key, value]) => (
                  <div key={key}>{value}&nbsp;</div>
                ))}
              </ProDescriptions.Item>
            </ProDescriptions>
          </ProCard>
        </ProCard>
      </ProCard>
    </>
  );
};

export default Dashboard;
