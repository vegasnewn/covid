import React from 'react'
import GoogleMapReact from 'google-map-react'
import NumberFormat from 'react-number-format'
const {SNOWPACK_PUBLIC_API_KEY} = import.meta.env

const Map = ({dataCountries}) => {
  const countriesLocations = dataCountries.map((item, i) => (
    <div className="flex" key={i} lat={item.countryInfo.lat} lng={item.countryInfo.long}>
      <img src={item.countryInfo.flag} className="h-3" alt="" />
      <p className="h-3 pl-1 text-center text-red-400 bg-white w-15">
        <NumberFormat value={item.cases} displayType={'text'} thousandSeparator={true} />
      </p>
    </div>
  ))

  return (
    <div className="w-11/12 mx-auto mt-4 h-3/5">
      <GoogleMapReact
        bootstrapURLKeys={{key: SNOWPACK_PUBLIC_API_KEY}}
        defaultCenter={{lat: 14, lng: 138}}
        defaultZoom={1}
      >
        {countriesLocations}
      </GoogleMapReact>
      <p className="my-2 text-xs text-right md:text-sm">© 2021 Vegas Newn</p>
    </div>
  )
}

export {Map}
