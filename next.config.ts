import type { NextConfig } from "next";
import createMdx from "@next/mdx";
import remarkGfm from "remark-gfm";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        hostname: "picsum.photos",
      },
      {
        hostname: "images.unsplash.com",
      },
      {
        hostname: "prod-files-secure.s3.us-west-2.amazonaws.com",
      },
      {
        hostname: "www.notion.so",
      },
    ],
  },
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx", "md"],
};

const withMdx = createMdx({
  options: {
    remarkPlugins: [remarkGfm],
  },
});

export default withMdx(nextConfig);
