import React from "../_snowpack/pkg/react.js";
import {Card} from "./Card.js";
const TotalCases = ({dataAll}) => {
  const {cases, deaths, population, updated} = dataAll;
  const date = new Date(updated).toLocaleDateString(void 0, {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric"
  });
  const time = new Date(updated).toLocaleTimeString();
  const lastUpdated = `${date.toString()} - ${time.toString()}`;
  return /* @__PURE__ */ React.createElement("div", {
    className: "grid w-11/12 grid-cols-1 gap-4 mx-auto sm:grid-cols-3"
  }, /* @__PURE__ */ React.createElement(Card, {
    color: "bg-emerald-600",
    text: "Cases",
    value: cases,
    lastUpdated
  }), /* @__PURE__ */ React.createElement(Card, {
    color: "bg-rose-600",
    text: "Deaths",
    value: deaths,
    lastUpdated
  }), /* @__PURE__ */ React.createElement(Card, {
    color: "bg-trueGray-600",
    text: "Population",
    value: population,
    lastUpdated
  }));
};
export {TotalCases};
