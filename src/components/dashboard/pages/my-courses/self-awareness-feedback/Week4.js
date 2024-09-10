import React, { useEffect, useState } from "react";
import Activity from "./Activity";
import "./Week1.css"; // Import the CSS file for styling
import "./Week4.css";
import PersonalityFeedback from "./PersonalityFeedback";
import checkedImage from "../../../../../assets/selfawareness-images/checked.png";
import unCheckedImage from "../../../../../assets/selfawareness-images/not-checked.png";
import { Icon } from "@iconify/react";
import FinalReport from "./FinalReport";
import { useQuery } from "@tanstack/react-query";
import userService from "../../../../../services/api/user";
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
        label: "A. Kindness - Sarah offers to help David with the books.",
        color: "Red",
        checked: false,
        isCorrect: true // Correct option
      },
      {
        label:
          "A. Kindness - As they walk, Sarah asks David if everything is alright but doesn’t pry if he doesn’t want to talk.",
        color: "Green",
        checked: false,
        isCorrect: false
      },
      {
        label:
          "A. Kindness - Sarah remembers she has her own after-school activity but suggests they put David’s books in his locker first so he isn’t late to his next class.",
        color: "Blue",
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
          "B. Respect - Sarah remembers she has her own after-school activity but suggests they put David’s books in his locker first so he isn’t late to his next class.",
        color: "Green",
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
        label: "C. Responsibility - Sarah offers to help David with the books.",
        color: "Yellow",
        checked: false,
        isCorrect: false
      },
      {
        label:
          "C. Responsibility - As they walk, Sarah asks David if everything is alright but doesn’t pry if he doesn’t want to talk.",
        color: "Red",
        checked: false,
        isCorrect: false
      }
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
          "A. Loyalty - Despite having a busy schedule, Alex prioritizes helping Ben, honoring their friendship.",
        color: "Green",
        checked: false,
        isCorrect: true // Correct option
      },
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
          "B. Punctuality - Both Alex and Ben arrive at Alex’s house on time, ensuring they have maximum time to work on the project.",
        color: "Red",
        checked: false,
        isCorrect: true // Correct option
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
          "B. Punctuality - Alex offers to let Ben use his advanced science equipment at home, knowing it will significantly improve their project.",
        color: "Blue",
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
      {
        label:
          "C. Generosity - Both Alex and Ben arrive at Alex’s house on time, ensuring they have maximum time to work on the project.",
        color: "Green",
        checked: false,
        isCorrect: false
      }
    ]
  }
];

const leftItemsArray = [
  ["A. Kindness", "B. Respect", "C. Responsibility"],
  ["A. Honesty", "B. Empathy", "C. Patience"]
];

const rightItemsArray = [
  [
    "Sarah remembers she has her own after-school activity but suggests they put David's books in his locker first so he isn’t late to his next class.",
    "As they walk, Sarah asks David if everything is alright but doesn’t pry if he doesn’t want to talk.",
    "Sarah offers to help David with the books."
  ],
  [
    "Tom tells the truth about accidentally breaking the vase.",
    "Jane listens to her friend's problems without interrupting.",
    "Emily waits patiently for her turn to speak during a group discussion."
  ]
];

const Week4 = () => {
  const week = 4;
  const courseId = "66853bf50118e2e0a02b6a5a";
  const { data, isLoading, isError } = useQuery({
    queryKey: ["dashboard/feedback/self-awareness", courseId, week],
    queryFn: () => userService.getMyActivites(courseId, week)
  });

  // console.log(data?.activity?.activities[5].answers[0]);

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
        const matchCount1 = data?.existingAssessment.assessments[0].matchesSet1;
        const matchCount2 = data?.existingAssessment.assessments[0].matchesSet2;
        // toast.success(matchCount1)
        console.log(data?.existingAssessment.assessments[0].matchesSet1);
        console.log(matchCount2);
        const combinedArray1 = matchCount1.map((match) => {
          const leftValue = leftItemsArray[0][match.left];
          const rightValue = rightItemsArray[0][match.right];
          return `${leftValue} - ${rightValue}`;
        });
        const combinedArray2 = matchCount1.map((match) => {
          const leftValue = leftItemsArray[0][match.left];
          const rightValue = rightItemsArray[0][match.right];
          return `${leftValue} - ${rightValue}`;
        });

        console.log(combinedArray1);

        if (assessmentForChecked && assessmentForChecked.length >= 5) {
          const valuesToCheck = assessmentForChecked;
          console.log(valuesToCheck);

          questionsQuiz = questionsQuiz.map((question, index) => {
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
                    question.options.forEach((option) => {
                      const optionText = option.label.trim().toLowerCase();
                      const selectedAnswerText = selectedAnswer
                        .trim()
                        .toLowerCase();

                      if (optionText.includes(selectedAnswerText)) {
                        if (option.isCorrect) {
                          console.log(`${selectedAnswer} is Correct`);
                        } else {
                          console.log(`${selectedAnswer} is Incorrect`);
                        }
                      }
                    });
                  });
                }

                // Check if it's the 10th question and update based on combinedArray2
                if (index === 9) {
                  combinedArray2.forEach((selectedAnswer) => {
                    question.options.forEach((option) => {
                      const optionText = option.label.trim().toLowerCase();
                      const selectedAnswerText = selectedAnswer
                        .trim()
                        .toLowerCase();

                      if (optionText.includes(selectedAnswerText)) {
                        if (option.isCorrect) {
                          console.log(`${selectedAnswer} is Correct`);
                        } else {
                          console.log(`${selectedAnswer} is Incorrect`);
                        }
                      }
                    });
                  });

                  // Update isChecked based on matchCount2 for the 10th question
                  matchCount2.forEach((match) => {
                    if (match.left === 10 || match.right === 10) {
                      if (
                        optionIndex === match.left ||
                        optionIndex === match.right
                      ) {
                        isChecked = true;
                      }
                    }
                  });
                }

                return {
                  ...option,
                  checked: isChecked
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
      question: "What exactly are “Values”??",
      answer: data?.activity?.activities[1].answers[0]
    },
    {
      question:
        "Flip each card to know more about the values. Select the box on each card to pick the values you feel are a big part of who you are.",
      answer: data?.activity?.activities[3].answers
    },
    {
      question:
        "Identify three (3) important people in your live and list their names below.",
      answer: data?.activity?.activities[5].answers[0]
    },
    {
      question: "Write out what these people think about you.",
      answer: data?.activity?.activities[5].answers[1]
    },
    {
      question:
        "Are you happy with what these people think about you? If no, what would you like to change? If yes, type “YES” in the box.",
      answer: data?.activity?.activities[5].answers[2]
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
              <div className="d-flex  gap-2">
                <h4 style={{ color: "#555", marginTop: ".3rem" }}>Answer:</h4>{" "}
                <p>{activity.answer}</p>
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
                <Icon
                  style={{ color: "#275DAD" }}
                  width={20}
                  icon="lucide:edit"
                />
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

export default Week4;
