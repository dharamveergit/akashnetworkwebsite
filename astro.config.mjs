import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import astroExpressiveCode from "astro-expressive-code";
import { defineConfig } from "astro/config";
import remarkDirective from "remark-directive";
import remarkMath from "remark-math";
import { customAsidePlugin } from "./src/lib/aside/customAsidePlugin";
import { normalizeMath } from "./src/lib/markdown/normalizeMath";
import { mermaid } from "./src/utils/mermaid";
import { redirects } from "./src/utils/redirects";

export default defineConfig({
  redirects: redirects,
  markdown: {
    remarkPlugins: [
      remarkMath,
      normalizeMath,
      remarkDirective,
      mermaid,
      customAsidePlugin,
    ],
  },
  integrations: [
    tailwind(),
    sitemap({ lastmod: new Date("2024-06-27") }),
    react(),
    astroExpressiveCode({
      themes: ["light-plus", "dark-plus"],
      useDarkModeMediaQuery: true,

      themeCssSelector: (theme) => `[data-theme='${theme.name}']`,
      styleOverrides: {
        terminalTitlebarForeground: "var(--theme-header-bg)",
        terminalTitlebarDotsForeground: "var(--three-dots-bg)",
        terminalTitlebarBackground: "var(--theme-header-bg)",
        terminalTitlebarDotsOpacity: "1",
        codeFontFamily: "JetBrains Mono",
      },
    }),
    mdx(),
  ],
  site: "https://akash.network",
  vite: {
    build: {
      cssCodeSplit: true,
      minify: "esbuild", // Explicitly enable esbuild minification for JS
      target: "esnext", // Use modern JS targets to reduce polyfills
      // Optimize chunk splitting for better caching
      rollupOptions: {
        output: {
          manualChunks: (id) => {
            // Split large vendor libraries into separate chunks
            if (id.includes("node_modules")) {
              if (id.includes("lucide-react")) {
                return "vendor-lucide";
              }
              if (id.includes("react-phone-number-input")) {
                return "vendor-phone";
              }
              if (id.includes("react") || id.includes("react-dom")) {
                return "vendor-react";
              }
              // Group other node_modules
              return "vendor";
            }
          },
        },
      },
    },
    css: {
      devSourcemap: false,
    },
  },
});
