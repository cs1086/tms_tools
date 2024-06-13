
/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  compiler: {
    styledComponents: true,
  },
  icons: {
    icon: '/tego.png',
  },
  reactStrictMode: true,
  transpilePackages: [
    'rc-util',
    '@ant-design',
    'kitchen-flow-editor',
    '@ant-design/pro-editor',
    'zustand', 'leva', 'antd', 'babel','rc-tree',
    'rc-pagination',
    'rc-picker'
  ],
}
module.exports = nextConfig