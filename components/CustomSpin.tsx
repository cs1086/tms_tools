import React from 'react';
import { Alert, Flex, Spin } from 'antd';

const contentStyle: React.CSSProperties = {
  padding: 50,
  background: 'rgba(0, 0, 0, 0.05)',
  borderRadius: 4,
};

const content = <div style={contentStyle} />;

const CustomSpin: React.FC = () => (
  <Spin tip="Loading" size="large">
    {content}
  </Spin>
);

export default CustomSpin;