import Link from "next/link";

export function Banner() {
  return (
    <Link href="https://donate.unrwa.org/int/en/general" target="_blank">
      <div className="absolute top-0 p-2 w-full text-center bg-white/5 shadow-xs hover:bg-white/10 hover:shadow-sm hover:cursor-pointer transition-colors duration-300 z-10">
        <div className="flex items-center justify-center gap-2">
          <p className="text-2xl font-light">🇵🇸</p>
          <p className="text-base font-light">Donate to support Palestine</p>
        </div>
      </div>
    </Link>
  );
}
