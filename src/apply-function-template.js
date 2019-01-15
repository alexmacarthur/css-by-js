module.exports = `const applyCSS = function (selectors) {
      selectors.forEach(selector => {
        let pseudoMatches = selector.name.split(/(:|::)/);
        let name = "";

        if (pseudoMatches.length > 1) {
          name = pseudoMatches[0] === "" ? "" : pseudoMatches[0];
        } else {
          name = selector.name;
        }

        let elements = name ? document.querySelectorAll(name) : [];
        let pseudoClassName = "";

        // This is a pseudo class. Create unique class & apply rules within <style> block.
        if(pseudoMatches.length > 1) {

          pseudoClassName = name ? 'css-class-' + Math.floor((Math.random()*9999999)) : "";
          let rules = "";

          let style = document.createElement('style');
          
          selector.properties.forEach(property => {
            rules += property.name + ':' + property.value + ';';
          });
          
          style.type = 'text/css';
          style.innerText += (pseudoClassName ? '.' : '') + pseudoClassName + ':' + pseudoMatches.pop() + '{' + rules + '}';

          document.head.appendChild(style);
        }

        [].forEach.call(elements, element => {

          if(pseudoClassName) {
            element.classList.add(pseudoClassName);
            return;
          }

          selector.properties.forEach(property => {
            element.style[property.name] = property.value;
          });
        });
      });
    }

    applyCSS(selectors);
`;
