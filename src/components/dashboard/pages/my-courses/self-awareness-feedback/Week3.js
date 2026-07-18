import React, { useEffect, useState } from "react";
import Activity from "./Activity";
import "./Week1.css"; // Import the CSS file for styling
import "./Week1.css"; // Import the CSS file for styling
import PersonalityFeedback from "./PersonalityFeedback";
import checkedImage from "../../../../../assets/selfawareness-images/checked.png";
import unCheckedImage from "../../../../../assets/selfawareness-images/not-checked.png";
import { Icon } from "@iconify/react";
import FinalReport from "./FinalReport";
import userService from "../../../../../services/api/user";
import schoolService from "../../../../../services/api/school";
import adminService from "../../../../../services/api/admin";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { adminData } from "../../../../../redux/reducers/adminReducer";
import FeedbackModal from "../../../../school-dashboard/school-pages/school-courses/single-individual-course-feedback/self-awareness-feedback/FeedbackModal";

let questionsQuiz = [
  {
    question:
      "Flowie believes that she can improve her drawing skills with practice and effort. Which mindset does this describe?",
    options: [
      {
        label: "A. Fixed mindset",
        color: "Red",
        checked: false,
        isCorrect: false
      },
      {
        label: "B. Growth mindset",
        color: "Green",
        checked: false,
        isCorrect: true // This is the correct option
      },
      {
        label: "C. Stagnant mindset",
        color: "Blue",
        checked: false,
        isCorrect: false
      },
      {
        label: "D. Neutral mindset",
        color: "Yellow",
        checked: false,
        isCorrect: false
      }
    ]
  },
  {
    question:
      "If someone says, I can't play the piano because I'm just not musically talented, which type of mindset are they demonstrating?",
    options: [
      {
        label: "A. Fixed mindset",
        color: "Red",
        checked: false,
        isCorrect: true // This is the correct option
      },
      {
        label: "B. Growth mindset",
        color: "Green",
        checked: false,
        isCorrect: false
      },
      {
        label: "C. Stagnant mindset",
        color: "Blue",
        checked: false,
        isCorrect: false
      },
      {
        label: "D. Neutral mindset",
        color: "Yellow",
        checked: false,
        isCorrect: false
      }
    ]
  },
  {
    question:
      "Why is it beneficial to have a growth mindset when facing challenges?",
    options: [
      {
        label: "A. It helps you avoid mistakes altogether.",
        color: "Red",
        checked: false,
        isCorrect: false
      },
      {
        label:
          "B. It encourages you to embrace challenges and learn from mistakes.",
        color: "Green",
        checked: false,
        isCorrect: true // This is the correct option
      },
      {
        label: "C. It ensures that you will never fail.",
        color: "Blue",
        checked: false,
        isCorrect: false
      },
      {
        label: "D. It makes tasks easier and less challenging.",
        color: "Yellow",
        checked: false,
        isCorrect: false
      }
    ]
  },
  {
    question: "Which of the following statements reflects a growth mindset?",
    options: [
      {
        label: "A. I'm either good at something, or I'm not.",
        color: "Red",
        checked: false,
        isCorrect: false
      },
      {
        label: "B. I can get better at this if I try.",
        color: "Green",
        checked: false,
        isCorrect: true // This is the correct option
      },
      {
        label: "C. There's no point in trying if I'm going to fail.",
        color: "Blue",
        checked: false,
        isCorrect: false
      },
      {
        label: "D. My abilities are fixed and cannot be changed.",
        color: "Yellow",
        checked: false,
        isCorrect: false
      }
    ]
  },
  {
    question: "Why is mindset important in how you approach learning and life?",
    options: [
      {
        label: "A. It determines whether you can control your surroundings.",
        color: "Red",
        checked: false,
        isCorrect: false
      },
      {
        label:
          "B. It affects your openness to new experiences and resilience in the face of setbacks.",
        color: "Green",
        checked: false,
        isCorrect: true // This is the correct option
      },
      {
        label: "C. It guarantees success in all endeavors.",
        color: "Blue",
        checked: false,
        isCorrect: false
      },
      {
        label: "D. It limits your ability to change and grow.",
        color: "Yellow",
        checked: false,
        isCorrect: false
      }
    ]
  },
  {
    question:
      "After receiving a poor grade, Flowa decides to work harder and seek help to improve. What mindset is she demonstrating?",
    options: [
      {
        label: "A. Fixed mindset",
        color: "Red",
        checked: false,
        isCorrect: false
      },
      {
        label: "B. Growth mindset.",
        color: "Green",
        checked: false,
        isCorrect: true // This is the correct option
      },
      {
        label: "C. Static mindset.",
        color: "Blue",
        checked: false,
        isCorrect: false
      },
      {
        label: "D. Rigid mindset.",
        color: "Yellow",
        checked: false,
        isCorrect: false
      }
    ]
  },
  {
    question: "How can someone develop a growth mindset?",
    options: [
      {
        label: "A. By avoiding all challenges and playing it safe.",
        color: "Red",
        checked: false,
        isCorrect: false
      },
      {
        label:
          "B. By changing the way they think and being open to learning and growth.",
        color: "Green",
        checked: false,
        isCorrect: true // This is the correct option
      },
      {
        label: "C. By focusing only on their existing strengths.",
        color: "Blue",
        checked: false,
        isCorrect: false
      },
      {
        label: "D. By believing that their abilities are unchangeable.",
        color: "Yellow",
        checked: false,
        isCorrect: false
      }
    ]
  },
  {
    question:
      "Which of the following best describes the attitude of someone with a fixed mindset towards making mistakes?",
    options: [
      {
        label: "A. They see mistakes as opportunities to learn.",
        color: "Red",
        checked: false,
        isCorrect: false
      },
      {
        label:
          "B. They believe mistakes mean they are not good at something and cannot improve.",
        color: "Green",
        checked: false,
        isCorrect: true // This is the correct option
      },
      {
        label: "C. They are indifferent to making mistakes.",
        color: "Blue",
        checked: false,
        isCorrect: false
      },
      {
        label:
          "D. They see mistakes as a natural part of the learning process.",
        color: "Yellow",
        checked: false,
        isCorrect: false
      }
    ]
  },
  {
    question:
      "What activity could help someone practice thinking in new ways and developing a growth mindset?",
    options: [
      {
        label: "A. Avoiding any new challenges.",
        color: "Red",
        checked: false,
        isCorrect: false
      },
      {
        label:
          "B. Setting goals, identifying challenges, and making a plan to tackle those challenges.",
        color: "Green",
        checked: false,
        isCorrect: true // This is the correct option
      },
      {
        label: "C. Sticking to familiar tasks and routines.",
        color: "Blue",
        checked: false,
        isCorrect: false
      },
      {
        label: "D. Focusing solely on their current abilities.",
        color: "Yellow",
        checked: false,
        isCorrect: false
      }
    ]
  },
  {
    question:
      "Which mindset is more likely to lead to resilience and perseverance in the face of setbacks?",
    options: [
      {
        label: "A. Fixed mindset",
        color: "Red",
        checked: false,
        isCorrect: false
      },
      {
        label: "B. Growth mindset",
        color: "Green",
        checked: false,
        isCorrect: true // This is the correct option
      },
      {
        label: "C. Static mindset",
        color: "Blue",
        checked: false,
        isCorrect: false
      },
      {
        label: "D. Neutral mindset",
        color: "Yellow",
        checked: false,
        isCorrect: false
      }
    ]
  }
];

const Week3 = ({ enrollmentId, isSchool, studentId }) => {
  const { isAdmin, code } = useSelector(adminData);
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState("");
  const [activeActivity, setActiveActivity] = useState(null);

  const [feedbackIndex, setFeedbackIndex] = useState(null);

  const openModal = (activity, feedback = "", index = null) => {
    setActiveActivity(activity);
    setModalData(feedback);
    setFeedbackIndex(index);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setActiveActivity(null);
    setModalData("");
    setFeedbackIndex(null);
  };

  const [assessmentData, setAssessmentData] = useState(null);
  const [percentage, setPercent] = useState(0);

  const { data, isPending, status, isError, refetch } = useQuery({
    queryKey: ["dashboard/self-awereness-feedback-3", enrollmentId, studentId, isAdmin, 3],
    queryFn: () => {
      if (isAdmin) return adminService.getUserCourseData(enrollmentId, 3, code);
      if (isSchool) return schoolService.getStudentCourseData(enrollmentId, 3, studentId);
      return userService.getUserCourseData(enrollmentId, 3);
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
        3,
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

  const handleFeedbackSubmit = (activityNumber, feedback) => {
    const currentActivities = data?.activity?.activities || [];
    const updatedActivities = currentActivities.map((act) => {
      if (act.activity === activityNumber) {
        let newFeedback = Array.isArray(act.feedback) ? [...act.feedback] : [act.feedback];
        if (feedbackIndex !== null) {
          newFeedback[feedbackIndex] = feedback;
        } else {
          newFeedback[0] = feedback;
        }
        return { ...act, feedback: newFeedback };
      }
      return act;
    });

    mutation.mutate(updatedActivities);
  };

  useEffect(() => {
    if (!data) return
    setPercent(data?.assessment?.rating || 0);

    const assessmentForChecked =
      data?.assessment?.assessments?.[0]?.answers;

    setAssessmentData(assessmentForChecked)
    // console.log(data?.existingAssessment.assessments[0].answers);

    // Ensure that assessmentForChecked is valid before slicing
    if (assessmentForChecked && assessmentForChecked.length >= 5) {
      const valuesToCheck = assessmentForChecked;

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
    }

  }, [data]);

  // // console.log(updatedQuestionsQuiz);

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (isError || data?.status === "failed") {
    return <div>{data?.message}.</div>;
  }


  const activities = [
    {
      activity: 2,
      feedbackIndex: 0,
      question: "What do you understand by the word “Mindset”?",
      answer: data?.activity?.activities?.find(a => a.activity === 2)?.answers?.[0],
      feedback: data?.activity?.activities?.find(a => a.activity === 2)?.feedback?.[0]
    },
    {
      activity: 4,
      feedbackIndex: 0,
      question: "Do you feel like you have a growth mindset, or do you sometimes find yourself with a fixed mindset? Share your thoughts. It’s okay to be honest, this is all about learning and growing together!",
      answer: data?.activity?.activities?.find(a => a.activity === 4)?.answers?.[0],
      feedback: data?.activity?.activities?.find(a => a.activity === 4)?.feedback?.[0]
    },
    {
      activity: 6,
      feedbackIndex: 0,
      question: "List five (5) lessons you got from the videos you watched.",
      answer: data?.activity?.activities?.find(a => a.activity === 6)?.answers?.slice(0, 5),
      feedback: data?.activity?.activities?.find(a => a.activity === 6)?.feedback?.[0]
    },
    {
      activity: 6,
      feedbackIndex: 1,
      question:
        "List one (1) thing you will start working on, even on your growth journey.",
      answer: data?.activity?.activities?.find(a => a.activity === 6)?.answers?.[5],
      feedback: data?.activity?.activities?.find(a => a.activity === 6)?.feedback?.[1]
    }
  ];

  return (
    <div className="week-content w-auto">
      {activities.slice(0, 2).map((activity, index) => (
        <div style={{ border: "none" }} className="activity" key={index}>
          <p className="activity-badge">Activity {index + 1}</p>
          <div className="d-flex align-items-center justify-content-between mb-2">
            <div className="d-flex gap-3">
              <h4 className="text-blue" style={{ marginTop: ".3rem", fontSize: "18px" }}>Question:</h4>
              <span style={{ fontSize: "16px" }}>{activity.question}</span>
            </div>
            {isAdmin && !activity.feedback && (
              <Icon
                onClick={() => openModal(activity.activity, activity.feedback || "", activity.feedbackIndex)}
                style={{ color: "#D6D6D6", cursor: "pointer" }}
                width={35}
                icon="hugeicons:comment-01"
              />
            )}
          </div>

          <div className="d-flex align-items-center justify-content-between mb-3">
            {Array.isArray(activity.answer) ? (
              <div className="d-flex gap-3 align-items-start">
                <h4 className="text-gray" style={{ marginTop: ".3rem", fontSize: "18px" }}>Answer:</h4>
                <ol className="answer-options" style={{ paddingLeft: "1.5rem", marginBottom: 0 }}>
                  {activity.answer.map((item, idx) => (
                    <li
                      key={idx}
                      style={{ marginBottom: ".5rem", fontSize: "16px" }}
                    >
                      {item}
                    </li>
                  ))}
                </ol>
              </div>
            ) : (
              <div className="d-flex align-items-center gap-3">
                <h4 className="text-gray" style={{ marginTop: ".3rem", fontSize: "18px" }}>Answer:</h4>
                <p style={{ fontSize: "16px", marginBottom: 0 }}>{activity.answer}</p>
              </div>
            )}
          </div>

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
                    onClick={() => openModal(activity.activity, activity.feedback, activity.feedbackIndex)}
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

      <p className="activity-badge">Activity 3</p>
      {activities.slice(2).map((activity, index) => (
        <div style={{ border: "none" }} className="activity" key={index}>
          <div className="d-flex align-items-center justify-content-between mb-2">
            <div className="d-flex gap-3">
              <h4 className="text-blue" style={{ marginTop: ".3rem", fontSize: "18px" }}>Question:</h4>
              <span style={{ fontSize: "16px" }}>{activity.question}</span>
            </div>
            {isAdmin && !activity.feedback && (
              <Icon
                onClick={() => openModal(activity.activity, activity.feedback || "", activity.feedbackIndex)}
                style={{ color: "#D6D6D6", cursor: "pointer" }}
                width={35}
                icon="hugeicons:comment-01"
              />
            )}
          </div>

          <div className="d-flex align-items-center justify-content-between mb-3">
            {Array.isArray(activity.answer) ? (
              <div className="d-flex gap-3 align-items-start">
                <h4 className="text-gray" style={{ marginTop: ".3rem", fontSize: "18px" }}>Answer:</h4>
                <ol className="answer-options" style={{ paddingLeft: "1.5rem", marginBottom: 0 }}>
                  {activity.answer.map((item, idx) => (
                    <li
                      key={idx}
                      style={{ marginBottom: ".5rem", fontSize: "16px" }}
                    >
                      {item}
                    </li>
                  ))}
                </ol>
              </div>
            ) : (
              <div className="d-flex align-items-center gap-3">
                <h4 className="text-gray" style={{ marginTop: ".3rem", fontSize: "18px" }}>Answer:</h4>
                <p style={{ fontSize: "16px", marginBottom: 0 }}>{activity.answer}</p>
              </div>
            )}
          </div>

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
                    onClick={() => openModal(activity.activity, activity.feedback, activity.feedbackIndex)}
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

      <p className="activity-badge">Assessment 3</p>
      {
        questionsQuiz.map((q, index) => (
          <div className="question-block" key={index}>
            <div className="d-flex gap-3 mb-2">
              <h4 className="text-blue" style={{ marginTop: ".3rem", fontSize: "18px" }}>
                Question {index + 1}:
              </h4>
              <span style={{ fontSize: "16px" }}> {q.question}</span>
            </div>
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
        ))
      }
      <FinalReport rate={percentage} />
      {
        showModal && (
          <FeedbackModal
            initialFeedback={modalData}
            onClose={closeModal}
            onSubmit={(feedback) => handleFeedbackSubmit(activeActivity, feedback)}
          />
        )
      }
    </div >
  );
};

export default Week3;
