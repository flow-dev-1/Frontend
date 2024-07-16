import React from 'react'
import { Icon } from '@iconify/react'
import { useState } from 'react'
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from 'recharts'
import './school-overview.css'
import ActiveStudentsModal from '../../../modals-pages/dashboard-modals/overview/ActiveStudentsModal'
import NonActiveStudentsModal from '../../../modals-pages/dashboard-modals/overview/NonActiveStudentsModal'
import ActiveTeachersModal from '../../../modals-pages/dashboard-modals/overview/ActiveTeachersModal'
import NonActiveTeachersModal from '../../../modals-pages/dashboard-modals/overview/NonActiveTeachersModal'

const dataActive = [
  { name: 'Active', value: 40 },
  { name: 'Not Active', value: 10 },
]

const dataCompletion = [
  { name: 'Completed', value: 80 },
  { name: 'Remaining', value: 20 },
]

const dataGender = [
  { name: 'Male', value: 90 },
  { name: 'Female', value: 50 },
]

const dataEnrollment = [
  { name: 'Growth Mindset', value: 10 },
  { name: 'LEAP', value: 35 },
  { name: 'Mind & Money', value: 20 },
  { name: 'Course Name', value: 15 },
  { name: 'Course Name', value: 25 },
]

const COLORS = ['#17E383', '#652AC433', '#FF8042', '#0088FE']
const BAR_COLORS = ['#4bc0c0', '#9966ff', '#ff9f40', '#4b4b4b', '#ff9f40']
const GENDER_COLORS = ['#6f6af8', '#fd46d5'] // New array for gender chart colors

const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}) => {
  const RADIAN = Math.PI / 180
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5
  const x = cx + radius * Math.cos(-midAngle * RADIAN)
  const y = cy + radius * Math.sin(-midAngle * RADIAN)

  return (
    <text
      x={x}
      y={y}
      fill='white'
      textAnchor={x > cx ? 'start' : 'end'}
      dominantBaseline='central'
      fontSize={10} // Reduced font size
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  )
}

const SchoolOverview = () => {
  const [isActiveStudentModalOpen, setIsActiveStudentModalOpen] =
    useState(false)
  const [isActiveTeacherModalOpen, setIsActiveTeacherModalOpen] =
    useState(false)
  const [isNonActiveTeacherModalOpen, setIsNonActiveTeacherModalOpen] =
    useState(false)
  const [isNonActiveStudentModalOpen, setIsNonActiveStudentModalOpen] =
    useState(false)

  // Functions to open modals
  const openActiveStudentModal = () => setIsActiveStudentModalOpen(true)
  const openActiveTeacherModal = () => setIsActiveTeacherModalOpen(true)
  const openNonActiveTeacherModal = () => setIsNonActiveTeacherModalOpen(true)
  const openNonActiveStudentModal = () => setIsNonActiveStudentModalOpen(true)

  // Functions to close modals
  const closeActiveStudentModal = () => setIsActiveStudentModalOpen(false)
  const closeActiveTeacherModal = () => setIsActiveTeacherModalOpen(false)
  const closeNonActiveTeacherModal = () => setIsNonActiveTeacherModalOpen(false)
  const closeNonActiveStudentModal = () => setIsNonActiveStudentModalOpen(false)
  return (
    <div className='overview'>
      <div className='top-cards'>
        <div style={{ height: '130px' }} className='balance'>
          <p>Account Balance:</p>
          <h6
            style={{ fontFamily: 'Poppins', fontWeight: '600' }}
            className='value'
          >
            -N4,000,000.00
          </h6>
          <p id='play'>
            Pay Now <span style={{ fontSize: '18px' }}>+</span>{' '}
          </p>
        </div>

        <div style={{ height: '130px' }} className='stat one'>
          <p className='enroll'>Total Enrolled Teachers</p>
          <h6
            style={{ fontFamily: 'Poppins', fontWeight: '600' }}
            className='value'
          >
            0
          </h6>
        </div>
        <div style={{ height: '130px' }} class='stat'>
          <p className='total'>Total Enrolled Students</p>
          <h6
            style={{ fontFamily: 'Poppins', fontWeight: '600' }}
            className='value'
          >
            0
          </h6>
        </div>
      </div>
      <hr />
      <div className='charts'>
        <div
          className='chart'
          style={{ cursor: 'pointer' }}
          onClick={openActiveStudentModal}
        >
          <div>
            <div className='chart-heading'>
              <p>Activity Report</p>
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
            </div>
            <hr />

            <ResponsiveContainer width='100%' height={250}>
              <PieChart>
                <Pie
                  data={dataActive}
                  dataKey='value'
                  nameKey='name'
                  cx='50%'
                  cy='50%'
                  outerRadius={120}
                  label={renderCustomizedLabel}
                  labelLine={false}
                >
                  {dataActive.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className='students-dash'>students</div>
            <div className='summary'>
              <div className='summary-box'>
                <p className='active'>Active/Not-Active</p>
                <div>
                  <div className='box'></div> Active - 40
                </div>
                <div>
                  <div className='box-2'></div> Not-Active - 40
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className='chart'
          style={{ cursor: 'pointer' }}
          onClick={openNonActiveStudentModal}
        >
          <div>
            <div className='chart-heading'>
              <p>Progress Report</p>
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
            </div>
          </div>
          <hr />
          <ResponsiveContainer width='100%' height={250}>
            <PieChart>
              <Pie
                data={dataCompletion}
                dataKey='value'
                nameKey='name'
                cx='50%'
                cy='50%'
                innerRadius={80} // Adjusted innerRadius for increased thickness
                outerRadius={120} // Adjusted outerRadius for increased thickness
                label={renderCustomizedLabel}
                labelLine={false}
              >
                {dataCompletion.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className='students-dash'>students</div>
          <div className='summary'>
            <div className='summary-box'>
              <p className='active'>Completion Rate</p>
              <div>
                <div className='box'></div> Completed - 80%
              </div>
              <div>
                <div className='box-2'></div> Remaining - 40%
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='charts'>
        <div
          className='chart two'
          style={{ cursor: 'pointer' }}
          onClick={openActiveTeacherModal}
        >
          <div>
            <div className='chart-heading'>
              <p>Gender Balance</p>
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
            </div>
          </div>
          <hr />
          <ResponsiveContainer width='100%' height={250}>
            <PieChart>
              <Pie
                data={dataGender}
                dataKey='value'
                nameKey='name'
                cx='50%'
                cy='50%'
                outerRadius={120}
                label={renderCustomizedLabel}
                labelLine={false}
              >
                {dataGender.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={GENDER_COLORS[index % GENDER_COLORS.length]}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className='students-dash'>students</div>
          <div className='summary'>
            <div className='summary-box'>
              <p className='active gender'>Gender</p>
              <div>
                <div className='box male'></div> Male -{' '}
                <span className='male'> 80</span>
              </div>
              <div>
                <div className='box-2 female'></div> Female -{' '}
                <span className='female'> 50</span>
              </div>
            </div>
          </div>
        </div>
        <div className='chart bar-chart'>
          <div
            style={{ cursor: 'pointer' }}
            onClick={openNonActiveTeacherModal}
          >
            <div className='chart-heading'>
              <p>Enrollment Per Course</p>
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
            </div>
          </div>
          <hr />
          <ResponsiveContainer width='100%' height={400}>
            <BarChart
              data={dataEnrollment}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <XAxis dataKey='name' />
              <YAxis />

              <Bar dataKey='value'>
                {dataEnrollment.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={BAR_COLORS[index % BAR_COLORS.length]}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      <ActiveStudentsModal
        isOpen={isActiveStudentModalOpen}
        close={closeActiveStudentModal}
      />
      <ActiveTeachersModal
        isOpen={isActiveTeacherModalOpen}
        close={closeActiveTeacherModal}
      />
      <NonActiveStudentsModal
        isOpen={isNonActiveStudentModalOpen}
        close={closeNonActiveStudentModal}
      />
      <NonActiveTeachersModal
        isOpen={isNonActiveTeacherModalOpen}
        close={closeNonActiveTeacherModal}
      />
    </div>
  )
}

export default SchoolOverview
