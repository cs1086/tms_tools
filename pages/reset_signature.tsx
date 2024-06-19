import React, { useEffect, useState } from 'react';
import CustomLayout from '../components/Layout';
import { AutoComplete, Breadcrumb, Button, Input, InputNumber, Space } from 'antd';
import { HomeOutlined, QrcodeOutlined, SendOutlined, SignatureOutlined } from '@ant-design/icons';
import axios from 'axios';
import CustomSpin from '../components/CustomSpin';

const Tools: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [deliveryId, setDeliveryId] = useState("");
  const requestData = (event: any) => {
    setLoading(true);
    axios.post<Boolean>(`http://192.168.0.118:3001/api/data/resetSignature/dev`, {
      deliveryId: deliveryId,
    })
      .then(response => {
        console.log("收到的回應是=" + response.data)
        setLoading(false);
      })
      .catch(error => {
        setLoading(false);
      });
  };
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
                <SignatureOutlined />
                <span>重置簽名</span>
              </>
            ),
          },
        ]}
      /><br /><Space>
          <Input placeholder="請輸入deliveryId" style={{ width: 300 }} value={deliveryId} onChange={(event) => {
            setDeliveryId(event.target.value)
          }} />
          <Button type="primary" icon={<SendOutlined />} iconPosition="start" onClick={requestData}>
            Submit
          </Button>
        </Space></div>}

    </CustomLayout>
  );
};

export default Tools;