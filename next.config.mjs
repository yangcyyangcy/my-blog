/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        // 只有输入这串特定路径才能跳转到后台
        source: '/yancey.blog.outstatic',
        destination: '/outstatic',
        permanent: false,
      },
    ]
  },
}

export default nextConfig
