import { Suspense } from "react";

import { people } from "@/lib/db";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { Banner } from "@/components/Banner";
import { FirefliesComponent } from "@/components/Fireflies";
import { Hero } from "@/components/Hero";
import { VirtualizedList } from "@/components/VirtualizedList";

export const dynamic = "force-static";

export default function Page() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="relative">
        <Suspense>
          <AuroraBackground />
        </Suspense>

        <Suspense>
          <FirefliesComponent />
        </Suspense>

        <Banner />

        <Suspense>
          <div className="flex flex-col items-center justify-center h-[100vh]">
            <Hero />
          </div>
        </Suspense>

        <div className="flex-1 min-h-0">
          <Suspense fallback={<div>Loading...</div>}>
            <VirtualizedList people={people} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
