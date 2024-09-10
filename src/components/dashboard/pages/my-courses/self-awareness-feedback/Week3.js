import React, { useEffect, useState } from "react";
import Activity from "./Activity";
import "./Week1.css"; // Import the CSS file for styling
import "./Week1.css"; // Import the CSS file for styling
import PersonalityFeedback from "./PersonalityFeedback";
import checkedImage from "../../../../../assets/selfawareness-images/checked.png";
import unCheckedImage from "../../../../../assets/selfawareness-images/not-checked.png";
import { Icon } from "@iconify/react";
import FinalReport from "./FinalReport";
import { useQuery } from "@tanstack/react-query";
import userService from "../../../../../services/api/user";

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

const Week3 = () => {
  // const percentage = 20;

  const week = 3;
  const courseId = "66853bf50118e2e0a02b6a5a";
  const { data, isLoading, isError } = useQuery({
    queryKey: ["dashboard/feedback/self-awareness", courseId, week],
    queryFn: () => userService.getMyActivites(courseId, week)
  });

  // console.log(data?.activity?.activities[1]?.answers[0]);

  const [assessmentData, setAssessmentData] = useState(null);
  const [assessmentLoading, setAssessmentLoading] = useState(true);
  const [assessmentError, setAssessmentError] = useState(null);

  useEffect(() => {
    const fetchAndProcessAssessmentData = async () => {
      setAssessmentLoading(true);
      try {
        const data = await userService.getMyAssessment(courseId, week);
        setAssessmentData(data);
        const assessmentForChecked =
          data?.existingAssessment.assessments[0].answers;
        // console.log(data?.existingAssessment.assessments[0].answers);

        // Ensure that assessmentForChecked is valid before slicing
        if (assessmentForChecked && assessmentForChecked.length >= 5) {
          const valuesToCheck = assessmentForChecked;
          console.log(valuesToCheck);

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
        } else {
          console.error("Assessment answers are missing or incomplete.");
        }
      } catch (error) {
        setAssessmentError(error);
      } finally {
        setAssessmentLoading(false);
      }
    };

    fetchAndProcessAssessmentData();
  }, [courseId, week]);

  const percentage = assessmentData?.existingAssessment?.rating;
  // // console.log(updatedQuestionsQuiz);

  if (isLoading || assessmentLoading) {
    return <div>Loading...</div>;
  }

  if (isError || assessmentError) {
    return <div>Take Activity to see feedback.</div>;
  }

  const activities = [
    {
      question: "What do you understand by the word “Mindset”?",
      answer: data?.activity?.activities[1]?.answers[0]
    },
    {
      question:
        "Do you feel like you have a growth mindset, or do you sometimes find yourself with a fixed mindset? Share your thoughts. It’s okay to be honest, this is all about learning and growing together!",
      answer: data?.activity?.activities[3]?.answers[0]
    },
    {
      question: "List five (5) lessons you got from the videos you watched.",
      answer: data?.activity?.activities[5]?.answers.slice(0, 5)
    },
    {
      question:
        "List one (1) thing you will start working on, even on your growth journey.",
      answer: data?.activity?.activities[5]?.answers[5]
    }
  ];

  return (
    <div className="week-content">
      {activities.map((activity, index) => (
        <div style={{ border: "none" }} className="activity" key={index}>
          <p className="activity-badge">Activity {index + 1}</p>
          <p className="question d-flex align-items-center gap-2">
            <h4 style={{ color: "#275DAD", marginTop: ".3rem" }}>Question:</h4>
            <span>{activity.question}</span>
          </p>

          {/* Check if answer is an array and render as an ordered list */}
          {Array.isArray(activity.answer) ? (
            <ol className="answer-options" style={{ paddingLeft: "1.5rem" }}>
              <div className="d-flex  gap-2">
                <h4 style={{ color: "#555", marginTop: ".3rem" }}>Answer:</h4>{" "}
                <div>
                  {activity.answer.map((item, idx) => (
                    <li
                      key={idx}
                      style={{ marginBottom: ".5rem", fontSize: "14px" }}
                    >
                      {idx + 1}. {item}
                    </li>
                  ))}
                </div>
              </div>
            </ol>
          ) : (
            <div className="answer d-flex align-items-center gap-2">
              <h4 style={{ color: "#555", marginTop: ".3rem" }}>Answer:</h4>{" "}
              <p>{activity.answer}</p>
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
                {/* <Icon
                  style={{ color: "#275DAD" }}
                  width={20}
                  icon="lucide:edit"
                /> */}
              </div>
            </div>
          )}
        </div>
      ))}

      <p className="activity-badge">Assessment 3</p>
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
                <span style={{ fontSize: "14px" }} className="option-label">
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

export default Week3;
