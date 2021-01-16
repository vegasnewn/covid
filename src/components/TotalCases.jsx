import React from 'react'
import {Card} from './Card'

const TotalCases = ({dataAll}) => {
  const {cases, deaths, population, updated} = dataAll
  const date = new Date(updated).toLocaleDateString(undefined, {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
  const time = new Date(updated).toLocaleTimeString()
  const lastUpdated = `${date.toString()} - ${time.toString()}`

  return (
    <div className="grid w-11/12 grid-cols-1 gap-4 mx-auto sm:grid-cols-3">
      <Card color="bg-emerald-600" text="Cases" value={cases} lastUpdated={lastUpdated} />
      <Card color="bg-rose-600" text="Deaths" value={deaths} lastUpdated={lastUpdated} />
      <Card
        color="bg-trueGray-600"
        text="Population"
        value={population}
        lastUpdated={lastUpdated}
      />
    </div>
  )
}

export {TotalCases}
