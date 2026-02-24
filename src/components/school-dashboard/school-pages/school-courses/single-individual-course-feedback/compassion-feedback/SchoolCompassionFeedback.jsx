import React from 'react'
import { useParams } from 'react-router-dom'
import CompassionFeedback from '../../../../../dashboard/pages/my-courses/compassion-course/feedback/index'
import { decryptId } from '../../../../../../utils/encryption'

const SchoolCompassionFeedback = () => {
    const { userId } = useParams()

    return (
        <>
            <CompassionFeedback isSchool={true} studentId={decryptId(userId)} />
        </>
    )
}

export default SchoolCompassionFeedback
