import React, { useEffect, useState } from 'react';
import CustomLayout from '../components/Layout';
import { AutoComplete, Breadcrumb, Button, Input, Space } from 'antd';
import { EditOutlined, HomeOutlined, QrcodeOutlined, SendOutlined } from '@ant-design/icons';
import axios from 'axios';
import CustomSpin from '../components/CustomSpin';

const Tools: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [saleOrderId, setSaleOrderId] = useState("");
  const [driverUid, setDriverUid] = useState("");
  const [options, setOptions] = useState<{ value: string }[]>([]);
  const getPanelValue = (searchText: string) =>
    !searchText ? [] : [{ value: searchText }];
  const onSelect = (data: string) => {
    setDriverUid(data)

  };
  const requestData = (event: any) => {
    setLoading(true);
    axios.post<Boolean>(`http://192.168.0.118:3001/api/data/arrange_order/dev`, {
      saleOrderId: saleOrderId,
      driverUid: driverUid
    })
      .then(response => {
        console.log("收到的回應是=" + response.data)
        setLoading(false);
        console.log("檢查重複.driverUid=" + driverUid + ",options=" + options.map(op => op.value) + ",結果=" + !options.map(op => op.value).includes(driverUid))
        if (driverUid && !options.map(op => op.value).includes(driverUid)) {
          console.log("沒有重複" + response.data)
          const newItems = [...options, { value: driverUid }];
          localStorage.setItem('driverUidList', JSON.stringify(newItems));
        }
      })
      .catch(error => {
        setLoading(false);
      });
  };
  useEffect(() => {
    const savedItems = localStorage.getItem('driverUidList');
    if (savedItems) {
      setOptions(JSON.parse(savedItems));
    }
  }, []);
  return (
    <CustomLayout>
      {loading ? <CustomSpin /> : <div><Breadcrumb
        items={[
          {
            href: '',
            title: <HomeOutlined />,
          },
          {
            href: '',
            title: (
              <>
                <EditOutlined />
                <span>安排訂單</span>
              </>
            ),
          },
        ]}
      /><br /><Space>
          <Input placeholder="訂單編號" value={saleOrderId} onChange={(event) => {
            setSaleOrderId(event.target.value)
          }} />
          <AutoComplete
            options={options}
            style={{ width: 300 }}
            onSelect={onSelect}
            onChange={onSelect}
            //onSearch={(text) => setOptions(getPanelValue(text))}
            placeholder="司機uid"
          />
          {/* <Input placeholder="司機uid" value={driverUid} onChange={(event) => {
          setDriverUid(event.target.value)
        }} /> */}
          <Button type="primary" icon={<SendOutlined />} iconPosition="start" onClick={requestData}>
            Submit
          </Button>
        </Space></div>}

    </CustomLayout>
  );
};

export default Tools;