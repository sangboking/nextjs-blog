import Image from "next/image";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, GraduationCap, User } from "lucide-react";

const About = () => {
  return (
    <div className="container">
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
          <Card className="pt-6 md:col-span-2">
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
            <div className="prose prose-neutral dark:prose-invert max-w-none">
              <h3 className="text-primary mb-1 text-xl font-semibold">
                [급변하는 프론트엔드 생태계]
              </h3>
              <p className="text-lg leading-relaxed">
                빠르게 변화하며, 새로운 기술이 나오는 프론트엔드 생태계에서
                <br /> 새로운 기술에 두려워 하지 않고 탐구하는 것을 좋아합니다.
              </p>
            </div>

            <div className="prose prose-neutral dark:prose-invert mt-4 max-w-none">
              <h3 className="text-primary mb-1 text-xl font-semibold">[추구하는 방향]</h3>
              <p className="text-lg leading-relaxed">
                동료와의 소통을 중요시 여기고, 직관적이고 알아보기 쉬운 코드를 지향하며, <br />
                클린코드에 대한 관심이 많습니다.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default About;
