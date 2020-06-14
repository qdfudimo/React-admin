const {
    override,
    fixBabelImports,
    addLessLoader,
    addWebpackAlias,
    // addWebpackPlugin
} = require("customize-cra");
const path = require("path");
// const ProgressBarPlugin = require("progress-bar-webpack-plugin");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const CompressionWebpackPlugin = require("compression-webpack-plugin");
const isEnvProduction = process.env.NODE_ENV === "production";
const addCompression = () => config => {
    if (isEnvProduction) {
      config.plugins.push(
        // gzip压缩
        new CompressionWebpackPlugin({
          test: /\.(css|js)$/,
          // 只处理比1kb大的资源
          threshold: 1024,
          // 只处理压缩率低于90%的文件
          minRatio: 0.9
        })
      );
    }
  
    return config;
  };
// 查看打包后各包大小
const addAnalyzer = () => config => {
    if (process.env.ANALYZER) {
      config.plugins.push(new BundleAnalyzerPlugin());
    }
  
    return config;
  };
  
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
            "@menu-item-active-bg": "#ccc"
        }
    }),
    addCompression(),
    addAnalyzer(),
    // addWebpackPlugin(
      
    //   new ProgressBarPlugin()
    // ),
    addWebpackAlias({
        ["@"]: path.resolve(__dirname, "./src"),
        ["@a"]: path.resolve(__dirname, "./src/assets"),
        // ["@v"]: path.resolve(__dirname, "./src/views"),
        // ["@c"]: path.resolve(__dirname, "./src/components")
    })
);