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
    queryKey: ["dashboard/compassion-feedback-overall", enrollmentId, studentId],
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
        return "Well done on taking the first steps in understanding compassion! While you’re starting to grasp the basic concepts, there’s room to deepen your understanding and application. Reflect on the importance of showing kindness to yourself and others, and revisit topics like self-compassion and the circle of concern. Practice small, compassionate actions in your daily life, and think about how they make a difference. Remember, compassion is a skill that grows with practice, so keep learning and taking steps forward.";
      case percentile >= 40 && percentile <= 59:
        return "Good job! You’ve shown some understanding of what it means to be compassionate. You’re beginning to appreciate the value of self-compassion and extending kindness to others. To build on this, focus on applying what you’ve learned about the circle of concern and putting yourself in others’ shoes. Consider how your actions can make a positive impact in real-life scenarios. With consistent practice, you’ll strengthen your ability to act compassionately toward yourself and those around you.";
      case percentile >= 60 && percentile <= 79:
        return "Great work! You have a solid understanding of compassion and its importance in daily life. You recognize the significance of self-compassion, extending kindness to others, and the concept of the circle of concern. To enhance your skills further, continue practicing what you’ve learned by actively considering how you can support and care for others in different scenarios. Think about how small acts of compassion can lead to meaningful change. Keep up the great effort!";
      case percentile >= 80 && percentile <= 94:
        return "Excellent work! You’ve developed a strong understanding of compassion and how to incorporate it into your life. You’ve shown the ability to be kind to yourself, care for others, and recognize your role in both your inner and outer circles of concern. To continue growing, challenge yourself with more complex life scenarios where you can apply empathy and compassion. You’re well on your way to making compassion a natural part of how you think and act—keep up the outstanding effort!";
      case percentile >= 95 && percentile <= 100:
        return "Outstanding achievement! You’ve demonstrated a deep and thoughtful understanding of compassion and its application in various aspects of life. Your ability to practice self-compassion, care for others, and act with empathy in different scenarios is truly commendable. You have learned to consistently recognize the impact of your actions and actively work to make a difference. Keep leading by example, and continue to inspire others with your compassionate mindset. Your dedication to compassion will have a lasting positive impact!";
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
      <div className="bg-compassion--feedback custom-border-20 question-box-container d-flex justify-content-center align-items-center flex-column gap-3">
        <img src={celebrate} alt="celebrate" className="text-center" />
        <h1 className="text-green" style={{ fontSize: "100px" }}>
          Hurray!
        </h1>
      </div>
      <p className="fs-md-3 text-gray mt-3">
        Congratulations on completing the Compassion Curriculum! Over the past
        weeks, you’ve discovered what it means to be compassionate, learned the
        value of self-compassion, and explored ways to show kindness to others.
        You’ve also gained insights into your Circle of Concern and practiced
        applying compassion in real-life scenarios.
      </p>
      <p className="fs-md-3 text-gray my-3">
        Compassion is a lifelong practice. The skills you’ve gained in this
        course will help you navigate challenges, build meaningful connections,
        and create a positive impact in your community. Continue to reflect on
        what you’ve learned, strive to see the world from different
        perspectives, and always choose kindness.
      </p>
      <p className="fs-md-3 text-gray">
        Keep spreading compassion, and remember: even small acts of kindness can
        make a big difference!
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
