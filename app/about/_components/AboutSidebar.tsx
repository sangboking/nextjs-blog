"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Code2, User, Briefcase, Github } from "lucide-react";

const menuItems = [
  { icon: User, label: "프로필", href: "/about" },
  { icon: Code2, label: "기술 스택", href: "/about/skills" },
  { icon: Briefcase, label: "프로젝트", href: "/about/projects" },
  { icon: Github, label: "Github", href: "https://github.com/sangboking", external: true },
];

export default function AboutSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-full shrink-0 md:w-64">
      <nav className="bg-card sticky top-8 space-y-1 rounded-lg border p-4">
        {menuItems.map((item) => {
          const IconComponent = item.icon;
          // 현재 경로와 메뉴 href 비교 (외부 링크는 제외)
          const isActive = !item.external && pathname === item.href;

          return (
            <Link
              key={item.label}
              href={item.href}
              className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors ${
                isActive
                  ? "bg-accent text-accent-foreground font-medium"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              }`}
              {...(item.external && {
                target: "_blank",
                rel: "noopener noreferrer",
              })}
            >
              <IconComponent className="h-4 w-4" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
