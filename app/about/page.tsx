import Image from "next/image";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, GraduationCap, User, Briefcase, Building2 } from "lucide-react";

const About = () => {
  return (
    <div>
      <div className="space-y-8">
        {/* 프로필 섹션 */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {/* 프로필 이미지 카드 */}
          <Card className="md:col-span-1">
            <CardContent className="p-6">
              <div className="flex flex-col items-center space-y-4">
                <div className="h-32 w-32 overflow-hidden rounded-full">
                  <Image
                    src="/images/profile.jpeg"
                    alt="박상훈 프로필"
                    width={128}
                    height={128}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="text-center">
                  <h2 className="text-2xl font-bold">박상훈</h2>
                  <p className="text-primary font-medium">Frontend Developer</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 개인 정보 카드 */}
          <Card className="pt-6 pb-6 md:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                기본 정보
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="bg-muted/50 flex items-center gap-3 rounded-lg p-3">
                  <User className="text-primary h-4 w-4" />
                  <div>
                    <p className="text-muted-foreground text-sm">이름</p>
                    <p className="font-medium">박상훈</p>
                  </div>
                </div>

                <div className="bg-muted/50 flex items-center gap-3 rounded-lg p-3">
                  <Calendar className="text-primary h-4 w-4" />
                  <div>
                    <p className="text-muted-foreground text-sm">출생년도</p>
                    <p className="font-medium">1997.05.19</p>
                  </div>
                </div>
              </div>

              <div className="bg-muted/50 flex items-center gap-3 rounded-lg p-3">
                <GraduationCap className="text-primary h-4 w-4" />
                <div>
                  <p className="text-muted-foreground text-sm">학력</p>
                  <p className="font-medium">호서대학교 - 컴퓨터공학과</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 소개 섹션 */}
        <Card className="py-5">
          <CardContent>
            {/* 회사 이력 섹션 */}
            <div className="flex flex-col gap-6 md:flex-row md:items-start">
              {/* 입사 일자 */}
              <div className="bg-primary/10 flex shrink-0 items-center gap-2 rounded-lg p-3 md:w-36">
                <Briefcase className="text-primary h-5 w-5" />
                <div className="flex items-center gap-1">
                  <span className="text-sm font-semibold">2022 ~ 현재</span>
                </div>
              </div>

              {/* 회사 정보 */}
              <div className="border-primary/20 flex flex-1 flex-col gap-2 border-l-2 pl-4 md:pl-6">
                <div className="flex items-center gap-2">
                  <Building2 className="text-primary h-5 w-5" />
                  <h4 className="text-xl font-bold">(주)링커</h4>
                </div>
                <p className="text-muted-foreground text-sm">소프트웨어 개발 스타트업</p>
                <div className="bg-primary/5 inline-flex w-fit items-center gap-2 rounded-md px-3 py-1.5">
                  <span className="text-primary text-sm font-semibold">Frontend-Engineer</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default About;
