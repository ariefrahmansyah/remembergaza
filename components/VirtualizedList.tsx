"use client";

import { useEffect, useRef, useState } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";

import { Person } from "@/lib/db";
import { PersonCard } from "@/components/PersonCard";

const ITEM_HEIGHT = 150;
const LOAD_MORE_COUNT = 100;

// Function to get items per row based on screen width
const getItemsPerRow = () => {
  if (typeof window === "undefined") return 3; // Default for SSR
  if (window.innerWidth < 640) return 1; // mobile
  if (window.innerWidth < 1024) return 2; // tablet
  return 3; // desktop
};

export function VirtualizedList({ people }: { people: Person[] }) {
  const [displayCount, setDisplayCount] = useState(LOAD_MORE_COUNT);
  const [itemsPerRow, setItemsPerRow] = useState(getItemsPerRow());
  const [isLoading, setIsLoading] = useState(false);
  const parentRef = useRef<HTMLDivElement>(null);

  // Update items per row on window resize
  useEffect(() => {
    const handleResize = () => {
      setItemsPerRow(getItemsPerRow());
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Calculate row count based on current items per row
  const rowCount = Math.ceil(displayCount / itemsPerRow);

  const rowVirtualizer = useVirtualizer({
    count: rowCount,
    getScrollElement: () => parentRef.current,
    estimateSize: () => ITEM_HEIGHT,
    overscan: 5,
  });

  useEffect(() => {
    const scrollElement = parentRef.current;
    if (!scrollElement) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const lastEntry = entries[0];
        if (lastEntry.isIntersecting && displayCount < people.length) {
          setIsLoading(true);
          setTimeout(() => {
            setDisplayCount((prev) =>
              Math.min(prev + LOAD_MORE_COUNT, people.length)
            );
            setIsLoading(false);
          }, 500);
        }
      },
      { threshold: 0.1 }
    );

    const sentinel = document.createElement("div");
    sentinel.style.height = "1px";
    scrollElement.appendChild(sentinel);
    observer.observe(sentinel);

    return () => {
      observer.disconnect();
      scrollElement.removeChild(sentinel);
    };
  }, [displayCount, people.length]);

  return (
    <div className="h-full">
      <div ref={parentRef} className="h-full overflow-auto">
        <div
          style={{
            height: `${rowVirtualizer.getTotalSize()}px`,
            width: "100%",
            position: "relative",
          }}
        >
          {rowVirtualizer.getVirtualItems().map((virtualRow) => {
            const startIndex = virtualRow.index * itemsPerRow;
            const rowPeople = people.slice(
              startIndex,
              startIndex + itemsPerRow
            );

            return (
              <div
                key={virtualRow.index}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: `${virtualRow.size}px`,
                  transform: `translateY(${virtualRow.start}px)`,
                }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-4 z-10"
              >
                {rowPeople.map((person) => (
                  <PersonCard key={person.id} person={person} />
                ))}
              </div>
            );
          })}
        </div>
        {isLoading && (
          <div className="text-center py-4 text-slate-300">Loading...</div>
        )}
      </div>
    </div>
  );
}
