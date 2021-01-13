import React from "../_snowpack/pkg/react.js";
import {TotalCases} from "./components/TotalCases.js";
import {Map} from "./components/Map.js";
import {CountryTable} from "./components/CountryTable.js";
import {Spinner} from "./components/Spinner.js";
import useSWR from "../_snowpack/pkg/swr.js";
const fetcher = async (key) => {
  const url = `https://disease.sh/v3/covid-19/${key}`;
  const res = await fetch(url);
  return await res.json();
};
const App = () => {
  const {data: dataAll} = useSWR("all", fetcher);
  const {data: dataCountries} = useSWR("countries", fetcher);
  return /* @__PURE__ */ React.createElement("div", {
    className: "h-screen"
  }, /* @__PURE__ */ React.createElement("h1", {
    className: "mt-3 mb-4 text-xl font-semibold text-center sm:mt-4 md:mt-5 lg:mt-6 sm:mb-5 md:mb-6 lg:mb-7 sm:text-2xl md:text-3xl"
  }, "COVID-19 Global Stats"), !dataAll && /* @__PURE__ */ React.createElement("div", {
    className: "grid w-11/12 grid-cols-3 gap-4 mx-auto place-items-center"
  }, /* @__PURE__ */ React.createElement(Spinner, {
    w: 32,
    h: 32
  }), /* @__PURE__ */ React.createElement(Spinner, {
    w: 32,
    h: 32
  }), /* @__PURE__ */ React.createElement(Spinner, {
    w: 32,
    h: 32
  })), dataAll && /* @__PURE__ */ React.createElement(TotalCases, {
    dataAll
  }), !dataCountries && /* @__PURE__ */ React.createElement("div", {
    className: "w-11/12 mx-auto mt-4 h-96 sm:flex sm:justify-around sm:items-end"
  }, /* @__PURE__ */ React.createElement(Spinner, {
    w: 60,
    h: 60
  }), /* @__PURE__ */ React.createElement(Spinner, {
    w: 60,
    h: 60
  })), dataCountries && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Map, {
    dataCountries
  }), /* @__PURE__ */ React.createElement(CountryTable, {
    dataCountries
  })));
};
export {App};
