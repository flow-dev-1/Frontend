import React, { useEffect, useState } from "react";
import "./Week1.css"; // Import the CSS file for styling
import PersonalityFeedback from "./PersonalityFeedback";
import checkedImage from "../../../../../assets/selfawareness-images/checked.png";
import unCheckedImage from "../../../../../assets/selfawareness-images/not-checked.png";
import { Icon } from "@iconify/react";
import FinalReport from "./FinalReport";
import { useQuery, useMutation } from "@tanstack/react-query";
import userService from "../../../../../services/api/user";
import schoolService from "../../../../../services/api/school";
import adminService from "../../../../../services/api/admin";
import { useSelector } from "react-redux";
import { adminData } from "../../../../../redux/reducers/adminReducer";
import FeedbackModal from "../../../../school-dashboard/school-pages/school-courses/single-individual-course-feedback/self-awareness-feedback/FeedbackModal";

const questions = [
  {
    question: "When I make decisions:",
    options: [
      {
        label: "A. I do it quickly and go with the first impressions.",
        color: "Red",
        checked: true
      },
      {
        label: "B. I think about it, consider the options, and then decide.",
        color: "Green",
        checked: false
      },
      {
        label:
          "C. I listen to my feelings and consider how my decisions will affect others.",
        color: "Blue",
        checked: false
      },
      {
        label:
          "D. I take it seriously and always try to make the right decision.",
        color: "Yellow",
        checked: false
      }
    ]
  }
];

let questionsQuiz = [
  {
    question:
      "Which quality would help you best manage your chores and responsibilities at home well?",
    options: [
      {
        label: "A. Empathy",
        color: "Red",
        checked: false, // This is not the correct option
        isCorrect: false
      },
      {
        label: "B. Good Listener",
        color: "Green",
        checked: false, // This is not the correct option
        isCorrect: false
      },
      {
        label: "C. Detail-oriented",
        color: "Blue",
        checked: false, // This is not the correct option
        isCorrect: false
      },
      {
        label: "D. Responsible",
        color: "Yellow",
        checked: false, // This is the correct option (assuming)
        isCorrect: true
      }
    ]
  },
  {
    question:
      "You’ve identified that your weakness is impatience and your classmate asked you to wait for him so you can get lunch together while he uses the toilet. What will you do as someone trying to improve on their weakness?",
    options: [
      {
        label: "A. Do Nothing",
        color: "Red",
        checked: false, // This is not the correct option
        isCorrect: false
      },
      {
        label: "B. Wait for him to get lunch together.",
        color: "Green",
        checked: false, // This is the correct option (assuming)
        isCorrect: true
      },
      {
        label: "C. Wait for only 1 minute and leave if he doesn’t show up.",
        color: "Blue",
        checked: false, // This is not the correct option
        isCorrect: false
      },
      {
        label: "D. Tell him you’re hungry and cannot wait.",
        color: "Yellow",
        checked: false, // This is not the correct option
        isCorrect: false
      }
    ]
  },
  {
    question:
      "You’ve identified your strength is honesty and your class teacher is asking who was making noise. You know it is Adetola, your best friend that was making noise because he is your seatmate. What will you do next?",
    options: [
      {
        label: "A. Choose not to say anything",
        color: "Red",
        checked: false, // This is not the correct option
        isCorrect: false
      },
      {
        label: "B. Tell the teacher that Adetola was making noise",
        color: "Green",
        checked: false, // This is the correct option (assuming)
        isCorrect: true
      },
      {
        label: "C. Tell Adetola to report himself or else you would.",
        color: "Blue",
        checked: false, // This is not the correct option
        isCorrect: false
      },
      {
        label:
          "D. Ask to go to the toilet because you don’t want to talk about it",
        color: "Yellow",
        checked: false, // This is not the correct option
        isCorrect: false
      }
    ]
  },
  {
    question:
      "You're trying to solve a difficult puzzle. Which quality would be most helpful in this situation?",
    options: [
      {
        label: "A. Patience",
        color: "Red",
        checked: false, // This is the correct option (assuming)
        isCorrect: true
      },
      {
        label: "B. Self-critical",
        color: "Green",
        checked: false, // This is not the correct option
        isCorrect: false
      },
      {
        label: "C. Optimistic",
        color: "Blue",
        checked: false, // This is not the correct option
        isCorrect: false
      },
      {
        label: "D. Brave",
        color: "Yellow",
        checked: false, // This is not the correct option
        isCorrect: false
      }
    ]
  },
  {
    question:
      "You realized your best friend, John, has a weakness and you are interested in helping him work on this weakness. What would you do?",
    options: [
      {
        label: "A. Ignore it to protect your friendship.",
        color: "Red",
        checked: false, // This is not the correct option
        isCorrect: false
      },
      {
        label:
          "B. Tell him about the strengths you have noticed he has and identify how to manage his weakness.",
        color: "Green",
        checked: false, // This is the correct option (assuming)
        isCorrect: true
      },
      {
        label: "C. Tell your other friends about this weakness.",
        color: "Blue",
        checked: false, // This is not the correct option
        isCorrect: false
      },
      {
        label:
          "D. Tell him about your own weakness in hopes that it will get him to share as well.",
        color: "Yellow",
        checked: false, // This is not the correct option
        isCorrect: false
      }
    ]
  }
];


const Week2 = ({ enrollmentId, isSchool, studentId }) => {
  const { isAdmin, code } = useSelector(adminData);
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState("");
  const [activeActivity, setActiveActivity] = useState(null);
  const [feedbackIndex, setFeedbackIndex] = useState(null);
  const [assessmentData, setAssessmentData] = useState(null);
  const [percentage, setPercent] = useState(0);
  const [isAssessmentMode, setIsAssessmentMode] = useState(false);

  const openModal = (activity, feedback = "", index = null, isAssessment = false) => {
    setActiveActivity(activity);
    setModalData(feedback);
    setFeedbackIndex(index);
    setIsAssessmentMode(isAssessment);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setActiveActivity(null);
    setModalData("");
    setFeedbackIndex(null);
    setIsAssessmentMode(false);
  };

  const { data, isPending, status, isError, refetch } = useQuery({
    queryKey: ["dashboard/self-awereness-feedback-2", enrollmentId, studentId, isAdmin, 2],
    queryFn: () => {
      if (isAdmin) return adminService.getUserCourseData(enrollmentId, 2, code);
      if (isSchool) return schoolService.getStudentCourseData(enrollmentId, 2, studentId);
      return userService.getUserCourseData(enrollmentId, 2);
    },
    enabled: !!enrollmentId || (!isSchool && !isAdmin),
    refetchOnMount: "always",
    refetchOnWindowFocus: true,
    keepPreviousData: false,
  });

  const mutation = useMutation({
    mutationFn: (feedbackData) =>
      adminService.submitAdminFeedback(
        feedbackData,
        enrollmentId,
        2,
        data?.activity?.user,
        code
      ),
    onSuccess: () => {
      closeModal();
      refetch();
    },
    onError: (error) => {
      console.error("Feedback error:", error);
    },
  });

  const assessmentMutation = useMutation({
    mutationFn: (feedbackData) =>
      adminService.submitAssessmentFeedback(
        feedbackData,
        enrollmentId,
        2,
        data?.activity?.user,
        code
      ),
    onSuccess: () => {
      closeModal();
      refetch();
    },
    onError: (error) => {
      console.error("Assessment Feedback error:", error);
    },
  });

  const handleFeedbackSubmit = (activityNumber, feedback, isAssessment = false) => {
    console.log("handleFeedbackSubmit called:", { activityNumber, feedback, feedbackIndex, isAssessment });

    if (isAssessment) {
      const currentFeedback = data?.assessment?.feedback || [];
      const updatedFeedback = [...currentFeedback];
      // Assessments start from index 5 in the backend text array for Week 2 (Questions 6, 7, 8)
      // We'll store them sequentially in the feedback array
      updatedFeedback[feedbackIndex] = feedback;
      assessmentMutation.mutate({ feedback: updatedFeedback });
      return;
    }

    const currentActivities = data?.activity?.activities || [];
    console.log("currentActivities:", currentActivities);
    const updatedActivities = currentActivities.map((act, index) => {
      console.log(`Checking act at index ${index}:`, act.activity, "vs", activityNumber);
      if (act.activity === activityNumber) {
        let newFeedback = Array.isArray(act.feedback) ? [...act.feedback] : [act.feedback];
        if (feedbackIndex !== null) {
          newFeedback[feedbackIndex] = feedback;
        } else {
          newFeedback[0] = feedback;
        }
        console.log("Updating activity:", act.activity, "with feedback:", newFeedback);
        return { ...act, feedback: newFeedback };
      }
      return act;
    });

    console.log("updatedActivities:", updatedActivities);
    mutation.mutate(updatedActivities);
  };

  useEffect(() => {
    if (!data) return
    setPercent(data?.assessment?.rating || 0);
    const assessmentForChecked =
      data?.assessment?.assessments[0].assessment?.answers;
    setAssessmentData(assessmentForChecked)

    if (assessmentForChecked && assessmentForChecked.length >= 5) {
      const valuesToCheck = assessmentForChecked.slice(0, 5);

      questionsQuiz = questionsQuiz.map((question, index) => {
        return {
          ...question,
          options: question.options.map((option, optionIndex) => {
            return {
              ...option,
              checked: optionIndex === valuesToCheck[index]
            };
          })
        };
      });
    };

  }, [data]);


  if (isPending) {
    return <div>Loading...</div>;
  }

  if (isError || data?.status === "failed") {
    return <div>{data?.message}.</div>;
  }

  const strengths = data?.activity?.activities[3]?.answers?.strengths;
  const weaknesses = data?.activity?.activities[4]?.answers?.weakness;

  const actviity1 = [
    {
      activity: 2, // Backend activity number (activities[1].activity)
      question: 'What do you understand by “Strengths & Weaknesses”?',
      answer: data?.activity?.activities?.[1]?.answers?.[0],
      feedback: data?.activity?.activities[1]?.feedback?.[0],
    }
  ];
  const activities = [
    {
      activity: 4, // Backend activity number (activities[3].activity)
      question: "Identify your Strengths.",
      answer: strengths,
      feedback: data?.activity?.activities?.[3]?.feedback?.[0]
    },
    {
      activity: 5, // Backend activity number (activities[4].activity)
      question: "Identify your Weaknesses.",
      answer: weaknesses,
      feedback: data?.activity?.activities?.[4]?.feedback?.[0]
    },
    // {
    //   activity: 4, // Another new activity based on image
    //   question:
    //     "Identify three (3) important people in your life and list their names below.",
    //   answer: ["1. Name 1", "2. Name 2", "3. Name 3"],
    //   feedback: null // No feedback provided in the image
    // },
    {
      activity: 7, // Backend activity number (activities[6].activity)
      question:
        "A friend is feeling sad and needs someone to talk to because they just failed a test.They come to you for support. How would you help?",
      answer: {
        strengths: data?.activity?.activities[6]?.answers?.strengthsQ1,
        weaknesses: data?.activity?.activities[6]?.answers?.weaknessesQ1
      },
      feedback: data?.activity?.activities[6]?.feedback ? data?.activity?.activities[6]?.feedback[0] : ""
    },
    {
      activity: 7, // Backend activity number (activities[6].activity)
      question:
        "Imagine you’re working on a group project at school. Your group is struggling to come up with an idea for the project. As a member of the team, how would you help?",
      answer: {
        strengths: data?.activity?.activities[6]?.answers?.strengthsQ2,
        weaknesses: data?.activity?.activities[6]?.answers?.weaknessesQ2
      },
      feedback: data?.activity?.activities[6]?.feedback ? data?.activity?.activities[6]?.feedback[1] : ""
    },
    {
      activity: 7, // Backend activity number (activities[6].activity)
      question:
        "Is there a sport you dislike? What sport is this? Now imagine you were asked to represent your house in this particular sport, for your School’s inter-house sport competition, to win a laptop and a gaming console. How would you go about this?",
      answer: {
        strengths: data?.activity?.activities[6]?.answers?.strengthsQ3,
        weaknesses: data?.activity?.activities[6]?.answers?.weaknessesQ3
      },
      feedback: data?.activity?.activities[6]?.feedback ? data?.activity?.activities[6]?.feedback[2] : ""
    }
  ];

  const quizEssay = [
    {
      activity: "assessment",
      question:
        "What activity do you enjoy the most, and why do you think you are good at it?",
      answer: assessmentData?.[5],
      feedback: data?.assessment?.feedback?.[0] || ""
    },

    {
      activity: "assessment",
      question:
        "When working in a group, what role do you naturally take on (e.g., leader, planner, helper)? Can you give an example?",
      answer: assessmentData?.[6],
      feedback: data?.assessment?.feedback?.[1] || ""
    },
    {
      activity: "assessment",
      question:
        "Is there a task or subject that you avoid because you find it difficult? Why do you think it’s challenging for you?",
      answer: assessmentData?.[7],
      feedback: data?.assessment?.feedback?.[2] || ""
    }
  ];

  // This is a utility function to help correct the assessment
  function correctAnswer(params) {

  }


  return (
    <div className="week-content">
      <p className="activity-badge">Activity 1</p>

      {actviity1.map((activity, index) => (
        <div style={{ border: "none" }} className="activity" key={index}>
          <div className="d-flex align-items-center justify-content-between mb-2">
            <div className="d-flex gap-3">
              <h4 className="text-blue" style={{ marginTop: ".3rem", fontSize: "18px" }}>Question:</h4>
              <span style={{ fontSize: "16px" }}>{activity.question}</span>
            </div>
            {isAdmin && !activity.feedback && (
              <Icon
                onClick={() => openModal(activity.activity, "", 0)}
                style={{ color: "#D6D6D6", cursor: "pointer" }}
                width={35}
                icon="hugeicons:comment-01"
              />
            )}
          </div>

          {/* Check if answer is an array and render as an ordered list */}
          {Array.isArray(activity.answer) ? (
            <ol className="answer-options" style={{ paddingLeft: "1.5rem" }}>
              {activity.answer.map((item, idx) => (
                <li
                  key={idx}
                  style={{ marginBottom: ".5rem", fontSize: "14px" }}
                >
                  {idx + 1}. {item}
                </li>
              ))}
            </ol>
          ) : (
            <div className="d-flex align-items-center gap-3 mb-3">
              <h4 className="text-gray" style={{ marginTop: ".3rem", fontSize: "18px" }}>Answer:</h4>
              <p style={{ fontSize: "16px", marginBottom: 0 }}>{activity.answer}</p>
            </div>
          )}

          {/* Conditionally render feedback */}
          {activity?.feedback?.length > 0 && (
            <div className="d-flex gap-3 mb-4">
              <div className="feedback-badge">Feedback</div>
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                }}
              >
                <div className="feedback-card">{activity.feedback}</div>
                {isAdmin && (
                  <Icon
                    onClick={() => openModal(activity.activity, activity.feedback, 0)}
                    style={{ color: "#275DAD", cursor: "pointer" }}
                    width={35}
                    icon="lucide:edit"
                  />
                )}
              </div>
            </div>
          )}
        </div>
      ))}

      <p className="activity-badge">Activity 2</p>
      <div style={{ border: "none" }} className="activity">
        <div className="d-flex align-items-center justify-content-between mb-2">
          <div className="d-flex gap-3">
            <h4 className="text-blue" style={{ marginTop: ".3rem", fontSize: "18px" }}>Question:</h4>
            <span style={{ fontSize: "16px" }}>Identify your Strengths.</span>
          </div>
          {isAdmin && !activities[0]?.feedback && (
            <Icon
              onClick={() => openModal(activities[0].activity, "", 0)}
              style={{ color: "#D6D6D6", cursor: "pointer" }}
              width={35}
              icon="hugeicons:comment-01"
            />
          )}
        </div>
        <div className="d-flex align-items-center gap-3 mb-3">
          <h4 className="text-gray" style={{ marginTop: ".3rem", fontSize: "18px" }}>Answer:</h4>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "0.5rem" }}>
            {strengths?.map((item, idx) => (
              <div className="d-flex align-items-center gap-1" key={idx}>
                <Icon icon="radix-icons:dot-filled" style={{ color: "#5B616A" }} />
                <p style={{ fontSize: "14px", marginBottom: 0 }}>{item}</p>
              </div>
            ))}
          </div>
        </div>
        {activities[0]?.feedback?.length > 0 && (
          <div className="d-flex gap-3 mb-4">
            <div className="feedback-badge">Feedback</div>
            <div style={{ width: "100%", display: "flex", alignItems: "center", gap: "1rem" }}>
              <div className="feedback-card">{activities[0].feedback}</div>
              {isAdmin && (
                <Icon
                  onClick={() => openModal(activities[0].activity, activities[0].feedback, 0)}
                  style={{ color: "#275DAD", cursor: "pointer" }}
                  width={35}
                  icon="lucide:edit"
                />
              )}
            </div>
          </div>
        )}
      </div>

      <p className="activity-badge">Activity 3</p>
      <div style={{ border: "none" }} className="activity">
        <div className="d-flex align-items-center justify-content-between mb-2">
          <div className="d-flex gap-3">
            <h4 className="text-blue" style={{ marginTop: ".3rem", fontSize: "18px" }}>Question:</h4>
            <span style={{ fontSize: "16px" }}>Identify your Weaknesses.</span>
          </div>
          {isAdmin && !activities[1]?.feedback && (
            <Icon
              onClick={() => openModal(activities[1].activity, "", 0)}
              style={{ color: "#D6D6D6", cursor: "pointer" }}
              width={35}
              icon="hugeicons:comment-01"
            />
          )}
        </div>
        <div className="d-flex align-items-center gap-3 mb-3">
          <h4 className="text-gray" style={{ marginTop: ".3rem", fontSize: "18px" }}>Answer:</h4>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "0.5rem" }}>
            {weaknesses?.map((item, idx) => (
              <div className="d-flex align-items-center gap-1" key={idx}>
                <Icon icon="radix-icons:dot-filled" style={{ color: "#5B616A" }} />
                <p style={{ fontSize: "14px", marginBottom: 0 }}>{item}</p>
              </div>
            ))}
          </div>
        </div>
        {activities[1]?.feedback?.length > 0 && (
          <div className="d-flex gap-3 mb-4">
            <div className="feedback-badge">Feedback</div>
            <div style={{ width: "100%", display: "flex", alignItems: "center", gap: "1rem" }}>
              <div className="feedback-card">{activities[1].feedback}</div>
              {isAdmin && (
                <Icon
                  onClick={() => openModal(activities[1].activity, activities[1].feedback, 0)}
                  style={{ color: "#275DAD", cursor: "pointer" }}
                  width={35}
                  icon="lucide:edit"
                />
              )}
            </div>
          </div>
        )}
      </div>

      <p className="activity-badge">Activity 4</p>
      {activities.slice(2).map((activity, index) => (
        <div style={{ border: "none" }} className="activity" key={index}>
          <div className="d-flex align-items-center justify-content-between mb-2">
            <div className="d-flex gap-3">
              <h4 className="text-blue" style={{ marginTop: ".3rem", fontSize: "18px" }}>Question {index + 1}:</h4>
              <span style={{ fontSize: "16px" }}>{activity.question}</span>
            </div>
            {isAdmin && !activity.feedback && (
              <Icon
                onClick={() => openModal(activity.activity, "", index)}
                style={{ color: "#D6D6D6", cursor: "pointer" }}
                width={35}
                icon="hugeicons:comment-01"
              />
            )}
          </div>

          {activity?.answer?.strengths ? (
            <div style={{ display: "flex", width: "100%", margin: "1rem 0", gap: "1rem" }} className="strengths-weaknesses">
              <div style={{ width: "100%" }} className="strengths">
                <h5 style={{ color: "#fff", textAlign: "center", padding: "0.5rem", borderRadius: "8px 8px 0 0" }} id="yes">Strengths</h5>
                <ul style={{ display: "grid", gridTemplateColumns: "1fr 1fr", padding: "1rem", border: "1px solid #eee", borderRadius: "0 0 8px 8px" }}>
                  {activity?.answer?.strengths?.map((item, idx) => (
                    <div className="d-flex align-items-center gap-2" key={idx}>
                      <Icon icon="radix-icons:dot-filled" style={{ color: "#5B616A" }} />
                      <li style={{ listStyle: "none", fontSize: "14px" }}>{item}</li>
                    </div>
                  ))}
                </ul>
              </div>
              <div style={{ width: "100%" }} className="weaknesses">
                <h5 id="no" style={{ color: "#fff", textAlign: "center", padding: "0.5rem", borderRadius: "8px 8px 0 0" }}>Weaknesses</h5>
                <ul style={{ display: "grid", gridTemplateColumns: "1fr 1fr", padding: "1rem", border: "1px solid #eee", borderRadius: "0 0 8px 8px" }}>
                  {activity?.answer?.weaknesses?.map((item, idx) => (
                    <div className="d-flex align-items-center gap-2" key={idx}>
                      <Icon icon="radix-icons:dot-filled" style={{ color: "#5B616A" }} />
                      <li style={{ listStyle: "none", fontSize: "14px" }}>{item}</li>
                    </div>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            <div className="d-flex align-items-center gap-3 mb-3">
              <h4 className="text-gray" style={{ marginTop: ".3rem", fontSize: "18px" }}>Answer:</h4>
              <p style={{ fontSize: "16px", marginBottom: 0 }}>{typeof activity.answer !== "string" ? "" : activity.answer}</p>
            </div>
          )}

          {activity?.feedback?.length > 0 && (
            <div className="d-flex gap-3 mb-4">
              <div className="feedback-badge">Feedback</div>
              <div style={{ width: "100%", display: "flex", alignItems: "center", gap: "1rem" }}>
                <div className="feedback-card">{activity.feedback}</div>
                {isAdmin && (
                  <Icon
                    onClick={() => openModal(activity.activity, activity.feedback, index)}
                    style={{ color: "#275DAD", cursor: "pointer" }}
                    width={35}
                    icon="lucide:edit"
                  />
                )}
              </div>
            </div>
          )}
        </div>
      ))}
      <p className="activity-badge">Assessment 2</p>
      {questionsQuiz.map((q, index) => (
        <div className="question-block" key={index}>
          <p className="question d-flex align-items-center gap-2">
            <h4 style={{ color: "#275DAD", marginTop: ".3rem" }}>
              Question{index + 1}:
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
                <p style={{ width: "120px", textAlign: "center" }}>
                  {option.isCorrect ? (
                    <span
                      style={{ color: "#50AA50" }}
                      className="d-flex align-items-center gap-2 align-items-center justify-content-center gap-1 "
                    >
                      <Icon width={17} icon="ph:seal-check-light" />
                      Correct
                    </span>
                  ) : (
                    <span
                      style={{ color: "#FD483D" }}
                      className="d-flex align-items-center gap-2 align-items-center justify-content-center gap-1"
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

      {quizEssay.map((activity, index) => (
        <div style={{ border: "none" }} className="activity" key={index}>
          <div className="d-flex align-items-center justify-content-between mb-2">
            <div className="d-flex gap-3">
              <h4 className="text-blue" style={{ marginTop: ".3rem", fontSize: "18px" }}>
                Question {index + 6}:
              </h4>
              <span style={{ fontSize: "16px" }}>{activity.question}</span>
            </div>
            {isAdmin && !activity.feedback && (
              <Icon
                onClick={() => openModal("assessment", "", index, true)}
                style={{ color: "#D6D6D6", cursor: "pointer" }}
                width={35}
                icon="hugeicons:comment-01"
              />
            )}
          </div>

          {/* Check if answer is an array and render as an ordered list */}
          {Array.isArray(activity.answer) ? (
            <ol className="answer-options" style={{ paddingLeft: "1.5rem" }}>
              {activity.answer.map((item, idx) => (
                <li
                  key={idx}
                  style={{ marginBottom: ".5rem", fontSize: "14px" }}
                >
                  {idx + 1}. {item}
                </li>
              ))}
            </ol>
          ) : (
            <div className="d-flex align-items-center gap-3 mb-3">
              <h4 className="text-gray" style={{ marginTop: ".3rem", fontSize: "18px" }}>Answer:</h4>
              <p style={{ fontSize: "16px", marginBottom: 0 }}>{activity.answer || "No answer provided"}</p>
            </div>
          )}

          {/* Conditionally render feedback */}
          {activity?.feedback?.length > 0 && (
            <div className="d-flex gap-3 mb-4">
              <div className="feedback-badge">Feedback</div>
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
                    onClick={() => openModal("assessment", activity.feedback, index, true)}
                    style={{ color: "#275DAD", cursor: "pointer" }}
                    width={35}
                    icon="lucide:edit"
                  />
                )}
              </div>
            </div>
          )}
        </div>
      ))}
      <FinalReport rate={percentage} />
      {showModal && (
        <FeedbackModal
          isOpen={showModal}
          onClose={closeModal}
          activityNumber={activeActivity}
          initialFeedback={modalData}
          onSubmit={(feedback) => handleFeedbackSubmit(activeActivity, feedback, isAssessmentMode)}
        />
      )}
    </div>
  );
};

export default Week2;
