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
  plugins: [{ src: "~/plugins/app.client.ts", mode: "client" }],
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
      chunkSizeWarningLimit: 1600,
      minify: "terser",
      cssMinify: true,
      manifest: true,
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
