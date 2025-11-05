import svelte from "@astrojs/svelte";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import Icons from "starlight-plugin-icons";
import UnoCSS from "unocss/astro";
import node from "@astrojs/node";

export default defineConfig({
  output: "server",
  adapter: node({
    mode: "standalone",
  }),
  integrations: [
    svelte(),
    tailwindcss(),
    UnoCSS(),
    Icons({
      sidebar: true,
      extractSafelist: true,
      starlight: {
        title: "CanvasMC Docs",
        social: [
          { icon: "github", label: "GitHub", href: "https://github.com/CraftCanvasMC" },
          { icon: "discord", label: "Discord", href: "https://canvasmc.io/discord" },
        ],
        components: {
          SocialIcons: "./src/components/overrides/SocialIcons.astro",
          Footer: "./src/components/overrides/Footer.astro",
          LastUpdated: "./src/components/overrides/LastUpdated.astro",
        },
        sidebar: [
          {
            label: "Introduction",
            link: "/introduction",
            icon: "i-ic:baseline-book",
          },
          {
            label: "Getting Started",
            items: [
              {
                icon: "i-ic:outline-rocket-launch",
                label: "Installation",
                slug: "guides/getting-started/installation",
              },
              {
                icon: "i-ic:baseline-install-desktop",
                label: "Installing Plugins",
                slug: "guides/getting-started/plugins",
              },
            ],
          },
          {
            label: "Helpful",
            items: [
              { icon: "i-ri:java-line", label: "Plugin Compatibility", slug: "info/helpful/compat" },
              { icon: "i-ic:twotone-receipt-long", label: "Long Term Support", slug: "info/helpful/lts" },
            ],
          },
          {
            label: "For Developers",
            items: [
              { icon: "i-ic:outline-question-answer", label: "REST API", slug: "guides/developers/rest-api" },
              {
                label: "Contributing",
                items: [
                  {
                    icon: "i-ic:outline-code",
                    label: "Contributing to Canvas",
                    slug: "guides/developers/contributing/canvas",
                  },
                  { icon: "i-mdi:github", label: "Contributing to Docs", slug: "guides/developers/contributing/docs" },
                ],
              },
            ],
          },
          {
            label: "Folia",
            items: [
              { icon: "i-streamline-plump:feather-pen-remix", label: "Overview", slug: "info/folia/overview" },
              { icon: "i-ic:outline-difference", label: "Fixes to Folia", slug: "info/folia/fixes" },
              {
                icon: "i-carbon:cics-region-routing",
                label: "Region Threading Logic",
                slug: "info/folia/region-logic",
              },
            ],
          },
        ],
        logo: {
          src: "/public/logo.png",
          alt: "CraftCanvasMC Logo",
          href: "/",
        },
        lastUpdated: true,
        editLink: {
          baseUrl: "https://github.com/CraftCanvasMC/Docs/edit/main/",
        },
        customCss: [
          "@fontsource/poppins/400.css",
          "@fontsource/jetbrains-mono/400.css",
          "@fontsource/jetbrains-mono/600.css",
          "./src/styles/globals.css",
        ],
      },
    }),
  ],
});
