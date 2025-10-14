import Link from "next/link";

import { ThemeToggle } from "@/components/theme/ThemeToggle";

export default function Header() {
  return (
    <header className="bg-background sticky top-0 z-50 border-b">
      <div className="container flex h-[var(--header-height)] items-center px-4">
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-semibold">
              <span className="font-bold">상코딩 블로그</span>
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <nav className="flex items-center gap-4">
              <Link href="/about" className="hover:text-primary font-medium">
                소개
              </Link>
            </nav>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}
