import { Cat, Cookie, Link2, Share2 } from "lucide-react";

interface Project {
  id: string;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  techIcons: string[]; // 기술 아이콘 이미지 경로 배열
  iconColor: string; // 아이콘 색상 (Tailwind CSS 클래스)
  backgroundColor: string; // 아이콘 배경 색상 (Tailwind CSS 클래스)
  period: string; // 개발 기간
  details: string; // 프로젝트 상세 내용
}

// 샘플 프로젝트 데이터 (나중에 실제 데이터로 교체 가능)
const PROJECTS_ARR: Project[] = [
  {
    id: "1",
    icon: Cat,
    title: "낚시냥",
    description: "귀여운 고양이를 육성하며 다양한 컨텐츠를 즐기는 webview 기반 게임",
    techIcons: [
      "/images/expo.png",
      "/images/nextjs.png",
      "/images/ts.png",
      "/images/zustand.png",
      "/images/styledcomponents.png",
    ],
    iconColor: "text-gray-500",
    backgroundColor: "bg-gray-500/10",
    period: "2024.07 ~ 현재", // 개발 기간
    details: "프로젝트 상세 내용을 여기에 작성합니다.",
  },
  {
    id: "2",
    icon: Cookie,
    title: "스낵",
    description:
      "스낵 웹에서 다양한 활동을 통해 포인트를 적립후, 다양한 상품을 구매할수 있는 웹 서비스",
    techIcons: [
      "/images/nextjs.png",
      "/images/ts.png",
      "/images/zustand.png",
      "/images/styledcomponents.png",
    ],
    iconColor: "text-purple-500", // 보라색
    backgroundColor: "bg-purple-500/10", // 보라색 배경
    period: "2023.09 ~ 2024.06", // 개발 기간
    details: "프로젝트 상세 내용을 여기에 작성합니다.",
  },
  {
    id: "3",
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
    details: "프로젝트 상세 내용을 여기에 작성합니다.",
  },
  {
    id: "4",
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
    details: "프로젝트 상세 내용을 여기에 작성합니다.",
  },
];

export default PROJECTS_ARR;
