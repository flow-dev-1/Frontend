import React from 'react'
import './payement-history.css'
import { Icon } from '@iconify/react'

const SchoolPaymentHistory = () => {
  return (
    <div className='payment-history'>
      <h2 style={{ color: '#18181B', fontSize:"24px" }}>Payment History -</h2>
      <p>You can browse through all payments made on this platform overtime.</p>
      <hr style={{ marginTop: '2rem' }} />
      <div className='search-filter-sort'>
        <div className='search-wrapper'>
          <span className='search-icon'>
            <Icon icon='lets-icons:search' style={{ color: '#4d4d4d' }} />
          </span>
          <input
            style={{
              backgroundColor: 'rgba(94, 45, 189, 0.05)',
              width: '100%',
            }}
            id='search-input'
            type='text'
            placeholder='Search by Name, Age, Email, Phone Number'
          />
        </div>
        <div className='filters'>
          <div style={{ cursor: 'pointer' }} className='filter-sort'>
            <span>
              <Icon icon='octicon:filter-16' />
            </span>
            <select style={{ cursor: 'pointer' }}>
              <option value='all'>Filter by</option>
              <option value='published'>Published</option>
              <option value='draft'>Draft</option>
            </select>
          </div>
          <div className='filter-sort'>
            <span>
              <Icon icon='mingcute:az-sort-ascending-letters-line' />
            </span>
            <select style={{ cursor: 'pointer' }}>
              <option value='a-z'>Sort by A-Z</option>
              <option value='z-a'>Sort by Z-A</option>
            </select>
          </div>
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
      <div className='nav-btn'>
        <p>1 - 8 of 20</p>
        <div>
          <Icon icon='iconamoon:arrow-left-2-light' width={25} />
          <Icon icon='iconamoon:arrow-right-2-light' width={25} />
        </div>
      </div>
    </div>
  )
}

export default SchoolPaymentHistory
