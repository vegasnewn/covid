import * as __SNOWPACK_ENV__ from '../../_snowpack/env.js';

import React from "../../_snowpack/pkg/react.js";
import GoogleMapReact from "../../_snowpack/pkg/google-map-react.js";
import NumberFormat from "../../_snowpack/pkg/react-number-format.js";
const {SNOWPACK_PUBLIC_API_KEY} = __SNOWPACK_ENV__;
const Map = ({dataCountries}) => {
  const countriesLocations = dataCountries.map((item, i) => /* @__PURE__ */ React.createElement("div", {
    className: "flex",
    key: i,
    lat: item.countryInfo.lat,
    lng: item.countryInfo.long
  }, /* @__PURE__ */ React.createElement("img", {
    src: item.countryInfo.flag,
    className: "h-3",
    alt: ""
  }), /* @__PURE__ */ React.createElement("p", {
    className: "h-3 pl-1 text-center text-red-400 bg-white w-15"
  }, /* @__PURE__ */ React.createElement(NumberFormat, {
    value: item.cases,
    displayType: "text",
    thousandSeparator: true
  }))));
  return /* @__PURE__ */ React.createElement("div", {
    className: "w-11/12 mx-auto mt-4 h-3/5"
  }, /* @__PURE__ */ React.createElement(GoogleMapReact, {
    bootstrapURLKeys: {key: SNOWPACK_PUBLIC_API_KEY},
    defaultCenter: {lat: 14, lng: 138},
    defaultZoom: 1
  }, countriesLocations), /* @__PURE__ */ React.createElement("p", {
    className: "my-2 text-xs text-right md:text-sm"
  }, "\xA9 2021 Vegas Newn"));
};
export {Map};
