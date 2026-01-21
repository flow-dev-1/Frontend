import React, { useState, useRef, useEffect } from 'react'
import Week1 from './Week1'
import Week2 from './Week2'
import Week3 from './Week3'
import Week4 from './Week4'
import Week5 from './Week5'
import { Icon } from '@iconify/react'
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'
import { useQuery } from '@tanstack/react-query'
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { decryptId } from '../../../../../../utils/encryption'
import Loading from '../../../../../loader/Loader'
import schoolService from '../../../../../../services/api/school'

const SelfAwarenessFeedback = () => {
  const weeks = [1, 2, 3, 4, 5]
  const courseId = '66853bf50118e2e0a02b6a5a'
  const navigate = useNavigate();
  const [assessmentData, setAssessmentData] = useState({})
  const [assessmentLoading, setAssessmentLoading] = useState(true)
  const [expandedWeek, setExpandedWeek] = useState(null)
  const [pdfLoading, setPdfLoading] = useState(false)
  const contentRef = useRef()
  const { userId } = useParams()
  const location = useLocation()
  const stateEnrolmentData = location.state?.enrollmentData

  // Fetch enrolment data if missing from state (e.g., on refresh)
  const { data: fetchedEnrolledData, isLoading: enrollmentLoading } = useQuery({
    queryKey: ['school-user-courses', userId],
    queryFn: () => schoolService.getIndividualCoursesEnrolled(decryptId(userId)),
    enabled: !stateEnrolmentData && !!userId,
  })

  // Prioritize state data, then fallback to fetched data matching our courseId
  const enrolmentData = stateEnrolmentData ||
    fetchedEnrolledData?.courses?.find(c => c.course?._id === courseId) ||
    fetchedEnrolledData?.courses?.find(c => c.course === courseId);

  if (enrollmentLoading) {
    return <Loading />
  }

  // // Fetch data for all weeks
  // const { data, isLoading: queryLoading } = useQuery({
  //   queryKey: ['dashboard/feedback/self-awareness', courseId],
  //   queryFn: () =>
  //     Promise.all(
  //       weeks.map((week) =>
  //         schoolService.getMyActivitesFeedback(courseId, week, decryptId(userId))
  //       )
  //     ),
  // })

  // useEffect(() => {
  //   const fetchAssessmentData = async () => {
  //     setAssessmentLoading(true)
  //     try {
  //       // Fetch assessment data for each week
  //       const assessmentResults = await Promise.all(
  //         weeks.map(async (week) => {
  //           const data = await schoolService.getMyAssessmentFeedback(
  //             courseId,
  //             week,
  //             decryptId(userId)
  //           )
  //           return { week, data }
  //         })
  //       )

  //       // Organize the assessment data by week
  //       const assessmentByWeek = {}
  //       assessmentResults.forEach(({ week, data }) => {
  //         assessmentByWeek[week] = data
  //       })

  //       setAssessmentData(assessmentByWeek)
  //     } catch (error) {
  //       console.error(error)
  //     } finally {
  //       setAssessmentLoading(false)
  //     }
  //   }

  //   fetchAssessmentData()
  // }, [courseId])

  const toggleWeek = (weekNumber) => {
    setExpandedWeek(expandedWeek === weekNumber ? null : weekNumber)
  }

  // Function to temporarily expand all weeks, generate the PDF, then restore the original state
  // const generatePDF = () => {
  //   if (!isDataLoaded) {
  //     return
  //   }
  //   const originalState = expandedWeek
  //   setPdfLoading(true) // SET PDF LOADING TO TRUE
  //   setExpandedWeek('all')
  //   setTimeout(() => {
  //     const input = contentRef.current

  //     html2canvas(input).then((canvas) => {
  //       const imgData = canvas.toDataURL('image/png')
  //       const pdf = new jsPDF('p', 'mm', 'a4')
  //       const imgWidth = 210
  //       const pageHeight = 295
  //       const imgHeight = (canvas.height * imgWidth) / canvas.width
  //       let heightLeft = imgHeight
  //       let position = 0

  //       pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
  //       heightLeft -= pageHeight

  //       while (heightLeft >= 0) {
  //         position = heightLeft - imgHeight
  //         pdf.addPage()
  //         pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
  //         heightLeft -= pageHeight
  //       }

  //       pdf.save('SelfAwarenessFeedback.pdf')
  //       setExpandedWeek(originalState)
  //       setPdfLoading(false) // HIDE LOADER AFTER PDF IS GENERATED
  //     })
  //   }, 1000) // Delay to allow rendering
  // }

  // const isDataLoaded = !queryLoading && !assessmentLoading // Check if both the query data and assessment data have loaded

  return (
    <>
      {/* Loader Overlay */}
      {/* {(queryLoading || assessmentLoading || pdfLoading) && ( // SHOW LOADER WHEN PDF IS LOADING
        <div className='loader-overlay'>
          <Loading />
        </div>
      )} */}
      <div className="nav-dropdown">
        <p
          style={{
            fontSize: "16px",
            display: "flex",
            fontWeight: "600",
            alignItems: "center",
            gap: "1rem",
            color: "#262626",
            cursor: "pointer"
          }}
          onClick={() => navigate(-1)}
        >
          <span>
            <Icon
              icon="ic:outline-arrow-back"
              style={{ color: "#262626" }}
              width={18}
            />
          </span>
          Back
        </p>
      </div>

      <div ref={contentRef} className='feedback-container'>
        <div
          className='browse-all-courses-text'
          style={{ margin: '1rem 0', width: '100%', borderRadius: "5px" }}
        >
          <p style={{ fontSize: '30px', textAlign: "center", fontFamily: "var(--headings1-font-family)" }}>Feedback for Self Awareness</p>
        </div>

        {/* Week 1 */}
        <div className='week-title-container'>
          <div className='week-title'>
            <h2 onClick={() => toggleWeek(1)} style={{ fontSize: '24px' }}>
              Week 1:{' '}
              <span style={{ fontSize: '14px' }}>
                Introduction to Self-Awareness
              </span>
            </h2>
            <Icon
              icon={
                expandedWeek === 1 || expandedWeek === 'all'
                  ? 'simple-line-icons:arrow-up'
                  : 'simple-line-icons:arrow-down'
              }
              onClick={() => toggleWeek(1)}
              style={{ cursor: 'pointer' }}
            />
          </div>
          {(expandedWeek === 1 || expandedWeek === 'all') && <Week1 enrollmentId={enrolmentData?._id} />}
        </div>

        {/* Week 2 */}
        <div className='week-title-container'>
          <div className='week-title'>
            <h2 onClick={() => toggleWeek(2)} style={{ fontSize: '24px' }}>
              Week 2:{' '}
              <span style={{ fontSize: '14px' }}>
                Identifying Strengths and Weaknesses
              </span>
            </h2>
            <Icon
              icon={
                expandedWeek === 2 || expandedWeek === 'all'
                  ? 'simple-line-icons:arrow-up'
                  : 'simple-line-icons:arrow-down'
              }
              onClick={() => toggleWeek(2)}
              style={{ cursor: 'pointer' }}
            />
          </div>
          {(expandedWeek === 2 || expandedWeek === 'all') && <Week2 enrollmentId={enrolmentData?._id} />}
        </div>

        {/* Week 3 */}
        <div className='week-title-container'>
          <div className='week-title'>
            <h2 onClick={() => toggleWeek(3)} style={{ fontSize: '24px' }}>
              Week 3:{' '}
              <span style={{ fontSize: '14px' }}>Understanding Mindset</span>
            </h2>
            <Icon
              icon={
                expandedWeek === 3 || expandedWeek === 'all'
                  ? 'simple-line-icons:arrow-up'
                  : 'simple-line-icons:arrow-down'
              }
              onClick={() => toggleWeek(3)}
              style={{ cursor: 'pointer' }}
            />
          </div>
          {(expandedWeek === 3 || expandedWeek === 'all') && <Week3 enrollmentId={enrolmentData?._id} />}
        </div>

        {/* Week 4 */}
        <div className='week-title-container'>
          <div className='week-title'>
            <h2 onClick={() => toggleWeek(4)} style={{ fontSize: '24px' }}>
              Week 4:{' '}
              <span style={{ fontSize: '14px' }}>Identifying Values</span>
            </h2>
            <Icon
              icon={
                expandedWeek === 4 || expandedWeek === 'all'
                  ? 'simple-line-icons:arrow-up'
                  : 'simple-line-icons:arrow-down'
              }
              onClick={() => toggleWeek(4)}
              style={{ cursor: 'pointer' }}
            />
          </div>
          {(expandedWeek === 4 || expandedWeek === 'all') && <Week4 enrollmentId={enrolmentData?._id} />}
        </div>

        {/* Week 5 */}
        <div className='week-title-container'>
          <div className='week-title'>
            <h2 onClick={() => toggleWeek(5)} style={{ fontSize: '24px' }}>
              Week 5:{' '}
              <span style={{ fontSize: '14px' }}>
                Emotional Intelligence and Communication Skills
              </span>
            </h2>
            <Icon
              icon={
                expandedWeek === 5 || expandedWeek === 'all'
                  ? 'simple-line-icons:arrow-up'
                  : 'simple-line-icons:arrow-down'
              }
              onClick={() => toggleWeek(5)}
              style={{ cursor: 'pointer' }}
            />
          </div>
          {(expandedWeek === 5 || expandedWeek === 'all') && <Week5 enrollmentId={enrolmentData?._id} />}
        </div>
      </div>
    </>
  )
}

export default SelfAwarenessFeedback
