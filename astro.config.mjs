import starlight from "@astrojs/starlight";
import svelte from "@astrojs/svelte";
import { defineConfig } from "astro/config";
import { fileURLToPath } from "node:url";
import starlightSidebarTopics from "starlight-sidebar-topics";
import UnoCSS from "unocss/astro";
import javadocPlugin from "./src/utils/remark/javadoc";

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

      head: [
        {
          tag: "link",
          attrs: {
            rel: "icon",
            type: "image/png",
            href: "/logo.png",
          },
        },
      ],

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
      lastUpdated: true,
      editLink: {
        baseUrl: "https://github.com/CraftCanvasMC/Docs/edit/main/",
      },
      components: {
        Footer: "./src/components/overrides/Footer.astro",
        LastUpdated: "./src/components/overrides/LastUpdated.astro",
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
                  label: "Info",
                  items: [
                    {
                      label: "Canvas",
                      autogenerate: {
                        directory: "canvas/info",
                      },
                    },
                    {
                      label: "Folia",
                      autogenerate: {
                        directory: "canvas/folia",
                      },
                    },
                  ],
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
                      label: "API",
                      autogenerate: {
                        directory: "canvas/developers/api",
                      },
                    },
                    {
                      label: "Plugins",
                      autogenerate: {
                        directory: "canvas/developers/plugins",
                      },
                    },
                    {
                      label: "Contributing",
                      autogenerate: {
                        directory: "canvas/developers/contributing",
                      },
                    },
                    "canvas/developers/rest-api",
                  ],
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
  markdown: {
    remarkPlugins: [
      [
        javadocPlugin,
        {
          targets: {
            canvas: "https://canvasmc.io/api/v2/jd?project=canvas&redirect=",
            horizon: "https://canvasmc.io/api/v2/jd?project=horizon&redirect=",
            java: { url: "https://docs.oracle.com/en/java/javase/25/docs/api", module: "java.base" },
          },
        },
      ],
    ],
  },
});
