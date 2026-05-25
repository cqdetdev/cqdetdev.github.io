import { defineConfig } from "vite";
import { nitroV2Plugin as nitro } from "@solidjs/vite-plugin-nitro-2";

import { solidStart } from "@solidjs/start/config";

export default defineConfig({
  plugins: [
    solidStart(),
    nitro({
      preset: "github-pages",
      prerender: {
        crawlLinks: true,
        routes: ["/", "/blog/leveldb", "/404.html"],
      },
    })
  ]
});
