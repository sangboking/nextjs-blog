"use client";

import Giscus from "@giscus/react";
import { useTheme } from "next-themes";

export default function GiscusComments() {
  const { theme } = useTheme();

  return (
    <Giscus
      repo="sangboking/nextjs-blog-giscus"
      repoId="R_kgDOPrucGA"
      category="Announcements"
      categoryId="DIC_kwDOPrucGM4CvH0_"
      mapping="pathname"
      strict="0"
      reactionsEnabled="1"
      emitMetadata="0"
      inputPosition="top"
      theme={theme === "dark" ? "dark" : "light"}
      lang="ko"
    />
  );
}
