import { ReactNode } from "react";

import AboutSidebar from "@/app/about/_components/AboutSidebar";

interface AboutLayoutProps {
  children: ReactNode;
}

export default function AboutLayout({ children }: AboutLayoutProps) {
  return (
    <div className="container py-8">
      <div className="flex flex-col gap-8 md:flex-row">
        {/* 사이드바 */}
        <AboutSidebar />

        {/* 메인 콘텐츠 */}
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}
