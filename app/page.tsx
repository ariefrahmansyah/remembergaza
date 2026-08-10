
import { Suspense } from "react";
import { Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";

import { people } from "@/lib/db";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { Banner } from "@/components/Banner";
import { FirefliesComponent } from "@/components/Fireflies";
import { Hero } from "@/components/Hero";
import { VirtualizedList } from "@/components/VirtualizedList";

export default function Page() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [query, setQuery] = useState(searchParams.get("q") || "");

  useEffect(() => {
    setQuery(searchParams.get("q") || "");
  }, [searchParams]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const params = new URLSearchParams(searchParams);
      if (query) {
        params.set("q", query);
      } else {
        params.delete("q");
      }
      router.replace(`?${params.toString()}`, { scroll: false });
    }, 300);

    return () => clearTimeout(timeout);
  }, [query, searchParams, router]);

  const currentQuery = searchParams.get("q") || "";
  const filteredPeople = useMemo(() => {
    if (!currentQuery) return people;
    const lowerQ = currentQuery.toLowerCase();
    return people.filter((p) => p.en_name.toLowerCase().includes(lowerQ));
  }, [currentQuery]);

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
            <div className="w-full max-w-xl px-4 mt-8 z-10">
              <input
                type="text"
                placeholder="Search by English name..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30 backdrop-blur-sm transition-all"
              />
            </div>
          </div>
        </Suspense>

        <div className="flex-1 min-h-0">
          <Suspense fallback={<div>Loading...</div>}>
            <VirtualizedList key={currentQuery || "all"} people={filteredPeople} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
