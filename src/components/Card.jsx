import React from 'react'
import NumberFormat from 'react-number-format'

const Card = ({color, text, value, lastUpdated}) => {
  return (
    <div className={`${color} text-white`}>
      <h2 className="my-2 text-center sm:text-lg lg:text-xl xl:text-2xl">{text}</h2>
      <p className="my-2 text-lg text-center sm:text-xl lg:text-2xl xl:text-3xl">
        <NumberFormat value={value} displayType={'text'} thousandSeparator={true} />
      </p>
      <p className="py-2 text-xs text-center border-t border-gray-800 lg:text-sm">{lastUpdated}</p>
    </div>
  )
}

export {Card}
