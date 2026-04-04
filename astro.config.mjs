import starlight from "@astrojs/starlight";
import svelte from "@astrojs/svelte";
import { defineConfig } from "astro/config";
import starlightSidebarTopics from "starlight-sidebar-topics";
import UnoCSS from "unocss/astro";

export default defineConfig({
  site: "https://docs.canvasmc.io",

  integrations: [
    svelte(),
    UnoCSS(),

    starlight({
      title: "CanvasMC Docs",

      customCss: [
        "@fontsource/jetbrains-mono/400.css",
        "@fontsource/jetbrains-mono/600.css",
        "@fontsource/poppins/400.css",
        "@fontsource/poppins/600.css",
        "./src/styles/globals.css",
      ],

      social: [
        { icon: "heart", label: "Donate", href: "https://ko-fi.com/dueris" },
        { icon: "github", label: "GitHub", href: "https://github.com/CraftCanvasMC" },
        { icon: "discord", label: "Discord", href: "https://canvasmc.io/discord" },
      ],
      components: {
        TableOfContents: "./src/components/overrides/TableOfContents.astro",
        MobileTableOfContents: "./src/components/overrides/MobileTableOfContents.astro",
      },

      plugins: [
        starlightSidebarTopics(
          // FYI: Items will autosort themselves by alpabetical order. Use sidebar.order to change the index.
          [
            {
              label: "Horizon",
              link: "/horizon/introduction/",
              items: [
                "horizon/introduction",
                {
                  label: "Information",
                  autogenerate: {
                    directory: "horizon/info",
                  },
                },
                {
                  label: "Development",
                  autogenerate: {
                    directory: "horizon/dev",
                  },
                },
              ],
            },
            {
              label: "Canvas",
              link: "/canvas/introduction/",
              items: [
                // Into and LTS up top
                "canvas/introduction",
                "canvas/lts",
                {
                  label: "Getting Started",
                  autogenerate: {
                    directory: "canvas/getting-started",
                  },
                },
                {
                  label: "Guides",
                  autogenerate: {
                    directory: "canvas/guides",
                  },
                },
                {
                  label: "Developers",
                  // Have to manually list these for styling
                  items: [
                    {
                      label: "Contributing",
                      autogenerate: {
                        directory: "canvas/developers/contributing",
                      },
                    },
                    {
                      label: "Plugins",
                      autogenerate: {
                        directory: "canvas/developers/plugins",
                      },
                    },
                    "canvas/developers/rest-api",
                    "canvas/developers/canvas-api",
                  ],
                },
                {
                  label: "Folia",
                  autogenerate: {
                    directory: "canvas/info/folia",
                  },
                },
                {
                  label: "Schedulers",
                  autogenerate: {
                    directory: "canvas/scheduler",
                  },
                },
              ],
            },
          ],
          {
            topics: {
              canvas: ["/canvas"],
              horizon: ["/horizon"],
            },
          }
        ),
      ],
    }),
  ],

  server: {
    port: 3000,
    host: true,
  },
});
