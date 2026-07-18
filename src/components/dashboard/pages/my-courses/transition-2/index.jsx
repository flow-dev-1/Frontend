import logo from "../../../../../assets/logo.png";
import { Icon } from "@iconify/react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  selectCurrentWeek,
  selectShowReview,
  selectShowHurray,
  selectCurrentPage,
  selectNavigationState,
  setCurrentWeek,
  setCurrentPage,
  setCurrentStep,
  setShowHurray,
  setShowReview,
} from "../../../../../redux/reducers/navigationSlice.js";
import "./index.css";
// Import components
import PopUp from "./components/ReviewPopUp.jsx";
import Hurray from "./components/Hurray.jsx";
import { courseContent } from "./data/activity";
import { assessments } from "./data/assessment";
import { queueTransition2ActivitySave } from "./utils/activitySaveQueue";

// Week 1
import Page1 from "./weeks/week1/page1/Page1.jsx";
import Page2 from "./weeks/week1/page2/Page2.jsx";
import Page3 from "./weeks/week1/page3/Page3.jsx";
import Page4 from "./weeks/week1/page4-slider/Page4.jsx";
import Page5 from "./weeks/week1/page5/Page5.jsx";
import Page6 from "./weeks/week1/page6/Page6.jsx";
import Page7 from "./weeks/week1/page8/Page7.jsx";
import Page8 from "./weeks/week1/page6/Page6.jsx";
import Page9Scenario from "./weeks/week1/page9/Page8.jsx";
import Page10 from "./weeks/week1/page10-reason-sentence/Page10.jsx";
import Page16 from "./weeks/week1/page16/Page15.jsx";
import Page17 from "./weeks/week1/page17/Page16.jsx";

// Week 2
import WeekTwoPage1 from "./weeks/week2/page1/Page1.jsx";
import WeekTwoPage2 from "./weeks/week2/page2/Page2.jsx";
import WeekTwoPage3 from "./weeks/week2/page3-duplicate/Page3.jsx";
import WeekTwoPage4 from "./weeks/week2/page2/Page2.jsx";
import WeekTwoPage5 from "./weeks/week2/page3/Page3.jsx";
import WeekTwoPage6 from "./weeks/week2/page6-growth-mindset/Page6.jsx";
import WeekTwoPage7 from "./weeks/week2/page5/Page5.jsx";
import WeekTwoPage8 from "./weeks/week2/page4/Page4.jsx";
import WeekTwoPage9 from "./weeks/week2/page7/Page7.jsx";
import WeekTwoPage10 from "./weeks/week2/page6/Page6.jsx";
import WeekTwoPage11 from "./weeks/week2/page7/Page7.jsx";
import WeekTwoPage12 from "./weeks/week2/page8/Page8.jsx";
import WeekTwoPage13 from "./weeks/week2/page9/Page9.jsx";
import WeekTwoPage14 from "./weeks/week2/page14-value-reflection/Page14.jsx";
import WeekTwoPage15 from "./weeks/week2/page11/Page11.jsx";
import WeekTwoPage16 from "./weeks/week2/page10/Page10.jsx";
import WeekTwoPage17 from "./weeks/week2/page11/Page11.jsx";
import WeekTwoPage18 from "./weeks/week2/Page12/Page12.jsx";

// Week 3
import WeekThreePage1 from "./weeks/week3/page1/Page1";
import WeekThreePage2 from "./weeks/week3/page2/Page2";
import WeekThreePage3 from "./weeks/week3/page3/Page3";
import WeekThreePage4 from "./weeks/week3/page4/Page4";
import WeekThreePage5 from "./weeks/week3/page5/Page5";
import WeekThreePage6 from "./weeks/week3/page6/Page6";
import WeekThreePage7 from "./weeks/week3/page7/Page7";
import WeekThreePage8 from "./weeks/week3/page8-support-reflection/Page8";
import WeekThreePage9 from "./weeks/week3/page9/Page9";
import WeekThreePage10 from "./weeks/week3/page10-spending-bucket/Page10";
import WeekThreePage11 from "./weeks/week3/page9/Page9";
import WeekThreePage12 from "./weeks/week3/page8/Page8";
import WeekThreePage13 from "./weeks/week3/page9/Page9";
import WeekThreePage14 from "./weeks/week3/page10/Page10";

// Week 4
import WeekFourPage1 from "./weeks/week4/page1/Page1.jsx";
import WeekFourPage2 from "./weeks/week4/page2/Page2.jsx";
import WeekFourPage3 from "./weeks/week4/page3/Page3.jsx";
import WeekFourPage4 from "./weeks/week4/page4/Page4.jsx";
import WeekFourPage5 from "./weeks/week4/page5/Page5.jsx";
import WeekFourPage6 from "./weeks/week4/page6/Page6.jsx";
import WeekFourPage7 from "./weeks/week4/page7/Page7.jsx";
import WeekFourPage8 from "./weeks/week4/page8/Page8.jsx";
import WeekFourPage9 from "./weeks/week4/page9/Page9.jsx";
import WeekFourPage10 from "./weeks/week4/page10/Page10.jsx";
import WeekFourPage11 from "./weeks/week4/page11/Page11.jsx";
import WeekFourPage12 from "./weeks/week4/Page12/Page12.jsx";
import WeekFourPage13 from "./weeks/week4/page13/Page13.jsx";
import WeekFourPage14ExamChoice from "./weeks/week4/page14-exam-choice/Page14.jsx";
import WeekFourPage14 from "./weeks/week4/page14/Page14.jsx";
import WeekFourPage15 from "./weeks/week4/page15/Page15.jsx";
import WeekFourPage16 from "./weeks/week4/page16/Page16.jsx";

// Week5
import WeekFivePage1 from "./weeks/week5/page1/Page1.jsx";
import WeekFivePage2 from "./weeks/week5/page2/Page2.jsx";
import WeekFivePage3 from "./weeks/week5/page3/Page3.jsx";
import WeekFivePage4 from "./weeks/week5/page4/Page4.jsx";
import WeekFivePage5 from "./weeks/week5/page5/Page5.jsx";
import WeekFivePage6 from "./weeks/week5/page6/Page6.jsx";
import WeekFivePage7 from "./weeks/week5/page7/Page7.jsx";
import WeekFivePage8 from "./weeks/week5/page8/Page8.jsx";
import WeekFivePage9 from "./weeks/week5/page9/Page9.jsx";
import WeekFivePage10 from "./weeks/week5/page10/Page10.jsx";

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

const mergeActivitiesByPage = (backendActivities = [], currentActivities = []) => {
  const activityMap = new Map();

  backendActivities.forEach((activity) => {
    if (activity?.page == null) return;
    activityMap.set(activity.page, activity);
  });

  currentActivities.forEach((activity) => {
    if (activity?.page == null) return;
    activityMap.set(activity.page, activity);
  });

  return Array.from(activityMap.values()).sort(
    (firstActivity, secondActivity) =>
      Number(firstActivity.page) - Number(secondActivity.page)
  );
};

const getTransition2CourseDataQueryKey = (enrollmentId, week) => [
  "dashboard-transition-2-course",
  enrollmentId,
  week,
];

const getTransition2EnrollmentQueryKey = (enrollmentId) => [
  "dashboard-transition-2-enrollment",
  enrollmentId,
];

const transition2WeekNumbers = Object.keys(courseContent).map((weekKey) =>
  Number(weekKey.replace("week", ""))
);

const clampPageNumber = (pageNumber, totalPages) =>
  Math.max(1, Math.min(pageNumber, totalPages + 1));

const getResumePageFromActivity = (activity, weekNumber) => {
  const pages = courseContent[`week${weekNumber}`]?.pages || [];
  const totalPages = pages.length || 1;
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
  const requiredActivityPages = pages
    .filter((page) => page.type !== "video")
    .map((page) => Number(page.id));
  const hasAnsweredAllActivities =
    requiredActivityPages.length > 0 &&
    requiredActivityPages.every((pageNumber) => answeredPages.has(pageNumber));

  if (savedLastActivityIndex > 1) {
    return clampPageNumber(savedLastActivityIndex, totalPages);
  }

  if (hasAnsweredAllActivities) {
    return clampPageNumber(totalPages + 1, totalPages);
  }

  if (hasSavedLastActivityIndex && savedLastActivityIndex >= 1) {
    return clampPageNumber(savedLastActivityIndex, totalPages);
  }

  if (lastAnsweredPage > 0) {
    return clampPageNumber(lastAnsweredPage + 1, totalPages);
  }

  return null;
};

const WeekContent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userAnswers = useSelector(userAnswer);
  const userAnswersRef = useRef(userAnswers);
  userAnswersRef.current = userAnswers;
  const location = useLocation(); // Get location object
  const [enrollmentId, setEnrollmentId] = useState(null);
  const [course, setCourse] = useState(null);
  const [hasResolvedBackendResume, setHasResolvedBackendResume] = useState(false);
  const { isAdmin } = useSelector(adminData);
  const lastSavedActivitiesRef = useRef("[]");
  const appliedBackendResumeWeekRef = useRef(null);

  // Access data from location.state
  const enrolmentData = location.state?.enrollmentData; // Assuming enrollData is passed in state

  useEffect(() => {
    //toDo: Only Enrolled Users or Admin can access this course
    if (!enrolmentData && !isAdmin) return navigate("/sign-in");
    dispatch(clearData());
    lastSavedActivitiesRef.current = "[]";
    appliedBackendResumeWeekRef.current = null;
    setHasResolvedBackendResume(false);
    setEnrollmentId(enrolmentData?._id);
    setCourse(enrolmentData?.course?._id);
  }, [dispatch, enrolmentData, isAdmin, navigate]);

  const { data: liveEnrollmentData } = useQuery({
    queryKey: getTransition2EnrollmentQueryKey(enrollmentId),
    queryFn: () => userService.getSingleEnrollment(enrollmentId),
    enabled: !!enrollmentId && !isAdmin,
    refetchOnMount: "always",
    refetchOnWindowFocus: true,
    staleTime: 0,
    gcTime: 0,
  });

  const effectiveEnrollment =
    liveEnrollmentData?.enrollment || enrolmentData || {};

  const getResumeWeekFromEnrollment = (enrollment) => {
    const totalWeeks = Object.keys(courseContent).length;
    const progressPerWeek = 100 / totalWeeks;
    const progressWeek = enrollment?.progress
      ? Math.floor(enrollment.progress / progressPerWeek) + 1
      : 1;
    const lastWeekIndex = Number(enrollment?.lastWeekIndex || 0);

    return Math.max(
      1,
      Math.min(lastWeekIndex || progressWeek || 1, totalWeeks)
    );
  };

  const enrollmentLastWeekIndex = effectiveEnrollment?.lastWeekIndex;
  const enrollmentProgress = effectiveEnrollment?.progress;
  const hasBackendResume =
    Boolean(enrollmentLastWeekIndex) || Boolean(enrollmentProgress);
  const backendResumeWeek = getResumeWeekFromEnrollment({
    lastWeekIndex: enrollmentLastWeekIndex,
    progress: enrollmentProgress,
  });

  useEffect(() => {
    if (appliedBackendResumeWeekRef.current) return;

    const currentWeek = hasBackendResume
      ? backendResumeWeek
      : sessionStorage.getItem("flow-currentWeek")
        ? Number(sessionStorage.getItem("flow-currentWeek"))
        : 1;
    const currentPage = hasBackendResume
      ? 1
      : sessionStorage.getItem("flow-currentPage")
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
  }, [
    backendResumeWeek,
    dispatch,
    hasBackendResume,
  ]);

  const currentWeek = useSelector(selectCurrentWeek);
  const currentPage = useSelector(selectCurrentPage);
  const navigationState = useSelector(selectNavigationState);
  const showReview = useSelector(selectShowReview);
  const showHurray = useSelector(selectShowHurray);

  // toDo: Fetch User assessment and Activity Data
  const { data } = useQuery({
    queryKey: getTransition2CourseDataQueryKey(enrollmentId, currentWeek),
    queryFn: () => userService.getUserCourseData(enrollmentId, currentWeek),
    enabled: !!enrollmentId && !!currentWeek,
    refetchOnMount: "always",
    refetchOnWindowFocus: true,
    staleTime: 0,
    gcTime: 0,
  });

  const resumePositionQueries = useQueries({
    queries: transition2WeekNumbers.map((weekNumber) => ({
      queryKey: getTransition2CourseDataQueryKey(enrollmentId, weekNumber),
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
        const weekNumber = transition2WeekNumbers[index];
        const activity = query.data?.activity;
        if (!activity) return null;

        const resumePage = getResumePageFromActivity(activity, weekNumber);

        if (!resumePage) return null;

        return {
          weekNumber,
          pageNumber: resumePage,
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

  useEffect(() => {
    if (!data) return;
    const currentUserAnswers = userAnswersRef.current;

    const canUseCurrentActivities =
      currentUserAnswers.week === currentWeek &&
      currentUserAnswers.courseEnrollmentId === enrollmentId;

    if (data.assessment && data.activity) {
      const backendActivities = data.activity?.activities || [];
      const activities = mergeActivitiesByPage(
        backendActivities,
        canUseCurrentActivities ? currentUserAnswers.activities : []
      );
      lastSavedActivitiesRef.current = JSON.stringify(backendActivities);
      dispatch(
        updateData({
          course: course,
          courseEnrollmentId: enrollmentId,
          week: currentWeek,
          activities,
          assessments: data.assessment?.assessments,
        })
      );
    } else if (data.activity) {
      const backendActivities = data.activity?.activities || [];
      const activities = mergeActivitiesByPage(
        backendActivities,
        canUseCurrentActivities ? currentUserAnswers.activities : []
      );
      const resumePage = getResumePageFromActivity(
        { ...data.activity, activities },
        currentWeek
      );

      lastSavedActivitiesRef.current = JSON.stringify(backendActivities);
      dispatch(
        updateData({
          course: course,
          courseEnrollmentId: enrollmentId
            ? enrollmentId
            : currentUserAnswers.courseEnrollmentId,
          week: currentWeek,
          activities,
          assessments: [],
        })
      );

      if (appliedBackendResumeWeekRef.current !== currentWeek && resumePage > 1) {
        appliedBackendResumeWeekRef.current = currentWeek;
        dispatch(setCurrentPage(resumePage));
        dispatch(setCurrentStep(1));
        sessionStorage.setItem("flow-currentWeek", currentWeek.toString());
        sessionStorage.setItem("flow-currentPage", resumePage.toString());
        sessionStorage.setItem("flow-currentStep", "1");
        setHasResolvedBackendResume(true);
      }
    } else {
      const activities = canUseCurrentActivities
        ? currentUserAnswers.activities
        : [];
      lastSavedActivitiesRef.current = JSON.stringify([]);
      dispatch(
        updateData({
          course: course,
          courseEnrollmentId: enrollmentId
            ? enrollmentId
            : currentUserAnswers.courseEnrollmentId,
          week: currentWeek,
          activities,
          assessments: [],
        })
      );
    }

    return () => { };
  }, [data, currentWeek, dispatch, enrollmentId, course]);

  useEffect(() => {
    if (!hasResolvedBackendResume) return;
    if (!enrollmentId || !currentWeek) return;
    if (data?.assessment) return;
    if (userAnswers.week !== currentWeek) return;
    if (userAnswers.courseEnrollmentId !== enrollmentId) return;
    if (navigationState.isAssessmentPage) return;
    if (navigationState.totalSteps > 0 && !navigationState.isLastStep) return;
    if (!userAnswers.activities?.length) return;

    const activitiesJson = JSON.stringify(userAnswers.activities);
    if (activitiesJson === lastSavedActivitiesRef.current) return;

    const saveTimer = setTimeout(async () => {
      try {
        const result = await queueTransition2ActivitySave(() =>
          userService.postMyActivity(enrollmentId, {
            course,
            courseEnrollmentId: enrollmentId,
            week: currentWeek,
            activities: userAnswers.activities,
            lastActivityIndex: currentPage,
          })
        );

        if (result?.success !== false) {
          lastSavedActivitiesRef.current = activitiesJson;
        }
      } catch (error) {
        console.error("Failed to save Transition 2 activity progress", error);
      }
    }, 600);

    return () => clearTimeout(saveTimer);
  }, [
    course,
    currentWeek,
    data?.assessment,
    enrollmentId,
    hasResolvedBackendResume,
    navigationState.isAssessmentPage,
    navigationState.isLastStep,
    navigationState.totalSteps,
    currentPage,
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

        await queueTransition2ActivitySave(() =>
          userService.postMyActivity(enrollmentId, payload)
        );
      } catch (error) {
        console.error("Failed to save Transition 2 resume position", error);
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
            return <Page7 />;
          case 10:
            return <Page10 />;
          case 11:
            return <Page7 />;
          case 12:
            return <Page9Scenario />;
          case 13:
            return <Page16 />;
          case 14:
            return <Page17 />;
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
          case 7:
            return <WeekTwoPage7 />;
          case 8:
            return <WeekTwoPage8 />;
          case 9:
            return <WeekTwoPage9 />;
          case 10:
            return <WeekTwoPage10 />;
          case 11:
            return <WeekTwoPage11 />;
          case 12:
            return <WeekTwoPage12 />;
          case 13:
            return <WeekTwoPage13 />;
          case 14:
            return <WeekTwoPage14 />;
          case 15:
            return <WeekTwoPage15 />;
          case 16:
            return <WeekTwoPage16 />;
          case 17:
            return <WeekTwoPage17 />;
          case 18:
            return <WeekTwoPage18 />;
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
          case 9:
            return <WeekThreePage9 />;
          case 10:
            return <WeekThreePage10 />;
          case 11:
            return <WeekThreePage11 />;
          case 12:
            return <WeekThreePage12 />;
          case 13:
            return <WeekThreePage13 />;
          case 14:
            return <WeekThreePage14 />;
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
          case 9:
            return <WeekFourPage9 />;
          case 10:
            return <WeekFourPage10 />;
          case 11:
            return <WeekFourPage11 />;
          case 12:
            return <WeekFourPage12 />;
          case 13:
            return <WeekFourPage13 />;
          case 14:
            return <WeekFourPage14ExamChoice />;
          case 15:
            return <WeekFourPage13 />;
          case 16:
            return <WeekFourPage10 />;
          case 17:
            return <WeekFourPage13 />;
          case 18:
            return <WeekFourPage14ExamChoice />;
          case 19:
            return <WeekFourPage13 />;
          case 20:
            return <WeekFourPage14 />;
          case 21:
            return <WeekFourPage15 />;
          case 22:
            return <WeekFourPage16 />;
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
          case 7:
            return <WeekFivePage7 />;
          case 8:
            return <WeekFivePage8 />;
          case 9:
            return <WeekFivePage9 />;
          case 10:
            return <WeekFivePage10 />;
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
  const showHurray = useSelector(selectShowHurray);
  const activeMenuItemRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const enrolmentData = location.state?.enrollmentData;
  const maxReachedPagesStorageKey =
    `flow-transition2-maxReachedPages:${enrolmentData?._id || "admin"}`;
  const [menuVisible, setMenuVisible] = useState(false);
  const [enrollmentProgress, setEnrollmentProgress] = useState(0);
  const [maxAccessibleWeek, setMaxAccessibleWeek] = useState(1);
  const [optimisticCompletedWeek, setOptimisticCompletedWeek] = useState(0);
  const [maxReachedPages, setMaxReachedPages] = useState(() => {
    try {
      return JSON.parse(
        sessionStorage.getItem(maxReachedPagesStorageKey)
      ) || {};
    } catch {
      return {};
    }
  });

  const weeksTopic = [
    "Defining Your Next Chapter",
    "Mindset and Values",
    "Social and Financial Intelligence",
    "Freedom and Responsibility",
    "Goal Setting and Resilience",
  ];
  const [expandedWeeks, setExpandedWeeks] = useState([currentWeek || 1]);

  const transition2MenuLabels = {
    week1: {
      videos: [
        "Introduction",
        "The journey ahead",
        "Your WHY",
        "The future you",
        "The reason for your WHY",
        "The Power of your WHY",
        "Recap for the week",
      ],
    },
    week2: {
      videos: [
        "Recap of Last week",
        "Mindset & Values",
        "Fixed or Growth Mindset",
        "Your current mindset",
        "Values",
        "Your values",
        "Your true values",
        "Combining Mindset & Values",
        "Recap for the week",
      ],
    },
    week3: {
      videos: [
        "Relationships & Money",
        "It's importance",
        "The 3 Keys",
        "Healthy relationship",
        "Financial Intelligence",
        "The 3 Buckets of Money",
        "Recap for the week",
      ],
    },
    week4: {
      videos: [
        "Welcome",
        "University & Freedom",
        "Responsibility",
        "Time Freedom",
        "Time Freedom Scenario",
        "Financial Freedom",
        "Social Freedom",
        "Social Freedom (cont.)",
        "Academic Freedom",
        "Procrastination",
        "The gift of Freedom",
      ],
    },
    week5: {
      videos: [
        "Welcome",
        "Challenges",
        "Goal setting",
        "SMART Goals",
        "Congratulations!",
      ],
    },
  };

  const weekAccessQueries = useQueries({
    queries: transition2WeekNumbers.map((weekNumber) => ({
      queryKey: getTransition2CourseDataQueryKey(enrolmentData?._id, weekNumber),
      queryFn: () => userService.getUserCourseData(enrolmentData?._id, weekNumber),
      enabled: !!enrolmentData?._id && !isAdmin,
      refetchOnMount: "always",
      refetchOnWindowFocus: true,
      staleTime: 0,
    })),
  });

  useEffect(() => {
    try {
      setMaxReachedPages(
        JSON.parse(sessionStorage.getItem(maxReachedPagesStorageKey)) || {}
      );
      sessionStorage.removeItem("flow-transition2-maxReachedPages");
    } catch {
      setMaxReachedPages({});
    }
  }, [maxReachedPagesStorageKey]);

  useEffect(() => {
    if (showHurray) {
      setOptimisticCompletedWeek((completedWeek) =>
        Math.max(completedWeek, currentWeek)
      );
    }
  }, [currentWeek, showHurray]);

  useEffect(() => {
    if (enrolmentData?.progress) {
      setEnrollmentProgress(enrolmentData.progress);
    }
  }, [enrolmentData]);

  useEffect(() => {
    if (isAdmin) {
      setMaxAccessibleWeek(weeksTopic.length);
      return;
    }

    if (!enrolmentData?._id) return;
    if (weekAccessQueries.some((query) => query.isPending)) return;

    const highestSubmittedAssessmentWeek = weekAccessQueries.reduce(
      (highestWeek, query, index) =>
        query.data?.assessment
          ? Math.max(highestWeek, transition2WeekNumbers[index])
          : highestWeek,
      0
    );
    const completedWeek = Math.max(
      highestSubmittedAssessmentWeek,
      showHurray ? currentWeek : 0,
      optimisticCompletedWeek
    );
    const nextAccessibleWeek = Math.max(
      1,
      Math.min(completedWeek + 1, weeksTopic.length)
    );

    setMaxAccessibleWeek(nextAccessibleWeek);

    if (currentWeek > nextAccessibleWeek) {
      dispatch(setShowHurray(false));
      dispatch(setShowReview(false));
      dispatch(setCurrentWeek(nextAccessibleWeek));
      dispatch(setCurrentPage(1));
      dispatch(setCurrentStep(1));
      sessionStorage.setItem("flow-currentWeek", nextAccessibleWeek.toString());
      sessionStorage.setItem("flow-currentPage", "1");
      sessionStorage.setItem("flow-currentStep", "1");
    }
  }, [
    currentWeek,
    dispatch,
    enrolmentData?._id,
    isAdmin,
    optimisticCompletedWeek,
    showHurray,
    weekAccessQueries,
    weeksTopic.length,
  ]);

  // Update maxAccessibleWeek and enrollmentProgress when currentWeek changes (e.g., after completing a week)
  // This ensures the navigation and progress bar update immediately without requiring a page refresh
  useEffect(() => {
    // Update progress based on the current week
    // When moving to a new week, it means the previous week was completed
    const progressPerWeek = 100 / weeksTopic.length;
    const calculatedProgress =
      showHurray && currentWeek === weeksTopic.length
        ? 100
        : (currentWeek - 1) * progressPerWeek;

    // Only update if the calculated progress is higher than the current progress
    if (calculatedProgress > enrollmentProgress) {
      setEnrollmentProgress(calculatedProgress);
    }
  }, [
    currentWeek,
    enrollmentProgress,
    showHurray,
    weeksTopic.length,
  ]);

  useEffect(() => {
    if (!currentWeek || !currentPage) return;

    setMaxReachedPages((pages) => {
      const weekKey = `week${currentWeek}`;
      const nextPages = {
        ...pages,
        [weekKey]: Math.max(pages[weekKey] || 1, currentPage),
      };

      sessionStorage.setItem(
        maxReachedPagesStorageKey,
        JSON.stringify(nextPages)
      );

      return nextPages;
    });
  }, [currentWeek, currentPage, maxReachedPagesStorageKey]);

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

    // This is an important section that affects course rendering!
    if (
      [
        "compassion",
        "transition",
        "resilience_grit",
        "emotional_regulation",
        "transition_2",
      ].includes(lastSegment?.toLowerCase())
    ) {
      dispatch(setCourse(lastSegment.toLowerCase()));
    }
  }, [location.pathname, dispatch]);

  const handleWeekClick = (weekNumber) => {
    // Only allow navigation to completed weeks or the current week in progress
    if (weekNumber <= maxAccessibleWeek) {
      // Clear previous week data before switching
      dispatch(clearData());
      dispatch(setShowHurray(false));
      dispatch(setShowReview(false));

      dispatch(setCurrentWeek(weekNumber));
      dispatch(setCurrentPage(1));
      dispatch(setCurrentStep(1));

      // Update session storage
      sessionStorage.setItem("flow-currentWeek", weekNumber.toString());
      sessionStorage.setItem("flow-currentPage", "1");
      sessionStorage.setItem("flow-currentStep", "1");
    }
  };

  const toggleWeekMenu = (weekNumber) => {
    if (!isWeekAccessible(weekNumber)) return;

    setExpandedWeeks((weeks) =>
      weeks.includes(weekNumber)
        ? []
        : [weekNumber]
    );
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
    dispatch(setShowHurray(false));
    dispatch(setShowReview(false));
    setExpandedWeeks([weekNumber]);
    dispatch(setCurrentWeek(weekNumber));
    dispatch(setCurrentPage(pageNumber));
    dispatch(setCurrentStep(1));

    sessionStorage.setItem("flow-currentWeek", weekNumber.toString());
    sessionStorage.setItem("flow-currentPage", pageNumber.toString());
    sessionStorage.setItem("flow-currentStep", "1");
  };

  const buildWeekMenuItems = (weekNumber) => {
    const weekKey = `week${weekNumber}`;
    const pages = courseContent[weekKey]?.pages || [];
    const labels = transition2MenuLabels[weekKey] || {};
    let videoCount = 0;
    let activityCount = 0;

    const items = pages.map((page) => {
      if (page.type === "video") {
        videoCount += 1;
        return {
          id: `${weekKey}-page-${page.id}`,
          pageNumber: page.id,
          type: "video",
          label: `Video ${videoCount}: ${labels.videos?.[videoCount - 1] || "Lesson"}`,
        };
      }

      activityCount += 1;
      return {
        id: `${weekKey}-page-${page.id}`,
        pageNumber: page.id,
        type: "activity",
        label: `Activity ${activityCount}`,
      };
    });

    if (assessments[weekKey]?.questions?.length) {
      items.push({
        id: `${weekKey}-assessment`,
        pageNumber: pages.length + 1,
        type: "assessment",
        label: `Week ${weekNumber} Assessment`,
      });
    }

    return items;
  };

  const isWeekAccessible = (weekNumber) => {
    return weekNumber <= maxAccessibleWeek;
  };

  const isWeekCompleted = (weekNumber) => {
    // A week is completed if the user has progressed beyond it
    const progressPerWeek = 100 / weeksTopic.length;
    return (
      weekNumber < maxAccessibleWeek ||
      enrollmentProgress >= weekNumber * progressPerWeek
    );
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

  const logOut = () => {
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

  return (
    <>
      <nav className="navbar">
        <div className="container">
          <button
            disabled={isAdmin}
            onClick={() => navigate("/dashboard")}
            className="navbar-logo"
            style={{ border: "none", background: "#FFF" }}
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
            <h2 className="fs-5 fs-md-3">Navigating the next chapter with clarity</h2>
            <h2 className="compassion fs-5">Transition 2</h2>
          </div>

          <div className="transition-week-menu">
            {weeksTopic.map((item, index) => {
              const weekNumber = index + 1;
              const isAccessible = isWeekAccessible(weekNumber);
              const isCompleted = isWeekCompleted(weekNumber);
              const isActive = weekNumber === currentWeek;
              const isExpanded = expandedWeeks.includes(weekNumber);

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
                      <Icon
                        icon={isAccessible ? "mdi:check" : "mdi:lock"}
                      />
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
                    {buildWeekMenuItems(weekNumber).map((menuItem) => {
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

        <section className="week-content resilience-week-content position-relative">
          <WeekContent />
        </section>
      </div>
    </>
  );
};

const EmotionalRegulationCourse = () => {
  return <CourseContent />;
};

export default EmotionalRegulationCourse;
