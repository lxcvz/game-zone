const { ModuleFederationPlugin } = require('webpack').container;
const deps = require("./package.json").dependencies;

module.exports = () => ({
  webback: {
    configure: {
      output: {
        publicPath: "auto"
      }
    },
    plugins: {
      add: [
        new ModuleFederationPlugin({
          name: "cardpicker",
          filename: "remoteEntry.js",
          exposes: {
            "./CardPicker": "./src/CardPicker"
          },
          shared: {
            ...deps,
            ui: {
              singleton: true
            },
            react: {
              singleton: true,
              requiredVersion: deps.react,
            },
            "react-dom": {
              singleton: true,
              requiredVersion: deps["react-dom"]
            }
          }
        })
      ]
    }
  },
});