import React from 'react'
import './payement-history.css'

const PayementHistory = () => {
  return (
    <div className='payment-history'>
      <h2>Payment History</h2>
      <p>You can browse through all payments made on this platform overtime.</p>
      <div className='search-filter-sort'>
        <input
          type='text'
          placeholder='Search by time, date, order ID or Payment Type'
        />
        <div className='filters'>
          <button>Filter by</button>
          <button>Sort by </button>
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <th>S/N</th>
            <th>Order ID</th>
            <th>Amount</th>
            <th>Date</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: 6 }).map((_, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>Odkfnfjkl#</td>
              <td>N1,200</td>
              <td>13/09/22</td>
              <td>9:00AM</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className='pagination'>
        <span>1 - 8 of 80</span>
        <div>
          <button>{'<'}</button>
          <button>{'>'}</button>
        </div>
      </div>
    </div>
  )
}

export default PayementHistory
