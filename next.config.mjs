/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/admin',
        destination: '/outstatic',
        permanent: false,
      },
    ]
  },
}

export default nextConfig
