/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images:{
    unoptimized: true,
    domains:['ipfs.io','static-nft.pancakeswap.com','gateway.pinata.cloud','pancakeswap.finance','avatars.dicebear.com','cdn.sanity.io']
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
}

module.exports = nextConfig
