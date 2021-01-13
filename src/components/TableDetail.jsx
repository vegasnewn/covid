import React from 'react'
import NumberFormat from 'react-number-format'

const TableDetail = ({value}) => {
  return (
    <td>
      <p className="py-1 pr-3 text-xs text-right sm:text-sm md:text-base lg:text-lg">
        <NumberFormat value={value} displayType={'text'} thousandSeparator={true} />
      </p>
    </td>
  )
}

export {TableDetail}
