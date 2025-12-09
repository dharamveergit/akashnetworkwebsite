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
      chunkSizeWarningLimit: 1000, // Increase warning threshold (chunks will be split)
      // Optimize chunk splitting for better caching
      rollupOptions: {
        output: {
          manualChunks: (id) => {
            // Split large vendor libraries into separate chunks for better caching
            if (id.includes("node_modules")) {
              // React core (most critical, should be cached separately)
              if (id.includes("react/jsx-runtime") || id.includes("react/jsx-dev-runtime")) {
                return "vendor-react-runtime";
              }
              if (id.includes("/react/") || id.includes("/react-dom/")) {
                return "vendor-react";
              }
              
              // Large UI libraries
              if (id.includes("lucide-react")) {
                return "vendor-lucide";
              }
              if (id.includes("@radix-ui")) {
                return "vendor-radix";
              }
              if (id.includes("@headlessui")) {
                return "vendor-headlessui";
              }
              if (id.includes("@heroicons")) {
                return "vendor-heroicons";
              }
              
              // Form and input libraries
              if (id.includes("react-phone-number-input")) {
                return "vendor-phone";
              }
              if (id.includes("react-hook-form") || id.includes("@hookform")) {
                return "vendor-forms";
              }
              
              // Data fetching and state
              if (id.includes("@tanstack/react-query")) {
                return "vendor-query";
              }
              if (id.includes("zustand") || id.includes("axios")) {
                return "vendor-data";
              }
              
              // Chart and visualization
              if (id.includes("react-google-charts") || id.includes("mermaid")) {
                return "vendor-charts";
              }
              
              // Swiper and carousels
              if (id.includes("swiper")) {
                return "vendor-swiper";
              }
              
              // Other utilities
              if (id.includes("fuse.js") || id.includes("lodash") || id.includes("clsx") || id.includes("tailwind-merge")) {
                return "vendor-utils";
              }
              
              // MDX and markdown
              if (id.includes("react-markdown") || id.includes("remark") || id.includes("rehype")) {
                return "vendor-markdown";
              }
              
              // Default vendor chunk for everything else
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
