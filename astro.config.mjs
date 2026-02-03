// @ts-check
import { defineConfig } from "astro/config";

import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  site: "https://dan.cardamore.ca",
  vite: {
    plugins: [tailwindcss()],
    server: {
      allowedHosts: ["dan-dev.cardamore.ca", "dev.cardamore.ca", "localhost"],
    },
  },
  image: {
    service: {
      entrypoint: "astro/assets/services/sharp",
      config: {
        limitInputPixels: false, // Allow large high-res photos from Lightroom
      },
    },
  },
});
