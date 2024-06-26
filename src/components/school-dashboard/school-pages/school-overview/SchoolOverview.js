import React from 'react'
import { Line, Pie, Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  ArcElement,
  BarElement,
} from 'chart.js'
import './overview.css'

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  ArcElement,
  BarElement
)

const SchoolOverview = () => {
  const lineData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Enrollment Chart',
        data: [10, 20, 15, 30, 40, 25, 35],
        borderColor: '#4bc0c0',
        fill: false,
      },
    ],
  }

  const pieData1 = {
    labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    datasets: [
      {
        data: [20, 15, 10, 30, 25],
        backgroundColor: [
          '#ff6384',
          '#36a2eb',
          '#cc65fe',
          '#ffce56',
          '#4bc0c0',
        ],
      },
    ],
  }

  const barData1 = {
    labels: [
      'Location 1',
      'Location 2',
      'Location 3',
      'Location 4',
      'Location 5',
    ],
    datasets: [
      {
        label: 'Engagement',
        data: [50, 60, 70, 180, 190],
        backgroundColor: [
          '#ff6384',
          '#36a2eb',
          '#cc65fe',
          '#ffce56',
          '#4bc0c0',
        ],
      },
    ],
  }

  const pieData2 = {
    labels: ['Male', 'Female'],
    datasets: [
      {
        data: [70, 30],
        backgroundColor: ['#36a2eb', '#ff6384'],
      },
    ],
  }

  const barData2 = {
    labels: [
      'GROWTH MINDSET',
      'LEAP',
      'MIND & MONEY',
      'VALUE & GOALS',
      'RESILIENCE',
    ],
    datasets: [
      {
        label: 'Course Engagement',
        data: [100, 400, 200, 300, 350],
        backgroundColor: [
          '#4bc0c0',
          '#9966ff',
          '#ff9f40',
          '#ffcd56',
          '#36a2eb',
        ],
      },
    ],
  }

  const barData3 = {
    labels: ['LGA 1', 'LGA 2', 'LGA 3', 'LGA 4', 'LGA 5'],
    datasets: [
      {
        label: 'Locations',
        data: [20, 40, 30, 50, 40],
        backgroundColor: [
          '#4bc0c0',
          '#9966ff',
          '#ff9f40',
          '#ffcd56',
          '#36a2eb',
        ],
      },
    ],
  }

  return (
    <div className='overview'>
      <div className='card total-income'>
        <h3>Total Income</h3>
        <p>0.00</p>
        <p className='outstanding'>Outstanding: -₦230,000</p>
      </div>
      <div className='card total-enrolled-schools'>
        <h3>Total Enrolled Schools</h3>
        <p>0</p>
      </div>
      <div className='card total-enrolled-teachers'>
        <h3>Total Enrolled Teachers</h3>
        <p>0</p>
      </div>
      <div className='card total-enrolled-students'>
        <h3>Total Enrolled Students</h3>
        <p>0</p>
      </div>
      <div className='chart-container'>
        <div className='chart-box'>
          <div className='filter-options'>
            <h4>Enrollment Chart</h4>
            <div>
              <button>Filter by</button>
              <button>Sort by</button>
            </div>
          </div>
          <Line data={lineData} />
        </div>
        <div className='chart-box'>
          <div className='filter-options'>
            <h4>Busy Days</h4>
            <div>
              <button>Filter by</button>
            </div>
          </div>
          <Pie data={pieData1} />
        </div>
        <div className='chart-box'>
          <div className='filter-options'>
            <h4>Busy Hours</h4>
            <div>
              <button>Filter by</button>
            </div>
          </div>
          <Line data={lineData} />
        </div>
      </div>
      <div className='chart-container'>
        <div className='chart-box'>
          <div className='filter-options'>
            <h4>Gender Analysis</h4>
            <div>
              <button>Filter by</button>
            </div>
          </div>
          <Pie data={pieData2} />
        </div>
        <div className='chart-box'>
          <div className='filter-options'>
            <h4>Course Engagement</h4>
            <div>
              <button>Filter by</button>
              <button>Sort by</button>
            </div>
          </div>
          <Bar data={barData2} />
        </div>
        <div className='chart-box'>
          <div className='filter-options'>
            <h4>Locations</h4>
            <div>
              <button>Filter by</button>
              <button>Sort by</button>
            </div>
          </div>
          <Bar data={barData3} />
        </div>
      </div>
    </div>
  )
}

export default SchoolOverview
