import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import svelte from "@astrojs/svelte";
import UnoCSS from "unocss/astro";
import starlightSidebarTopics from "starlight-sidebar-topics";
import { fileURLToPath } from "node:url";

export default defineConfig({
  site: "https://docs.canvasmc.io",

  vite: {
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
  },

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
          [
            {
              label: "Horizon",
              link: "/horizon/introduction/",
              items: [
                "horizon/introduction",
                {
                  label: "Information",
                  items: [
                    "horizon/info/breaks",
                    "horizon/info/installing"
                  ]
                },
                {
                  label: "Development",
                  items: [
                    "horizon/dev/intro",
                    "horizon/dev/classloader",
                    "horizon/dev/objecttree",
                    "horizon/dev/mixins",
                    "horizon/dev/api"
                  ]
                }
              ]
            },
            {
              label: "Canvas",
              link: "/canvas/introduction/",
              items: [
                "canvas/introduction",
                {
                  label: "Getting Started",
                  items: [
                    "canvas/getting-started/installation",
                    "canvas/getting-started/plugins",
                  ],
                },
                {
                  label: "Developers",
                  items: [
                    {
                      label: "Contributing",
                      items: [
                        "canvas/developers/contributing/canvas",
                        "canvas/developers/contributing/docs",
                      ]
                    },
                    "canvas/developers/rest-api",
                    "canvas/developers/canvas-api"
                  ],
                },
                {
                  label: "Folia",
                  items: [
                    "canvas/info/folia/overview",
                    "canvas/info/folia/fixes",
                    "canvas/info/folia/region-logic",
                  ],
                },
                "canvas/lts",
                {
                  label: "Schedulers",
                  items: [
                    "canvas/scheduler/edf",
                    "canvas/scheduler/work-stealing",
                    "canvas/scheduler/affinity",
                    "canvas/scheduler/beta-scheduler"
                  ]
                },
              ],
            },
          ],
          {
            topics: {
              canvas: ["/canvas"],
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
