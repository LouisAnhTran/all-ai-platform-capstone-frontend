import React from 'react'
import type { CSSProperties, FC } from 'react'
import { Alert, Flex, Spin } from 'antd';

const contentStyle: CSSProperties = {
  padding: 50,
  background: 'rgba(0, 0, 0, 0.05)',
  borderRadius: 4,
};

const content = <div style={contentStyle} />;

const Spinner: FC = () => (
 

      <Spin tip="Loading" size="large">
        {content}
      </Spin>




);

export default Spinner;
