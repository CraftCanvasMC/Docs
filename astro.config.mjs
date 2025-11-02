import starlight from "@astrojs/starlight";
import svelte from "@astrojs/svelte";
import astroExpressiveCode from "astro-expressive-code";
import { defineConfig } from "astro/config";

import tailwindcss from "@tailwindcss/vite";

const prod = process.env.NODE_ENV === "production";

export default defineConfig({
  site: prod ? "https://docs.canvasmc.io" : undefined,
  integrations: [
    {
      name: "docs:config-md",
      hooks: {
        "astro:config:setup": ({ config }) => {
          globalThis.markdownConfig = { ...config.markdown };
        },
      },
    },
    svelte(),
    tailwindcss(),
    starlight({
      title: "CanvasMC Docs",
      social: [
        { icon: "github", label: "GitHub", href: "https://github.com/CraftCanvasMC" },
        { icon: "discord", label: "Discord", href: "https://canvasmc.io/discord" },
      ],
      components: {
        SocialIcons: "./src/components/SocialIcons.astro",
        Footer: "./src/components/Footer.astro",
      },
      sidebar: [
        {
          label: "Introduction",
          link: "/introduction",
        },
        {
          label: "Getting Started",
          autogenerate: { directory: "guides/getting-started" },
        },
        {
          label: "Helpful",
          autogenerate: { directory: "info/helpful" },
        },
        {
          label: "For Developers",
          autogenerate: { directory: "guides/developers" },
        },
        {
          label: "Folia",
          autogenerate: { directory: "info/folia" },
        },
      ],
      logo: {
        src: "/public/logo.png",
        alt: "CraftCanvasMC Logo",
        href: "/",
      },
      customCss: [
        "@fontsource/poppins/400.css",
        "@fontsource/jetbrains-mono/400.css",
        "@fontsource/jetbrains-mono/600.css",
        "./src/styles/globals.css",
      ],
    }),
  ],
});
