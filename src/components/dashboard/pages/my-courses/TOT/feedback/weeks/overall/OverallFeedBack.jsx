import React, { useState, useEffect } from "react";
import celebrate from "../../../../../../../../assets/celebrate.png";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { adminData } from "../../../../../../../../redux/reducers/adminReducer.js";
import userService from "../../../../../../../../services/api/user.js";
import adminService from "../../../../../../../../services/api/admin.js";

function OverallFeedBack({ enrollmentId, setHasPercentile }) {
  const [assessmentPercentile, setAssessmentPercentile] = useState(null);
  const { isAdmin, code } = useSelector(adminData);

  const { data, isPending, status, isError } = useQuery({
    queryKey: ["dashboard/tot-feedback-overall", enrollmentId, 1],
    queryFn: () =>
      isAdmin
        ? adminService.getUserCourseData(enrollmentId, 1, code)
        : userService.getUserCoursePercentile(enrollmentId),
    enabled: !!enrollmentId,
    refetchOnMount: "always",
    refetchOnWindowFocus: true,
    keepPreviousData: false,
  });

  useEffect(() => {
    if (!data || data?.status === "failed") return;
    setAssessmentPercentile(data?.averagePercent);
    setHasPercentile(true);
    return () => { };
  }, [data]);

  function getFeedBackMessage(percentile) {
    switch (true) {
      case percentile >= 10 && percentile <= 39:
        return "Well done on starting your journey into understanding resilience! You’ve gained a basic understanding of the words, ‘Resilience’ and ‘Grit’. However, you need to revisit the course again and listen more attentively to the lessons. You can reach out to your teachers or classmates for help if you still find yourself struggling. Reaching out for help shows that you are a smart person.";
      case percentile >= 40 && percentile <= 59:
        return "Good job! You’ve shown a good understanding of resilience and grits. You’re beginning to grasp concepts like the 7 C’s and the role of support systems in building resilience. To deepen your understanding, try practicing adaptability in real-life scenarios and applying the coping skills you have learned. Work on applying these principles when facing challenges, no matter how little or insignificant the challenge might seem; with consistent effort, you’ll strengthen your resilient bones.";
      case percentile >= 80 && percentile <= 94:
        return "Excellent job! You’ve shown a strong understanding of resilience and how to build it into your life. You have learned to effectively use strategies like the 7 C’s, practicing adaptability, and relying on your support systems when needed. To continue growing, focus on maintaining these habits and applying them in different areas of your life, whether it’s personal goals or overcoming unexpected challenges. Remember, resilience is a skill that gets stronger with use, and your dedication is truly inspiring. Keep pushing forward—you’re doing amazing!";
      case percentile >= 95 && percentile <= 100:
        return "Outstanding achievement! You’ve demonstrated exceptional mastery of resilience and grit. Your understanding of the 7 C’s, adaptability, and the role of support systems will help you greatly as you handle challenges. You’ve not only learned to bounce back but to thrive and grow stronger in the process. Keep building on this incredible foundation and inspiring others with your example. Your hard work and perseverance are commendable—your resilience is a skill that will serve you for a lifetime!";
      default:
        return "";
    }
  }

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (data?.status === "failed" || isError) {
    return (
      <div style={{ color: "red" }}>
        {data?.message || "Internal server error!"}
      </div>
    );
  }

  return (
    <>
      <div className="bg-compassion--feedback custom-border-20 question-box-container d-flex justify-content-center align-items-center flex-column gap-3">
        <img src={celebrate} alt="celebrate" className="text-center" />
        <h1 className="text-green" style={{ fontSize: "100px" }}>
          Hurray!
        </h1>
      </div>
      {/* <p className="fs-md-3 text-gray mt-3">
        Congratulations on completing the Transition Curriculum!
      </p> */}
      <p className="fs-md-3 text-gray mt-3">
        Congratulations on completing the Social and Emotional Learning and Positive Psychology course!
        Over the past weeks, you’ve learned what it truly means to teach with emotional intelligence,
        self-awareness, and compassion. You’ve learned how SEL can strengthen not only your students’
        growth but also your own wellbeing as an educator.
      </p>
      <p className="fs-md-3 text-gray my-3">
        You now have practical strategies to manage stress, build meaningful relationships,
        and foster a supportive, thriving classroom environment. Remember,
        every interaction with a student is an opportunity to model empathy, resilience, and positivity.
      </p>
      <p className="fs-md-3 text-gray">
        Keep practicing what you’ve learned, reflect often, stay mindful,
        and continue nurturing both your emotional health and that of your students.
        Teaching with heart transforms classrooms into communities where everyone grows together.
      </p>

      <div className="bg-blue p-1 p-md-3 mt-2 rounded rounded-md-4">
        <h2 className="text-white fs-md-1">Overall Feedback</h2>
        <p className="text-white fs-md-3">
          {getFeedBackMessage(assessmentPercentile)}
        </p>
      </div>
    </>
  );
}

export default OverallFeedBack;
