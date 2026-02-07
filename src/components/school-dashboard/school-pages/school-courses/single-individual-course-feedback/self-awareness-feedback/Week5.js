import React, { useEffect, useRef, useState } from "react";
import Activity from "./Activity";
import "./Week1.css"; // Import the CSS file for styling
import "./Week4.css";
// import "../newcourse.css";

import checkedImage from "../../../../../../assets/selfawareness-images/checked.png";
import unCheckedImage from "../../../../../../assets/selfawareness-images/not-checked.png";
import { Icon } from "@iconify/react";
import FinalReport from "./FinalReport";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import userService from '../../../../../../services/api/user'
import { toast } from "react-toastify";
import FeedbackModal from "./FeedbackModal";

import emojiSad from "../../../../../../assets/selfawareness-images/emocom-images/sad.png";
import emojiAngry from "../../../../../../assets/selfawareness-images/emocom-images/angry.png";
import emojiAnxiety from "../../../../../../assets/selfawareness-images/emocom-images/anxiety.png";
import emojiBored from "../../../../../../assets/selfawareness-images/emocom-images/bored.png";
import emojiHappy from "../../../../../../assets/selfawareness-images/emocom-images/happy.png";
import emojiEnvy from "../../../../../../assets/selfawareness-images/emocom-images/envy.png";
import emojiFear from "../../../../../../assets/selfawareness-images/emocom-images/fear.png";
import emojiJoy from "../../../../../../assets/selfawareness-images/emocom-images/joy.png";
import emojiNostalgia from "../../../../../../assets/selfawareness-images/emocom-images/nostalgia.png";
import { decryptId } from "../../../../../../utils/encryption";
import schoolService from "../../../../../../services/api/school";
import adminService from "../../../../../../services/api/admin";
import { useParams } from 'react-router-dom'
import { useSelector } from "react-redux";
import { adminData } from "../../../../../../redux/reducers/adminReducer";

const initialQuestionsQuiz = [
  {
    question:
      'From what you have learnt so far in the course, what do you understand by the term, ‘Self-Awareness? Please select from the following options.',
    options: [
      {
        label:
          'A. Self-awareness is knowing only your strengths and trying to hide your weaknesses from others',
        color: 'Red',
        checked: false,
        isCorrect: false,
      },
      {
        label:
          'B. Self-awareness means understanding your own thoughts, feelings, strengths, and weaknesses, and knowing how they affect your actions and relationships.',
        color: 'Red',
        checked: false,
        isCorrect: true,
      },
      {
        label:
          'C. Self-awareness is about comparing yourself to others to see how you measure up in life.',
        color: 'Red',
        checked: false,
        isCorrect: false,
      },
      {
        label:
          'D. Self-awareness means focusing on your goals without considering how you feel or what you\'ve experienced in the past.',
        color: 'Red',
        checked: false,
        isCorrect: false,
      },
    ],
  },
  {
    question:
      'To the best of your understanding, which of the following best describes the terms, ‘Strengths’ and ‘Weaknesses’?',
    options: [
      {
        label:
          'A. Strengths are the things you’re naturally good at and enjoy doing, while weaknesses are the things you dislike and should avoid altogether.',
        color: 'Red',
        checked: false,
        isCorrect: false,
      },
      {
        label:
          'B. Strengths are skills or qualities that help you succeed and make you feel confident, while weaknesses are areas where you might struggle or need improvement. Understanding both helps you grow.',
        color: 'Red',
        checked: false,
        isCorrect: true,
      },
      {
        label:
          'C. Strengths are the tasks you find easy to do, and weaknesses are the things you fail at, which means you should focus only on your strengths.',
        color: 'Red',
        checked: false,
        isCorrect: false,
      },
      {
        label:
          'D. Strengths are the things your parents say you can do, and weaknesses are things your parents say you cannot do.',
        color: 'Red',
        checked: false,
        isCorrect: false,
      },
    ],
  },
  {
    question: 'Why is it important to identify your personal values?',
    options: [
      {
        label: 'A. So you can have the same values as everyone else.',
        color: 'Red',
        checked: false,
        isCorrect: false,
      },
      {
        label:
          'B. So you can prioritize what truly matters to you in life and make decisions that align with your beliefs.',
        color: 'Red',
        checked: false,
        isCorrect: true,
      },
      {
        label:
          'C. So you can easily change your values to fit different situations.',
        color: 'Red',
        checked: false,
        isCorrect: false,
      },
      {
        label: 'D. So you can compare your values to those of others.',
        color: 'Red',
        checked: false,
        isCorrect: false,
      },
    ],
  },
  {
    question: 'What is a growth mindset?',
    options: [
      {
        label:
          'A. Believing that your abilities and intelligence are fixed and cannot be changed.',
        color: 'Red',
        checked: false,
        isCorrect: false,
      },
      {
        label:
          'B. Believing that you can develop your abilities and intelligence through hard work, learning, and perseverance.',
        color: 'Red',
        checked: false,
        isCorrect: true,
      },
      {
        label:
          'C. Believing that you should avoid challenges to prevent failure.',
        color: 'Red',
        checked: false,
        isCorrect: false,
      },
      {
        label: 'D. Believing that success comes from natural talent alone.',
        color: 'Red',
        checked: false,
        isCorrect: false,
      },
    ],
  },
  {
    question:
      'After failing a test, how would someone with a growth mindset response?',
    options: [
      {
        label:
          'A. They would give up because they believe they aren’t smart enough.',
        color: 'Red',
        checked: false,
        isCorrect: false,
      },
      {
        label:
          'B. They would reflect on what they can learn from the experience and try harder next time.',
        color: 'Red',
        checked: false,
        isCorrect: true,
      },
      {
        label: 'C. They would blame others for their failure.',
        color: 'Red',
        checked: false,
        isCorrect: false,
      },
      {
        label:
          'D. They would ignore the failure and move on without trying to improve.',
        color: 'Red',
        checked: false,
        isCorrect: false,
      },
    ],
  },
  {
    question: 'What is Emotional Intelligence?',
    options: [
      {
        label: 'A. The ability to understand and manage your own emotions.',
        color: 'Red',
        checked: false,
        isCorrect: true,
      },
      {
        label: 'B. The ability to influence the emotions of others.',
        color: 'Red',
        checked: false,
        isCorrect: false,
      },
      {
        label: 'C. The ability to be self-reliant.',
        color: 'Red',
        checked: false,
        isCorrect: false,
      },
      {
        label: 'D. Knowing how to read people\'s minds.',
        color: 'Red',
        checked: false,
        isCorrect: false,
      },
    ],
  },
  {
    question: 'Why is it important to be emotionally intelligent?',
    options: [
      {
        label: 'A. To communicate better with others.',
        color: 'Red',
        checked: false,
        isCorrect: true,
      },
      {
        label: 'B. To understand why you feel the way you do.',
        color: 'Red',
        checked: false,
        isCorrect: false,
      },
      {
        label: 'C. To be able to react impulsively in situations.',
        color: 'Red',
        checked: false,
        isCorrect: false,
      },
      {
        label: 'D. To help you fight better.',
        color: 'Red',
        checked: false,
        isCorrect: false,
      },
    ],
  },
  {
    question: 'In a conflict, how can emotional intelligence help you?',
    options: [
      {
        label: 'A. By helping you avoid the conflict entirely.',
        color: 'Red',
        checked: false,
        isCorrect: false,
      },
      {
        label:
          'B. By helping you understand your emotions and respond calmly and effectively.',
        color: 'Red',
        checked: false,
        isCorrect: true,
      },
      {
        label:
          'C. By allowing you to dominate the conversation without considering others’ feelings.',
        color: 'Red',
        checked: false,
        isCorrect: false,
      },
      {
        label: 'D. By suppressing your emotions until the conflict is over.',
        color: 'Red',
        checked: false,
        isCorrect: false,
      },
    ],
  },
  {
    question:
      'Your friends want candies, but you only want some cake because you think it is healthier. How will you communicate this to your friends?',
    options: [
      {
        label: 'A. By expressing your emotions clearly.',
        color: 'Red',
        checked: false,
        isCorrect: false,
      },
      {
        label: 'B. By aggressively telling your friends what is right.',
        color: 'Red',
        checked: false,
        isCorrect: false,
      },
      {
        label:
          'C. By understanding your friends emotions and responding appropriately.',
        color: 'Red',
        checked: false,
        isCorrect: true,
      },
      {
        label: 'D. By ignoring your friends feelings.',
        color: 'Red',
        checked: false,
        isCorrect: false,
      },
    ],
  },
  {
    question:
      'You’re facing a difficult task that feels overwhelming. Which approach best reflects a growth mindset?',
    options: [
      {
        label: 'A. Avoiding the task because you’re afraid of failing.',
        color: 'Red',
        checked: false,
        isCorrect: false,
      },
      {
        label:
          'B. Breaking the task into smaller, manageable steps and seeking help if needed.',
        color: 'Red',
        checked: false,
        isCorrect: true,
      },
      {
        label:
          'C. Complaining about how hard the task is without trying to solve it.',
        color: 'Red',
        checked: false,
        isCorrect: false,
      },
      {
        label:
          'D. Giving up because you think it’s too difficult for you to handle.',
        color: 'Red',
        checked: false,
        isCorrect: false,
      },
    ],
  },
]

const emojis = [
  { src: emojiHappy, label: 'Happy' },
  { src: emojiSad, label: 'Sad' },
  { src: emojiAngry, label: 'Angry' },
  { src: emojiFear, label: 'Fear' },
  { src: emojiJoy, label: 'Joy' },
  { src: emojiAnxiety, label: 'Anxiety' },
  { src: emojiNostalgia, label: 'Nostalgia' },
  { src: emojiEnvy, label: 'Envy' },
  { src: emojiBored, label: 'Bored' },
]

const checkList = [
  { src: emojiHappy, label: 'Happy' },
  { src: emojiSad, label: 'Sad' },
  { src: emojiAngry, label: 'Angry' },
  { src: emojiFear, label: 'Fear' },
  { src: emojiAnxiety, label: 'Anxiety' },
]

const answersForCheck = [
  { src: emojiHappy, label: 'Happy' },
  { src: emojiHappy, label: 'Happy' },
  { src: emojiJoy, label: 'Joy' },
  { src: emojiHappy, label: 'Happy' },
  { src: emojiHappy, label: 'Happy' },
]

const Week5 = ({ enrollmentId, isSchool, studentId }) => {
  const { userId } = useParams()
  const [openDropdownIndex, setOpenDropdownIndex] = useState(null)
  const [selectedOptions, setSelectedOptions] = useState({})
  const dropdownRefs = useRef([])
  const week = 5
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

  const openModal = (activityIndex, activitySubIndex = null, feedback = "") => {
    setActiveModal(activityIndex);
    setEditingActivity({ index: activityIndex, activitySubIndex, feedback });
  };

  const closeModal = () => {
    setActiveModal(null);
    setEditingActivity(null);
  };

  const assessmentData = data?.assessment;
  const activityData = data?.activity;
  const percentage = assessmentData?.rating || 0;

  useEffect(() => {
    if (!data) return
    const assessmentForChecked =
      assessmentData?.assessments?.[0]?.answers || []

    if (assessmentForChecked && assessmentForChecked.length >= 5) {
      const valuesToCheck = assessmentForChecked

      setQuestionsQuiz(prevQuestions =>
        prevQuestions.map((question, index) => {
          return {
            ...question,
            options: question.options.map((option, optionIndex) => {
              return {
                ...option,
                checked: optionIndex === valuesToCheck[index],
              }
            }),
          }
        })
      )
    }
  }, [data, assessmentData])

  const activitiesOne = [
    {
      question: " What do you understand by “Emotional Intelligence”?",
      answer: activityData?.activities?.[1]?.answers?.[0],
      feedback: activityData?.activities?.[1]?.feedback?.[0] || ""
    }]

  // console.log("error", data?.activity?.activities?.[1]?.answers?.[0]);
  const Q1 = [
    activityData?.activities?.[5]?.answers?.IWill?.[0],
    activityData?.activities?.[5]?.answers?.IWillNot?.[0]
  ];
  const Q2 = [
    activityData?.activities?.[5]?.answers?.IWill?.[1],
    activityData?.activities?.[5]?.answers?.IWillNot?.[1]
  ];
  const Q3 = [
    activityData?.activities?.[5]?.answers?.IWill?.[2],
    activityData?.activities?.[5]?.answers?.IWillNot?.[2]
  ];
  // FLS9982
  const Q4 = [
    activityData?.activities?.[5]?.answers?.IWill?.[3],
    activityData?.activities?.[5]?.answers?.IWill?.[3]
  ]; const Q5 = [
    activityData?.activities?.[5]?.answers?.IWill?.[4],
    activityData?.activities?.[5]?.answers?.IWillNot?.[4]
  ];
  // console.log(Q1);
  const activityEmojiData = activityData?.activities?.[3]?.answers || [];
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError || (!assessmentData && !activityData)) {
    return <div>Take Activity to see feedback.</div>;
  }
  // console.log(data?.activity?.activities[5]?.answers)
  const myChecked = activityData?.activities?.[3]?.answers || []
  const activities = [
    {
      question:
        "Two classmates, Sarah and Alex, have been assigned to work on a group project together. However, they have different ideas about how to approach the project, and tensions are rising between them. Sarah wants to take the lead and implement her ideas, while Alex feels sidelined and frustrated. If you were Sarah, how would you respond to this situation?",
      answer: Q1,
      feedback: activityData?.activities?.[5]?.feedback?.[0] || ""
    },
    {
      question:
        "During lunch break, a group of students starts pressuring Jack to skip class and join them in going to an off-campus party. Jack is torn between wanting to fit in with his peers and knowing that skipping class is against school rules and could negatively affect his grades. If you were Jack, how would you respond to this peer pressure situation?",
      answer: Q2,
      feedback: activityData?.activities?.[5]?.feedback?.[1] || ""
    },
    {
      question:
        "During a class presentation, James receives feedback from his teacher and classmates that his delivery was too monotone and he needs to work on his public speaking skills. James feels embarrassed and defensive, as he put a lot of effort into preparing for the presentation. If you were James, how would you respond to this situation?",
      answer: Q3,
      feedback: activityData?.activities?.[5]?.feedback?.[2] || ""
    },
    {
      question:
        "Tom has been feeling overwhelmed with schoolwork and family issues at home. This is beginning to make him quiet and easily tired. If you were Tom, how would you respond to this situation?",
      answer: Q4,
      feedback: activityData?.activities?.[5]?.feedback?.[3] || ""
    },
    {
      question:
        "Emily has been rehearsing for weeks to audition for the school play. However, when the cast list is posted, she discovers that she didn't get a part. She feels disappointed, rejected, and unsure of her abilities. If you were Emily, how would you respond to this situation?",
      answer: Q5,
      feedback: activityData?.activities?.[5]?.feedback?.[4] || ""
    }
  ];


  const handleFeedbackSubmit = (activityId, feedback) => {
    const adjustedActivityId = (() => {
      switch (activityId) {
        case 1: return 2;
        case 3: return 6;
        default: return activityId;
      }
    })();

    const updatedActivities = activitiesDataState.map((act) => {
      if (act.activity === adjustedActivityId) {
        if (activityId === 3) {
          const feedbackIndex = editingActivity.activitySubIndex;
          const updatedFeedback = Array.isArray(act.feedback) ? [...act.feedback] : [];
          for (let i = 0; i < 5; i++) {
            updatedFeedback[i] = updatedFeedback[i] || "";
          }
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

  const getActivityEmoji = (label) => {
    return emojis.find((emoji) => emoji.label === label);
  };

  return (
    <div className='week-content w-auto'>
      {activitiesOne.map((activity, index) => (
        <div style={{ border: "none" }} className="activity" key={index}>
          <p className="activity-badge">Activity {index + 1}</p>
          <p className="question d-flex align-items-center gap-2">
            <h4 style={{ color: "#275DAD", marginTop: ".3rem" }}>Question:</h4>
            <span>{activity.question}</span>
          </p>

          {/* Check if answer is an array, object, or string and render accordingly */}
          {Array.isArray(activity.answer) ? (
            <ul className="answer-options4" style={{ paddingLeft: "1.5rem" }}>
              <div className="answer d-flex align-items-center gap-2">
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
            </ul>
          ) : typeof activity.answer === "object" &&
            activity.answer !== null ? (
            <ol className="answer-options" style={{ paddingLeft: "1.5rem" }}>
              <div className="d-flex  gap-2">
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
            </ol>
          ) : (
            <div className="answer d-flex gap-2">
              <div className="d-flex w-100 justify-content-between align-items-center gap-2">
                <div className="d-flex gap-2">
                  <h4 style={{ color: '#555', marginTop: '.3rem' }}>Answer:</h4>{' '}
                  <p style={{ fontSize: '14px' }}>{activity.answer}</p>
                </div>
                {isAdmin && (!activity.feedback || activity.feedback.length === 0) && (
                  <Icon
                    onClick={() => openModal(1)}
                    style={{ color: "#275DAD", cursor: "pointer" }}
                    width={20}
                    icon="hugeicons:comment-01"
                  />
                )}
              </div>
            </div>
          )}

          {/* Conditionally render feedback */}
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
                    style={{ color: "#275DAD" }}
                    width={20}
                    icon="lucide:edit"
                  />
                )}
              </div>
            </div>
          )}
        </div>
      ))}
      <p className="activity-badge">Activity 2</p>
      <p className="question d-flex align-items-center gap-2">
        <h4 style={{ color: "#275DAD", marginTop: ".3rem" }}>Question:</h4>
        <span>Kindly match the emojis to the right emotions.</span>
      </p>
      <div className="dropdown-select-section mt-5">
        <div className="answers-container">
          {/* Your Answer Column */}
          <div className="your-answers">
            <p className="answer-font">Your answer</p>
            {emojis.map((emoji, index) => {
              const activityEmoji = getActivityEmoji(activityEmojiData[index]);

              return (
                <div key={index} className="emoji-container">
                  {activityEmoji && (
                    <div className="activity-emoji">
                      <img src={activityEmoji.src} alt={activityEmoji.label} />
                      <p>{activityEmoji.label}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Correct Options Column */}
          <div className="correct-options">
            <p className="correct-font">Correct option</p>
            {emojis.map((emoji, index) => (
              <div
                key={index}
                ref={(el) => (dropdownRefs.current[index] = el)}
                className="emoji-container"
              >
                <div className="dropdown-div">
                  <img src={emoji.src} alt={emoji.label} />
                  <p>{emoji.label}</p>
                  <span className="selected-option">
                    {selectedOptions[index] || ""}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <p className="activity-badge">Activity 3</p>
      {activities.map((activity, index) => (
        <div style={{ border: "none" }} className="activity" key={index}>
          <p className="question d-flex align-items-center gap-2">
            <h4 style={{ color: "#275DAD", marginTop: ".3rem" }}>Question:</h4>
            <span>{activity.question}</span>
          </p>

          {/* Check if answer is an array and render conditionally */}
          {Array.isArray(activity.answer) ? (
            <div className="d-flex w-100 justify-content-between align-items-center gap-2">
              <div className="d-flex gap-2">
                <h4 style={{ color: "#555", marginTop: ".3rem" }}>Answer:</h4>{" "}
                <ol className="answer-options" style={{ paddingLeft: "1.5rem" }}>
                  {activity.answer.length === 2 ? (
                    <>
                      <li style={{ marginBottom: ".5rem", fontSize: "14px" }}>
                        <strong> I will </strong> {activity.answer[0]}
                      </li>
                      <li style={{ marginBottom: ".5rem", fontSize: "14px" }}>
                        <strong> I will not </strong> {activity.answer[1]}
                      </li>
                    </>
                  ) : (
                    activity.answer.map((item, idx) => (
                      <li
                        key={idx}
                        style={{ marginBottom: ".5rem", fontSize: "14px" }}
                      >
                        {idx + 1}. {item}
                      </li>
                    ))
                  )}
                </ol>
              </div>
              {isAdmin && (!activity.feedback || activity.feedback.length === 0) && (
                <Icon
                  onClick={() => openModal(3, index)}
                  style={{ color: "#275DAD", cursor: "pointer" }}
                  width={20}
                  icon="hugeicons:comment-01"
                />
              )}
            </div>
          ) : (
            <div className="answer d-flex gap-2">
              <div className="d-flex w-100 justify-content-between align-items-center gap-2">
                <div className="d-flex gap-2">
                  <h4 style={{ color: '#555', marginTop: '.3rem' }}>Answer:</h4>{' '}
                  <p style={{ fontSize: '14px' }}>{activity.answer}</p>
                </div>
                {isAdmin && (!activity.feedback || activity.feedback.length === 0) && (
                  <Icon
                    onClick={() => openModal(3, index)}
                    style={{ color: "#275DAD", cursor: "pointer" }}
                    width={20}
                    icon="hugeicons:comment-01"
                  />
                )}
              </div>
            </div>
          )}

          {/* Conditionally render feedback */}
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
                    style={{ color: "#275DAD" }}
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
      <p className="question d-flex align-items-center gap-2">
        <h4 style={{ color: "#275DAD", marginTop: ".3rem" }}>Question:</h4>
        <span>
          All you need to do is select how you would respond to a colleague
          wearing a facial expression with a facial responses.
        </span>
      </p>
      <div className="dropdown-select-section mt-5">
        <div className="answers-container">
          {/* Your Answer Column */}
          <div className="your-answers">
            <p className="answer-font">Your answer</p>
            {checkList.map((check, index) => {
              const answerEmoji = emojis.find(
                (emoji) => emoji.label === myChecked[index]
              );

              return (
                <div key={index} className="emoji-container">
                  <div className="dropdown-div">
                    {/* Display checkList emoji */}
                    <img src={check.src} alt={check.label} />
                    <Icon icon="maki:arrow" />
                    {/* Display corresponding myChecked emoji */}
                    {answerEmoji && (
                      <div className="selected-option">
                        <img src={answerEmoji.src} alt={answerEmoji.label} />
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Correct Options Column */}
          <div className="correct-options">
            <p className="correct-font">Correct option</p>
            {checkList.map((check, index) => {
              const answerCheck = answersForCheck[index]; // Find corresponding correct answer

              return (
                <div key={index} className="emoji-container">
                  <div className="dropdown-div">
                    {/* Display checkList emoji */}
                    <img src={check.src} alt={check.label} />
                    <Icon icon="maki:arrow" />
                    {/* Display corresponding answersForCheck emoji */}
                    <div className="selected-option">
                      <img src={answerCheck.src} alt={answerCheck.label} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <p className="activity-badge">Assessment 5</p>
      {questionsQuiz.map((q, index) => (
        <div className="question-block" key={index}>
          <p className="question d-flex align-items-center gap-2">
            <h4 style={{ color: "#275DAD", marginTop: ".3rem" }}>
              Question:{index + 1}
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
                <span
                  style={{
                    fontSize: '14px',
                    textAlign: 'left',
                    display: 'block',
                  }}
                  className='option-label'
                >
                  {option.label}
                </span>
                <p style={{ width: "120px", textAlign: "center" }}>
                  {option.isCorrect ? (
                    <span
                      style={{ color: "#50AA50" }}
                      className="d-flex align-items-center justify-content-center gap-1 "
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
    </div>
  );
};

export default Week5;
