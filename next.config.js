/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images:{
    unoptimized: true,
    domains:['ipfs.io','static-nft.pancakeswap.com','gateway.pinata.cloud','pancakeswap.finance','avatars.dicebear.com','cdn.sanity.io']
  }
}

module.exports = nextConfig
