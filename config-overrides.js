const {
    override,
    fixBabelImports,
    addLessLoader,
    addWebpackAlias
} = require("customize-cra");
const path = require("path");

module.exports = override(
    fixBabelImports("import", {
        libraryName: "antd",
        libraryDirectory: "es",
        style: true // change importing css to less
    }),
    addLessLoader({
        javascriptEnabled: true,
        localIdentName: '[local]--[hash:base64:5]',
        modifyVars: {
            "@primary-color": "#1DA57A",
            "@link-color": "#ccc",
            "@menu-item-active-bg":"#ccc" 
        }
    }),
    addWebpackAlias({
        ["@"]: path.resolve(__dirname, "./src"),
        ["@a"]: path.resolve(__dirname, "./src/assets"),
        // ["@v"]: path.resolve(__dirname, "./src/views"),
        // ["@c"]: path.resolve(__dirname, "./src/components")
    })
);