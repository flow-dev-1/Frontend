import React from 'react'
import { useParams } from 'react-router-dom'
import Transition2Feedback from '../../../../../dashboard/pages/my-courses/transition-2/feedback/index'
import { decryptId } from '../../../../../../utils/encryption'

const SchoolTransition2Feedback = () => {
    const { userId } = useParams()

    return (
        <>
            <Transition2Feedback isSchool={true} studentId={decryptId(userId)} />
        </>
    )
}

export default SchoolTransition2Feedback
