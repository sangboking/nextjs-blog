import Image from "next/image";

import { Card, CardContent } from "@/components/ui/card";

import SKILLS_ARR from "@/constants/skills";

export default function AboutSkills() {
  return (
    <div className="container">
      <div className="space-y-8">
        {/* 기술 스택 카테고리별 섹션 */}
        <div className="space-y-12">
          {SKILLS_ARR.map((category, categoryIndex) => (
            <div key={categoryIndex} className="space-y-6">
              {/* 카테고리 헤더 */}
              <div className="text-center">
                <h2 className="text-primary text-2xl font-bold">{category.category}</h2>
              </div>

              {/* 해당 카테고리의 기술들 */}
              <div className="grid grid-cols-2 gap-3 md:grid-cols-2 md:gap-6 lg:grid-cols-4">
                {category.skills.map((skill, skillIndex) => (
                  <Card key={skillIndex} className="transition-shadow duration-300 hover:shadow-lg">
                    <CardContent className="p-3 md:p-6">
                      <div className="flex h-full min-h-[70px] flex-col justify-between md:min-h-[90px]">
                        {/* 기술 이름 - 상단 정렬 */}
                        <div className="flex items-start justify-center">
                          <h3 className="text-center text-base font-semibold md:text-xl">
                            {skill.name}
                          </h3>
                        </div>

                        {/* 기술 아이콘 - 하단 정렬 */}
                        <div className="mt-auto flex items-end justify-center">
                          <div>
                            <Image
                              src={skill.imgUrl}
                              width={20}
                              height={20}
                              alt="Skill_Icon"
                              className="md:h-[25px] md:w-[25px]"
                            />
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
