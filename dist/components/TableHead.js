import React from "../../_snowpack/pkg/react.js";
const TableHead = ({sortByNumbers, option, text}) => {
  return /* @__PURE__ */ React.createElement("th", null, /* @__PURE__ */ React.createElement("p", {
    className: "px-3 py-1 text-right bg-gray-300"
  }, /* @__PURE__ */ React.createElement("span", {
    className: "hover:text-blue-600 hover:underline text-xs sm:text-sm md:text-base lg:text-lg cursor-pointer",
    onClick: () => sortByNumbers(option)
  }, text)));
};
export {TableHead};
