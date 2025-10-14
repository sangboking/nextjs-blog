import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import SOCIAL_LINKS_ARR from "@/constants/socialLinks";
import Image from "next/image";

const ProfileSection = () => {
  return (
    <aside>
      <Card className="py-8">
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-center">
              <div className="h-36 w-36 overflow-hidden rounded-full">
                <Image
                  src="/images/profile.jpeg"
                  alt="상코딩"
                  width={144}
                  height={144}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>

            <div className="text-center">
              <h3 className="text-lg font-bold">상코딩</h3>
              <p className="text-primary text-sm">FE Developer</p>
            </div>

            <div className="flex justify-center gap-2">
              {SOCIAL_LINKS_ARR.map((item, index) => (
                <Button key={index} variant="ghost" className="bg-primary/10" size="icon" asChild>
                  <a href={item.href} target="_blank" rel="noopener noreferrer">
                    <item.icon className="h-4 w-4" />
                  </a>
                </Button>
              ))}
            </div>

            <p className="bg-primary/10 rounded p-2 text-center text-sm">새로운 배움을 즐기는</p>
          </div>
        </CardContent>
      </Card>
    </aside>
  );
};

export default ProfileSection;
