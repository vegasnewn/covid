import React, {useState} from "../_snowpack/pkg/react.js";
import {TableHead} from "./TableHead.js";
import {TableDetail} from "./TableDetail.js";
const CountryTable = ({dataCountries}) => {
  const [sortedCountries, setSortedCountries] = useState(dataCountries);
  const [search, setSearch] = useState("");
  const sortByCountryName = () => {
    const copiedCountries = [...sortedCountries];
    copiedCountries.sort((countryA, countryB) => {
      if (countryA.country < countryB.country)
        return -1;
      if (countryA.country > countryB.country)
        return 1;
      return 0;
    });
    setSortedCountries(copiedCountries);
  };
  const sortByNumbers = (option) => {
    const copiedCountries = [...sortedCountries];
    copiedCountries.sort((countryA, countryB) => {
      if (option === "cases")
        return countryB.cases - countryA.cases;
      if (option === "deaths")
        return countryB.deaths - countryA.deaths;
      if (option === "population")
        return countryB.population - countryA.population;
      return 0;
    });
    setSortedCountries(copiedCountries);
  };
  const filterCountries = sortedCountries.filter((item) => {
    return search === "" ? true : item.country.toLowerCase().includes(search.toLowerCase());
  });
  return /* @__PURE__ */ React.createElement("div", {
    className: "pb-12 mt-4"
  }, /* @__PURE__ */ React.createElement("table", {
    className: "mx-auto"
  }, /* @__PURE__ */ React.createElement("thead", null, /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("th", null, /* @__PURE__ */ React.createElement("form", {
    className: "mb-1 ml-1 text-left"
  }, /* @__PURE__ */ React.createElement("input", {
    className: "w-32 py-1 pl-1 text-xs border-2 border-black sm:text-sm md:text-base lg:text-lg sm:w-36 md:pl-2 md:w-44 lg:w-52",
    type: "text",
    placeholder: "Search for Countries",
    value: search,
    onChange: (e) => setSearch(e.target.value)
  }))), /* @__PURE__ */ React.createElement("th", null), /* @__PURE__ */ React.createElement("th", null), /* @__PURE__ */ React.createElement("th", null)), /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("th", null, /* @__PURE__ */ React.createElement("p", {
    className: "px-3 py-1 text-left bg-gray-300"
  }, /* @__PURE__ */ React.createElement("span", {
    className: "text-xs cursor-pointer hover:text-blue-600 hover:underline sm:text-sm md:text-base lg:text-lg",
    onClick: () => sortByCountryName()
  }, "Country"))), /* @__PURE__ */ React.createElement(TableHead, {
    sortByNumbers,
    option: "cases",
    text: "Cases"
  }), /* @__PURE__ */ React.createElement(TableHead, {
    sortByNumbers,
    option: "deaths",
    text: "Death"
  }), /* @__PURE__ */ React.createElement(TableHead, {
    sortByNumbers,
    option: "population",
    text: "Population"
  }))), /* @__PURE__ */ React.createElement("tbody", null, filterCountries.map((item) => /* @__PURE__ */ React.createElement("tr", {
    key: item.country
  }, /* @__PURE__ */ React.createElement("td", null, /* @__PURE__ */ React.createElement("p", {
    className: "py-1 pl-3 text-xs sm:text-sm md:text-base lg:text-lg"
  }, item.country)), /* @__PURE__ */ React.createElement(TableDetail, {
    value: item.cases
  }), /* @__PURE__ */ React.createElement(TableDetail, {
    value: item.deaths
  }), /* @__PURE__ */ React.createElement(TableDetail, {
    value: item.population
  }))))));
};
export {CountryTable};
