import React, {useState} from 'react'
import {TableHead} from './TableHead.jsx'
import {TableDetail} from './TableDetail.jsx'

const CountryTable = ({dataCountries}) => {
  const [sortedCountries, setSortedCountries] = useState(dataCountries)
  const [search, setSearch] = useState('')

  const sortByCountryName = () => {
    const copiedCountries = [...sortedCountries]
    copiedCountries.sort((countryA, countryB) => {
      if (countryA.country < countryB.country) return -1
      if (countryA.country > countryB.country) return 1
      return 0
    })
    setSortedCountries(copiedCountries)
  }

  const sortByNumbers = option => {
    const copiedCountries = [...sortedCountries]
    copiedCountries.sort((countryA, countryB) => {
      if (option === 'cases') return countryB.cases - countryA.cases
      if (option === 'deaths') return countryB.deaths - countryA.deaths
      if (option === 'population') return countryB.population - countryA.population
      return 0
    })
    setSortedCountries(copiedCountries)
  }

  const filterCountries = sortedCountries.filter(item => {
    return search === '' ? true : item.country.toLowerCase().includes(search.toLowerCase())
  })

  return (
    <div className="pb-12 mt-4">
      <table className="mx-auto">
        <thead>
          <tr>
            <th>
              <form className="mb-1 ml-1 text-left">
                <input
                  className="w-32 py-1 pl-1 text-xs border-2 border-black sm:text-sm md:text-base lg:text-lg sm:w-36 md:pl-2 md:w-44 lg:w-52"
                  type="text"
                  placeholder="Search for Countries"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                />
              </form>
            </th>
            <th></th>
            <th></th>
            <th></th>
          </tr>
          <tr>
            <th>
              <p className="px-3 py-1 text-left bg-blueGray-200">
                <span
                  className="text-xs cursor-pointer hover:text-blue-600 hover:underline sm:text-sm md:text-base lg:text-lg"
                  onClick={() => sortByCountryName()}
                >
                  Country
                </span>
              </p>
            </th>
            <TableHead sortByNumbers={sortByNumbers} option="cases" text="Cases" />
            <TableHead sortByNumbers={sortByNumbers} option="deaths" text="Death" />
            <TableHead sortByNumbers={sortByNumbers} option="population" text="Population" />
          </tr>
        </thead>

        <tbody>
          {filterCountries.map(item => (
            <tr key={item.country}>
              <td>
                <p className="py-1 pl-3 text-xs sm:text-sm md:text-base lg:text-lg">
                  {item.country}
                </p>
              </td>
              <TableDetail value={item.cases} />
              <TableDetail value={item.deaths} />
              <TableDetail value={item.population} />
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export {CountryTable}
