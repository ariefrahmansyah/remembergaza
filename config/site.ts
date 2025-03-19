import { totalIdentifiedVictims, totalVictims } from "@/lib/db";
import { formatNumber } from "@/lib/utils";

export const siteConfig = {
  name: "Remember Gaza",
  url: "https://remembergaza.id",
  description: `From ${formatNumber(totalVictims)} killed in Gaza since October 7, 2023, ${formatNumber(totalIdentifiedVictims)} victims are identified. Here are their names.`,
};
