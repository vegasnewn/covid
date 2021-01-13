import React from "../_snowpack/pkg/react.js";
import NumberFormat from "../_snowpack/pkg/react-number-format.js";
const TableDetail = ({value}) => {
  return /* @__PURE__ */ React.createElement("td", null, /* @__PURE__ */ React.createElement("p", {
    className: "py-1 pr-3 text-xs text-right sm:text-sm md:text-base lg:text-lg"
  }, /* @__PURE__ */ React.createElement(NumberFormat, {
    value,
    displayType: "text",
    thousandSeparator: true
  })));
};
export {TableDetail};
