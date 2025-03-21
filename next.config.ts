import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "standalone",
  images: {
    domains: ["img.freepik.com", "karirlab-prod-bucket.s3.ap-southeast-1.amazonaws.com", "arkavidia-fp.s3.ap-southeast-3.amazonaws.com", "fpswe.s3.ap-southeast-1.amazonaws.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.freepik.com",
        port: "",
        pathname: "/**",
        search: "",
      },
      {
       
        protocol: "https",
        hostname: "karirlab-prod-bucket.s3.ap-southeast-1.amazonaws.com",
        port: "",
        pathname: "/**",
        search: "",
      },
      {
        protocol: "https",
        hostname: "arkavidia-fp.s3.ap-southeast-3.amazonaws.com",
        port: "",
        pathname: "/**",
        search: "",
      },{
        protocol: "https",
        hostname: "fpswe.s3.ap-southeast-1.amazonaws.com",
        port: "",
        pathname: "/**",
        search: "",
      }
    ],
  },
};

export default nextConfig;
