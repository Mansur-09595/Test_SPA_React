import React from 'react'
import arrow  from '../../images/arrow-white.png'

function TableRow({ handleSort, sortField, sortOrder }) {
  return (
    <thead>
        <tr className="titles">
        <th onClick={() => handleSort("id")} className={`sorted-${sortField === "id" ? sortOrder : ""}`}>
            ID
            <img src={arrow} alt="Стрелка" />
        </th>
        <th onClick={() => handleSort("title")} className={`sorted-${sortField === "title" ? sortOrder : ""}`}>
            Заголовок
            <img src={arrow} alt="Стрелка" />
        </th>
        <th onClick={() => handleSort("body")} className={`sorted-${sortField === "body" ? sortOrder : ""}`}>
            Описание
            <img src={arrow} alt="Стрелка" />
        </th>
        </tr>
    </thead>
  )
}

export default TableRow
