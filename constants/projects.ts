import { BookOpen, Cat, Cookie, Link2, Share2 } from "lucide-react";
import type React from "react";

// 프로젝트 상세내용을 "대제목 + 항목 리스트" 형태로 표현하기 위한 타입
export interface ProjectDetailSection {
  title: string; // 예: "1. 대제목"
  items: string[]; // 예: ["내용", "내용"]
}

interface Project {
  id: string;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  techIcons: string[]; // 기술 아이콘 이미지 경로 배열
  iconColor: string; // 아이콘 색상 (Tailwind CSS 클래스)
  backgroundColor: string; // 아이콘 배경 색상 (Tailwind CSS 클래스)
  period: string; // 개발 기간
  url?: string; // 프로젝트 링크 (선택)
  details: ProjectDetailSection[]; // 프로젝트 상세 내용 (섹션 배열)
}

// 샘플 프로젝트 데이터 (나중에 실제 데이터로 교체 가능)
const PROJECTS_ARR: Project[] = [
  {
    id: "1",
    icon: BookOpen,
    title: "상코딩 블로그",
    description: "프론트엔드 기술에 대한 글과, 개인 소개 포트폴리오 웹사이트",
    techIcons: ["/images/nextjs.png", "/images/ts.png", "/images/tailwind.png"],
    iconColor: "text-indigo-600 dark:text-indigo-400",
    backgroundColor: "bg-indigo-500/10 dark:bg-indigo-400/15",
    period: "2025.08 ~ 2026.01", // 개발 기간
    url: "https://github.com/sangboking/nextjs-blog",
    details: [
      {
        title: "1. 프로젝트 개요",
        items: ["프론트엔드 기술을 사용하며 정리한 글과, 개인 프로젝트 및 소개 블로그 웹사이트"],
      },
      {
        title: "2. 개발 내용",
        items: [
          "nextjs 기반 블로그 사이트 개발",
          "Cursor Ai를 통한 Ai 툴 기능 연습",
          "notion api를 통한 블로그 글 조회 로직 개발",
        ],
      },
    ],
  },
  {
    id: "2",
    icon: Cat,
    title: "낚시냥",
    description: "귀여운 고양이를 육성하며 다양한 컨텐츠를 즐기는 웹뷰 기반 게임",
    techIcons: [
      "/images/expo.png",
      "/images/nextjs.png",
      "/images/ts.png",
      "/images/zustand.png",
      "/images/styledcomponents.png",
    ],
    iconColor: "text-gray-500",
    backgroundColor: "bg-gray-500/10",
    period: "2024.07 ~ 2026.01", // 개발 기간
    details: [
      {
        title: "1. 프로젝트 개요",
        items: ["고양이가 낚시를 통한 물고기 획득후 다양한 컨텐츠를 즐기는 웹뷰 기반 게임"],
      },
      {
        title: "2. 개발 내용",
        items: [
          "nextjs 기반 낚시냥 웹 사이트 개발",
          "expo를 통한 웹과 앱의 연동",
          "유저가 낚시대를 걸어 놓으면 일정시간 대기후 아이템 획득 하는 로직 개발",
          "유저간 고양이 배틀 로직 개발",
          "일간, 주간, 월간 출석체크 및 리워드 획득 기능 개발",
          "expo를 통한 Googld Ad 기능 개발",
          "낚시냥 admin 사이트 개발",
        ],
      },
    ],
  },
  {
    id: "3",
    icon: Cookie,
    title: "스낵",
    description:
      "스낵 웹에서 켐페인 활동을 통해 포인트를 적립후, 다양한 상품을 구매할수 있는 웹 서비스",
    techIcons: [
      "/images/nextjs.png",
      "/images/ts.png",
      "/images/zustand.png",
      "/images/styledcomponents.png",
    ],
    iconColor: "text-purple-500", // 보라색
    backgroundColor: "bg-purple-500/10", // 보라색 배경
    period: "2023.09 ~ 2024.06", // 개발 기간
    details: [
      {
        title: "1. 프로젝트 개요",
        items: [
          "관리자가 올린 광고 게시물에 대한 유저의 활동(좋아요, 댓글, 개인 블로그,sns 홍보)시 포인트 제공",
          "유저는 획득한 포인트로 기프티콘(네이버페이 상품권, 프렌차이즈 쿠폰 등) 구매가능",
        ],
      },
      {
        title: "2. 개발 내용",
        items: [
          "nextjs 기반 스낵 웹사이트 개발",
          "kakao, naver, facebook 간편 로그인 기능 개발",
          "유튜브 쇼츠와 같은 숏폼 형태 동영상 컨텐츠 개발",
          "유저들이 자유롭게 사용하는 게시글, 댓글 기능 개발",
          "스낵 웹과 기프티콘 사이트 연동 로직 개발",
          "스낵 유저를 관리하는 admin 사이트 개발",
        ],
      },
    ],
  },
  {
    id: "4",
    icon: Link2,
    title: "링커 오캐스트",
    description: "광고주와 매체사를 연결해주며, 이미지 or 영상 광고를 관리해주는 웹 서비스",
    techIcons: [
      "/images/nextjs.png",
      "/images/ts.png",
      "/images/recoil.png",
      "/images/styledcomponents.png",
    ],
    iconColor: "text-green-500", // 초록색
    backgroundColor: "bg-green-500/10", // 초록색 배경
    period: "2022.12 ~ 2023.08", // 개발 기간
    details: [
      {
        title: "1. 프로젝트 개요",
        items: [
          "광고주와 매체사의 이미지, 영상 데이터 관리",
          "키오스크 업체와 광고(사진, 영상) 데이터 연동",
        ],
      },
      {
        title: "2. 개발 내용",
        items: [
          "nextjs 기반의 링커 오캐스트 웹사이트 개발",
          "광고주와 매체사의 광고 관리 및 대쉬보드 제작",
        ],
      },
    ],
  },
  {
    id: "5",
    icon: Share2,
    title: "링커",
    description: "sns를 연동하여, 개인 또는 회사의 연동된 sns를 관리할수 있는 웹 서비스",
    techIcons: [
      "/images/react.png",
      "/images/ts.png",
      "/images/recoil.png",
      "/images/styledcomponents.png",
    ],
    iconColor: "text-blue-500", //
    backgroundColor: "bg-blue-500/10", //
    period: "2022.04 ~ 2022.11", // 개발 기간
    details: [
      {
        title: "1. 프로젝트 개요",
        items: ["링커와 sns 계정 연동", "링커에서 sns의 게시물 포스팅 및 일정 관리 기능"],
      },
      {
        title: "2. 개발 내용",
        items: [
          "react 기반의 링커 웹사이트 개발",
          "facebook, instagram 계정 연동 기능 개발",
          "facebook, instagram 게시글 포스팅, 수정, 삭제 기능 개발",
          "sns 포스팅 게시물 달력기반 UI 개발",
        ],
      },
    ],
  },
];

export default PROJECTS_ARR;
