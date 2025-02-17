import { withNextVideo } from "next-video/process";

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["localhost", "res.cloudinary.com"],
  },
};

export default withNextVideo(nextConfig);
