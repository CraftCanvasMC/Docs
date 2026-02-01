import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import svelte from "@astrojs/svelte";
import UnoCSS from "unocss/astro";
import starlightSidebarTopics from "starlight-sidebar-topics";

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
        { icon: "github", label: "GitHub", href: "https://github.com/CraftCanvasMC" },
        { icon: "discord", label: "Discord", href: "https://canvasmc.io/discord" },
      ],

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
                  label: "Guides",
                  items: [
                    {
                      label: "Getting Started",
                      items: [
                        "canvas/guides/getting-started/installation",
                        "canvas/guides/getting-started/plugins",
                      ],
                    },
                    {
                      label: "Developers",
                      items: [
                        "canvas/guides/developers/contributing/canvas",
                        "canvas/guides/developers/contributing/docs",
                        "canvas/guides/developers/rest-api"
                      ],
                    },
                  ],
                },
                {
                  label: "Info",
                  items: [
                    "canvas/info/helpful/compat",
                    "canvas/info/helpful/lts",
                    {
                      label: "Folia",
                      items: [
                        "canvas/info/folia/overview",
                        "canvas/info/folia/fixes",
                        "canvas/info/folia/region-logic",
                      ],
                    },
                  ],
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
    port: 80,
    host: true,
  },
});
