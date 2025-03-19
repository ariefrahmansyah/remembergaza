import { totalIdentifiedVictims } from "@/lib/db";
import { formatNumber } from "@/lib/utils";

export function Hero() {
  return (
    <div className="relative flex flex-col gap-4 px-4 max-w-4xl mx-auto z-10">
      <div className="text-4xl md:text-7xl font-bold text-white text-balance mb-1">
        Honoring Lives Lost in Gaza
      </div>
      {/* <div className="font-extralight text-base md:text-3xl text-white">
        Since October 7, 2023
      </div>
      <div className="font-extralight text-base md:text-3xl text-white">
        from total of{" "}
        <span className="bg-red-600 font-medium">
          {formatNumber(totalVictims)}
        </span>{" "}
        known fallen souls
      </div>
      <div className="font-extralight text-base md:text-3xl text-white">
        only{" "}
        <span className="bg-emerald-600 font-medium">
          {formatNumber(totalIdentifiedVictims)}
        </span>{" "}
        are identified.
      </div>
      <div className="font-extralight text-base md:text-3xl text-white">
        The remaining{" "}
        <span className="bg-white text-black font-medium">
          {formatNumber(totalUnidentifiedVictims)}
        </span>{" "}
        victims are still unidentified.
      </div> */}
      <div className="font-extralight text-base md:text-3xl text-white text-balance">
        In memorials of{" "}
        <span className="bg-red-600 font-medium">
          {formatNumber(totalIdentifiedVictims)}
        </span>{" "}
        known victims killed in Gaza.
      </div>
      <div className="font-extralight text-base md:text-3xl text-white text-balance">
        May their souls and{" "}
        <span className="bg-emerald-600 font-medium decoration-1 underline underline-offset-4">
          others
        </span>{" "}
        rest in peace.
      </div>
      <div className="font-extralight text-base md:text-3xl text-white text-balance">
        May the freedom of{" "}
        <span className="bg-white text-black font-medium">Palestine</span> come
        early and everlasting.
      </div>
    </div>
  );
}
