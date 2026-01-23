import React from 'react'
import { useParams } from 'react-router-dom'
import TransitionFeedback from '../../../../../dashboard/pages/my-courses/transition-course/feedback/index.jsx'
import { decryptId } from '../../../../../../utils/encryption'

const SchoolTransitionFeedback = () => {
    const { userId } = useParams()

    return (
        <>
            <TransitionFeedback isSchool={true} studentId={decryptId(userId)} />
        </>
    )
}

export default SchoolTransitionFeedback
