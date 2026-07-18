import React, { useState, useEffect } from "react";
import celebrate from "../../../../../../../../assets/celebrate.png";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { adminData } from "../../../../../../../../redux/reducers/adminReducer.js";
import userService from "../../../../../../../../services/api/user.js";
import adminService from "../../../../../../../../services/api/admin.js";

function OverallFeedBack({ enrollmentId, setHasPercentile, isSchool, studentId }) {
  const [assessmentPercentile, setAssessmentPercentile] = useState(null);
  const { isAdmin, code } = useSelector(adminData);

  const { data, isPending, status, isError } = useQuery({
    queryKey: ["dashboard/emotional-regulation-feedback-overall", enrollmentId, studentId],
    queryFn: () => {
      if (isAdmin) return adminService.getUserCourseData(enrollmentId, 1, code);
      return userService.getUserCoursePercentile(enrollmentId);
    },
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
    if (percentile === null || percentile === undefined) return "";
    switch (true) {
      case percentile >= 0 && percentile <= 39:
        return "Well done on starting your journey into Emotional Regulation! You’ve begun to explore the basics, including understanding emotions and identifying energy levels, but there’s plenty of room to grow. Spend more time revisiting key concepts, such as understanding the SONAR method for managing emotions. Practice small coping techniques and try applying them to simple daily challenges. Remember, emotional regulation is a skill that develops over time, so keep learning and practicing."
      case percentile >= 40 && percentile <= 59:
        return "Good job! You’ve shown a foundational understanding of emotional regulation. To build on this, focus on strengthening your ability to identify emotions as they arise and using the SONAR method to deal with them effectively. Practice coping skills like physical or creative activities to handle difficult moments. With consistent effort, you’ll see more confidence in managing emotions across different situations."
      case percentile >= 60 && percentile <= 79:
        return "Great work! You’ve developed a solid understanding of emotional regulation. Over the course of these weeks, you’ve learned how to recognize energy levels, understand the SONAR method, and use basic coping skills. To take your skills further, focus on applying what you’ve learned to help you deal with high-energy or low-energy states and practice applying these skills in more complex situations. Keep practicing these techniques daily, and you’ll continue to see significant improvement in your emotional balance."
      case percentile >= 80 && percentile <= 94:
        return "Excellent work! You’ve demonstrated a strong understanding of emotional regulation concepts, from recognizing your energy levels to using the SONAR method and applying coping skills effectively. To keep growing, focus on applying these skills in a variety of scenarios, such as managing stress, improving relationships, or achieving personal goals. Your dedication to mastering emotional regulation is commendable—keep up the great work!"
      case percentile >= 95 && percentile <= 100:
        return "Outstanding achievement! You’ve shown an exceptional understanding of emotional regulation and its application in your daily life. Your ability to recognize and manage emotions, balance energy levels, and use the SONAR framework effectively is truly impressive, and will set you up for great success and impact in life. Keep inspiring others with your emotional intelligence, and continue refining these skills as you grow. Your mastery of emotional regulation will serve you well in every aspect of life!";
      default:
        return "";
    }
  }

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (data?.status === "failed" || isError || !data) {
    return (
      <div style={{ color: "red" }}>
        {data?.message || "Take activity to see overall feedback!"}
      </div>
    );
  }

  return (
    <>
      <div className="bg-compassion--feedback question-box-container d-flex justify-content-center align-items-center flex-column gap-3">
        <img src={celebrate} alt="celebrate" className="text-center" />
        <h1 className="text-green" style={{ fontSize: "100px" }}>
          Hurray!
        </h1>
      </div>
      {/* <p className="fs-md-3 text-gray mt-3">
        Congratulations on completing the Transition Curriculum!
      </p> */}
      <p className="fs-md-3 text-gray mt-3">
        Congratulations on completing the Emotional Regulation Curriculum! Over the past weeks,
        you’ve learned what it means to regulate your emotions, explored your energy levels,
        and discovered the powerful SONAR method for managing big emotions.
        You’ve also built a toolbox of effective coping skills to support your emotional well-being.
      </p>
      <p className="fs-md-3 text-gray my-3">
        Remember, emotional regulation is a lifelong skill.
        The tools and techniques you’ve gained in this course will serve you in countless ways,
        helping you navigate challenges, build meaningful relationships, and stay true to yourself.
      </p>
      <p className="fs-md-3 text-gray">
        Keep practicing, reflecting, and growing—you’ve got this!
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
