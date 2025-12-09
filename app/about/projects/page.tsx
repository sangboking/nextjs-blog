"use client";

import { useState } from "react";
import Image from "next/image";
import { Calendar } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import PROJECTS_ARR from "@/constants/projects";

export default function AboutProjects() {
  const [selectedProject, setSelectedProject] = useState<(typeof PROJECTS_ARR)[0] | null>(null);

  return (
    <div className="container">
      <div className="space-y-8">
        {/* 섹션 제목 */}
        <div className="text-center">
          <h1 className="text-2xl font-bold tracking-tight">프로젝트 상세</h1>
          <p className="text-muted-foreground mt-2">제가 작업한 프로젝트들을 소개합니다</p>
        </div>

        {/* 프로젝트 카드 그리드 */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PROJECTS_ARR.map((project) => {
            const IconComponent = project.icon;
            return (
              <Card
                key={project.id}
                className="cursor-pointer transition-shadow duration-300 hover:shadow-lg"
                onClick={() => setSelectedProject(project)}
              >
                <CardContent className="flex h-full min-h-[280px] flex-col justify-between p-6">
                  {/* 최상단: 아이콘 */}
                  <div className="flex justify-center">
                    <div className={`${project.backgroundColor} rounded-lg p-3`}>
                      <IconComponent className={`${project.iconColor} h-8 w-8`} />
                    </div>
                  </div>

                  {/* 중간: 제목과 설명 */}
                  <div className="mt-4 flex flex-1 flex-col gap-3 text-center">
                    <h3 className="text-xl font-semibold">{project.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  {/* 최하단: 기술 아이콘 */}
                  <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
                    {project.techIcons.map((icon, index) => (
                      <div
                        key={index}
                        className="bg-muted flex h-8 w-8 items-center justify-center rounded-full"
                      >
                        <Image
                          src={icon}
                          width={20}
                          height={20}
                          alt="기술 아이콘"
                          className="h-5 w-5"
                        />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* 프로젝트 상세 모달 */}
      <Dialog
        open={!!selectedProject}
        onOpenChange={(open: boolean) => !open && setSelectedProject(null)}
      >
        {selectedProject && (
          <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto">
            <DialogHeader>
              {/* 상단: 아이콘, 제목, 설명, 기술 스택 */}
              <div className="space-y-6">
                {/* 아이콘 */}
                <div className="flex justify-start">
                  <div className={`${selectedProject.backgroundColor} rounded-lg p-3`}>
                    {(() => {
                      const IconComponent = selectedProject.icon;
                      return <IconComponent className={`${selectedProject.iconColor} h-10 w-10`} />;
                    })()}
                  </div>
                </div>

                {/* 제목 */}
                <DialogTitle className="text-left text-2xl">{selectedProject.title}</DialogTitle>

                {/* 프로젝트 설명 */}
                <DialogDescription className="text-left text-base">
                  {selectedProject.description}
                </DialogDescription>

                {/* 기술 스택 아이콘 */}
                <div className="flex flex-wrap items-center justify-start gap-2">
                  {selectedProject.techIcons.map((icon, index) => (
                    <div
                      key={index}
                      className="bg-muted flex h-10 w-10 items-center justify-center rounded-full"
                    >
                      <Image
                        src={icon}
                        width={24}
                        height={24}
                        alt="기술 아이콘"
                        className="h-6 w-6"
                      />
                    </div>
                  ))}
                </div>

                {/* 개발 기간 */}
                <div className="flex items-center justify-start gap-2">
                  <Calendar className="text-muted-foreground h-4 w-4" />
                  <span className="text-muted-foreground text-sm">{selectedProject.period}</span>
                </div>

                {/* 구분선 */}
                <div className="border-t border-gray-200 dark:border-gray-800" />

                {/* 프로젝트 상세 내용 */}
                <div className="space-y-2">
                  <h4 className="text-left text-lg font-semibold">상세내용</h4>
                  <p className="text-muted-foreground text-left leading-relaxed whitespace-pre-line">
                    {selectedProject.details}
                  </p>
                </div>
              </div>
            </DialogHeader>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
}
