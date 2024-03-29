import partytown from "@astrojs/partytown";
import robotsTxt from "astro-robots-txt";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  site: "https://remembergaza.id",
  integrations: [
    partytown({
      config: {
        forward: ["dataLayer.push"],
      },
    }),
    robotsTxt({
      sitemap: false,
    }),
  ],
});
