import logo from "../../../../../assets/logo.png";
import { Icon } from "@iconify/react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  selectCurrentWeek,
  selectShowReview,
  selectShowHurray,
  selectCurrentPage,
  setCurrentWeek,
  setCurrentPage,
  setCurrentStep,
  setShowHurray,
  setShowReview,
} from "../../../../../redux/reducers/navigationSlice.js";
import "./index.css";

// Import components
import PopUp from "./components/ReviewPopUp";
import Hurray from "./components/Hurray";

// Week 1
import Page1 from "./weeks/week1/page1/Page1";
import Page2 from "./weeks/week1/page2/Page2";
import Page3 from "./weeks/week1/page3/Page3";
import Page4 from "./weeks/week1/page4/Page4";
import Page5 from "./weeks/week1/page5/Page5";
import Page6 from "./weeks/week1/page6/Page6";
import Page7 from "./weeks/week1/page7/Page7";
import Page8 from "./weeks/week1/page8/Page8";
import Page9 from "./weeks/week1/page9/Page9";
import Page10 from "./weeks/week1/page10/Page10";
import Page11 from "./weeks/week1/page11/Page11";
import Page12 from "./weeks/week1/page12/Page12";
import Page13 from "./weeks/week1/page13/Page13";
import Page14 from "./weeks/week1/page14/Page14";

// Week 2
import WeekTwoPage1 from "./weeks/week2/page1/Page1";
import WeekTwoPage2 from "./weeks/week2/page2/Page2";
import WeekTwoPage3 from "./weeks/week2/page3/Page3";
import WeekTwoPage4 from "./weeks/week2/page4/Page4";
import WeekTwoPage5 from "./weeks/week2/page5/Page5";
import WeekTwoPage6 from "./weeks/week2/page6/Page6";

// Week 3
import WeekThreePage1 from "./weeks/week3/page1/Page1";
import WeekThreePage2 from "./weeks/week3/page2/Page2";
import WeekThreePage3 from "./weeks/week3/page3/Page3";
import WeekThreePage4 from "./weeks/week3/page4/Page4";
import WeekThreePage5 from "./weeks/week3/page5/Page5";
import WeekThreePage6 from "./weeks/week3/page6/Page6";
import WeekThreePage7 from "./weeks/week3/page7/Page7";
import WeekThreePage8 from "./weeks/week3/page8/Page8";

// Week 4
import WeekFourPage1 from "./weeks/week4/page1/Page1";
import WeekFourPage2 from "./weeks/week4/page2/Page2";
import WeekFourPage3 from "./weeks/week4/page3/Page3";
import WeekFourPage4 from "./weeks/week4/page4/Page4";
import WeekFourPage5 from "./weeks/week4/page5/Page5";
import WeekFourPage6 from "./weeks/week4/page6/Page6.jsx";
import WeekFourPage7 from "./weeks/week4/page7/Page7.jsx";
import WeekFourPage8 from "./weeks/week4/page8/Page8.jsx";

// Week5
import WeekFivePage1 from "./weeks/week5/page1/Page1.jsx";
import WeekFivePage2 from "./weeks/week5/page2/Page2.jsx";
import WeekFivePage3 from "./weeks/week5/page3/Page3.jsx";
import WeekFivePage4 from "./weeks/week5/page4/Page4.jsx";
import WeekFivePage5 from "./weeks/week5/page5/Page5.jsx";
import WeekFivePage6 from "./weeks/week5/page6/Page6.jsx";

// Week6
import WeekSixPage1 from "./weeks/week6/page1/Page1.jsx";
import WeekSixPage2 from "./weeks/week6/page2/Page2.jsx";
import WeekSixPage3 from "./weeks/week6/page3/Page3.jsx";
import WeekSixPage4 from "./weeks/week6/page4/Page4.jsx";
import WeekSixPage5 from "./weeks/week6/page5/Page5.jsx";
import WeekSixPage6 from "./weeks/week6/page6/Page6.jsx";
import WeekSixPage7 from "./weeks/week6/page7/Page7.jsx";
import WeekSixPage8 from "./weeks/week6/page8/Page8.jsx";
import WeekSixPage9 from "./weeks/week6/page9/Page9.jsx";
import WeekSixPage10 from "./weeks/week6/page10/Page10.jsx";
import WeekSixPage11 from "./weeks/week6/page11/Page11.jsx";
import WeekSixPage12 from "./weeks/week6/page12/Page12.jsx";
import WeekSixPage13 from "./weeks/week6/page13/Page13.jsx";

// Week 7
import WeekSevenPage1 from "./weeks/week7/page1/Page1.jsx";
import WeekSevenPage2 from "./weeks/week7/page2/Page2.jsx";
import WeekSevenPage3 from "./weeks/week7/page3/Page3.jsx";
import WeekSevenPage4 from "./weeks/week7/page4/Page4.jsx";
import WeekSevenPage5 from "./weeks/week7/page5/Page5.jsx";
import WeekSevenPage6 from "./weeks/week7/page6/Page6.jsx";

// Week 8
import WeekEightPage1 from "./weeks/week8/page1/Page1.jsx";
import WeekEightPage2 from "./weeks/week8/page2/Page2.jsx";
import WeekEightPage3 from "./weeks/week8/page3/Page3.jsx";
import WeekEightPage4 from "./weeks/week8/page4/Page4.jsx";
import WeekEightPage5 from "./weeks/week8/page5/Page5.jsx";
import WeekEightPage6 from "./weeks/week8/page6/Page6.jsx";
import WeekEightPage7 from "./weeks/week8/page7/Page7.jsx";
import WeekEightPage8 from "./weeks/week8/page8/Page8.jsx";

// Week 9
import WeekNinePage1 from "./weeks/week9/page1/Page1.jsx";
import WeekNinePage2 from "./weeks/week9/page2/Page2.jsx";
import WeekNinePage3 from "./weeks/week9/page3/Page3.jsx";
import WeekNinePage4 from "./weeks/week9/page4/Page4.jsx";
import WeekNinePage5 from "./weeks/week9/page5/Page5.jsx";
import WeekNinePage6 from "./weeks/week9/page6/Page6.jsx";
import WeekNinePage7 from "./weeks/week9/page7/Page7.jsx";
import WeekNinePage8 from "./weeks/week9/page8/Page8.jsx";

// Week 10
import WeekTenPage1 from "./weeks/week10/page1/Page1.jsx";
import WeekTenPage2 from "./weeks/week10/page2/Page2.jsx";
import WeekTenPage3 from "./weeks/week10/page3/Page3.jsx";
import WeekTenPage4 from "./weeks/week10/page4/Page4.jsx";

import { useEffect, useRef, useState } from "react";
import { useQueries, useQuery } from "@tanstack/react-query";
import userService from "../../../../../services/api/user.js";
import {
  updateData,
  userAnswer,
  clearData,
} from "../../../../../redux/reducers/userAnswersReducer.js";
import { adminData } from "../../../../../redux/reducers/adminReducer.js";

import { setCourse } from "../../../../../redux/reducers/navigationSlice.js";
import { logoutSuccess } from "../../../../../redux/reducers/userReducer.js";
import { clearToken } from "../../../../../redux/reducers/jwtReducer.js";
import { queryClient } from "../../../../../queryClient.js";

const transitionCourseWeeks = [
  {
    week: 1,
    title:
      "Introduction to Transition. Also talk about 'Your Why' (Why are you going to a Secondary School?)",
    items: [
      { id: "week-1-video-1", type: "video", label: "Video 1: Introduction Video", page: 1 },
      { id: "week-1-activity-1", type: "activity", label: "Activity 1", page: 2, steps: 3 },
      { id: "week-1-video-2", type: "video", label: "Video 2: Why?", page: 3 },
      { id: "week-1-activity-2", type: "activity", label: "Activity 2", page: 4 },
      { id: "week-1-video-3", type: "video", label: 'Video 3: Your "Why" for Transition', page: 5 },
      { id: "week-1-activity-3", type: "activity", label: "Activity 3", page: 6 },
      { id: "week-1-video-4", type: "video", label: "Video 4: To Transition", page: 7 },
      { id: "week-1-activity-4", type: "activity", label: "Activity 4", page: 8 },
      { id: "week-1-video-5", type: "video", label: "Video 5: To Transition (Cont.)", page: 9 },
      { id: "week-1-activity-5", type: "activity", label: "Activity 5", page: 10 },
      { id: "week-1-video-6", type: "video", label: "Video 6: Preparation for Transition", page: 11 },
      { id: "week-1-activity-6", type: "activity", label: "Activity 6", page: 12, steps: 2 },
      { id: "week-1-video-7", type: "video", label: "Video 7: Recap for the week", page: 13 },
      { id: "week-1-assessment", type: "assessment", label: "Week 1 Assessment", page: 14 },
    ],
  },
  {
    week: 2,
    title: "Growth and Fixed Mindset",
    items: [
      { id: "week-2-video-1", type: "video", label: "Video 1: Mindset", page: 1 },
      { id: "week-2-activity-1", type: "activity", label: "Activity 1", page: 2 },
      { id: "week-2-video-2", type: "video", label: "Video 2: Growth & Fixed Mindset", page: 3 },
      {
        id: "week-2-activity-2",
        type: "activity",
        label: "Activity 2",
        page: 4,
        steps: 24,
      },
      { id: "week-2-video-3", type: "video", label: "Video 3: Recap for the week", page: 5 },
      { id: "week-2-assessment", type: "assessment", label: "Week 2 Assessment", page: 6 },
    ],
  },
  {
    week: 3,
    title: "Understanding what is in your control",
    items: [
      { id: "week-3-video-1", type: "video", label: "Video 1: Recap of Last Week", page: 1 },
      { id: "week-3-activity-1", type: "activity", label: "Activity 1", page: 2 },
      { id: "week-3-video-2", type: "video", label: "Video 2: Concept of Control", page: 3 },
      { id: "week-3-activity-2", type: "activity", label: "Activity 2", page: 4, steps: 18 },
      { id: "week-3-video-3", type: "video", label: "Video 3: Circle of Control", page: 5 },
      { id: "week-3-activity-3", type: "activity", label: "Activity 3", page: 6, steps: 5 },
      { id: "week-3-video-4", type: "video", label: "Video 4: Recap for the week", page: 7 },
      { id: "week-3-assessment", type: "assessment", label: "Week 3 Assessment", page: 8 },
    ],
  },
  {
    week: 4,
    title: "Understanding Values",
    items: [
      { id: "week-4-video-1", type: "video", label: "Video 1: Values", page: 1 },
      { id: "week-4-activity-1", type: "activity", label: "Activity 1", page: 2 },
      { id: "week-4-video-2", type: "video", label: "Video 2: Values (Cont.)", page: 3 },
      { id: "week-4-activity-2", type: "activity", label: "Activity 2", page: 4, steps: 3 },
      { id: "week-4-video-3", type: "video", label: "Video 3: Meditation", page: 5 },
      { id: "week-4-activity-3", type: "activity", label: "Activity 3", page: 6, steps: 3 },
      { id: "week-4-video-4", type: "video", label: "Video 4: Recap for the week", page: 7 },
      { id: "week-4-assessment", type: "assessment", label: "Week 4 Assessment", page: 8 },
    ],
  },
  {
    week: 5,
    title: "Core Values and how they matter",
    items: [
      { id: "week-5-video-1", type: "video", label: "Video 1: Emotions", page: 1 },
      { id: "week-5-activity-1", type: "activity", label: "Activity 1", page: 2 },
      { id: "week-5-video-2", type: "video", label: "Video 2: Emotional Intelligence", page: 3 },
      { id: "week-5-activity-2", type: "activity", label: "Activity 2", page: 4, steps: 5 },
      { id: "week-5-video-3", type: "video", label: "Video 3: Recap for the week", page: 5 },
      { id: "week-5-assessment", type: "assessment", label: "Week 5 Assessment", page: 6 },
    ],
  },
  {
    week: 6,
    title: "Social Skills (Navigating Relationships)",
    items: [
      { id: "week-6-video-1", type: "video", label: "Video 1: Social Skills", page: 1 },
      { id: "week-6-activity-1", type: "activity", label: "Activity 1", page: 2 },
      { id: "week-6-video-2", type: "video", label: "Video 2: Social Skills (Cont.)", page: 3 },
      { id: "week-6-activity-2", type: "activity", label: "Activity 2", page: 4 },
      { id: "week-6-video-3", type: "video", label: "Video 3: Communication Skills", page: 5 },
      { id: "week-6-activity-3", type: "activity", label: "Activity 3", page: 6 },
      { id: "week-6-video-4", type: "video", label: "Video 4: Communication Skills (Cont.)", page: 7 },
      { id: "week-6-activity-4", type: "activity", label: "Activity 4", page: 8 },
      { id: "week-6-video-5", type: "video", label: "Video 5: Boundary Setting", page: 9 },
      { id: "week-6-activity-5", type: "activity", label: "Activity 5", page: 10, steps: 12 },
      { id: "week-6-activity-6", type: "activity", label: "Activity 6: Communication and Boundaries", page: 11, steps: 6 },
      { id: "week-6-video-6", type: "video", label: "Video 6: Recap for the week", page: 12 },
      { id: "week-6-assessment", type: "assessment", label: "Week 6 Assessment", page: 13 },
    ],
  },
  {
    week: 7,
    title: "Time Management",
    items: [
      { id: "week-7-video-1", type: "video", label: "Video 1: Balancing Activities in School", page: 1 },
      { id: "week-7-activity-1", type: "activity", label: "Activity 1", page: 2 },
      { id: "week-7-video-2", type: "video", label: "Video 2: Time Management", page: 3 },
      { id: "week-7-activity-2", type: "activity", label: "Activity 2", page: 4, steps: 6 },
      { id: "week-7-video-3", type: "video", label: "Video 3: Recap for the week", page: 5 },
      { id: "week-7-assessment", type: "assessment", label: "Week 7 Assessment", page: 6 },
    ],
  },
  {
    week: 8,
    title: "Goal Setting",
    items: [
      { id: "week-8-video-1", type: "video", label: "Video 1: Scoring Goals", page: 1 },
      { id: "week-8-activity-1", type: "activity", label: "Activity 1", page: 2 },
      { id: "week-8-video-2", type: "video", label: "Video 2: Goal Settings", page: 3 },
      { id: "week-8-activity-2", type: "activity", label: "Activity 2", page: 4 },
      { id: "week-8-video-3", type: "video", label: "Video 3: Goal Settings (Cont.)", page: 5 },
      { id: "week-8-activity-3", type: "activity", label: "Activity 3", page: 6, steps: 4 },
      { id: "week-8-video-4", type: "video", label: "Video 4: Recap for the week", page: 7 },
      { id: "week-8-assessment", type: "assessment", label: "Week 8 Assessment", page: 8 },
    ],
  },
  {
    week: 9,
    title: "Resilience and Introduction to Coping Skills",
    items: [
      { id: "week-9-video-1", type: "video", label: "Video 1: The Concept of Resilience", page: 1 },
      { id: "week-9-activity-1", type: "activity", label: "Activity 1", page: 2 },
      { id: "week-9-video-2", type: "video", label: "Video 2: Resilience", page: 3 },
      { id: "week-9-activity-2", type: "activity", label: "Activity 2", page: 4, steps: 2 },
      { id: "week-9-video-3", type: "video", label: "Video 3: Coping Skills", page: 5 },
      { id: "week-9-activity-3", type: "activity", label: "Activity 3", page: 6, steps: 6 },
      { id: "week-9-video-4", type: "video", label: "Video 4: Recap for the week", page: 7 },
      { id: "week-9-assessment", type: "assessment", label: "Week 9 Assessment", page: 8 },
    ],
  },
  {
    week: 10,
    title: "Looking Ahead",
    items: [
      { id: "week-10-video-1", type: "video", label: "Video 1: Moving to Secondary School", page: 1 },
      { id: "week-10-activity-1", type: "activity", label: "Activity 1", page: 2, steps: 12 },
      { id: "week-10-video-2", type: "video", label: "Video 2: Recap for the week", page: 3 },
      { id: "week-10-assessment", type: "assessment", label: "Week 10 Assessment", page: 4 },
    ],
  },
];

const getTransitionCourseDataQueryKey = (enrollmentId, week) => [
  "dashboard-transition-course",
  enrollmentId,
  week,
];

const transitionCourseWeekNumbers = transitionCourseWeeks.map(
  (week) => week.week
);

const getTransitionWeekTotalPages = (weekNumber) =>
  transitionCourseWeeks.find((week) => week.week === weekNumber)?.items
    ?.length || 1;

const clampTransitionPageNumber = (pageNumber, totalPages) =>
  Math.max(1, Math.min(pageNumber, totalPages));

const mergeActivitiesByPage = (backendActivities = [], localActivities = []) => {
  const activitiesByPage = new Map();

  backendActivities.forEach((activity) => {
    activitiesByPage.set(Number(activity.page), activity);
  });

  localActivities.forEach((activity) => {
    activitiesByPage.set(Number(activity.page), activity);
  });

  return Array.from(activitiesByPage.values());
};

const getTransitionResumePageFromActivity = (activity, weekNumber) => {
  const totalPages = getTransitionWeekTotalPages(weekNumber);
  const activities = activity?.activities || [];
  const hasSavedLastActivityIndex = Object.prototype.hasOwnProperty.call(
    activity || {},
    "lastActivityIndex"
  );
  const savedLastActivityIndex = Number(activity?.lastActivityIndex || 0);
  const answeredPages = new Set(
    activities
      .map((currentActivity) => Number(currentActivity.page || 0))
      .filter(Boolean)
  );
  const lastAnsweredPage = activities.reduce(
    (highestPage, currentActivity) =>
      Math.max(highestPage, Number(currentActivity.page || 0)),
    0
  );
  const requiredActivityPages =
    transitionCourseWeeks
      .find((week) => week.week === weekNumber)
      ?.items.filter((item) => item.type === "activity")
      .map((item) => Number(item.page)) || [];
  const hasAnsweredAllActivities =
    requiredActivityPages.length > 0 &&
    requiredActivityPages.every((pageNumber) => answeredPages.has(pageNumber));

  if (savedLastActivityIndex > 1) {
    return clampTransitionPageNumber(savedLastActivityIndex, totalPages);
  }

  if (hasAnsweredAllActivities) {
    return clampTransitionPageNumber(totalPages, totalPages);
  }

  if (hasSavedLastActivityIndex && savedLastActivityIndex >= 1) {
    return clampTransitionPageNumber(savedLastActivityIndex, totalPages);
  }

  if (lastAnsweredPage > 0) {
    return clampTransitionPageNumber(lastAnsweredPage + 1, totalPages);
  }

  return null;
};

const WeekContent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userAnswers = useSelector(userAnswer);
  const location = useLocation(); // Get location object
  const [enrollmentId, setEnrollmentId] = useState(null);
  const [course, setCourse] = useState(null);
  const [hasResolvedBackendResume, setHasResolvedBackendResume] = useState(false);
  const appliedBackendResumeWeekRef = useRef(null);
  const lastSavedActivitiesRef = useRef("[]");
  const { isAdmin } = useSelector(adminData);

  // Access data from location.state
  const enrolmentData = location.state?.enrollmentData; // Assuming enrollData is passed in state

  useEffect(() => {
    //toDo: Only Enrolled Users or Admin can access this course
    if (!enrolmentData && !isAdmin) return navigate("/sign-in");
    appliedBackendResumeWeekRef.current = null;
    lastSavedActivitiesRef.current = "[]";
    setHasResolvedBackendResume(false);
    setEnrollmentId(enrolmentData?._id);
    setCourse(enrolmentData?.course?._id);
  }, []);

  useEffect(() => {
    const currentWeek = sessionStorage.getItem("flow-currentWeek")
      ? Number(sessionStorage.getItem("flow-currentWeek"))
      : 1;
    const currentPage = sessionStorage.getItem("flow-currentPage")
      ? Number(sessionStorage.getItem("flow-currentPage"))
      : 1;
    const currentStep = sessionStorage.getItem("flow-currentStep")
      ? Number(sessionStorage.getItem("flow-currentStep"))
      : 1;

    // Dispatch the current week, page, and step
    dispatch(setCurrentWeek(currentWeek));
    dispatch(setCurrentPage(currentPage));
    dispatch(setCurrentStep(currentStep));

    return () => { };
  }, [dispatch]); // Added dispatch to dependency array

  const currentWeek = useSelector(selectCurrentWeek);
  const currentPage = useSelector(selectCurrentPage);
  const showReview = useSelector(selectShowReview);
  const showHurray = useSelector(selectShowHurray);

  // toDo: Fetch User assessment and Activity Data
  const { data, isLoading, status, isError } = useQuery({
    queryKey: getTransitionCourseDataQueryKey(enrollmentId, currentWeek),
    queryFn: () => userService.getUserCourseData(enrollmentId, currentWeek),
    enabled: !!enrollmentId && !!currentWeek,
    refetchOnMount: "always",
    refetchOnWindowFocus: true,
    keepPreviousData: false,
  });

  const resumePositionQueries = useQueries({
    queries: transitionCourseWeekNumbers.map((weekNumber) => ({
      queryKey: getTransitionCourseDataQueryKey(enrollmentId, weekNumber),
      queryFn: () => userService.getUserCourseData(enrollmentId, weekNumber),
      enabled: !!enrollmentId && !isAdmin,
      refetchOnMount: "always",
      refetchOnWindowFocus: true,
      staleTime: 0,
      gcTime: 0,
    })),
  });

  useEffect(() => {
    if (!enrollmentId) return;
    if (isAdmin) {
      setHasResolvedBackendResume(true);
      return;
    }
    if (appliedBackendResumeWeekRef.current) {
      setHasResolvedBackendResume(true);
      return;
    }
    if (resumePositionQueries.some((query) => query.isPending)) return;

    const resumeCandidates = resumePositionQueries
      .map((query, index) => {
        const weekNumber = transitionCourseWeekNumbers[index];
        const activity = query.data?.activity;
        if (!activity) return null;

        const pageNumber = getTransitionResumePageFromActivity(
          activity,
          weekNumber
        );

        if (!pageNumber) return null;

        return {
          weekNumber,
          pageNumber,
          updatedAt: activity.updatedAt
            ? new Date(activity.updatedAt).getTime()
            : 0,
        };
      })
      .filter(Boolean)
      .sort((firstCandidate, secondCandidate) => {
        if (secondCandidate.updatedAt !== firstCandidate.updatedAt) {
          return secondCandidate.updatedAt - firstCandidate.updatedAt;
        }

        if (secondCandidate.weekNumber !== firstCandidate.weekNumber) {
          return secondCandidate.weekNumber - firstCandidate.weekNumber;
        }

        return secondCandidate.pageNumber - firstCandidate.pageNumber;
      });

    const resumeTarget = resumeCandidates[0];
    if (!resumeTarget) {
      setHasResolvedBackendResume(true);
      return;
    }

    appliedBackendResumeWeekRef.current = resumeTarget.weekNumber;
    dispatch(setCurrentWeek(resumeTarget.weekNumber));
    dispatch(setCurrentPage(resumeTarget.pageNumber));
    dispatch(setCurrentStep(1));
    sessionStorage.setItem("flow-currentWeek", resumeTarget.weekNumber.toString());
    sessionStorage.setItem("flow-currentPage", resumeTarget.pageNumber.toString());
    sessionStorage.setItem("flow-currentStep", "1");
    setHasResolvedBackendResume(true);
  }, [dispatch, enrollmentId, isAdmin, resumePositionQueries]);

  // console.log(data,"Course data here")

  useEffect(() => {
    if (!data) return;

    const canUseCurrentActivities =
      userAnswers.week === currentWeek &&
      userAnswers.courseEnrollmentId === enrollmentId;

    if (data.assessment && data.activity) {
      const backendActivities = data.activity?.activities || [];
      lastSavedActivitiesRef.current = JSON.stringify(backendActivities);
      dispatch(
        updateData({
          course: course,
          courseEnrollmentId: enrollmentId,
          week: currentWeek,
          activities: backendActivities,
          assessments: data.assessment?.assessments,
        })
      );
    } else if (data.activity) {
      const backendActivities = data.activity?.activities || [];
      const activities = mergeActivitiesByPage(
        backendActivities,
        canUseCurrentActivities ? userAnswers.activities : []
      );
      lastSavedActivitiesRef.current = JSON.stringify(backendActivities);
      dispatch(
        updateData({
          course: course,
          courseEnrollmentId: enrollmentId
            ? enrollmentId
            : userAnswers.courseEnrollmentId,
          week: currentWeek,
          activities,
          assessments: [],
        })
      );
    } else {
      const activities = canUseCurrentActivities ? userAnswers.activities : [];
      lastSavedActivitiesRef.current = JSON.stringify([]);
      dispatch(
        updateData({
          course: course,
          courseEnrollmentId: enrollmentId
            ? enrollmentId
            : userAnswers.courseEnrollmentId,
          week: currentWeek,
          activities,
          assessments: [],
        })
      );
    }

    return () => { };
  }, [data]);

  useEffect(() => {
    if (!hasResolvedBackendResume) return;
    if (!enrollmentId || !course || !currentWeek) return;
    if (data?.assessment) return;
    if (userAnswers.week !== currentWeek) return;
    if (userAnswers.courseEnrollmentId !== enrollmentId) return;
    if (!userAnswers.activities?.length) return;

    const activitiesJson = JSON.stringify(userAnswers.activities);
    if (activitiesJson === lastSavedActivitiesRef.current) return;

    const saveTimer = setTimeout(async () => {
      try {
        const result = await userService.postMyActivity(enrollmentId, {
          course,
          courseEnrollmentId: enrollmentId,
          week: currentWeek,
          activities: userAnswers.activities,
          lastActivityIndex: currentPage,
        });

        if (result?.success !== false) {
          lastSavedActivitiesRef.current = activitiesJson;
        }
      } catch (error) {
        console.error("Failed to save Transition activity progress", error);
      }
    }, 600);

    return () => clearTimeout(saveTimer);
  }, [
    course,
    currentPage,
    currentWeek,
    data?.assessment,
    enrollmentId,
    hasResolvedBackendResume,
    userAnswers.activities,
    userAnswers.courseEnrollmentId,
    userAnswers.week,
  ]);

  useEffect(() => {
    if (!hasResolvedBackendResume) return;
    if (!enrollmentId || !course || !currentWeek || !currentPage) return;
    if (data?.assessment) return;

    const saveTimer = setTimeout(async () => {
      try {
        const payload = {
          course,
          courseEnrollmentId: enrollmentId,
          week: currentWeek,
          lastActivityIndex: currentPage,
        };

        if (
          userAnswers.week === currentWeek &&
          userAnswers.courseEnrollmentId === enrollmentId &&
          userAnswers.activities?.length
        ) {
          payload.activities = userAnswers.activities;
        }

        await userService.postMyActivity(enrollmentId, payload);
      } catch (error) {
        console.error("Failed to save Transition resume position", error);
      }
    }, 350);

    return () => clearTimeout(saveTimer);
  }, [
    course,
    currentPage,
    currentWeek,
    data?.assessment,
    enrollmentId,
    hasResolvedBackendResume,
    userAnswers.activities,
    userAnswers.courseEnrollmentId,
    userAnswers.week,
  ]);

  // If showing hurray, render that instead
  if (showHurray) {
    return <Hurray currentWeek={currentWeek} />;
  }

  // Determine which component to render based on week and page
  const getComponent = () => {
    switch (currentWeek) {
      case 1:
        switch (currentPage) {
          case 1:
            return <Page1 />;
          case 2:
            return <Page2 />;
          case 3:
            return <Page3 />;
          case 4:
            return <Page4 />;
          case 5:
            return <Page5 />;
          case 6:
            return <Page6 />;
          case 7:
            return <Page7 />;
          case 8:
            return <Page8 />;
          case 9:
            return <Page9 />;
          case 10:
            return <Page10 />;
          case 11:
            return <Page11 />;
          case 12:
            return <Page12 />;
          case 13:
            return <Page13 />;
          case 14:
            return <Page14 />;
          default:
            return null;
        }
      case 2:
        switch (currentPage) {
          case 1:
            return <WeekTwoPage1 />;
          case 2:
            return <WeekTwoPage2 />;
          case 3:
            return <WeekTwoPage3 />;
          case 4:
            return <WeekTwoPage4 />;
          case 5:
            return <WeekTwoPage5 />;
          case 6:
            return <WeekTwoPage6 />;
          default:
            return null;
        }
      case 3:
        switch (currentPage) {
          case 1:
            return <WeekThreePage1 />;
          case 2:
            return <WeekThreePage2 />;
          case 3:
            return <WeekThreePage3 />;
          case 4:
            return <WeekThreePage4 />;
          case 5:
            return <WeekThreePage5 />;
          case 6:
            return <WeekThreePage6 />;
          case 7:
            return <WeekThreePage7 />;
          case 8:
            return <WeekThreePage8 />;
          default:
            return null;
        }
      case 4:
        switch (currentPage) {
          case 1:
            return <WeekFourPage1 />;
          case 2:
            return <WeekFourPage2 />;
          case 3:
            return <WeekFourPage3 />;
          case 4:
            return <WeekFourPage4 />;
          case 5:
            return <WeekFourPage5 />;
          case 6:
            return <WeekFourPage6 />;
          case 7:
            return <WeekFourPage7 />;
          case 8:
            return <WeekFourPage8 />;
          default:
            return null;
        }
      case 5:
        switch (currentPage) {
          case 1:
            return <WeekFivePage1 />;
          case 2:
            return <WeekFivePage2 />;
          case 3:
            return <WeekFivePage3 />;
          case 4:
            return <WeekFivePage4 />;
          case 5:
            return <WeekFivePage5 />;
          case 6:
            return <WeekFivePage6 />;
          default:
            return null;
        }
      case 6:
        switch (currentPage) {
          case 1:
            return <WeekSixPage1 />;
          case 2:
            return <WeekSixPage2 />;
          case 3:
            return <WeekSixPage3 />;
          case 4:
            return <WeekSixPage4 />;
          case 5:
            return <WeekSixPage5 />;
          case 6:
            return <WeekSixPage6 />;
          case 7:
            return <WeekSixPage7 />;
          case 8:
            return <WeekSixPage8 />;
          case 9:
            return <WeekSixPage9 />;
          case 10:
            return <WeekSixPage10 />;
          case 11:
            return <WeekSixPage11 />;
          case 12:
            return <WeekSixPage12 />;
          case 13:
            return <WeekSixPage13 />;
          default:
            return null;
        }
      case 7:
        switch (currentPage) {
          case 1:
            return <WeekSevenPage1 />;
          case 2:
            return <WeekSevenPage2 />;
          case 3:
            return <WeekSevenPage3 />;
          case 4:
            return <WeekSevenPage4 />;
          case 5:
            return <WeekSevenPage5 />;
          case 6:
            return <WeekSevenPage6 />;
          default:
            return null;
        }

      case 8:
        switch (currentPage) {
          case 1:
            return <WeekEightPage1 />;
          case 2:
            return <WeekEightPage2 />;
          case 3:
            return <WeekEightPage3 />;
          case 4:
            return <WeekEightPage4 />;
          case 5:
            return <WeekEightPage5 />;
          case 6:
            return <WeekEightPage6 />;
          case 7:
            return <WeekEightPage7 />;
          case 8:
            return <WeekEightPage8 />;
          default:
            return null;
        }

      case 9:
        switch (currentPage) {
          case 1:
            return <WeekNinePage1 />;
          case 2:
            return <WeekNinePage2 />;
          case 3:
            return <WeekNinePage3 />;
          case 4:
            return <WeekNinePage4 />;
          case 5:
            return <WeekNinePage5 />;
          case 6:
            return <WeekNinePage6 />;
          case 7:
            return <WeekNinePage7 />;
          case 8:
            return <WeekNinePage8 />;
          default:
            return null;
        }

      case 10:
        switch (currentPage) {
          case 1:
            return <WeekTenPage1 />;
          case 2:
            return <WeekTenPage2 />;
          case 3:
            return <WeekTenPage3 />;
          case 4:
            return <WeekTenPage4 />;
          default:
            return null;
        }

      default:
        return null;
    }
  };

  return (
    <>
      {getComponent()}
      {showReview && <PopUp />}
    </>
  );
};

const CourseContent = () => {
  const { isAdmin } = useSelector(adminData);
  const currentWeek = useSelector(selectCurrentWeek);
  const currentPage = useSelector(selectCurrentPage);
  const activeMenuItemRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [menuVisible, setMenuVisible] = useState(false);

  const legacyWeeksTopic = [
    "Introduction To Transition. Also Talk About ‘Your Why’",
    "Growth And Fixed Mindset",
    "Understanding What Is In Your Control",
    "Understanding Values",
    `Emotional Intelligence`,
    "Social Skills (Navigating Relationships)",
    "Time Management",
    "Goal Setting",
    "Resilience And Introduction To Coping Skills",
    "Looking Ahead",
  ];
  const weeksTopic = transitionCourseWeeks.length
    ? transitionCourseWeeks.map((week) => week.title)
    : legacyWeeksTopic;

  const [enrollmentProgress, setEnrollmentProgress] = useState(0);
  const [maxAccessibleWeek, setMaxAccessibleWeek] = useState(1);
  const [expandedWeeks, setExpandedWeeks] = useState([currentWeek || 1]);
  const [maxReachedPages, setMaxReachedPages] = useState(() => {
    try {
      return (
        JSON.parse(sessionStorage.getItem("flow-transition-maxReachedPages")) ||
        {}
      );
    } catch {
      return {};
    }
  });

  // Access data from location.state
  const enrolmentData = location.state?.enrollmentData;

  useEffect(() => {
    if (enrolmentData?.progress !== undefined) {
      setEnrollmentProgress(enrolmentData.progress);

      // Calculate max accessible week based on progress
      // Each week is 10% of the course (100% / 10 weeks = 10% per week)
      const progressPerWeek = 100 / weeksTopic.length;
      const calculatedMaxWeek = Math.ceil(enrolmentData.progress / progressPerWeek);

      // Allow access to current incomplete week + next week
      const accessibleWeek = Math.max(1, Math.min(calculatedMaxWeek + 1, weeksTopic.length));
      setMaxAccessibleWeek(Math.max(accessibleWeek, currentWeek || 1));
    }
  }, [currentWeek, enrolmentData, weeksTopic.length]);

  useEffect(() => {
    if (!currentWeek || !currentPage) return;

    setMaxReachedPages((pages) => {
      const weekKey = `week${currentWeek}`;
      const nextPages = {
        ...pages,
        [weekKey]: Math.max(pages[weekKey] || 1, currentPage),
      };

      sessionStorage.setItem(
        "flow-transition-maxReachedPages",
        JSON.stringify(nextPages)
      );

      return nextPages;
    });
  }, [currentWeek, currentPage]);

  useEffect(() => {
    if (!currentWeek || !currentPage) return;

    setExpandedWeeks([currentWeek]);

    const scrollTimer = setTimeout(() => {
      activeMenuItemRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "nearest",
      });
    }, 120);

    return () => clearTimeout(scrollTimer);
  }, [currentWeek, currentPage]);

  useEffect(() => {
    const segments = location.pathname.split("/").filter(Boolean);
    const lastSegment = segments[segments.length - 1];

    if (["compassion", "transition"].includes(lastSegment?.toLowerCase())) {
      dispatch(setCourse(lastSegment.toLowerCase()));
    }
  }, [location.pathname, dispatch]);

  const logOut = () => {
    // localStorage.removeItem('Flow-Auth-Token');
    localStorage.clear();
    sessionStorage.clear();
    queryClient.clear();
    dispatch(logoutSuccess());
    dispatch(clearToken());
    dispatch(
      updateData({
        course: null,
        courseEnrollmentId: null,
        week: 1,
        activities: [],
        assessments: [],
      })
    );
    navigate("/sign-in", { replace: true });
  };
  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const handleWeekClick = (weekNumber) => {
    // Only allow navigation to completed weeks or the current week in progress
    if (weekNumber <= maxAccessibleWeek) {
      // Clear previous week data before switching
      dispatch(clearData());

      dispatch(setCurrentWeek(weekNumber));
      dispatch(setCurrentPage(1));
      dispatch(setCurrentStep(1));
      dispatch(setShowHurray(false));
      dispatch(setShowReview(false));

      // Update session storage
      sessionStorage.setItem("flow-currentWeek", weekNumber.toString());
      sessionStorage.setItem("flow-currentPage", "1");
      sessionStorage.setItem("flow-currentStep", "1");
    }
  };

  const toggleWeekMenu = (weekNumber) => {
    if (!isWeekAccessible(weekNumber)) return;

    setExpandedWeeks((weeks) => (weeks.includes(weekNumber) ? [] : [weekNumber]));
  };

  const handleWeekHeaderClick = (weekNumber) => {
    toggleWeekMenu(weekNumber);
    if (weekNumber !== currentWeek) {
      handleWeekClick(weekNumber);
    }
  };

  const handleMenuItemClick = (weekNumber, pageNumber) => {
    if (!isMenuItemUnlocked(weekNumber, pageNumber)) return;

    if (weekNumber !== currentWeek) {
      dispatch(clearData());
    }

    setExpandedWeeks([weekNumber]);
    dispatch(setCurrentWeek(weekNumber));
    dispatch(setCurrentPage(pageNumber));
    dispatch(setCurrentStep(1));
    dispatch(setShowHurray(false));
    dispatch(setShowReview(false));

    sessionStorage.setItem("flow-currentWeek", weekNumber.toString());
    sessionStorage.setItem("flow-currentPage", pageNumber.toString());
    sessionStorage.setItem("flow-currentStep", "1");
  };

  const buildWeekMenuItems = (weekNumber) => {
    return (
      transitionCourseWeeks.find((week) => week.week === weekNumber)?.items ||
      []
    ).map((item) => ({
      ...item,
      pageNumber: item.page,
    }));
  };

  const isWeekAccessible = (weekNumber) => {
    return weekNumber <= maxAccessibleWeek;
  };

  const isWeekCompleted = (weekNumber) => {
    // A week is completed if the user has progressed beyond it
    const progressPerWeek = 100 / weeksTopic.length;
    return enrollmentProgress >= (weekNumber * progressPerWeek);
  };

  const isMenuItemCompleted = (weekNumber, pageNumber) => {
    if (isWeekCompleted(weekNumber)) return true;
    if (weekNumber < currentWeek) return true;

    const weekKey = `week${weekNumber}`;
    const maxReachedPage = Math.max(
      maxReachedPages[weekKey] || 1,
      weekNumber === currentWeek ? currentPage : 1
    );

    return pageNumber < maxReachedPage;
  };

  const isMenuItemUnlocked = (weekNumber, pageNumber) => {
    if (!isWeekAccessible(weekNumber)) return false;
    if (isWeekCompleted(weekNumber)) return true;
    if (weekNumber < currentWeek) return true;
    if (weekNumber > currentWeek) return pageNumber === 1;

    const weekKey = `week${weekNumber}`;
    const maxReachedPage = Math.max(
      maxReachedPages[weekKey] || 1,
      weekNumber === currentWeek ? currentPage : 1
    );

    return pageNumber <= maxReachedPage;
  };

  return (
    <>
      <nav className="navbar">
        <div className="container">
          <button
            disabled={isAdmin}
            onClick={() => navigate("/dashboard")}
            className="navbar-logo"
            style={{ border: "none", background: "#FFF" }} // Remove button outline
          >
            <img src={logo} alt="" />
          </button>
          <div
            className="navbar-logo d-none d-lg-block"
            onClick={logOut}
            style={{ cursor: "pointer" }}
          >
            Logout
          </div>

          <div className="d-block d-lg-none position-relative">
            <Icon
              icon="mdi:menu"
              width={30}
              onClick={toggleMenu}
              style={{
                cursor: "pointer",
              }}
            />
            {menuVisible && (
              <div
                className="d-lg-none position-absolute"
                style={{
                  top: "30px",
                  left: "-100px",
                  borderRadius: "15px",
                  border: "1px solid rgba(244, 241, 241, 0.9)",
                }}
              >
                <div
                  style={{
                    cursor: "pointer",
                    overflow: "hidden",
                    borderRadius: "15px",
                    background: "rgba(255,255,255,0.9)",
                  }}
                  className="border-5 px-4 pt-4 pb-1"
                >
                  <ul className="d-flex gap-3 flex-column">
                    <li className="">
                      <Link to={"/dashboard"}>Overview</Link>
                    </li>
                    <li className="">
                      <Link to={"/dashboard/profile"}>Profile</Link>
                    </li>
                    <li className="">
                      <Link to={"/dashboard/my-courses"}>MyCourse</Link>
                    </li>
                    <li className="">
                      <Link to={"/dashboard/support"}>Support</Link>
                    </li>
                    <li className="text-nowrap">
                      <Link to={"/dashboard/payment-history"}>
                        Payment History
                      </Link>
                    </li>
                    <li className=" text-danger" onClick={logOut}>
                      Log Out
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>

      <div className="main-content flex-column-reverse flex-md-row">
        <aside className="d-md-none d-lg-block aside-class">
          <button
            disabled={isAdmin}
            onClick={() => navigate("/dashboard/my-courses")}
            className="back fs-6"
            style={{ cursor: "pointer", border: "none", background: "#f8f5f5" }}
          >
            <Icon icon="fa6-solid:arrow-left-long" className="me-2" />
            Back to My Courses
          </button>

          <div className="compassion-title">
            <h2 className="fs-5 fs-md-3">
              From Curious to Confident: Transition with Ease
            </h2>
            <h2 className="compassion fs-5">Transition</h2>
          </div>

          <div className="transition-week-menu">
            {weeksTopic.map((item, index) => {
              const weekNumber = index + 1;
              const isAccessible = isWeekAccessible(weekNumber);
              const isCompleted = isWeekCompleted(weekNumber);
              const isActive = weekNumber === currentWeek;
              const isExpanded = expandedWeeks.includes(weekNumber);
              const menuItems = buildWeekMenuItems(weekNumber);

              return (
                <div
                  key={index}
                  className={`transition-week-group ${isActive ? "active-week" : ""} ${isAccessible ? "accessible-week" : "locked-week"
                    }`}
                >
                  <button
                    type="button"
                    className="transition-week-header"
                    onClick={() => handleWeekHeaderClick(weekNumber)}
                    disabled={!isAccessible}
                  >
                    <span className={`transition-status-icon ${isCompleted ? "completed" : isActive ? "active" : ""}`}>
                      <Icon icon={isAccessible ? "mdi:check" : "mdi:lock"} />
                    </span>
                    <span className="transition-week-heading">
                      <span className="transition-week-main">Week {weekNumber}</span>
                      <span className="transition-week-subtitle">{item}</span>
                    </span>
                    <Icon
                      icon="mdi:chevron-down"
                      className={`transition-week-chevron ${isExpanded ? "expanded" : ""}`}
                    />
                  </button>

                  <div className={`transition-week-items ${isExpanded ? "expanded" : ""}`}>
                    {menuItems.map((menuItem) => {
                      const itemActive =
                        currentWeek === weekNumber &&
                        currentPage === menuItem.pageNumber;
                      const itemCompleted = isMenuItemCompleted(
                        weekNumber,
                        menuItem.pageNumber
                      );
                      const itemUnlocked = isMenuItemUnlocked(
                        weekNumber,
                        menuItem.pageNumber
                      );

                      return (
                        <button
                          type="button"
                          key={menuItem.id}
                          ref={itemActive ? activeMenuItemRef : null}
                          className={`transition-week-item ${itemActive ? "selected" : ""} ${itemUnlocked ? "" : "locked"}`}
                          onClick={() =>
                            handleMenuItemClick(
                              weekNumber,
                              menuItem.pageNumber
                            )
                          }
                          disabled={!itemUnlocked || !isExpanded}
                        >
                          <span className={`transition-status-icon small ${itemCompleted ? "completed" : ""}`}>
                            <Icon icon={itemUnlocked ? "mdi:check" : "mdi:lock"} />
                          </span>
                          <span>{menuItem.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Progress indicator */}
          <div className="mt-4 px-3">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <small className="text-muted">Course Progress</small>
              <small className="fw-bold">{enrollmentProgress}%</small>
            </div>
            <div className="progress" style={{ height: "8px" }}>
              <div
                className="progress-bar"
                role="progressbar"
                style={{
                  width: `${enrollmentProgress}%`,
                  backgroundColor: "#00BCC3",
                }}
                aria-valuenow={enrollmentProgress}
                aria-valuemin="0"
                aria-valuemax="100"
              ></div>
            </div>
          </div>
        </aside>
        <aside
          className="d-none d-md-block d-lg-none"
          style={{
            flexBasis: "0px",
            background: "#00BCC3",
          }}
        >
          <button
            disabled={isAdmin}
            onClick={() => navigate("/dashboard/my-courses")}
            className="p-3"
            style={{
              cursor: "pointer",
              border: "none",
              background: "#f8f5f5",
              borderRadius: "50%",
            }}
          >
            <Icon icon="mdi:arrow-right" width="20" height="20" />
          </button>
        </aside>
        <section className="week-content position-relative">
          <WeekContent />
        </section>
      </div>
    </>
  );
};

const TransitionCourse = () => {
  return <CourseContent />;
};

export default TransitionCourse;

// data
// activity |  assestment
