import React from 'react'

const TableHead = ({sortByNumbers, option, text}) => {
  return (
    <th>
      <p className={'px-3 py-1 text-right bg-gray-300'}>
        <span
          className={
            'hover:text-blue-600 hover:underline text-xs sm:text-sm md:text-base lg:text-lg cursor-pointer'
          }
          onClick={() => sortByNumbers(option)}
        >
          {text}
        </span>
      </p>
    </th>
  )
}

export {TableHead}
