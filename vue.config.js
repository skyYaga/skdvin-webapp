module.exports = {
  transpileDependencies: ["vuetify"],

  devServer: {
    proxy: {
      "/api": {
        target: "http://localhost:8081", // target host
        ws: true, // proxy websockets
        changeOrigin: true, // needed for virtual hosted sites
      },
    },
  },

  pluginOptions: {
    i18n: {
      locale: "de",
      fallbackLocale: "en",
      localeDir: "locales",
      enableInSFC: false,
    },
  },
};
