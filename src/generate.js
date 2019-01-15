const postcss = require("postcss");
const fs = require("fs");
const applyFunction = require("./apply-function-template");

module.exports = function(cssPath, outputPath) {
  return new Promise(function(resolve, reject) {
    fs.readFile(cssPath, (err, css) => {
      let root = postcss.parse(css);

      // Generate tidy array of selectors and respective CSS rules.
      let selectors = root.nodes.map(item => {
        let selector = {
          name: item.selector,
          properties: []
        };

        item.nodes.forEach(item => {
          selector.properties.push({
            name: item.prop,
            value: item.value
          });
        });

        return selector;
      });

      // Generate JS responsible for applying selectors to elements.
      fs.writeFile(
        outputPath,
        `const selectors = ${JSON.stringify(selectors)};` + applyFunction,
        function(err) {
          if (err) {
            return reject(err);
          }

          return resolve(outputPath);
        }
      );
    });
  });
};
