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
import { courseContent } from "./data/activity.js";
import { assessments } from "./data/assessment.js";
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
import Page12 from "./weeks/week1/Page12/Page12";
import Page13 from "./weeks/week1/page13/Page13";
import Page14 from "./weeks/week1/page14/Page14";
import Page15 from "./weeks/week1/page15/Page15";
import Page16 from "./weeks/week1/page16/Page16.jsx";
import Page17 from "./weeks/week1/page17/Page17.jsx";

// Week 2
import WeekTwoPage1 from "./weeks/week2/page1/Page1";
import WeekTwoPage2 from "./weeks/week2/page2/Page2";
import WeekTwoPage3 from "./weeks/week2/page3/Page3";
import WeekTwoPage4 from "./weeks/week2/page4/Page4";
import WeekTwoPage5 from "./weeks/week2/page5/Page5";
import WeekTwoPage6 from "./weeks/week2/page6/Page6";
import WeekTwoPage7 from "./weeks/week2/page7/Page7";
import WeekTwoPage8 from "./weeks/week2/page8/Page8";
import WeekTwoPage9 from "./weeks/week2/page9/Page9.jsx";

// Week 3
import WeekThreePage1 from "./weeks/week3/page1/Page1";
import WeekThreePage2 from "./weeks/week3/page2/Page2";
import WeekThreePage3 from "./weeks/week3/page3/Page3";

// Week 4
import WeekFourPage1 from "./weeks/week4/page1/Page1";
import WeekFourPage2 from "./weeks/week4/page2/Page2";
import WeekFourPage3 from "./weeks/week4/page3/Page3";
import WeekFourPage4 from "./weeks/week4/page4/Page4";
import WeekFourPage5 from "./weeks/week4/page5/Page5";
import WeekFourPage6 from "./weeks/week4/page6/Page6.jsx";

// Week5
import WeekFivePage1 from "./weeks/week5/page1/Page1.jsx";
import WeekFivePage2 from "./weeks/week5/page2/Page2.jsx";
import WeekFivePage3 from "./weeks/week5/page3/Page3.jsx";
import WeekFivePage4 from "./weeks/week5/page4/Page4.jsx";

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

const emotionalRegulationMenuLabels = {
  week1: {
    videos: [
      "Introduction Video",
      "Emotional Regulation",
      "Emotions",
      "Zones of Emotions (Blue Zone)",
      "Green Zone",
      "Yellow Zone",
      "Red Zone",
      "Recap for the week",
    ],
  },
  week2: {
    videos: [
      "Recap of Last Week",
      "4 Zones of Regulation",
      "Energy Levels",
      "Recap for the week",
    ],
  },
  week3: {
    videos: ["SONAR"],
    activitiesByPage: {
      2: "Activity 1",
    },
  },
  week4: {
    videos: ["Recap of Last Week", "Coping Skills", "Recap for the week"],
  },
  week5: {
    videosByPage: {
      1: "Video 1: Coping Skills In Different Zones",
      3: "Video 4: Recap for the week",
    },
  },
};

const emotionalRegulationWeekNumbers = Object.keys(courseContent).map((weekKey) =>
  Number(weekKey.replace("week", ""))
);

const getEmotionalRegulationCourseDataQueryKey = (enrollmentId, week) => [
  "dashboard-emotional-regulation-course",
  enrollmentId,
  week,
];

const getEmotionalRegulationWeekTotalPages = (weekNumber) => {
  const weekKey = `week${weekNumber}`;
  const contentPages = courseContent[weekKey]?.pages?.length || 0;
  const hasAssessment = assessments[weekKey]?.questions?.length > 0;

  return Math.max(1, contentPages + (hasAssessment ? 1 : 0));
};

const clampEmotionalRegulationPageNumber = (pageNumber, totalPages) =>
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

const getEmotionalRegulationResumePageFromActivity = (activity, weekNumber) => {
  const totalPages = getEmotionalRegulationWeekTotalPages(weekNumber);
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
    return clampEmotionalRegulationPageNumber(savedLastActivityIndex, totalPages);
  }

  if (hasAnsweredAllActivities) {
    return clampEmotionalRegulationPageNumber(totalPages, totalPages);
  }

  if (hasSavedLastActivityIndex && savedLastActivityIndex >= 1) {
    return clampEmotionalRegulationPageNumber(savedLastActivityIndex, totalPages);
  }

  if (lastAnsweredPage > 0) {
    return clampEmotionalRegulationPageNumber(lastAnsweredPage + 1, totalPages);
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

    return () => {};
  }, [dispatch]); // Added dispatch to dependency array

  const currentWeek = useSelector(selectCurrentWeek);
  const currentPage = useSelector(selectCurrentPage);
  const showReview = useSelector(selectShowReview);
  const showHurray = useSelector(selectShowHurray);

  // toDo: Fetch User assessment and Activity Data
  const { data } = useQuery({
    queryKey: getEmotionalRegulationCourseDataQueryKey(enrollmentId, currentWeek),
    queryFn: () => userService.getUserCourseData(enrollmentId, currentWeek),
    enabled: !!enrollmentId && !!currentWeek,
    refetchOnMount: "always",
    refetchOnWindowFocus: true,
    keepPreviousData: false,
  });

  const resumePositionQueries = useQueries({
    queries: emotionalRegulationWeekNumbers.map((weekNumber) => ({
      queryKey: getEmotionalRegulationCourseDataQueryKey(
        enrollmentId,
        weekNumber
      ),
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
        const weekNumber = emotionalRegulationWeekNumbers[index];
        const activity = query.data?.activity;
        if (!activity) return null;

        const pageNumber = getEmotionalRegulationResumePageFromActivity(
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
  }, [dispatch, enrollmentId, isAdmin, resumePositionQueries]);


  useEffect(() => {
    if (!data) return;

    const canUseCurrentActivities =
      userAnswers.week === currentWeek &&
      userAnswers.courseEnrollmentId === enrollmentId;

    if (data.assessment && data.activity) {
      const serverActivities = data.activity?.activities || [];
      const serverAssessments = data.assessment?.assessments || [];
      const activities = mergeActivitiesByPage(
        serverActivities,
        canUseCurrentActivities ? userAnswers.activities : []
      );
      lastSavedActivitiesRef.current = JSON.stringify(serverActivities);

      // Only overwrite local state if server has actual data — never wipe with empty arrays
      dispatch(
        updateData({
          course: course,
          courseEnrollmentId: enrollmentId,
          week: currentWeek,
          activities,
          assessments:
            serverAssessments?.length > 0
              ? serverAssessments
              : userAnswers.assessments,
        })
      );
    } else if (data.activity) {
      const serverActivities = data.activity?.activities || [];
      const activities = mergeActivitiesByPage(
        serverActivities,
        canUseCurrentActivities ? userAnswers.activities : []
      );
      lastSavedActivitiesRef.current = JSON.stringify(serverActivities);

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

    return () => {};
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
        console.error(
          "Failed to save Emotional Regulation activity progress",
          error
        );
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
        console.error(
          "Failed to save Emotional Regulation resume position",
          error
        );
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
          case 15:
            return <Page15 />;
          case 16:
            return <Page16 />;
          case 17:
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
  const [menuVisible, setMenuVisible] = useState(false);
  const [enrollmentProgress, setEnrollmentProgress] = useState(0);
  const [maxAccessibleWeek, setMaxAccessibleWeek] = useState(1);
  const [enrollmentId, setEnrollmentId] = useState(null);
  const [expandedWeeks, setExpandedWeeks] = useState([currentWeek || 1]);
  const [optimisticCompletedWeek, setOptimisticCompletedWeek] = useState(0);
  const activeMenuItemRef = useRef(null);
  const [maxReachedPages, setMaxReachedPages] = useState(() => {
    try {
      return JSON.parse(
        sessionStorage.getItem("flow-emotional-regulation-maxReachedPages") ||
        "{}"
      );
    } catch (error) {
      return {};
    }
  });

  const weeksTopic = [
    "Introduction to Emotional Regulation",
    "Identifying Energy Levels",
    "The SONAR of Emotional Regulation",
    "Introduction to Coping Skills",
    "Wrapping Up!",
  ];

  // Get enrollment data from location state
  const enrolmentData = location.state?.enrollmentData;

  useEffect(() => {
    if (enrolmentData?._id) {
      setEnrollmentId(enrolmentData._id);
    }
  }, [enrolmentData]);

  const { data: liveEnrollment } = useQuery({
    queryKey: ["emotional-regulation-enrollment-progress", enrollmentId, currentWeek],
    queryFn: () => userService.getSingleEnrollment(enrollmentId),
    enabled: !!enrollmentId,
    refetchOnMount: "always",
    refetchOnWindowFocus: true,
  });

  const weekAccessQueries = useQueries({
    queries: weeksTopic.map((_, index) => {
      const weekNumber = index + 1;

      return {
        queryKey: getEmotionalRegulationCourseDataQueryKey(
          enrollmentId,
          weekNumber
        ),
        queryFn: () => userService.getUserCourseData(enrollmentId, weekNumber),
        enabled: !!enrollmentId && !isAdmin,
        refetchOnMount: "always",
        refetchOnWindowFocus: true,
        staleTime: 0,
      };
    }),
  });

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
      setMaxAccessibleWeek(weeksTopic.length);
      return;
    }

    if (!enrollmentId) return;
    if (weekAccessQueries.some((query) => query.isPending)) return;

    const highestSubmittedAssessmentWeek = weekAccessQueries.reduce(
      (highestWeek, query, index) =>
        query.data?.assessment ? Math.max(highestWeek, index + 1) : highestWeek,
      0
    );
    const justCompletedWeek = showHurray ? currentWeek : 0;
    const completedWeek = Math.max(
      highestSubmittedAssessmentWeek,
      justCompletedWeek,
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
    enrollmentId,
    isAdmin,
    optimisticCompletedWeek,
    showHurray,
    weekAccessQueries,
    weeksTopic.length,
  ]);

  useEffect(() => {
    const progressPerWeek = 100 / weeksTopic.length;
    const calculatedProgress =
      showHurray && currentWeek === weeksTopic.length
        ? 100
        : (currentWeek - 1) * progressPerWeek;

    if (calculatedProgress > enrollmentProgress) {
      setEnrollmentProgress(calculatedProgress);
    }
  }, [currentWeek, enrollmentProgress, showHurray, weeksTopic.length]);

  useEffect(() => {
    if (!currentWeek || !currentPage) return;

    setMaxReachedPages((pages) => {
      const weekKey = `week${currentWeek}`;
      const nextPages = {
        ...pages,
        [weekKey]: Math.max(pages[weekKey] || 1, currentPage),
      };

      sessionStorage.setItem(
        "flow-emotional-regulation-maxReachedPages",
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

    // This is an important section that affects course rendering!
    if (
      [
        "compassion",
        "transition",
        "resilience_grit",
        "emotional_regulation",
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
    const labels = emotionalRegulationMenuLabels[weekKey] || {};
    let videoCount = 0;
    let activityCount = 0;

    const items = pages.map((page) => {
      if (page.type === "video") {
        videoCount += 1;
        return {
          id: `${weekKey}-page-${page.id}`,
          pageNumber: page.id,
          type: "video",
          label:
            labels.videosByPage?.[page.id] ||
            `Video ${videoCount}: ${labels.videos?.[videoCount - 1] || "Lesson"}`,
        };
      }

      activityCount += 1;
      return {
        id: `${weekKey}-page-${page.id}`,
        pageNumber: page.id,
        type: "activity",
        label: labels.activitiesByPage?.[page.id] || `Activity ${activityCount}`,
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
      enrollmentProgress >= weekNumber * progressPerWeek ||
      (showHurray && weekNumber === currentWeek)
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
            <h2 className="fs-5 fs-md-3">Stay Strong, Keep Going!</h2>
            <h2 className="compassion fs-5">Emotional Regulation</h2>
          </div>

          <div className="transition-week-menu emotional-regulation-week-menu">
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
                  className={`transition-week-group ${isActive ? "active-week" : ""} ${
                    isAccessible ? "accessible-week" : "locked-week"
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
