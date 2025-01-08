
// postcss.config.js
module.exports = {
  plugins: [
    require("postcss-import"),
    require("tailwindcss"),
    require("autoprefixer"),
  ]
};


/*module.exports = {
  plugins: [
    {
      'postcss-import': {},
      tailwindcss: {},
      autoprefixer: {},
    }]
}*/

/*export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
*/
