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
  setCourse,
  setShowHurray,
  setShowReview,
} from "../../../../../redux/reducers/navigationSlice.js";
import "./index.css";
import { courseContent } from "./weeks/data/activity.js";
import { assessments } from "./weeks/data/assessment.js";

// Import components
import PopUp from "./components/ReviewPopUp";
import Hurray from "./components/Hurray";

import Page1 from "./weeks/week1/page1/Page1";
import Page2 from "./weeks/week1/page2/Page2";
import Page3 from "./weeks/week1/page3/Page3";
import Page4 from "./weeks/week1/page4/Page4";
import Page5 from "./weeks/week1/page5/Page5";
import Page6 from "./weeks/week1/page6/Page6";
import Page7 from "./weeks/week1/page7/Page7";
import Page8 from "./weeks/week1/page8/Page8";
import WeekTwoPage1 from "./weeks/week2/page1/Page1";
import WeekTwoPage2 from "./weeks/week2/page2/Page2";
import WeekTwoPage3 from "./weeks/week2/page3/Page3";
import WeekTwoPage4 from "./weeks/week2/page4/page4";
import WeekTwoPage5 from "./weeks/week2/page5/Page5";
import WeekTwoPage6 from "./weeks/week2/page6/Page6";
import WeekTwoPage7 from "./weeks/week2/page7/Page7";
import WeekTwoPage8 from "./weeks/week2/page8/Page8";
import WeekThreePage1 from "./weeks/week3/page1/Page1";
import WeekThreePage2 from "./weeks/week3/page2/Page2";
import WeekThreePage3 from "./weeks/week3/page3/Page3";
import WeekThreePage4 from "./weeks/week3/page4/Page4";
import WeekThreePage5 from "./weeks/week3/page5/Page5";
import WeekThreePage6 from "./weeks/week3/page6/Page6";
import WeekThreePage7 from "./weeks/week3/page7/Page7";
import WeekThreePage8 from "./weeks/week3/page8/Page8";
import WeekThreePage9 from "./weeks/week3/page9/Page9";
import WeekThreePage10 from "./weeks/week3/page10/Page10";
import WeekThreePage11 from "./weeks/week3/page11/Page11";
import WeekThreePage12 from "./weeks/week3/page12/Page12";
import WeekFourPage1 from "./weeks/week4/page1/Page1";
import WeekFourPage2 from "./weeks/week4/page2/Page2";
import WeekFourPage3 from "./weeks/week4/page3/Page3";
import WeekFourPage4 from "./weeks/week4/page4/Page4";
import WeekFourPage5 from "./weeks/week4/page5/Page5";
import WeekFourPage6 from "./weeks/week4/page6/Page6.jsx";
import WeekFourPage7 from "./weeks/week4/page7/Page7.jsx";
import WeekFourPage8 from "./weeks/week4/page8/Page8.jsx";
import WeekFivePage1 from "./weeks/week5/page1/Page1.jsx";
import WeekFivePage2 from "./weeks/week5/page2/Page2.jsx";
import WeekFivePage3 from "./weeks/week5/page3/Page3.jsx";
import WeekFivePage4 from "./weeks/week5/page4/Page4.jsx";
import { useEffect, useMemo, useRef, useState } from "react";
import { useQueries, useQuery } from "@tanstack/react-query";
import userService from "../../../../../services/api/user.js";
import {
  updateData,
  userAnswer,
  clearData,
} from "../../../../../redux/reducers/userAnswersReducer.js";
import { adminData } from "../../../../../redux/reducers/adminReducer.js";
import { logoutSuccess } from "../../../../../redux/reducers/userReducer.js";
import { clearToken } from "../../../../../redux/reducers/jwtReducer.js";

const compassionWeekNumbers = Object.keys(courseContent).map((weekKey) =>
  Number(weekKey.replace("week", ""))
);

const getCompassionCourseDataQueryKey = (enrollmentId, week) => [
  "dashboard-compassion-course",
  enrollmentId,
  week,
];

const getCompassionWeekTotalPages = (weekNumber) => {
  const weekKey = `week${weekNumber}`;
  const contentPages = courseContent[weekKey]?.pages?.length || 0;
  const hasAssessment = assessments[weekKey]?.questions?.length > 0;

  return Math.max(1, contentPages + (hasAssessment ? 1 : 0));
};

const clampCompassionPageNumber = (pageNumber, totalPages) =>
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

const getCompassionResumePageFromActivity = (activity, weekNumber) => {
  const totalPages = getCompassionWeekTotalPages(weekNumber);
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
    courseContent[`week${weekNumber}`]?.pages
      ?.filter((page) => page.type !== "video")
      .map((page) => Number(page.id)) || [];
  const hasAnsweredAllActivities =
    requiredActivityPages.length > 0 &&
    requiredActivityPages.every((pageNumber) => answeredPages.has(pageNumber));

  if (savedLastActivityIndex > 1) {
    return clampCompassionPageNumber(savedLastActivityIndex, totalPages);
  }

  if (hasAnsweredAllActivities) {
    return clampCompassionPageNumber(totalPages, totalPages);
  }

  if (hasSavedLastActivityIndex && savedLastActivityIndex >= 1) {
    return clampCompassionPageNumber(savedLastActivityIndex, totalPages);
  }

  if (lastAnsweredPage > 0) {
    return clampCompassionPageNumber(lastAnsweredPage + 1, totalPages);
  }

  return null;
};

const WeekContent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userAnswers = useSelector(userAnswer);
  const location = useLocation(); // Get location object
  const [enrollmentId, setEnrollmentId] = useState(null);
  const [course, setCourseId] = useState(null);
  const [hasResolvedBackendResume, setHasResolvedBackendResume] =
    useState(false);
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
    setCourseId(enrolmentData?.course?._id);
  }, [enrolmentData, isAdmin, navigate]);

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
  const { data } = useQuery({
    queryKey: getCompassionCourseDataQueryKey(enrollmentId, currentWeek),
    queryFn: () => userService.getUserCourseData(enrollmentId, currentWeek),
    enabled: !!enrollmentId && !!currentWeek,
    refetchOnMount: "always",
    refetchOnWindowFocus: true,
    keepPreviousData: false,
  });

  const resumePositionQueries = useQueries({
    queries: compassionWeekNumbers.map((weekNumber) => ({
      queryKey: getCompassionCourseDataQueryKey(enrollmentId, weekNumber),
      queryFn: () => userService.getUserCourseData(enrollmentId, weekNumber),
      enabled: !!enrollmentId && !isAdmin,
      refetchOnMount: "always",
      refetchOnWindowFocus: true,
      staleTime: 0,
      gcTime: 0,
    })),
  });
  const hasPendingResumePosition = resumePositionQueries.some(
    (query) => query.isPending
  );
  const resumePositionSnapshotKey = JSON.stringify(
    resumePositionQueries.map((query, index) => {
      const activity = query.data?.activity;
      return {
        weekNumber: compassionWeekNumbers[index],
        activity: activity
          ? {
              activities: activity.activities || [],
              lastActivityIndex: activity.lastActivityIndex || null,
              updatedAt: activity.updatedAt || null,
            }
          : null,
      };
    })
  );
  const resumeCandidates = useMemo(() => {
    return JSON.parse(resumePositionSnapshotKey)
      .map(({ weekNumber, activity }) => {
        if (!activity) return null;

        const pageNumber = getCompassionResumePageFromActivity(
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
  }, [resumePositionSnapshotKey]);

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
    if (hasPendingResumePosition) return;

    const resumeTarget = resumeCandidates[0];
    if (!resumeTarget) {
      setHasResolvedBackendResume(true);
      return;
    }

    appliedBackendResumeWeekRef.current = resumeTarget.weekNumber;
    dispatch(setCurrentWeek(resumeTarget.weekNumber));
    dispatch(setCurrentPage(resumeTarget.pageNumber));
    dispatch(setCurrentStep(1));
    sessionStorage.setItem(
      "flow-currentWeek",
      resumeTarget.weekNumber.toString()
    );
    sessionStorage.setItem(
      "flow-currentPage",
      resumeTarget.pageNumber.toString()
    );
    sessionStorage.setItem("flow-currentStep", "1");
    setHasResolvedBackendResume(true);
  }, [
    dispatch,
    enrollmentId,
    hasPendingResumePosition,
    isAdmin,
    resumeCandidates,
  ]);

  useEffect(() => {
    if (!data) return;

    const canUseCurrentActivities =
      userAnswers.week === currentWeek &&
      userAnswers.courseEnrollmentId === enrollmentId;
    let nextActivities = [];
    let nextAssessments = [];
    let nextCourseEnrollmentId = enrollmentId
      ? enrollmentId
      : userAnswers.courseEnrollmentId;

    const serverActivities = data.activity?.activities || [];
    const serverAssessments = data.assessment?.assessments || [];

    if (data.activity) {
      nextActivities = mergeActivitiesByPage(
        serverActivities,
        canUseCurrentActivities ? userAnswers.activities : []
      );
      lastSavedActivitiesRef.current = JSON.stringify(serverActivities);
    } else {
      nextActivities = canUseCurrentActivities ? userAnswers.activities : [];
      lastSavedActivitiesRef.current = JSON.stringify([]);
    }

    if (data.assessment) {
      nextAssessments =
        serverAssessments?.length > 0
          ? serverAssessments
          : canUseCurrentActivities
          ? userAnswers.assessments
          : [];
      nextCourseEnrollmentId = enrollmentId;
    } else {
      nextAssessments = canUseCurrentActivities ? userAnswers.assessments : [];
    }

    const nextActivitiesJson = JSON.stringify(nextActivities || []);
    const currentActivitiesJson = JSON.stringify(userAnswers.activities || []);
    const nextAssessmentsJson = JSON.stringify(nextAssessments || []);
    const currentAssessmentsJson = JSON.stringify(userAnswers.assessments || []);
    const alreadyHydrated =
      userAnswers.course === course &&
      userAnswers.courseEnrollmentId === nextCourseEnrollmentId &&
      userAnswers.week === currentWeek &&
      nextActivitiesJson === currentActivitiesJson &&
      nextAssessmentsJson === currentAssessmentsJson;

    if (alreadyHydrated) return;

    dispatch(
      updateData({
        course: course,
        courseEnrollmentId: nextCourseEnrollmentId,
        week: currentWeek,
        activities: nextActivities,
        assessments: nextAssessments,
      })
    );
  }, [
    course,
    currentWeek,
    data,
    dispatch,
    enrollmentId,
    userAnswers.course,
    userAnswers.activities,
    userAnswers.assessments,
    userAnswers.courseEnrollmentId,
    userAnswers.week,
  ]);

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
        console.error("Failed to save Compassion activity progress", error);
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
        console.error("Failed to save Compassion resume position", error);
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

  if (!hasResolvedBackendResume && !isAdmin) {
    return null;
  }

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
      {showReview && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            zIndex: 1050,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "rgba(0,0,0,0.4)",
          }}
        >
          <PopUp />
        </div>
      )}
    </>
  );
};

const CourseContent = () => {
  const { isAdmin } = useSelector(adminData);
  const currentWeek = useSelector(selectCurrentWeek);
  const currentPage = useSelector(selectCurrentPage);
  const showHurray = useSelector(selectShowHurray);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const enrolmentData = location.state?.enrollmentData;
  const maxReachedPagesStorageKey = `flow-compassion-maxReachedPages:${
    enrolmentData?._id || "admin"
  }`;

  const [menuVisible, setMenuVisible] = useState(false);
  const [expandedWeeks, setExpandedWeeks] = useState([currentWeek || 1]);
  const activeMenuItemRef = useRef(null);
  const [maxReachedPages, setMaxReachedPages] = useState(() => {
    try {
      return JSON.parse(
        sessionStorage.getItem(maxReachedPagesStorageKey) || "{}"
      );
    } catch (error) {
      return {};
    }
  });

  const weeksTopic = [
    "Introduction to Compassion",
    "Self-Compassion",
    "Compassion to Others",
    "Circle of concern",
    `Life Scenarios - Let's wear the shoes of Others`,
  ];

  const compassionMenuLabels = {
    week1: {
      videos: [
        "Introduction Video",
        "Compassion",
        "Compassionate Communication",
        "Recap for the week",
      ],
    },
    week2: {
      videos: [
        "What is Self Compassion",
        "Self Compassion",
        "Ways to practice Self Compassion",
        "Recap for the week",
      ],
    },
    week3: {
      videos: [
        "Recap of Last Week",
        "Compassion For Others",
        "Showing Compassion to Others",
        "Practising Compassion for Others",
        "Act of Kindness",
        "Recap for the week",
      ],
    },
    week4: {
      videos: [
        "Recap of Last Week",
        "Circle of Concern",
        "Inner and Outer Circle",
        "Recap for the week",
      ],
    },
    week5: {
      videos: ["Life Scenarios", "Recap for the week"],
    },
  };

  const [enrollmentProgress, setEnrollmentProgress] = useState(0);
  const [maxAccessibleWeek, setMaxAccessibleWeek] = useState(1);
  const [highestCompletedWeek, setHighestCompletedWeek] = useState(0);
  const [enrollmentId, setEnrollmentId] = useState(null);
  const [optimisticCompletedWeek, setOptimisticCompletedWeek] = useState(0);

  useEffect(() => {
    if (enrolmentData?._id) {
      setEnrollmentId(enrolmentData._id);
    }
  }, [enrolmentData]);

  useEffect(() => {
    try {
      setMaxReachedPages(
        JSON.parse(sessionStorage.getItem(maxReachedPagesStorageKey) || "{}")
      );
    } catch (error) {
      setMaxReachedPages({});
    }
    sessionStorage.removeItem("flow-compassion-maxReachedPages");
  }, [maxReachedPagesStorageKey]);

  const { data: liveEnrollment, isFetched: hasFetchedLiveEnrollment } = useQuery({
    queryKey: ["compassion-enrollment-progress", enrollmentId, currentWeek],
    queryFn: () => userService.getSingleEnrollment(enrollmentId),
    enabled: !!enrollmentId,
    refetchOnMount: "always",
    refetchOnWindowFocus: true,
  });

  const weekAccessQueries = useQueries({
    queries: weeksTopic.map((_, index) => {
      const weekNumber = index + 1;

      return {
        queryKey: getCompassionCourseDataQueryKey(enrollmentId, weekNumber),
        queryFn: () => userService.getUserCourseData(enrollmentId, weekNumber),
        enabled: !!enrollmentId && !isAdmin,
        refetchOnMount: "always",
        refetchOnWindowFocus: true,
        staleTime: 0,
      };
    }),
  });
  const hasPendingWeekAccess = weekAccessQueries.some(
    (query) => query.isPending
  );
  const highestSubmittedAssessmentWeek = weekAccessQueries.reduce(
    (highestWeek, query, index) =>
      query.data?.assessment ? Math.max(highestWeek, index + 1) : highestWeek,
    0
  );

  useEffect(() => {
    if (showHurray) {
      setOptimisticCompletedWeek((completedWeek) =>
        Math.max(completedWeek, currentWeek)
      );
    }
  }, [currentWeek, showHurray]);

  useEffect(() => {
    const progress =
      liveEnrollment?.enrollment?.progress ??
      liveEnrollment?.progress ??
      enrolmentData?.progress ??
      0;

    setEnrollmentProgress(progress);
  }, [liveEnrollment, enrolmentData]);

  useEffect(() => {
    if (isAdmin) {
      setHighestCompletedWeek((completedWeek) =>
        completedWeek === weeksTopic.length ? completedWeek : weeksTopic.length
      );
      setMaxAccessibleWeek((accessibleWeek) =>
        accessibleWeek === weeksTopic.length ? accessibleWeek : weeksTopic.length
      );
      return;
    }

    if (!enrollmentId) return;
    if (hasPendingWeekAccess) return;

    const completedWeek = Math.max(
      highestSubmittedAssessmentWeek,
      showHurray ? currentWeek : 0,
      optimisticCompletedWeek
    );
    const nextAccessibleWeek = Math.max(
      1,
      Math.min(completedWeek + 1, weeksTopic.length)
    );

    setHighestCompletedWeek((highestWeek) =>
      highestWeek === completedWeek ? highestWeek : completedWeek
    );
    setMaxAccessibleWeek((accessibleWeek) =>
      accessibleWeek === nextAccessibleWeek ? accessibleWeek : nextAccessibleWeek
    );

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
    enrollmentId,
    hasPendingWeekAccess,
    highestSubmittedAssessmentWeek,
    isAdmin,
    optimisticCompletedWeek,
    showHurray,
    weeksTopic.length,
  ]);

  useEffect(() => {
    const progressPerWeek = 100 / weeksTopic.length;
    const calculatedProgress =
      showHurray && currentWeek === weeksTopic.length
        ? 100
        : highestCompletedWeek * progressPerWeek;

    if (calculatedProgress > enrollmentProgress) {
      setEnrollmentProgress(calculatedProgress);
    }
  }, [
    currentWeek,
    enrollmentProgress,
    highestCompletedWeek,
    showHurray,
    weeksTopic.length,
  ]);

  useEffect(() => {
    dispatch(setCourse("compassion"));
  }, [dispatch]);

  useEffect(() => {
    if (!currentWeek || !currentPage) return;
    if (!isAdmin && !hasFetchedLiveEnrollment) return;

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
  }, [
    currentWeek,
    currentPage,
    hasFetchedLiveEnrollment,
    isAdmin,
    maxReachedPagesStorageKey,
  ]);

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
  const logOut = () => {
    // localStorage.removeItem('Flow-Auth-Token');
    localStorage.clear();
    sessionStorage.clear();
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
      setExpandedWeeks([weekNumber]);

      // Update session storage
      sessionStorage.setItem("flow-currentWeek", weekNumber.toString());
      sessionStorage.setItem("flow-currentPage", "1");
      sessionStorage.setItem("flow-currentStep", "1");
    }
  };

  const isWeekAccessible = (weekNumber) => {
    return weekNumber <= maxAccessibleWeek;
  };

  const isWeekCompleted = (weekNumber) => {
    return weekNumber <= highestCompletedWeek;
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

  const buildWeekMenuItems = (weekNumber) => {
    const weekKey = `week${weekNumber}`;
    const pages = courseContent[weekKey]?.pages || [];
    const labels = compassionMenuLabels[weekKey] || {};
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
        <aside className="d-md-none d-lg-block m-4 aside-class">
          <button
            disabled={isAdmin}
            onClick={() => navigate("/dashboard/my-courses")}
            className="back"
            style={{ cursor: "pointer", border: "none", background: "#f8f5f5" }}
          >
            <Icon icon="fa6-solid:arrow-left-long" className="me-2" />
            Back to My Courses
          </button>

          <div className="compassion-title">
            <h2 className="fs-5 fs-md-3"> Seeing, Caring and Doing: </h2>
            <h2 className="compassion fs-5">Compassion</h2>
          </div>

          <div className="transition-week-menu compassion-week-menu">
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
                  <span
                    className={`transition-status-icon ${
                      isCompleted ? "completed" : isActive ? "active" : ""
                    }`}
                  >
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
                          className={`transition-week-item ${
                            itemActive ? "selected" : ""
                          } ${itemUnlocked ? "" : "locked"}`}
                          onClick={() =>
                            handleMenuItemClick(weekNumber, menuItem.pageNumber)
                          }
                          disabled={!itemUnlocked || !isExpanded}
                        >
                          <span
                            className={`transition-status-icon small ${
                              itemCompleted ? "completed" : ""
                            }`}
                          >
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

const CompassionCourse = () => {
  return <CourseContent />;
};

export default CompassionCourse;

// data
// activity |  assestment
