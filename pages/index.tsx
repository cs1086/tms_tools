import axios from 'axios';
import { NextPage } from 'next';
import { SetStateAction, useEffect, useState } from 'react';
import CustomLayout from '../components/Layout';
import CustomSpin from '../components/CustomSpin';
import Barcode from 'react-barcode';
import Head from 'next/head';
import { Breadcrumb, Button, Flex, Input, Popover, QRCode, Segmented, Select, Space, Typography, Watermark } from 'antd';
import { HomeOutlined, QrcodeOutlined, RedoOutlined, SearchOutlined, UserOutlined } from '@ant-design/icons';
import Paragraph from 'antd/es/typography/Paragraph';

const statusList: string[] = ["異常", "待付款", "排程中", "待取件", "已取件-運送中", "已抵達集貨地", "集貨地轉運中", "已抵達客戶端集貨地", "已取件向客戶端-運送中", "已取消", "已送達", "已送達 & 已簽收", "已完成且部份取消", "已完成", "已全部取消", "異常"];
interface Data {
  deliveryPlanId: string;
  deliveryId: string;
  packageStatusId: number;
  clientBarCodeTypeId: number;
  enableClientData: boolean;
  description: string;
  sid: string;
  salesOrderId: string;
  pkgPhoto: string;
  resetPhoto: string;
  nocontactPhoto: string;
  signPhoto: string;
  signVideo: string;
}
const centeredStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flex: 1,
};
const Home: NextPage = () => {
  const [dataList, setDataList] = useState<Data[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [deliveryPlanId, setDeliveryPlanId] = useState("0");
  const [mobile, setmobile] = useState("+61741852963");
  const [server, setServer] = useState('dev');
  const [imgDomain, setImgDomain] = useState('https://tms-dev-files.s3-ap-southeast-1.amazonaws.com');
  const [urlDomain, setUrlDomain] = useState('https://tms-dev.holieninnovation.com.tw');
  const [maxLength, setMaxLength] = useState(50);
  const handleChange = (value: string) => {
    setServer(value);
    console.log("event.target.value=" + value);
    switch (value) {

      case 'dev':
        setImgDomain("https://tms-dev-files.s3-ap-southeast-1.amazonaws.com")
        setUrlDomain("https://tms-dev.holieninnovation.com.tw")
        break;
      case 'uat':
        setImgDomain("https://tms-uat-files.s3-ap-southeast-2.amazonaws.com")
        setUrlDomain("https://tms-uat.senditgo.com")
        break;
      default:
        setImgDomain("")
    }
  };
  const handleMoblieChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value
    setmobile(inputValue);
    setMaxLength(inputValue.startsWith('+61') ? 12 : inputValue.startsWith('+886') ? 13 : 50);
  };

  const requestData = (event: any) => {
    setLoading(true);
    axios.get<Data[]>(`http://192.168.0.118:3001/api/data/${server}/${mobile}`)
      .then(response => {
        setDataList(response.data);
        setLoading(false);
      })
      .catch(error => {
        setLoading(false);
      });
  };
  const content = (
    <div>
      <p>請輸入電話(會找app最近上傳gps的那個行程)</p>
    </div>
  );
  return (<CustomLayout>

    {
      loading ? <CustomSpin /> : <div style={{ textAlign: 'center' }}>

        <Breadcrumb
          items={[
            {
              href: '',
              title: <HomeOutlined />,
            },
            {
              href: '',
              title: (
                <>
                  <QrcodeOutlined />
                  <span>訂單條碼</span>
                </>
              ),
            },
          ]}
        />
        <Space direction="vertical">
          <div>
            <Paragraph>
              服務器：
              {/* <Select
                defaultValue='dev'
                value={server}
                onChange={handleChange}
                options={[
                  { value: 'dev', label: 'dev' },
                  { value: 'uat', label: 'uat' },
                  { value: 'prod', label: 'prod' }
                ]}
              /> */}
              <Segmented
                options={['dev', 'uat', 'prod']}
                value={server}
                onChange={handleChange}
              />
            </Paragraph>



          </div>
          <Space>
            <Input placeholder="請輸入電話" value={mobile} onChange={handleMoblieChange} maxLength={maxLength} style={{ width: '140px' }} />
            <Popover content={content} title="Title">
              <Button key="a" type="primary" icon={<SearchOutlined />} onClick={requestData}>
                Search
              </Button>
            </Popover>
          </Space>
          <div style={{ textAlign: 'center' }}>
            <Watermark content="TMS">
              {dataList?.map(item => (
                <div style={{ height: '700px', border: "1px solid black", borderCollapse: "collapse", padding: "10px" }}>
                  <Flex align="center" justify="space-around">
                    <Space direction="vertical" align="start">
                      <span style={{ fontSize: '20px' }}>deliveryPlanId：<span style={{ color: "red" }}>{item.deliveryPlanId}</span></span>
                      <span style={{ fontSize: '20px' }}>deliveryId：<span style={{ color: "red" }}>{item.deliveryId}({statusList[item.packageStatusId]})</span></span>
                    </Space>
                    <div style={{ margin: '20px' }}>
                      {item.clientBarCodeTypeId != 2 ? <Barcode value={item.enableClientData ? item.description : item.sid} /> :
                        <Space direction="vertical" align="center">
                          <QRCode value={item.enableClientData ? item.description : urlDomain + "/redirect/delivery?salesOrderId=" + item.salesOrderId + "&sid=" + item.sid} />
                          <p>{item.enableClientData ? item.description : item.sid}</p>
                        </Space>
                      }
                    </div>
                  </Flex>
                  <div>
                    <table align="center" style={{ border: "1px solid black", borderCollapse: "collapse" }}>
                      <tr style={{ backgroundColor: 'lightblue' }}><td style={{ border: "1px solid black" }}>包裹照片</td><td style={{ border: "1px solid black" }}>重置照片</td><td style={{ border: "1px solid black" }}>無接觸照片</td><td style={{ border: "1px solid black" }}>簽名照片</td><td style={{ border: "1px solid black" }}>簽名錄影</td></tr>
                      <td style={{ verticalAlign: 'middle', border: "1px solid black" }}>{item.pkgPhoto != null ? <img src={imgDomain + item.pkgPhoto} alt="描述文字" style={{ height: '300px' }} /> : <span></span>}</td>
                      <td style={{ verticalAlign: 'middle', border: "1px solid black" }}>{item.resetPhoto != null ? <img src={imgDomain + item.resetPhoto} alt="描述文字" style={{ height: '300px' }} /> : <span></span>}</td>
                      <td style={{ verticalAlign: 'middle', border: "1px solid black" }}>{item.nocontactPhoto != null ? <img src={imgDomain + item.nocontactPhoto} alt="描述文字" style={{ height: '300px' }} /> : <span></span>}</td>
                      <td style={{ verticalAlign: 'middle', border: "1px solid black" }}>{item.signPhoto != null ? <img src={imgDomain + item.signPhoto} alt="描述文字" style={{ height: '300px' }} /> : <span></span>}</td>
                      <td style={{ verticalAlign: 'middle', border: "1px solid black" }}>{item.signVideo != null ? <video width="320" height="240" controls>
                        <source src={imgDomain + item.signVideo} type="video/mp4" />
                        您的浏览器不支持 video 标签。
                      </video> : <span></span>}</td>
                    </table>
                  </div>
                </div>
              ))}
            </Watermark>
          </div>
        </Space>

      </div>
    }
  </CustomLayout>)
}
export default Home