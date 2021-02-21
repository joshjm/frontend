module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "/dist/" : "/frontend/dist", // this causes blank page on build? was this a github pages fix? --- part of vue deploy instructions 
  transpileDependencies: ["vuetify"]
}
