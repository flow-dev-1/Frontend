import React, { useEffect, useState } from 'react'
import celebrate from '../../../../../assets/hurray.png'
import { useQuery } from '@tanstack/react-query';
import userService from "../../../../../services/api/user.js";

const HurrayComponent = ({ enrollmentData }) => {
    console.log(enrollmentData, " enrollmentData")
    const courseId = "66853bf50118e2e0a02b6a5a";
    const [assessmentPercentile, setAssessmentPercentile] = useState(null);

    const { data, isPending, status, isError } = useQuery({
        queryKey: ["dashboard/self-awareness-feedback-overall", enrollmentData._id, 1],
        queryFn: () => userService.getUserCoursePercentile(courseId),
        enabled: !!enrollmentData?._id,
        refetchOnMount: "always",
        refetchOnWindowFocus: true,
        keepPreviousData: false,
    });

    console.log(data, "overall data")

    useEffect(() => {
        if (!data || data?.status === "failed") return;
        setAssessmentPercentile(data?.averagePercent)
        // setHasPercentile(true)
        return () => { };
    }, [data]);

    function getFeedBackMessage(percentile) {
        switch (true) {
            case percentile >= 10 && percentile <= 39:
                return "It looks like you might be struggling with understanding Emotional Intelligence. Your answers indicate that you need more guidance on recognizing and managing emotions effectively. Review the materials on Emotional Intelligence again, and consider discussing them with a teacher, parent, or mentor. Practice applying these concepts in your daily life and don’t hesitate to ask for help or additional resources to improve your understanding.";
            case percentile >= 40 && percentile <= 59:
                return "You have some understanding of Emotional Intelligence, but it appears that you might need more clarity on its full scope and impact. Your answers suggest that you could benefit from further reflection on these topics. Take time to learn more about the benefits of Emotional Intelligence and how to cultivate it. Consider discussing these concepts with a teacher or mentor for additional guidance.";
            case percentile >= 60 && percentile <= 79:
                return "You have a basic understanding of Emotional Intelligence, but there is room for improvement. Your answers indicate that you are on the right track, but you may need to think more about how to apply Emotional Intelligence consistently in various situations. Practice recognizing and managing emotions to deepen your understanding.";
            case percentile >= 80 && percentile <= 94:
                return "You have a good understanding of Emotional Intelligence. Your answers show that you recognize its significance and how it can impact your life positively. Focus on reinforcing your understanding and applying these concepts in real-life situations to further develop your emotional skills.";
            case percentile >= 95 && percentile <= 100:
                return "Excellent work! You have a strong understanding of Emotional Intelligence and its importance. Your answers reflect a good grasp of how managing and understanding emotions, both your own and others, can positively influence your life and relationships. Keep applying these principles to enhance your personal and professional interactions!";
            default:
                return "";
        }
    }

    function getFeedBackRating(percentile) {
        switch (true) {
            case percentile >= 10 && percentile <= 39:
                return `Keep trying! You scored ${percentile}%!`;
            case percentile >= 40 && percentile <= 59:
                return `Nice effort! You scored ${percentile}%!`;
            case percentile >= 60 && percentile <= 79:
                return `Well done! You scored ${percentile}%!`
            case percentile >= 80 && percentile <= 94:
                return `Great job! You scored ${percentile}%!`;
            case percentile >= 95 && percentile <= 100:
                return `Congratulations! You scored ${percentile}%!`;
            default:
                return "";
        }
    }

    if (isPending) {
        return <div>Loading...</div>;
    }

    if (data?.status === "failed" || isError) {
        return <div style={{ color: 'red' }}>{data?.message || "Internal server error!"}</div>;
    }

    return (
        <div >
            <div className='main-img'>
                <img className='celebrate m-auto' src={celebrate} alt="celebrate" />
            </div>
            <div className="d-flex align-items-center justify-content-around mx-auto mt-5">
            </div>
            <p className='para'>
                Congratulations on completing this journey of self-discovery and growth! Over the past weeks, you’ve explored what it means to be self-aware, learned how to identify and leverage your strengths, understood the importance of your values, and embraced a growth mindset. You’ve also gained insights into emotional intelligence, which will help you navigate relationships and challenges with empathy and resilience.

                Remember, self-awareness is an ongoing journey. The skills and knowledge you’ve acquired aren’t just for today—they’re tools you can use throughout your life to achieve your goals, overcome obstacles, and build meaningful connections. Keep reflecting on your experiences, continue to grow, and always stay true to yourself.

                Keep up the great work, and never stop learning!
            </p>
            <div className='blue-side' >
                <h2> Overall Feedback</h2>
                <p className="text-white fs-3">
                    {getFeedBackRating(assessmentPercentile)}
                </p>
                <p className="text-white fs-3">
                    {getFeedBackMessage(assessmentPercentile)}
                </p>

            </div>
        </div>
    );
}

export default HurrayComponent
