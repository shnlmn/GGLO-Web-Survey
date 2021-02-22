module.exports = {
  presets: ["@vue/cli-plugin-babel/preset"],
  plugins: [
    ["transform-class-properties"],
    ["@babel/plugin-transform-arrow-functions", { spec: true }],
  ],
};
