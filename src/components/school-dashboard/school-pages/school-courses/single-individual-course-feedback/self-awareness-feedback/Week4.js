import React, { useEffect, useState } from "react";
import Activity from "./Activity";
import "./Week1.css"; // Import the CSS file for styling
import "./Week4.css";
import PersonalityFeedback from "./PersonalityFeedback";
import checkedImage from "../../../../../../assets/selfawareness-images/checked.png";
import unCheckedImage from "../../../../../../assets/selfawareness-images/not-checked.png";
import { Icon } from "@iconify/react";
import FinalReport from "./FinalReport";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import userService from '../../../../../../services/api/user'
import { toast } from "react-toastify";
import { decryptId } from "../../../../../../utils/encryption";
import schoolService from "../../../../../../services/api/school";
import adminService from "../../../../../../services/api/admin";
import { useParams } from 'react-router-dom'
import FeedbackModal from "./FeedbackModal";
import { useSelector } from "react-redux";
import { adminData } from "../../../../../../redux/reducers/adminReducer";
const initialQuestionsQuiz = [
  {
    question: 'What are values?',
    options: [
      {
        label: 'A. Beliefs and principles that guide our actions and decisions',
        color: 'Red',
        checked: false,
        isCorrect: true, // Correct option
      },
      {
        label: 'B. Emotions and feelings we experience daily',
        color: 'Green',
        checked: false,
        isCorrect: false,
      },
      {
        label: 'C. Skills and talents we possess',
        color: 'Blue',
        checked: false,
        isCorrect: false,
      },
      {
        label: 'D. Goals and dreams we want to achieve',
        color: 'Yellow',
        checked: false,
        isCorrect: false,
      },
    ],
  },
  {
    question:
      'Select one statement that does not show the importance of values.',
    options: [
      {
        label: 'A. They help us make decisions',
        color: 'Red',
        checked: false,
        isCorrect: false,
      },
      {
        label: 'B. They guide our behavior',
        color: 'Green',
        checked: false,
        isCorrect: false,
      },
      {
        label: 'C. They define our talents',
        color: 'Blue',
        checked: false,
        isCorrect: true, // Correct option
      },
      {
        label: 'D. They help us understand what is most important to us',
        color: 'Yellow',
        checked: false,
        isCorrect: false,
      },
    ],
  },
  {
    question: 'Which of the following is an example of a value?',
    options: [
      {
        label: 'A. Happiness',
        color: 'Red',
        checked: false,
        isCorrect: false,
      },
      {
        label: 'B. Respect',
        color: 'Green',
        checked: false,
        isCorrect: true, // Correct option
      },
      {
        label: 'C. Excitement',
        color: 'Blue',
        checked: false,
        isCorrect: false,
      },
      {
        label: 'D. Intelligence',
        color: 'Yellow',
        checked: false,
        isCorrect: false,
      },
    ],
  },
  {
    question: 'How can knowing your values help you in life?',
    options: [
      {
        label: 'A. It can make you rich',
        color: 'Red',
        checked: false,
        isCorrect: false,
      },
      {
        label: 'B. It can help you make choices that align with your beliefs',
        color: 'Green',
        checked: false,
        isCorrect: true, // Correct option
      },
      {
        label: 'C. It can make you more popular',
        color: 'Blue',
        checked: false,
        isCorrect: false,
      },
      {
        label: 'D. It can give you superpowers',
        color: 'Yellow',
        checked: false,
        isCorrect: false,
      },
    ],
  },
  {
    question:
      'Imagine you value honesty. What would you likely do in a situation where you found a lost wallet?',
    options: [
      {
        label: 'A. Keep the wallet for yourself',
        color: 'Red',
        checked: false,
        isCorrect: false,
      },
      {
        label: 'B. Ignore the wallet and walk away',
        color: 'Green',
        checked: false,
        isCorrect: false,
      },
      {
        label: 'C. Try to find the owner and return the wallet',
        color: 'Blue',
        checked: false,
        isCorrect: true, // Correct option
      },
      {
        label: 'D. Take the money and leave the wallet',
        color: 'Yellow',
        checked: false,
        isCorrect: false,
      },
    ],
  },
  {
    question:
      'Imagine you value responsibility, what would you likely do in a situation where the teacher asks the class to clean their lockers but nobody is doing it?',
    options: [
      {
        label: 'A. Wait for the cleaner to come and clean your locker',
        color: 'Red',
        checked: false,
        isCorrect: false,
      },
      {
        label: 'B. Do nothing',
        color: 'Green',
        checked: false,
        isCorrect: false,
      },
      {
        label: 'C. Clean your locker',
        color: 'Blue',
        checked: false,
        isCorrect: true, // Correct option
      },
      {
        label: 'D. Ask your classmate to help you clean your locker',
        color: 'Yellow',
        checked: false,
        isCorrect: false,
      },
    ],
  },
  {
    question: 'My value can influence how I treat other people',
    options: [
      {
        label: 'A. True',
        color: 'Red',
        checked: false,
        isCorrect: true, // Correct option
      },
      {
        label: 'B. False',
        color: 'Green',
        checked: false,
        isCorrect: false,
      },
    ],
  },
  {
    question:
      "If Honesty is one of your values, what would be your best response to the following scenario. I accidentally broke my friend's favorite toy. No one saw me doing it. I would rather:",
    options: [
      {
        label: 'A. Say it was someone else.',
        color: 'Red',
        checked: false,
        isCorrect: false,
      },
      {
        label: 'B. Pretend nothing happened.',
        color: 'Green',
        checked: false,
        isCorrect: false,
      },
      {
        label: 'C. Tell my friend the truth immediately.',
        color: 'Blue',
        checked: false,
        isCorrect: true, // Correct option
      },
      {
        label: 'D. Replace the toy with a new one quietly.',
        color: 'Yellow',
        checked: false,
        isCorrect: false,
      },
    ],
  },
  {
    question:
      'Sarah notices a classmate, David, looking downcast while carrying a heavy stack of books. Sarah offers to help David with the books. Sarah remembers she has her own after-school activity but suggests they put David\'s books in his locker first so he isn\'t late to his next class.',
    instuction:
      'Instruction: Match the following statements in the scenario to their respective value',
    options: [
      {
        label: 'A. Kindness - Sarah offers to help David with the books.',
        color: 'Red',
        checked: false,
        isCorrect: true, // Correct option
      },
      {
        label:
          'A. Kindness - As they walk, Sarah asks David if everything is alright but doesn’t pry if he doesn’t want to talk.',
        color: 'Green',
        checked: false,
        isCorrect: false,
      },
      {
        label:
          'A. Kindness - Sarah remembers she has her own after-school activity but suggests they put David’s books in his locker first so he isn’t late to his next class.',
        color: 'Blue',
        checked: false,
        isCorrect: false,
      },
      {
        label:
          'B. Respect - As they walk, Sarah asks David if everything is alright but doesn’t pry if he doesn’t want to talk.',
        color: 'Yellow',
        checked: false,
        isCorrect: true, // Correct option
      },
      {
        label: 'B. Respect - Sarah offers to help David with the books.',
        color: 'Red',
        checked: false,
        isCorrect: false,
      },
      {
        label:
          'B. Respect - Sarah remembers she has her own after-school activity but suggests they put David’s books in his locker first so he isn’t late to his next class.',
        color: 'Green',
        checked: false,
        isCorrect: false,
      },
      {
        label:
          'C. Responsibility - Sarah remembers she has her own after-school activity but suggests they put David’s books in his locker first so he isn’t late to his next class.',
        color: 'Blue',
        checked: false,
        isCorrect: true, // Correct option
      },
      {
        label: 'C. Responsibility - Sarah offers to help David with the books.',
        color: 'Yellow',
        checked: false,
        isCorrect: false,
      },
      {
        label:
          'C. Responsibility - As they walk, Sarah asks David if everything is alright but doesn’t pry if he doesn’t want to talk.',
        color: 'Red',
        checked: false,
        isCorrect: false,
      },
    ],
  },
  {
    question:
      "Alex promised to help Ben with his science project, which is due tomorrow. Despite having a busy schedule, Alex prioritizes helping Ben, honoring their friendship. Alex offers to let Ben use his advanced science equipment at home, knowing it will significantly improve their project. Both Alex and Ben arrive at Alex's house on time, ensuring they have maximum time to work on the project",
    instuction:
      'Instruction: Match the following statements in the scenario to their respective value',
    options: [
      {
        label:
          'A. Loyalty - Despite having a busy schedule, Alex prioritizes helping Ben, honoring their friendship.',
        color: 'Green',
        checked: false,
        isCorrect: true, // Correct option
      },
      {
        label:
          'A. Loyalty - Both Alex and Ben arrive at Alex’s house on time, ensuring they have maximum time to work on the project.',
        color: 'Blue',
        checked: false,
        isCorrect: false,
      },
      {
        label:
          'A. Loyalty - Alex offers to let Ben use his advanced science equipment at home, knowing it will significantly improve their project.',
        color: 'Yellow',
        checked: false,
        isCorrect: false,
      },
      {
        label:
          'B. Punctuality - Both Alex and Ben arrive at Alex’s house on time, ensuring they have maximum time to work on the project.',
        color: 'Red',
        checked: false,
        isCorrect: true, // Correct option
      },
      {
        label:
          'B. Punctuality - Despite having a busy schedule, Alex prioritizes helping Ben, honoring their friendship.',
        color: 'Green',
        checked: false,
        isCorrect: false,
      },
      {
        label:
          'B. Punctuality - Alex offers to let Ben use his advanced science equipment at home, knowing it will significantly improve their project.',
        color: 'Blue',
        checked: false,
        isCorrect: false,
      },
      {
        label:
          'C. Generosity - Alex offers to let Ben use his advanced science equipment at home, knowing it will significantly improve their project.',
        color: 'Yellow',
        checked: false,
        isCorrect: true, // Correct option
      },
      {
        label:
          'C. Generosity - Despite having a busy schedule, Alex prioritizes helping Ben, honoring their friendship.',
        color: 'Red',
        checked: false,
        isCorrect: false,
      },
      {
        label:
          'C. Generosity - Both Alex and Ben arrive at Alex’s house on time, ensuring they have maximum time to work on the project.',
        color: 'Green',
        checked: false,
        isCorrect: false,
      },
    ],
  },
]

const leftItemsArray = [
  ['A. Kindness', 'B. Respect', 'C. Responsibility'],
  ['A. Honesty', 'B. Empathy', 'C. Patience'],
]

const rightItemsArray = [
  [
    "Sarah remembers she has her own after-school activity but suggests they put David's books in his locker first so he isn’t late to his next class.",
    'As they walk, Sarah asks David if everything is alright but doesn’t pry if he doesn’t want to talk.',
    'Sarah offers to help David with the books.',
  ],
  [
    'Tom tells the truth about accidentally breaking the vase.',
    "Jane listens to her friend's problems without interrupting.",
    'Emily waits patiently for her turn to speak during a group discussion.',
  ],
]

const Week4 = ({ enrollmentId, isSchool, studentId }) => {
  const { userId } = useParams()
  const week = 4
  const courseId = '66853bf50118e2e0a02b6a5a'
  const queryClient = useQueryClient();
  const [questionsQuiz, setQuestionsQuiz] = useState(initialQuestionsQuiz)
  const [activeModal, setActiveModal] = useState(null);
  const [editingActivity, setEditingActivity] = useState(null);
  const [activitiesDataState, setActivitiesDataState] = useState([]);

  const { isAdmin, code } = useSelector(adminData);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['dashboard/feedback/self-awareness', enrollmentId || courseId, week],
    queryFn: () => {
      if (isAdmin && enrollmentId) return adminService.getUserCourseData(enrollmentId, week, code);
      if (isSchool || isAdmin) return schoolService.getStudentCourseData(enrollmentId || courseId, week, studentId || decryptId(userId));
      return schoolService.getStudentCourseData(enrollmentId || courseId, week, decryptId(userId));
    },
    enabled: !!enrollmentId || !!courseId,
  })

  const feedbackMutation = useMutation({
    mutationFn: (updatedActivities) => {
      if (isAdmin) {
        return adminService.submitAdminFeedback(
          updatedActivities,
          enrollmentId,
          week,
          data?.activity?.user,
          code
        );
      }
      return schoolService.getMyActivitesUpdate(
        enrollmentId || courseId,
        week,
        decryptId(userId),
        { activities: updatedActivities }
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["dashboard/feedback/self-awareness"]);
      toast.success("Feedback submitted successfully");
      closeModal();
    },
    onError: (error) => {
      console.error("Feedback submission error:", error);
      toast.error(error?.message || "Failed to submit feedback");
    },
  });

  useEffect(() => {
    if (data?.activity?.activities) {
      setActivitiesDataState(data.activity.activities);
    }
  }, [data]);

  const openModal = (activityIndex, feedback = "") => {
    setActiveModal(activityIndex);
    setEditingActivity({ index: activityIndex, feedback });
  };

  const closeModal = () => {
    setActiveModal(null);
    setEditingActivity(null);
  };

  const assessmentData = data?.assessment;
  const activityData = data?.activity;

  useEffect(() => {
    if (!data) return
    const assessmentForChecked =
      assessmentData?.assessments?.[0]?.answers || [];
    const matchCount1 = assessmentData?.assessments?.[0]?.matchesSet1 || [];
    const matchCount2 = assessmentData?.assessments?.[0]?.matchesSet2 || [];

    const combinedArray1 = matchCount1.map((match) => {
      const leftValue = leftItemsArray[0][match.left];
      const rightValue = rightItemsArray[0][match.right];
      return `${leftValue} - ${rightValue}`;
    });
    const combinedArray2 = matchCount2.map((match) => {
      const leftValue = leftItemsArray[0][match.left];
      const rightValue = rightItemsArray[0][match.right];
      return `${leftValue} - ${rightValue}`;
    });

    if (assessmentForChecked && assessmentForChecked.length >= 5) {
      const valuesToCheck = assessmentForChecked;

      setQuestionsQuiz(prevQuestions =>
        prevQuestions.map((question, index) => {
          return {
            ...question,
            options: question.options.map((option, optionIndex) => {
              let isChecked = false;

              // Mark options based on assessmentForChecked
              if (optionIndex === valuesToCheck[index]) {
                isChecked = true;
              }

              // Check if it's the 9th question and update based on combinedArray1
              if (index === 8) {
                combinedArray1.forEach((selectedAnswer) => {
                  const optionText = option.label.trim().toLowerCase();
                  const selectedAnswerText = selectedAnswer
                    .trim()
                    .toLowerCase();

                  if (optionText.includes(selectedAnswerText)) {
                    isChecked = true;
                  }
                });
              }

              // Check if it's the 10th question and update based on combinedArray2
              if (index === 9) {
                combinedArray2.forEach((selectedAnswer) => {
                  const optionText = option.label.trim().toLowerCase();
                  const selectedAnswerText = selectedAnswer
                    .trim()
                    .toLowerCase();

                  if (optionText.includes(selectedAnswerText)) {
                    isChecked = true;
                  }
                });
              }

              return {
                ...option,
                checked: isChecked,
              }
            }),
          }
        })
      )
    }
  }, [data, assessmentData])

  const percentage = assessmentData?.rating || 0;
  // // console.log(updatedQuestionsQuiz);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError || (!assessmentData && !activityData)) {
    return <div>Take Activity to see feedback.</div>;
  }

  const activities = [
    {
      activity: 1,
      question: "What exactly are “Values”??",
      answer: activityData?.activities?.[1]?.answers?.[0],
      feedback: activityData?.activities?.[1]?.feedback?.[0] || ""
    },
    {
      activity: 2,
      question:
        "Flip each card to know more about the values. Select the box on each card to pick the values you feel are a big part of who you are.",
      answer: activityData?.activities?.[3]?.answers || [],
      feedback: activityData?.activities?.[3]?.feedback?.[0] || ""
    },
    {
      activity: 3,
      question:
        "Identify three (3) important people in your live and list their names below.",
      answer: activityData?.activities?.[5]?.answers?.[0],
      feedback: activityData?.activities?.[5]?.feedback?.[0] || ""
    },
    {
      activity: 4,
      question: "Write out what these people think about you.",
      answer: activityData?.activities?.[5]?.answers?.[1],
      feedback: activityData?.activities?.[5]?.feedback?.[1] || ""
    },
    {
      activity: 5,
      question:
        "Are you happy with what these people think about you? If no, what would you like to change? If yes, type “YES” in the box.",
      answer: activityData?.activities?.[5]?.answers?.[2],
      feedback: activityData?.activities?.[5]?.feedback?.[2] || ""
    },
    {
      activity: 6,
      question: "Identify four (4) core values that resonate with you the most.",
      answer: activityData?.activities?.[7]?.answers || [],
      feedback: activityData?.activities?.[7]?.feedback?.[0] || ""
    }
  ];


  const handleFeedbackSubmit = (activityId, feedback) => {
    const adjustedActivityId = (() => {
      switch (activityId) {
        case 1: return 2;
        case 2: return 4;
        case 3:
        case 4:
        case 5: return 6;
        case 6: return 8;
        default: return activityId;
      }
    })();

    const updatedActivities = activitiesDataState.map((act) => {
      if (act.activity === adjustedActivityId) {
        if ([3, 4, 5].includes(activityId)) {
          const feedbackIndex = activityId - 3;
          const updatedFeedback = Array.isArray(act.feedback) ? [...act.feedback] : [];
          updatedFeedback[feedbackIndex] = feedback;
          return { ...act, feedback: updatedFeedback };
        } else {
          return { ...act, feedback: [feedback] };
        }
      }
      return act;
    });

    setActivitiesDataState(updatedActivities);
    feedbackMutation.mutate(updatedActivities);
  };

  return (
    <div className="week-content w-auto">
      {activities.slice(0, 2).map((activity, index) => (
        <div style={{ border: "none" }} className="activity" key={index}>
          <p className="activity-badge">Activity {index + 1}</p>
          <p className="question d-flex align-items-center gap-2">
            <h4 style={{ color: "#275DAD", marginTop: ".3rem" }}>Question:</h4>
            <span>{activity.question}</span>
          </p>

          {Array.isArray(activity.answer) ? (
            <ul className="answer-options4" style={{ paddingLeft: "1.5rem" }}>
              <div className="d-flex w-100 justify-content-between align-items-center gap-2">
                <div className="d-flex gap-2">
                  <h4 style={{ color: "#555", marginTop: ".3rem" }}>Answer:</h4>{" "}
                  {activity.answer.map((item, idx) => (
                    <li
                      key={idx}
                      style={{ marginBottom: ".5rem", fontSize: "14px" }}
                    >
                      <Icon
                        icon="radix-icons:dot-filled"
                        style={{ color: "#5B616A" }}
                      />
                      {item}
                    </li>
                  ))}
                </div>
                {isAdmin && (!activity?.feedback || activity.feedback.length === 0) && (
                  <Icon
                    onClick={() => openModal(activity.activity)}
                    style={{ color: "#D6D6D6", cursor: "pointer" }}
                    width={20}
                    icon="hugeicons:comment-01"
                  />
                )}
              </div>
            </ul>
          ) : typeof activity.answer === "object" &&
            activity.answer !== null ? (
            <ol className="answer-options" style={{ paddingLeft: "1.5rem" }}>
              <div className="d-flex w-100 justify-content-between align-items-center gap-2">
                <div className="d-flex gap-2">
                  <h4 style={{ color: "#555", marginTop: ".3rem" }}>Answer:</h4>{" "}
                  <div>
                    {Object.entries(activity.answer).map(([key, value], idx) => (
                      <li
                        key={idx}
                        style={{ marginBottom: ".5rem", fontSize: "14px" }}
                      >
                        <strong>{idx + 1}.</strong> {value}
                      </li>
                    ))}
                  </div>
                </div>
                {isAdmin && (!activity?.feedback || activity.feedback.length === 0) && (
                  <Icon
                    onClick={() => openModal(activity.activity)}
                    style={{ color: "#D6D6D6", cursor: "pointer" }}
                    width={20}
                    icon="hugeicons:comment-01"
                  />
                )}
              </div>
            </ol>
          ) : (
            <div className="answer d-flex w-100 justify-content-between align-items-center gap-2">
              <div className="d-flex align-items-center gap-2">
                <h4 style={{ color: "#555", marginTop: ".3rem" }}>Answer:</h4>{" "}
                <p style={{ fontSize: "14px", marginBottom: 0 }}>{activity.answer}</p>
              </div>
              {isAdmin && (!activity?.feedback || activity.feedback.length === 0) && (
                <Icon
                  onClick={() => openModal(activity.activity)}
                  style={{ color: "#D6D6D6", cursor: "pointer" }}
                  width={20}
                  icon="hugeicons:comment-01"
                />
              )}
            </div>
          )}

          {activity.feedback && (
            <div className="feedback">
              <div id="badge">Feedback:</div>
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem"
                }}
              >
                <div className="feedback-card">{activity.feedback}</div>
                {isAdmin && (
                  <Icon
                    onClick={() => openModal(activity.activity, activity.feedback)}
                    style={{ color: "#275DAD", cursor: "pointer" }}
                    width={20}
                    icon="lucide:edit"
                  />
                )}
              </div>
            </div>
          )}
        </div>
      ))}

      <p className="activity-badge">Activity 3</p>
      {activities.slice(2, 5).map((activity, index) => (
        <div style={{ border: "none" }} className="activity" key={index}>
          <p className="question d-flex align-items-center gap-2">
            <h4 style={{ color: "#275DAD", marginTop: ".3rem" }}>Question:</h4>
            <span>{activity.question}</span>
          </p>

          {Array.isArray(activity.answer) ? (
            <ul className="answer-options4" style={{ paddingLeft: "1.5rem" }}>
              <div className="d-flex w-100 justify-content-between align-items-center gap-2">
                <div className="d-flex gap-2">
                  <h4 style={{ color: "#555", marginTop: ".3rem" }}>Answer:</h4>{" "}
                  {activity.answer.map((item, idx) => (
                    <li
                      key={idx}
                      style={{ marginBottom: ".5rem", fontSize: "14px" }}
                    >
                      <Icon
                        icon="radix-icons:dot-filled"
                        style={{ color: "#5B616A" }}
                      />
                      {item}
                    </li>
                  ))}
                </div>
                {isAdmin && (!activity?.feedback || activity.feedback.length === 0) && (
                  <Icon
                    onClick={() => openModal(activity.activity)}
                    style={{ color: "#D6D6D6", cursor: "pointer" }}
                    width={20}
                    icon="hugeicons:comment-01"
                  />
                )}
              </div>
            </ul>
          ) : typeof activity.answer === "object" &&
            activity.answer !== null ? (
            <ol className="answer-options" style={{ paddingLeft: "1.5rem" }}>
              <div className="d-flex w-100 justify-content-between align-items-center gap-2">
                <div className="d-flex gap-2">
                  <h4 style={{ color: "#555", marginTop: ".3rem" }}>Answer:</h4>{" "}
                  <div>
                    {Object.entries(activity.answer).map(([key, value], idx) => (
                      <li
                        key={idx}
                        style={{ marginBottom: ".5rem", fontSize: "14px" }}
                      >
                        <strong>{idx + 1}.</strong> {value}
                      </li>
                    ))}
                  </div>
                </div>
                {isAdmin && (!activity?.feedback || activity.feedback.length === 0) && (
                  <Icon
                    onClick={() => openModal(activity.activity)}
                    style={{ color: "#D6D6D6", cursor: "pointer" }}
                    width={20}
                    icon="hugeicons:comment-01"
                  />
                )}
              </div>
            </ol>
          ) : (
            <div className="answer d-flex w-100 justify-content-between align-items-center gap-2">
              <div className="d-flex align-items-center gap-2">
                <h4 style={{ color: "#555", marginTop: ".3rem" }}>Answer:</h4>{" "}
                <p style={{ fontSize: "14px", marginBottom: 0 }}>{activity.answer}</p>
              </div>
              {(!activity?.feedback || activity.feedback.length === 0) && (
                <Icon
                  onClick={() => openModal(activity.activity)}
                  style={{ color: "#D6D6D6", cursor: "pointer" }}
                  width={20}
                  icon="hugeicons:comment-01"
                />
              )}
            </div>
          )}

          {activity.feedback && (
            <div className="feedback">
              <div id="badge">Feedback:</div>
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem"
                }}
              >
                <div className="feedback-card">{activity.feedback}</div>
                {isAdmin && (
                  <Icon
                    onClick={() => openModal(activity.activity, activity.feedback)}
                    style={{ color: "#275DAD", cursor: "pointer" }}
                    width={20}
                    icon="lucide:edit"
                  />
                )}
              </div>
            </div>
          )}
        </div>
      ))}

      <p className="activity-badge">Activity 4</p>
      {activities.slice(5, 6).map((activity, index) => (
        <div style={{ border: "none" }} className="activity" key={index}>
          <p className="question d-flex align-items-center gap-2">
            <h4 style={{ color: "#275DAD", marginTop: ".3rem" }}>Question:</h4>
            <span>{activity.question}</span>
          </p>

          {Array.isArray(activity.answer) ? (
            <ul className="answer-options4" style={{ paddingLeft: "1.5rem" }}>
              <div className="d-flex w-100 justify-content-between align-items-center gap-2">
                <div className="d-flex gap-2">
                  <h4 style={{ color: "#555", marginTop: ".3rem" }}>Answer:</h4>{" "}
                  {activity.answer.map((item, idx) => (
                    <li
                      key={idx}
                      style={{ marginBottom: ".5rem", fontSize: "14px" }}
                    >
                      <Icon
                        icon="radix-icons:dot-filled"
                        style={{ color: "#5B616A" }}
                      />
                      {item}
                    </li>
                  ))}
                </div>
                {(!activity?.feedback || activity.feedback.length === 0) && (
                  <Icon
                    onClick={() => openModal(activity.activity)}
                    style={{ color: "#D6D6D6", cursor: "pointer" }}
                    width={20}
                    icon="hugeicons:comment-01"
                  />
                )}
              </div>
            </ul>
          ) : typeof activity.answer === "object" &&
            activity.answer !== null ? (
            <ol className="answer-options" style={{ paddingLeft: "1.5rem" }}>
              <div className="d-flex w-100 justify-content-between align-items-center gap-2">
                <div className="d-flex gap-2">
                  <h4 style={{ color: "#555", marginTop: ".3rem" }}>Answer:</h4>{" "}
                  <div>
                    {Object.entries(activity.answer).map(([key, value], idx) => (
                      <li
                        key={idx}
                        style={{ marginBottom: ".5rem", fontSize: "14px" }}
                      >
                        <strong>{idx + 1}.</strong> {value}
                      </li>
                    ))}
                  </div>
                </div>
                {(!activity?.feedback || activity.feedback.length === 0) && (
                  <Icon
                    onClick={() => openModal(activity.activity)}
                    style={{ color: "#D6D6D6", cursor: "pointer" }}
                    width={20}
                    icon="hugeicons:comment-01"
                  />
                )}
              </div>
            </ol>
          ) : (
            <div className="answer d-flex w-100 justify-content-between align-items-center gap-2">
              <div className="d-flex align-items-center gap-2">
                <h4 style={{ color: "#555", marginTop: ".3rem" }}>Answer:</h4>{" "}
                <p style={{ fontSize: "14px", marginBottom: 0 }}>{activity.answer}</p>
              </div>
              {(!activity?.feedback || activity.feedback.length === 0) && (
                <Icon
                  onClick={() => openModal(activity.activity)}
                  style={{ color: "#D6D6D6", cursor: "pointer" }}
                  width={20}
                  icon="hugeicons:comment-01"
                />
              )}
            </div>
          )}

          {activity.feedback && (
            <div className="feedback">
              <div id="badge">Feedback:</div>
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem"
                }}
              >
                <div className="feedback-card">{activity.feedback}</div>
                <Icon
                  onClick={() => openModal(activity.activity, activity.feedback)}
                  style={{ color: "#275DAD", cursor: "pointer" }}
                  width={20}
                  icon="lucide:edit"
                />
              </div>
            </div>
          )}
        </div>
      ))}

      <p className="activity-badge">Assessment 4</p>
      {questionsQuiz.map((q, index) => (
        <div className="question-block" key={index}>
          <p className="question d-flex align-items-center gap-2">
            <h4 style={{ color: "#275DAD", marginTop: ".3rem" }}>
              Question {index + 1}:
            </h4>
            <span> {q.question}</span>
          </p>
          <div className="options">
            {q.options.map((option, idx) => (
              <div className="option" key={idx}>
                <img
                  src={option.checked ? checkedImage : unCheckedImage}
                  alt={option.isCorrect ? "Checked" : "Unchecked"}
                  style={{ width: "20px", marginRight: "10px" }}
                />
                <span style={{
                  fontSize: "14px",
                  textAlign: "left",
                  display: "block"
                }} className="option-label">
                  {option.label}
                </span>
                <p style={{ width: "120px", textAlign: "center", marginBottom: 0 }}>
                  {option.isCorrect ? (
                    <span
                      style={{ color: "#50AA50" }}
                      className="d-flex align-items-center justify-content-center gap-1"
                    >
                      <Icon width={17} icon="ph:seal-check-light" />
                      Correct
                    </span>
                  ) : (
                    <span
                      style={{ color: "#FD483D" }}
                      className="d-flex align-items-center justify-content-center gap-1"
                    >
                      <Icon width={17} icon="mdi:cross-circle-outline" />
                      Wrong
                    </span>
                  )}
                </p>
              </div>
            ))}
          </div>
        </div>
      ))}

      <FinalReport rate={percentage} />

      {activeModal !== null && (
        <FeedbackModal
          initialFeedback={editingActivity?.feedback || ""}
          onClose={closeModal}
          onSubmit={(feedback) => handleFeedbackSubmit(activeModal, feedback)}
        />
      )}
    </div>
  );
};

export default Week4;
