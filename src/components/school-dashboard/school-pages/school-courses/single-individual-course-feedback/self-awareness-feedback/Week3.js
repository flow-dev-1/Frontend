import React, { useEffect, useState } from 'react'
import Activity from './Activity'
import './Week1.css' // Import the CSS file for styling
import './Week1.css' // Import the CSS file for styling
import PersonalityFeedback from './PersonalityFeedback'
import checkedImage from '../../../../../../assets/selfawareness-images/checked.png'
import unCheckedImage from '../../../../../../assets/selfawareness-images/not-checked.png'
import { Icon } from '@iconify/react'
import FinalReport from './FinalReport'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import userService from '../../../../../../services/api/user'
import { decryptId } from '../../../../../../utils/encryption'
import schoolService from '../../../../../../services/api/school'
import adminService from "../../../../../../services/api/admin";
import { useParams } from 'react-router-dom'
import FeedbackModal from "./FeedbackModal";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { adminData } from "../../../../../../redux/reducers/adminReducer";
const initialQuestionsQuiz = [
  {
    question:
      'Flowie believes that she can improve her drawing skills with practice and effort. Which mindset does this describe?',
    options: [
      {
        label: 'A. Fixed mindset',
        color: 'Red',
        checked: false,
        isCorrect: false,
      },
      {
        label: 'B. Growth mindset',
        color: 'Green',
        checked: false,
        isCorrect: true, // This is the correct option
      },
      {
        label: 'C. Stagnant mindset',
        color: 'Blue',
        checked: false,
        isCorrect: false,
      },
      {
        label: 'D. Neutral mindset',
        color: 'Yellow',
        checked: false,
        isCorrect: false,
      },
    ],
  },
  {
    question:
      "If someone says, I can't play the piano because I'm just not musically talented, which type of mindset are they demonstrating?",
    options: [
      {
        label: 'A. Fixed mindset',
        color: 'Red',
        checked: false,
        isCorrect: true, // This is the correct option
      },
      {
        label: 'B. Growth mindset',
        color: 'Green',
        checked: false,
        isCorrect: false,
      },
      {
        label: 'C. Stagnant mindset',
        color: 'Blue',
        checked: false,
        isCorrect: false,
      },
      {
        label: 'D. Neutral mindset',
        color: 'Yellow',
        checked: false,
        isCorrect: false,
      },
    ],
  },
  {
    question:
      'Why is it beneficial to have a growth mindset when facing challenges?',
    options: [
      {
        label: 'A. It helps you avoid mistakes altogether.',
        color: 'Red',
        checked: false,
        isCorrect: false,
      },
      {
        label:
          'B. It encourages you to embrace challenges and learn from mistakes.',
        color: 'Green',
        checked: false,
        isCorrect: true, // This is the correct option
      },
      {
        label: 'C. It ensures that you will never fail.',
        color: 'Blue',
        checked: false,
        isCorrect: false,
      },
      {
        label: 'D. It makes tasks easier and less challenging.',
        color: 'Yellow',
        checked: false,
        isCorrect: false,
      },
    ],
  },
  {
    question: 'Which of the following statements reflects a growth mindset?',
    options: [
      {
        label: "A. I'm either good at something, or I'm not.",
        color: 'Red',
        checked: false,
        isCorrect: false,
      },
      {
        label: 'B. I can get better at this if I try.',
        color: 'Green',
        checked: false,
        isCorrect: true, // This is the correct option
      },
      {
        label: "C. There's no point in trying if I'm going to fail.",
        color: 'Blue',
        checked: false,
        isCorrect: false,
      },
      {
        label: 'D. My abilities are fixed and cannot be changed.',
        color: 'Yellow',
        checked: false,
        isCorrect: false,
      },
    ],
  },
  {
    question: 'Why is mindset important in how you approach learning and life?',
    options: [
      {
        label: 'A. It determines whether you can control your surroundings.',
        color: 'Red',
        checked: false,
        isCorrect: false,
      },
      {
        label:
          'B. It affects your openness to new experiences and resilience in the face of setbacks.',
        color: 'Green',
        checked: false,
        isCorrect: true, // This is the correct option
      },
      {
        label: 'C. It guarantees success in all endeavors.',
        color: 'Blue',
        checked: false,
        isCorrect: false,
      },
      {
        label: 'D. It limits your ability to change and grow.',
        color: 'Yellow',
        checked: false,
        isCorrect: false,
      },
    ],
  },
  {
    question:
      'After receiving a poor grade, Flowa decides to work harder and seek help to improve. What mindset is she demonstrating?',
    options: [
      {
        label: 'A. Fixed mindset',
        color: 'Red',
        checked: false,
        isCorrect: false,
      },
      {
        label: 'B. Growth mindset.',
        color: 'Green',
        checked: false,
        isCorrect: true, // This is the correct option
      },
      {
        label: 'C. Static mindset.',
        color: 'Blue',
        checked: false,
        isCorrect: false,
      },
      {
        label: 'D. Rigid mindset.',
        color: 'Yellow',
        checked: false,
        isCorrect: false,
      },
    ],
  },
  {
    question: 'How can someone develop a growth mindset?',
    options: [
      {
        label: 'A. By avoiding all challenges and playing it safe.',
        color: 'Red',
        checked: false,
        isCorrect: false,
      },
      {
        label:
          'B. By changing the way they think and being open to learning and growth.',
        color: 'Green',
        checked: false,
        isCorrect: true, // This is the correct option
      },
      {
        label: 'C. By focusing only on their existing strengths.',
        color: 'Blue',
        checked: false,
        isCorrect: false,
      },
      {
        label: 'D. By believing that their abilities are unchangeable.',
        color: 'Yellow',
        checked: false,
        isCorrect: false,
      },
    ],
  },
  {
    question:
      'Which of the following best describes the attitude of someone with a fixed mindset towards making mistakes?',
    options: [
      {
        label: 'A. They see mistakes as opportunities to learn.',
        color: 'Red',
        checked: false,
        isCorrect: false,
      },
      {
        label:
          'B. They believe mistakes mean they are not good at something and cannot improve.',
        color: 'Green',
        checked: false,
        isCorrect: true, // This is the correct option
      },
      {
        label: 'C. They are indifferent to making mistakes.',
        color: 'Blue',
        checked: false,
        isCorrect: false,
      },
      {
        label:
          'D. They see mistakes as a natural part of the learning process.',
        color: 'Yellow',
        checked: false,
        isCorrect: false,
      },
    ],
  },
  {
    question:
      'What activity could help someone practice thinking in new ways and developing a growth mindset?',
    options: [
      {
        label: 'A. Avoiding any new challenges.',
        color: 'Red',
        checked: false,
        isCorrect: false,
      },
      {
        label:
          'B. Setting goals, identifying challenges, and making a plan to tackle those challenges.',
        color: 'Green',
        checked: false,
        isCorrect: true, // This is the correct option
      },
      {
        label: 'C. Sticking to familiar tasks and routines.',
        color: 'Blue',
        checked: false,
        isCorrect: false,
      },
      {
        label: 'D. Focusing solely on their current abilities.',
        color: 'Yellow',
        checked: false,
        isCorrect: false,
      },
    ],
  },
  {
    question:
      'Which mindset is more likely to lead to resilience and perseverance in the face of setbacks?',
    options: [
      {
        label: 'A. Fixed mindset',
        color: 'Red',
        checked: false,
        isCorrect: false,
      },
      {
        label: 'B. Growth mindset',
        color: 'Green',
        checked: false,
        isCorrect: true, // This is the correct option
      },
      {
        label: 'C. Static mindset',
        color: 'Blue',
        checked: false,
        isCorrect: false,
      },
      {
        label: 'D. Neutral mindset',
        color: 'Yellow',
        checked: false,
        isCorrect: false,
      },
    ],
  },
]

const Week3 = ({ enrollmentId, isSchool, studentId }) => {
  const { userId } = useParams()
  const week = 3
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
  const percentage = assessmentData?.rating || 0;

  useEffect(() => {
    if (!data) return
    const assessmentForChecked =
      assessmentData?.assessments?.[0]?.answers

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


  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isError || (!assessmentData && !activityData)) {
    return <div>Take Activity to see feedback.</div>
  }

  const activities = [
    {
      activity: 1,
      question: 'What do you understand by the word “Mindset”?',
      answer: activityData?.activities?.find(a => a.activity === 2)?.answers?.[0],
      feedback: activityData?.activities?.find(a => a.activity === 2)?.feedback?.[0] || '',
    },
    {
      activity: 2,
      question:
        'Do you feel like you have a growth mindset, or do you sometimes find yourself with a fixed mindset? Share your thoughts. It’s okay to be honest, this is all about learning and growing together!',
      answer: activityData?.activities?.find(a => a.activity === 4)?.answers?.[0],
      feedback: activityData?.activities?.find(a => a.activity === 4)?.feedback?.[0] || '',
    },
    {
      activity: 3,
      question:
        'List five (5) lessons you got from the videos you watched.',
      answer: activityData?.activities?.find(a => a.activity === 6)?.answers?.slice(0, 5),
      feedback: activityData?.activities?.find(a => a.activity === 6)?.feedback?.[0] || '',
    },
    {
      activity: 4,
      question:
        'List one (1) thing you will start working on, even on your growth journey.',
      answer: activityData?.activities?.find(a => a.activity === 6)?.answers?.[5],
      feedback: activityData?.activities?.find(a => a.activity === 6)?.feedback?.[1] || '',
    },
  ]


  const handleFeedbackSubmit = (activityId, feedback) => {
    const adjustedActivityId = (() => {
      switch (activityId) {
        case 1: return 2;
        case 2: return 4;
        case 3:
        case 4: return 6;
        default: return activityId;
      }
    })();

    const updatedActivities = activitiesDataState.map((act) => {
      if (act.activity === adjustedActivityId) {
        if ([3, 4].includes(activityId)) {
          const feedbackIndex = activityId === 3 ? 0 : 1;
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
    <div className='week-content w-auto'>
      {activities.slice(0, 2).map((activity, index) => (
        <div style={{ border: 'none' }} className='activity' key={index}>
          <p className='activity-badge'>Activity {index + 1}</p>
          <p className='question d-flex align-items-center gap-2'>
            <h4 style={{ color: '#275DAD', marginTop: '.3rem' }}>Question:</h4>
            <span>{activity.question}</span>
          </p>

          {/* Check if answer is an array and render as an ordered list */}
          {Array.isArray(activity.answer) ? (
            <ol className='answer-options' style={{ paddingLeft: '1.5rem' }}>
              <div className='d-flex w-100 justify-content-between align-items-center gap-2'>
                <div className='d-flex  gap-2'>
                  <h4 style={{ color: '#555', marginTop: '.3rem' }}>Answer:</h4>{' '}
                  <div>
                    {activity.answer.map((item, idx) => (
                      <li
                        key={idx}
                        style={{ marginBottom: '.5rem', fontSize: '14px' }}
                      >
                        {idx + 1}. {item}
                      </li>
                    ))}
                  </div>
                </div>
                {isAdmin && (!activity?.feedback || activity.feedback.length === 0) && (
                  <Icon
                    onClick={() => openModal(activity.activity)}
                    style={{ color: "#275DAD", cursor: "pointer" }}
                    width={20}
                    icon="hugeicons:comment-01"
                  />
                )}
              </div>
            </ol>
          ) : (
            <div className='answer d-flex w-100 justify-content-between align-items-center gap-2'>
              <div className='d-flex align-items-center gap-2'>
                <h4 style={{ color: '#555', marginTop: '.3rem' }}>Answer:</h4>{' '}
                <p style={{ fontSize: '14px' }}>{activity.answer}</p>
              </div>
              {isAdmin && (!activity?.feedback || activity.feedback.length === 0) && (
                <Icon
                  onClick={() => openModal(activity.activity)}
                  style={{ color: "#275DAD", cursor: "pointer" }}
                  width={20}
                  icon="hugeicons:comment-01"
                />
              )}
            </div>
          )}

          {/* Conditionally render feedback */}
          {activeModal === activity.activity && (
            <FeedbackModal
              initialFeedback={activity?.feedback || ""}
              onClose={closeModal}
              onSubmit={(feedback) => handleFeedbackSubmit(activity.activity, feedback)}
            />
          )}

          {activity?.feedback?.length > 0 && (
            <div className='feedback'>
              <div id='badge'>Feedback:</div>
              <div
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                }}
              >
                <div className='feedback-card'>{activity.feedback}</div>
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

      <p className='activity-badge'>Activity 3</p>
      {activities.slice(2).map((activity, index) => (
        <div style={{ border: 'none' }} className='activity' key={index}>
          <p className='question d-flex align-items-center gap-2'>
            <h4 style={{ color: '#275DAD', marginTop: '.3rem' }}>Question:</h4>
            <span>{activity.question}</span>
          </p>

          {/* Check if answer is an array and render as an ordered list */}
          {Array.isArray(activity.answer) ? (
            <ol className='answer-options' style={{ paddingLeft: '1.5rem' }}>
              <div className='d-flex w-100 justify-content-between align-items-center gap-2'>
                <div className='d-flex  gap-2'>
                  <h4 style={{ color: '#555', marginTop: '.3rem' }}>Answer:</h4>{' '}
                  <div>
                    {activity.answer.map((item, idx) => (
                      <li
                        key={idx}
                        style={{ marginBottom: '.5rem', fontSize: '14px' }}
                      >
                        {idx + 1}. {item}
                      </li>
                    ))}
                  </div>
                </div>
                {isAdmin && (!activity?.feedback || activity.feedback.length === 0) && (
                  <Icon
                    onClick={() => openModal(activity.activity)}
                    style={{ color: "#275DAD", cursor: "pointer" }}
                    width={20}
                    icon="hugeicons:comment-01"
                  />
                )}
              </div>
            </ol>
          ) : (
            <div className='answer d-flex w-100 justify-content-between align-items-center gap-2'>
              <div className='d-flex align-items-center gap-2'>
                <h4 style={{ color: '#555', marginTop: '.3rem' }}>Answer:</h4>{' '}
                <p style={{ fontSize: '14px' }}>{activity.answer}</p>
              </div>
              {isAdmin && (!activity?.feedback || activity.feedback.length === 0) && (
                <Icon
                  onClick={() => openModal(activity.activity)}
                  style={{ color: "#275DAD", cursor: "pointer" }}
                  width={20}
                  icon="hugeicons:comment-01"
                />
              )}
            </div>
          )}

          {/* Conditionally render feedback */}
          {activeModal === activity.activity && (
            <FeedbackModal
              initialFeedback={activity?.feedback || ""}
              onClose={closeModal}
              onSubmit={(feedback) => handleFeedbackSubmit(activity.activity, feedback)}
            />
          )}

          {activity?.feedback?.length > 0 && (
            <div className='feedback'>
              <div id='badge'>Feedback:</div>
              <div
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                }}
              >
                <div className='feedback-card'>{activity.feedback}</div>
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

      <p className='activity-badge'>Assessment 3</p>
      {questionsQuiz.map((q, index) => (
        <div className='question-block' key={index}>
          <p className='question d-flex align-items-center gap-2'>
            <h4 style={{ color: '#275DAD', marginTop: '.3rem' }}>
              Question{index + 1}:
            </h4>
            <span> {q.question}</span>
          </p>
          <div className='options'>
            {q.options.map((option, idx) => (
              <div className='option' key={idx}>
                <img
                  src={option.checked ? checkedImage : unCheckedImage}
                  alt={option.isCorrect ? 'Checked' : 'Unchecked'}
                  style={{ width: '20px', marginRight: '10px' }}
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
                <p style={{ width: '120px', textAlign: 'center' }}>
                  {option.isCorrect ? (
                    <span
                      style={{ color: '#50AA50' }}
                      className='d-flex align-items-center justify-content-center gap-1 '
                    >
                      <Icon width={17} icon='ph:seal-check-light' />
                      Correct
                    </span>
                  ) : (
                    <span
                      style={{ color: '#FD483D' }}
                      className='d-flex align-items-center justify-content-center gap-1'
                    >
                      <Icon width={17} icon='mdi:cross-circle-outline' />
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
  )
}

export default Week3
