const path = require("path");
export default defineNuxtConfig({
  app: {
    head: {
      title: "Singapore Bot",
      htmlAttrs: {
        lang: "en",
      },
      link: [{ rel: "icon", type: "image/png", href: "images/helmet.png" }],
      meta: [{ name: "description", content: "Singapore Bot App" }],
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
