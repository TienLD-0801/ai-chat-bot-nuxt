const path = require("path");
export default defineNuxtConfig({
  app: {
    head: {
      title: "BnK-Chat-Bot",
      htmlAttrs: {
        lang: "en",
      },
      meta: [{ name: "description", content: "BnK Chat Bot App" }],
    },
  },
  devtools: { enabled: false },
  components: [
    {
      path: "~/components",
      pathPrefix: false,
    },
  ],
  modules: ["@pinia/nuxt", "@pinia-plugin-persistedstate/nuxt"],
  imports: {
    dirs: ["./shared/*"],
  },
  devServer: {
    port: 4000,
    url: "html/index.html",
  },
  css: ["~/assets/scss/main.scss"],
  ssr: false,
  nitro: {
    output: {
      publicDir: path.join(__dirname, "build"),
    },
  },
  vite: {
    build: {
      minify: "terser",
      cssMinify: true,
      manifest: true,
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes("node_modules")) {
              return id
                .toString()
                .split("node_modules/")[1]
                .split("/")[0]
                .toString();
            }
          },
          assetFileNames: "assets/[name].[hash][extname]",
          chunkFileNames: "assets/[name].[hash].js",
          entryFileNames: "assets/[name].[hash].js",
        },
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "@/assets/scss/responsive.scss" as *;',
        },
      },
    },
  },
  piniaPersistedstate: {
    cookieOptions: {
      sameSite: "strict",
    },
    storage: "localStorage",
  },
});
