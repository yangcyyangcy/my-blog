/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    localPatterns: [
      {
        pathname: '/api/notion-image/**',
      },
      {
        pathname: '/api/notion-image',
      },
    ],
  },
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
