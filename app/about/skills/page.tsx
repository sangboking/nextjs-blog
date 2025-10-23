import Image from "next/image";

import { Card, CardContent } from "@/components/ui/card";

import SKILLS_ARR from "@/constants/skills";

export default function AboutSkills() {
  return (
    <div className="container py-8">
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
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                {category.skills.map((skill, skillIndex) => (
                  <Card key={skillIndex} className="transition-shadow duration-300 hover:shadow-lg">
                    <CardContent className="p-6">
                      <div className="flex h-full min-h-[90px] flex-col justify-between">
                        {/* 기술 이름 - 상단 정렬 */}
                        <div className="flex items-start justify-center">
                          <h3 className="text-center text-xl font-semibold">{skill.name}</h3>
                        </div>

                        {/* 기술 아이콘 - 하단 정렬 */}
                        <div className="mt-auto flex items-end justify-center">
                          <div>
                            <Image src={skill.imgUrl} width={25} height={25} alt="Skill_Icon" />
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
