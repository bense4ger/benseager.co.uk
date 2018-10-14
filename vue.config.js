module.exports = {
  baseUrl: '/',
  css: {
    loaderOptions: {
      sass: {
        data: `
          @import "@/styles/global.scss";
        `,
      },
    },
  },
};
