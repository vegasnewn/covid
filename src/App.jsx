import React from 'react'
import {TotalCases} from './components/TotalCases'
import {Map} from './components/Map'
import {CountryTable} from './components/CountryTable'
import {Spinner} from './components/Spinner'
import useSWR from 'swr'

const fetcher = async key => {
  const url = `https://disease.sh/v3/covid-19/${key}`
  const res = await fetch(url)
  return await res.json()
}

const App = () => {
  const {data: dataAll} = useSWR('all', fetcher)
  const {data: dataCountries} = useSWR('countries', fetcher)

  return (
    <div className="h-screen">
      <h1 className="mt-3 mb-4 text-xl font-semibold text-center sm:mt-4 md:mt-5 lg:mt-6 sm:mb-5 md:mb-6 lg:mb-7 sm:text-2xl md:text-3xl">
        COVID-19 Global Stats
      </h1>
      {!dataAll && (
        <div className="grid w-11/12 grid-cols-3 gap-4 mx-auto place-items-center">
          <Spinner w={32} h={32} />
          <Spinner w={32} h={32} />
          <Spinner w={32} h={32} />
        </div>
      )}
      {dataAll && <TotalCases dataAll={dataAll} />}
      {!dataCountries && (
        <div className="w-11/12 mx-auto mt-4 h-96 sm:flex sm:justify-around sm:items-end">
          <Spinner w={60} h={60} />
          <Spinner w={60} h={60} />
        </div>
      )}
      {dataCountries && (
        <>
          <Map dataCountries={dataCountries} />
          <CountryTable dataCountries={dataCountries} />
        </>
      )}
    </div>
  )
}

export {App}
