import React from "../_snowpack/pkg/react.js";
import NumberFormat from "../_snowpack/pkg/react-number-format.js";
const Card = ({color, text, value, lastUpdated}) => {
  return /* @__PURE__ */ React.createElement("div", {
    className: `${color} text-white`
  }, /* @__PURE__ */ React.createElement("h2", {
    className: "my-2 text-center sm:text-lg lg:text-xl xl:text-2xl"
  }, text), /* @__PURE__ */ React.createElement("p", {
    className: "my-2 text-lg text-center sm:text-xl lg:text-2xl xl:text-3xl"
  }, /* @__PURE__ */ React.createElement(NumberFormat, {
    value,
    displayType: "text",
    thousandSeparator: true
  })), /* @__PURE__ */ React.createElement("p", {
    className: "py-2 text-xs text-center border-t border-gray-800 lg:text-sm"
  }, lastUpdated));
};
export {Card};
