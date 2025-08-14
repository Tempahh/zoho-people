/* eslint-disable @typescript-eslint/no-unused-vars */
import type { NextConfig } from "next";

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['contacts.zoho.com'], // add all external hosts you need
  },
};

export default nextConfig;
