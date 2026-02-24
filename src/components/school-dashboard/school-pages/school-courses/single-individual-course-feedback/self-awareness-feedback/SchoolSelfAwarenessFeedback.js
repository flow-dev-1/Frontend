import React, { useState, useEffect } from 'react'
import { useParams, useLocation } from "react-router-dom";
import { decryptId } from '../../../../../../utils/encryption'
import Loading from '../../../../../loader/Loader'
import schoolService from '../../../../../../services/api/school'
import { useQuery } from '@tanstack/react-query'
import DashboardSelfAwarenessFeedback from '../../../../../dashboard/pages/my-courses/self-awareness-feedback/SelfAwarenessFeedback'

const SchoolSelfAwarenessFeedback = () => {
  const [enrollmentId, setEnrollmentId] = useState(null)
  const courseId = "66853bf50118e2e0a02b6a5a";
  const { userId } = useParams();
  const location = useLocation();
  const stateEnrolmentData = location.state?.enrollmentData;

  // Fetch enrolment data if missing from state (e.g., on refresh)
  const { data: fetchedEnrolledData, isLoading: enrollmentLoading } = useQuery({
    queryKey: ["school-user-courses", userId],
    queryFn: () => schoolService.getIndividualCoursesEnrolled(decryptId(userId)),
    enabled: !stateEnrolmentData && !!userId,
  });

  useEffect(() => {
    // Check for admin session enrollmentId
    const adminEnrollmentId = sessionStorage.getItem("flow-courseEnrollmentId");

    const foundEnrolment =
      stateEnrolmentData ||
      (adminEnrollmentId ? { _id: adminEnrollmentId } : null) ||
      fetchedEnrolledData?.courses?.find((c) => c.course?._id === courseId) ||
      fetchedEnrolledData?.courses?.find((c) => c.course === courseId) ||
      fetchedEnrolledData?.courses?.find((c) => c.course?.title === "Self Awareness");

    if (foundEnrolment?._id) {
      setEnrollmentId(foundEnrolment._id);
    }
  }, [stateEnrolmentData, fetchedEnrolledData]);

  if (enrollmentLoading) {
    return <Loading />;
  }

  return (
    <div className="school-self-awareness-feedback">
      <DashboardSelfAwarenessFeedback
        enrollmentId={enrollmentId}
        isSchool={true}
        studentId={decryptId(userId)}
      />
    </div>
  )
}

export default SchoolSelfAwarenessFeedback
