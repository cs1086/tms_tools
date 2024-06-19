import React, { useEffect, useState } from 'react';
import CustomLayout from '../components/Layout';
import { AutoComplete, Breadcrumb, Button, Input, InputNumber, Space, message } from 'antd';
import { HomeOutlined, QrcodeOutlined, RedoOutlined, SendOutlined } from '@ant-design/icons';
import axios from 'axios';
import CustomSpin from '../components/CustomSpin';

const Tools: React.FC = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [loading, setLoading] = useState<boolean>(false);
  const [deliveryPlanId, setDeliveryPlanId] = useState(0);
  const onChange = (data: number | null) => {
    if (data !== null && Number.isInteger(data) && data > 0)
      setDeliveryPlanId(data)
  };
  const requestData = (event: any) => {
    setLoading(true);
    axios.post<Boolean>(`http://192.168.0.118:3001/api/data/reset_itinerary/dev`, {
      deliveryPlanId: deliveryPlanId,
    })
      .then(response => {
        console.log("收到的回應是=" + response.data)
        if (response.data) {
          messageApi.open({
            type: 'success',
            content: 'success',
          });
        } else {
          messageApi.open({
            type: 'error',
            content: 'fail',
          });
        }
        setLoading(false);
      })
      .catch(error => {
        setLoading(false);
      });
  };
  return (
    <CustomLayout>
      {loading ? <CustomSpin /> : <div>{contextHolder}<Breadcrumb
        items={[
          {
            href: '',
            title: <HomeOutlined />,
          },
          {
            href: '',
            title: (
              <>
                <RedoOutlined />
                <span>重置訂單初始推播</span>
              </>
            ),
          },
        ]}
      /><br /><Space>
          <p>請輸入deliveryPlanId </p><InputNumber min={1} onChange={onChange} value={deliveryPlanId} />
          <Button type="primary" icon={<SendOutlined />} iconPosition="start" onClick={requestData}>
            Submit
          </Button>
        </Space></div>}

    </CustomLayout>
  );
};

export default Tools;