import React, { useEffect, useState } from "react";
import Activity from "./Activity";
import "./Week1.css"; // Import the CSS file for styling
import "./Week4.css";
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
import { toast } from "react-toastify";

let questionsQuiz = [
  {
    question: "What are values?",
    options: [
      {
        label: "A. Beliefs and principles that guide our actions and decisions",
        color: "Red",
        checked: false,
        isCorrect: true // Correct option
      },
      {
        label: "B. Emotions and feelings we experience daily",
        color: "Green",
        checked: false,
        isCorrect: false
      },
      {
        label: "C. Skills and talents we possess",
        color: "Blue",
        checked: false,
        isCorrect: false
      },
      {
        label: "D. Goals and dreams we want to achieve",
        color: "Yellow",
        checked: false,
        isCorrect: false
      }
    ]
  },
  {
    question:
      "Select one statement that does not show the importance of values.",
    options: [
      {
        label: "A. They help us make decisions",
        color: "Red",
        checked: false,
        isCorrect: false
      },
      {
        label: "B. They guide our behavior",
        color: "Green",
        checked: false,
        isCorrect: false
      },
      {
        label: "C. They define our talents",
        color: "Blue",
        checked: false,
        isCorrect: true // Correct option
      },
      {
        label: "D. They help us understand what is most important to us",
        color: "Yellow",
        checked: false,
        isCorrect: false
      }
    ]
  },
  {
    question: "Which of the following is an example of a value?",
    options: [
      {
        label: "A. Happiness",
        color: "Red",
        checked: false,
        isCorrect: false
      },
      {
        label: "B. Respect",
        color: "Green",
        checked: false,
        isCorrect: true // Correct option
      },
      {
        label: "C. Excitement",
        color: "Blue",
        checked: false,
        isCorrect: false
      },
      {
        label: "D. Intelligence",
        color: "Yellow",
        checked: false,
        isCorrect: false
      }
    ]
  },
  {
    question: "How can knowing your values help you in life?",
    options: [
      {
        label: "A. It can make you rich",
        color: "Red",
        checked: false,
        isCorrect: false
      },
      {
        label: "B. It can help you make choices that align with your beliefs",
        color: "Green",
        checked: false,
        isCorrect: true // Correct option
      },
      {
        label: "C. It can make you more popular",
        color: "Blue",
        checked: false,
        isCorrect: false
      },
      {
        label: "D. It can give you superpowers",
        color: "Yellow",
        checked: false,
        isCorrect: false
      }
    ]
  },
  {
    question:
      "Imagine you value honesty. What would you likely do in a situation where you found a lost wallet?",
    options: [
      {
        label: "A. Keep the wallet for yourself",
        color: "Red",
        checked: false,
        isCorrect: false
      },
      {
        label: "B. Ignore the wallet and walk away",
        color: "Green",
        checked: false,
        isCorrect: false
      },
      {
        label: "C. Try to find the owner and return the wallet",
        color: "Blue",
        checked: false,
        isCorrect: true // Correct option
      },
      {
        label: "D. Take the money and leave the wallet",
        color: "Yellow",
        checked: false,
        isCorrect: false
      }
    ]
  },
  {
    question:
      "Imagine you value responsibility, what would you likely do in a situation where the teacher asks the class to clean their lockers but nobody is doing it?",
    options: [
      {
        label: "A. Wait for the cleaner to come and clean your locker",
        color: "Red",
        checked: false,
        isCorrect: false
      },
      {
        label: "B. Do nothing",
        color: "Green",
        checked: false,
        isCorrect: false
      },
      {
        label: "C. Clean your locker",
        color: "Blue",
        checked: false,
        isCorrect: true // Correct option
      },
      {
        label: "D. Ask your classmate to help you clean your locker",
        color: "Yellow",
        checked: false,
        isCorrect: false
      }
    ]
  },
  {
    question: "My value can influence how I treat other people",
    options: [
      {
        label: "A. True",
        color: "Red",
        checked: false,
        isCorrect: true // Correct option
      },
      {
        label: "B. False",
        color: "Green",
        checked: false,
        isCorrect: false
      }
    ]
  },
  {
    question:
      "If Honesty is one of your values, what would be your best response to the following scenario. I accidentally broke my friend's favorite toy. No one saw me doing it. I would rather:",
    options: [
      {
        label: "A. Say it was someone else.",
        color: "Red",
        checked: false,
        isCorrect: false
      },
      {
        label: "B. Pretend nothing happened.",
        color: "Green",
        checked: false,
        isCorrect: false
      },
      {
        label: "C. Tell my friend the truth immediately.",
        color: "Blue",
        checked: false,
        isCorrect: true // Correct option
      },
      {
        label: "D. Replace the toy with a new one quietly.",
        color: "Yellow",
        checked: false,
        isCorrect: false
      }
    ]
  },
  {
    question:
      "Sarah notices a classmate, David, looking downcast while carrying a heavy stack of books. Sarah offers to help David with the books. Sarah remembers she has her own after-school activity but suggests they put David's books in his locker first so he isn't late to his next class.",
    instuction:
      "Instruction: Match the following statements in the scenario to their respective value",
    options: [
      {
        label:
          "A. Kindness - Sarah remembers she has her own after-school activity but suggests they put David’s books in his locker first so he isn’t late to his next class.",
        color: "Blue",
        checked: false,
        isCorrect: false
      },
      {
        label:
          "A. Kindness - As they walk, Sarah asks David if everything is alright but doesn’t pry if he doesn’t want to talk.",
        color: "Green",
        checked: false,
        isCorrect: false
      },
      {
        label: "A. Kindness - Sarah offers to help David with the books.",
        color: "Red",
        checked: false,
        isCorrect: true // Correct option
      },
      {
        label:
          "B. Respect - Sarah remembers she has her own after-school activity but suggests they put David’s books in his locker first so he isn’t late to his next class.",
        color: "Green",
        checked: false,
        isCorrect: false
      },
      {
        label:
          "B. Respect - As they walk, Sarah asks David if everything is alright but doesn’t pry if he doesn’t want to talk.",
        color: "Yellow",
        checked: false,
        isCorrect: true // Correct option
      },
      {
        label: "B. Respect - Sarah offers to help David with the books.",
        color: "Red",
        checked: false,
        isCorrect: false
      },

      {
        label:
          "C. Responsibility - Sarah remembers she has her own after-school activity but suggests they put David’s books in his locker first so he isn’t late to his next class.",
        color: "Blue",
        checked: false,
        isCorrect: true // Correct option
      },
      {
        label:
          "C. Responsibility - As they walk, Sarah asks David if everything is alright but doesn’t pry if he doesn’t want to talk.",
        color: "Red",
        checked: false,
        isCorrect: false
      },
      {
        label: "C. Responsibility - Sarah offers to help David with the books.",
        color: "Yellow",
        checked: false,
        isCorrect: false
      },
    ]
  },
  {
    question:
      "Alex promised to help Ben with his science project, which is due tomorrow. Despite having a busy schedule, Alex prioritizes helping Ben, honoring their friendship. Alex offers to let Ben use his advanced science equipment at home, knowing it will significantly improve their project. Both Alex and Ben arrive at Alex's house on time, ensuring they have maximum time to work on the project",
    instuction:
      "Instruction: Match the following statements in the scenario to their respective value",
    options: [
      {
        label:
          "A. Loyalty - Both Alex and Ben arrive at Alex’s house on time, ensuring they have maximum time to work on the project.",
        color: "Blue",
        checked: false,
        isCorrect: false
      },
      {
        label:
          "A. Loyalty - Alex offers to let Ben use his advanced science equipment at home, knowing it will significantly improve their project.",
        color: "Yellow",
        checked: false,
        isCorrect: false
      },
      {
        label:
          "A. Loyalty - Despite having a busy schedule, Alex prioritizes helping Ben, honoring their friendship.",
        color: "Green",
        checked: false,
        isCorrect: true // Correct option
      },
      {
        label:
          "B. Punctuality - Both Alex and Ben arrive at Alex’s house on time, ensuring they have maximum time to work on the project.",
        color: "Red",
        checked: false,
        isCorrect: true // Correct option
      },
      {
        label:
          "B. Punctuality - Alex offers to let Ben use his advanced science equipment at home, knowing it will significantly improve their project.",
        color: "Blue",
        checked: false,
        isCorrect: false
      },
      {
        label:
          "B. Punctuality - Despite having a busy schedule, Alex prioritizes helping Ben, honoring their friendship.",
        color: "Green",
        checked: false,
        isCorrect: false
      },
      {
        label:
          "C. Generosity - Both Alex and Ben arrive at Alex’s house on time, ensuring they have maximum time to work on the project.",
        color: "Green",
        checked: false,
        isCorrect: false
      },
      {
        label:
          "C. Generosity - Alex offers to let Ben use his advanced science equipment at home, knowing it will significantly improve their project.",
        color: "Yellow",
        checked: false,
        isCorrect: true // Correct option
      },
      {
        label:
          "C. Generosity - Despite having a busy schedule, Alex prioritizes helping Ben, honoring their friendship.",
        color: "Red",
        checked: false,
        isCorrect: false
      },

    ]
  }
];

const Week4 = ({ enrollmentId, isSchool, studentId }) => {
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

  const [percentage, setPercent] = useState(0)

  const { data, isPending, status, isError, refetch } = useQuery({
    queryKey: ["dashboard/self-awereness-feedback-4", enrollmentId, studentId, isAdmin, 4],
    queryFn: () => {
      if (isAdmin) return adminService.getUserCourseData(enrollmentId, 4, code);
      if (isSchool) return schoolService.getStudentCourseData(enrollmentId, 4, studentId);
      return userService.getUserCourseData(enrollmentId, 4);
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
        4,
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
      data?.assessment?.assessments[0]?.answers;
    const matchCount1 = data?.assessment?.assessments[0].matchesSet1;
    const matchCount2 = data?.assessment?.assessments[0].matchesSet2;

    // Using the matchset to form probable answer 0-8
    // true if selection matches index and false for odas
    // e.g [true,false,false,...] correspond to {left:0,right:0} and so on

    const combinedArray1 = Array(9).fill(false).map((_, index) => {
      const leftIndex = Math.floor(index / 3); // 0 for first 3, 1 for next 3, etc
      const rightIndex = index % 3; // cycles through 0,1,2 

      return matchCount1?.some(match =>
        match.left === leftIndex && match.right === rightIndex
      );
    });

    const combinedArray2 = Array(9).fill(false).map((_, index) => {
      const leftIndex = Math.floor(index / 3); // 0 for first 3, 1 for next 3, etc
      const rightIndex = index % 3; // cycles through 0,1,2 

      return matchCount2?.some(match =>
        match.left === leftIndex && match.right === rightIndex
      );
    });

    if (assessmentForChecked && assessmentForChecked.length >= 7) {
      const valuesToCheck = assessmentForChecked;

      questionsQuiz = questionsQuiz.map((question, index) => {
        return {
          ...question,
          options: question.options.map((option, optionIndex) => {
            let isChecked = false;

            if (index < 8) {
              // Mark options based on assessmentForChecked
              if (optionIndex === valuesToCheck[index]) {
                isChecked = true;
              }
            } else {

              // For questions 8 and 9
              if (index === 8) {
                // Check matchCount1 for question 8
                if (combinedArray1[optionIndex]) {
                  isChecked = true;
                }

              } else {
                // Check matchCount2 for question 9
                if (combinedArray2[optionIndex]) {
                  isChecked = true;
                }
              }

            }

            return {
              ...option,
              checked: isChecked
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
      activity: data?.activity?.activities[1]?.activity || 1,
      feedbackIndex: 0,
      question: "What exactly are “Values”??",
      answer: data?.activity?.activities[1]?.answers?.[0],
      feedback: data?.activity?.activities[1]?.feedback?.[0]
    },
    {
      activity: data?.activity?.activities[3]?.activity || 3,
      feedbackIndex: 0,
      question: "Flip each card to know more about the values. Select the box on each card to pick the values you feel are a big part of who you are.",
      answer: data?.activity?.activities[3]?.answers,
      feedback: data?.activity?.activities[3]?.feedback?.[0]
    },
    {
      activity: data?.activity?.activities[5]?.activity || 5,
      feedbackIndex: 0,
      question: "Identify three (3) important people in your live and list their names below.",
      answer: data?.activity?.activities[5]?.answers?.[0],
      feedback: data?.activity?.activities?.[5]?.feedback?.[0]
    },
    {
      activity: data?.activity?.activities[5]?.activity || 5,
      feedbackIndex: 1,
      question: "Write out what these people think about you.",
      answer: data?.activity?.activities[5]?.answers?.[1],
      feedback: data?.activity?.activities?.[5]?.feedback?.[1]
    },
    {
      activity: data?.activity?.activities[5]?.activity || 5,
      feedbackIndex: 2,
      question: "Are you happy with what these people think about you? If no, what would you like to change? If yes, type “YES” in the box.",
      answer: data?.activity?.activities[5]?.answers?.[2],
      feedback: data?.activity?.activities?.[5]?.feedback?.[2]
    },
    {
      activity: data?.activity?.activities[7]?.activity || 8,
      feedbackIndex: 0,
      question: "Identify four (4) core values that resonate with you the most.",
      answer: data?.activity?.activities[7]?.answers,
      feedback: data?.activity?.activities[7]?.feedback?.[0]
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
                <ul className="answer-options4" style={{ paddingLeft: "1.5rem", marginBottom: 0 }}>
                  <div className="d-flex flex-wrap gap-2">
                    {activity.answer.map((item, idx) => (
                      <li
                        key={idx}
                        style={{ marginBottom: ".5rem", fontSize: "16px", listStyle: 'none' }}
                        className="d-flex align-items-center gap-1"
                      >
                        <Icon
                          icon="radix-icons:dot-filled"
                          style={{ color: "#5B616A" }}
                        />
                        {item}
                      </li>
                    ))}
                  </div>
                </ul>
              </div>
            ) : typeof activity.answer === "object" && activity.answer !== null ? (
              <div className="d-flex gap-3 align-items-start">
                <h4 className="text-gray" style={{ marginTop: ".3rem", fontSize: "18px" }}>Answer:</h4>
                <ol className="answer-options" style={{ paddingLeft: "1.5rem", marginBottom: 0 }}>
                  {Object.entries(activity.answer).map(([key, value], idx) => (
                    <li
                      key={idx}
                      style={{ marginBottom: ".5rem", fontSize: "16px" }}
                    >
                      {value}
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
      {activities.slice(2, 5).map((activity, index) => (
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
                <ul className="answer-options4" style={{ paddingLeft: "1.5rem", marginBottom: 0 }}>
                  <div className="d-flex flex-wrap gap-2">
                    {activity.answer.map((item, idx) => (
                      <li
                        key={idx}
                        style={{ marginBottom: ".5rem", fontSize: "16px", listStyle: 'none' }}
                        className="d-flex align-items-center gap-1"
                      >
                        <Icon
                          icon="radix-icons:dot-filled"
                          style={{ color: "#5B616A" }}
                        />
                        {item}
                      </li>
                    ))}
                  </div>
                </ul>
              </div>
            ) : typeof activity.answer === "object" && activity.answer !== null ? (
              <div className="d-flex gap-3 align-items-start">
                <h4 className="text-gray" style={{ marginTop: ".3rem", fontSize: "18px" }}>Answer:</h4>
                <ol className="answer-options" style={{ paddingLeft: "1.5rem", marginBottom: 0 }}>
                  {Object.entries(activity.answer).map(([key, value], idx) => (
                    <li
                      key={idx}
                      style={{ marginBottom: ".5rem", fontSize: "16px" }}
                    >
                      {value}
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

      <p className="activity-badge">Activity 4</p>
      {activities.slice(5, 6).map((activity, index) => (
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
                <ul className="answer-options4" style={{ paddingLeft: "1.5rem", marginBottom: 0 }}>
                  <div className="d-flex flex-wrap gap-2">
                    {activity.answer.map((item, idx) => (
                      <li
                        key={idx}
                        style={{ marginBottom: ".5rem", fontSize: "16px", listStyle: 'none' }}
                        className="d-flex align-items-center gap-1"
                      >
                        <Icon
                          icon="radix-icons:dot-filled"
                          style={{ color: "#5B616A" }}
                        />
                        {item}
                      </li>
                    ))}
                  </div>
                </ul>
              </div>
            ) : typeof activity.answer === "object" && activity.answer !== null ? (
              <div className="d-flex gap-3 align-items-start">
                <h4 className="text-gray" style={{ marginTop: ".3rem", fontSize: "18px" }}>Answer:</h4>
                <ol className="answer-options" style={{ paddingLeft: "1.5rem", marginBottom: 0 }}>
                  {Object.entries(activity.answer).map(([key, value], idx) => (
                    <li
                      key={idx}
                      style={{ marginBottom: ".5rem", fontSize: "16px" }}
                    >
                      {value}
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

      <p className="activity-badge">Assessment 4</p>
      {questionsQuiz.map((q, index) => (
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
      ))}
      <FinalReport rate={percentage} />
      {showModal && (
        <FeedbackModal
          initialFeedback={modalData}
          onClose={closeModal}
          onSubmit={(feedback) => handleFeedbackSubmit(activeActivity, feedback)}
        />
      )}
    </div>
  );
};

export default Week4;
