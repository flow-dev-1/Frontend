import React from 'react'
import { useParams } from 'react-router-dom'
import ResilienceFeedback from '../../../../../dashboard/pages/my-courses/resilience-grit/feedback/index'
import { decryptId } from '../../../../../../utils/encryption'

const SchoolResilienceFeedback = () => {
    const { userId } = useParams()

    return (
        <>
            <ResilienceFeedback isSchool={true} studentId={decryptId(userId)} />
        </>
    )
}

export default SchoolResilienceFeedback
