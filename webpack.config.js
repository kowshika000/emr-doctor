const HtmlWebPackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const path = require("path");
const Dotenv = require("dotenv-webpack");

const deps = require("./package.json").dependencies;
const printCompilationMessage = require("./compilation.config.js");

module.exports = (_, argv) => {
  const isProduction = argv.mode === "production";
  const publicPath = isProduction
    ? "https://emr-doctor-child3.web.app/"
    : "http://localhost:3004/";

  return {
    output: {
      publicPath: publicPath,
    },

    resolve: {
      extensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
    },

    devServer: {
      port: 3004,
      historyApiFallback: true,
      watchFiles: [path.resolve(__dirname, "src")],
      hot: false,
      liveReload: false,
      client: {
        webSocketURL: "auto://0.0.0.0:0/ws",
      },
      onListening: function (devServer) {
        const port = devServer.server.address().port;
        printCompilationMessage("compiling", port);

        devServer.compiler.hooks.done.tap("OutputMessagePlugin", (stats) => {
          setImmediate(() => {
            if (stats.hasErrors()) {
              printCompilationMessage("failure", port);
            } else {
              printCompilationMessage("success", port);
              console.log(`🚀 Running on: http://localhost:${port}/`);
            }
          });
        });
      },
    },

    module: {
      rules: [
        {
          test: /\.m?js/,
          type: "javascript/auto",
          resolve: {
            fullySpecified: false,
          },
        },
        {
          test: /\.(css|s[ac]ss)$/i,
          use: ["style-loader", "css-loader", "postcss-loader"],
        },
        {
          test: /\.(ts|tsx|js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
          },
        },
        {
          test: /\.(jpg|jpeg|png|gif|svg)$/i,
          use: [
            {
              loader: "file-loader",
              options: {
                name: "[path][name].[ext]",
              },
            },
          ],
        },
      ],
    },

    plugins: [
      new ModuleFederationPlugin({
        name: "emr_doctor",
        filename: "remoteEntry.js",
        remotes: {},
        exposes: {
          "./DoctorEmr": "./src/component/doctorEmr.jsx",
          "./IPDetails": "./src/doctorIP/landingPage/doctorIpTabs.jsx",
          "./OPDetails": "./src/doctorOP/patientDetails/patientDetails.jsx",
          "./docEmrReducer": "./src/Redux/reducer.jsx"
        },
        shared: {
          ...deps,
          react: {
            singleton: true,
            requiredVersion: deps["react"],
            eager: false,
          },
          "react-dom": {
            singleton: true,
            requiredVersion: deps["react-dom"],
            eager: false,
          },
          "react-router-dom": {
            singleton: true,
            requiredVersion: deps["react-router-dom"],
            eager: false,
          },
        },
      }),
      new HtmlWebPackPlugin({
        template: "./src/index.html",
      }),
      new Dotenv(),
    ],
  };
};
