import React, { useEffect, useState } from "react";
import "./Week1.css"; // Import the CSS file for styling
import PersonalityFeedback from "./PersonalityFeedback";
import checkedImage from "../../../../../assets/selfawareness-images/checked.png";
import unCheckedImage from "../../../../../assets/selfawareness-images/not-checked.png";
import { Icon } from "@iconify/react";
import FinalReport from "./FinalReport";
import userService from "../../../../../services/api/user";
import { useQuery } from "@tanstack/react-query";


let questions = [
  {
    question:
      "You're working on a group project, and it's time to divide the tasks. How do you approach this situation?",
    options: [
      {
        label:
          "A. You immediately take charge, assigning tasks to ensure everything is done efficiently.",
        color: "Red",
        checked: false
      },
      {
        label:
          "B. You suggest a detailed plan, making sure everyone understands their responsibilities and feels comfortable.",
        color: "Green",
        checked: false
      },
      {
        label:
          "C. You prefer to discuss everyone's strengths and weaknesses first, ensuring tasks are assigned according to individual abilities.",
        color: "Blue",
        checked: false
      },
      {
        label:
          "D. You focus on making the process enjoyable, suggesting creative ideas and encouraging a fun atmosphere.",
        color: "Yellow",
        checked: false
      }
    ]
  },
  {
    question:
      "You find yourself in a leadership position during a team meeting. What is your main focus?",
    options: [
      {
        label:
          "A. Ensuring that tasks are delegated effectively and deadlines are met.",
        color: "Red",
        checked: false
      },
      {
        label:
          "B. Making sure everyone feels included and their opinions are considered.",
        color: "Green",
        checked: false
      },
      {
        label:
          "C. Analyzing the team’s skills and assigning tasks accordingly to maximize productivity.",
        color: "Blue",
        checked: false
      },
      {
        label:
          "D. Encouraging a creative approach and fostering a positive team environment.",
        color: "Yellow",
        checked: false
      }
    ]
  },
  {
    question:
      "When faced with a new and challenging problem, what is your approach?",
    options: [
      {
        label:
          "A. You jump straight in and start tackling the problem with a clear plan.",
        color: "Red",
        checked: false
      },
      {
        label:
          "B. You gather information and consult with others before taking action.",
        color: "Green",
        checked: false
      },
      {
        label:
          "C. You take time to understand the problem thoroughly and consider different solutions.",
        color: "Blue",
        checked: false
      },
      {
        label:
          "D. You brainstorm with others to come up with innovative and unconventional solutions.",
        color: "Yellow",
        checked: false
      }
    ]
  },
  {
    question: "I like to:",
    options: [
      {
        label: "A. Act on a moment’s notice; do risky things.",
        color: "Red",
        checked: true
      },
      {
        label: "B. Provide answers or give thought to people’s questions.",
        color: "Green",
        checked: false
      },
      {
        label: "C. Help maintain a sense of harmony and togetherness.",
        color: "Blue",
        checked: false
      },
      {
        label: "D. Be responsible, dependable, and helpful to others.",
        color: "Yellow",
        checked: false
      }
    ]
  },
  {
    question: "One thing I am really good at is:",
    options: [
      {
        label: "A. Acting courageously.",
        color: "Red",
        checked: true
      },
      {
        label: "B. Thinking.",
        color: "Green",
        checked: false
      },
      {
        label: "C. Being sensitive.",
        color: "Blue",
        checked: false
      },
      {
        label: "D. Organizing.",
        color: "Yellow",
        checked: false
      }
    ]
  },
  {
    question: "Friends who know me best would say that I am:",
    options: [
      {
        label: "A. Competitive.",
        color: "Red",
        checked: true
      },
      {
        label: "B. Reserved, thoughtful.",
        color: "Green",
        checked: false
      },
      {
        label: "C. Emotional, friendly.",
        color: "Blue",
        checked: false
      },
      {
        label: "D. Neat, prepared.",
        color: "Yellow",
        checked: false
      }
    ]
  },
  {
    question: "My basic approach to life is:",
    options: [
      {
        label: "A. To take one day at a time and have fun.",
        color: "Red",
        checked: true
      },
      {
        label: "B. To figure out what life is all about.",
        color: "Green",
        checked: false
      },
      {
        label: "C. To help others and be happy and succeed.",
        color: "Blue",
        checked: false
      },
      {
        label: "D. To plan for the future and make it as good as possible.",
        color: "Yellow",
        checked: false
      }
    ]
  },
  {
    question: "When I am feeling discouraged or “down in the dumps”:",
    options: [
      {
        label: "A. I often become rude, mad, or sometimes even mean.",
        color: "Red",
        checked: true
      },
      {
        label:
          "B. I withdraw, don’t talk very much, and try to think my way out of the problem.",
        color: "Green",
        checked: false
      },
      {
        label:
          "C. I feel emotional, am sad, and usually like to talk it over with someone close to me.",
        color: "Blue",
        checked: false
      },
      {
        label: "D. I try to figure out what’s causing the problem and fix it.",
        color: "Yellow",
        checked: false
      }
    ]
  },
  {
    question: "I feel good about myself when:",
    options: [
      {
        label: "A. I can do things that are difficult.",
        color: "Red",
        checked: true
      },
      {
        label: "B. I can solve problems or figure things out.",
        color: "Green",
        checked: false
      },
      {
        label: "C. I can help other people.",
        color: "Blue",
        checked: false
      },
      {
        label: "D. I am appreciated or rewarded for things I do.",
        color: "Yellow",
        checked: false
      }
    ]
  },
  {
    question:
      "Teachers at school (who like me and in whose class I do pretty well) would probably describe me as:",
    options: [
      {
        label:
          "A. Charming, a natural leader, clever, someone who is fun to have around.",
        color: "Red",
        checked: false
      },
      {
        label:
          "B. Thoughtful, someone who has good answers, someone who likes to figure out problems.",
        color: "Green",
        checked: false
      },
      {
        label:
          "C. Nice, friendly, someone who gets along with other students and is helpful to the teacher and others.",
        color: "Blue",
        checked: false
      },
      {
        label:
          "D. Neat, organized, prepared, someone who does assignments and is a good student.",
        color: "Yellow",
        checked: false
      }
    ]
  },
  {
    question:
      "Teachers at school who saw me when I wasn’t on my best behavior might describe me as:",
    options: [
      {
        label: "A. Rowdy or a little wild.",
        color: "Red",
        checked: true
      },
      {
        label: "B. Arrogant.",
        color: "Green",
        checked: false
      },
      {
        label: "C. Talkative.",
        color: "Blue",
        checked: false
      },
      {
        label: "D. Someone who wants things my way; dominant; worrying.",
        color: "Yellow",
        checked: false
      }
    ]
  },
  {
    question: "When I am faced with a challenge:",
    options: [
      {
        label: "A. I dive in headfirst and take immediate action.",
        color: "Red",
        checked: true
      },
      {
        label: "B. I analyze the situation and come up with a strategy.",
        color: "Green",
        checked: false
      },
      {
        label:
          "C. I consider how it will impact the people involved and try to keep everyone calm.",
        color: "Blue",
        checked: false
      },
      {
        label: "D. I make a detailed plan and follow it step by step.",
        color: "Yellow",
        checked: false
      }
    ]
  }
];

let personalityFeedback = {
  chartData: {
    red: 25,
    green: 25,
    blue: 25,
    yellow: 25
  },
  colors: {
    red: {
      title: "Red",
      traits:
        "Energetic, action-oriented, competitive, spontaneous, and adventurous.",
      strengths:
        "Strong leadership qualities, enjoys taking risks, excels in fast-paced environments.",
      challenges:
        "May be impulsive, impatient, and can sometimes overlook details in favor of quick decisions.",
      challengesExp:
        "People who align more with the Red personality often thrive in dynamic situations where quick thinking and decisive action are needed. However, they may need to be mindful of their tendency to act before fully considering all consequences."
    },
    green: {
      title: "Green",
      traits: "Analytical, logical, strategic, and thoughtful.",
      strengths:
        "Problem-solving abilities, enjoys intellectual challenges, values precision and accuracy.",
      challenges:
        "May overthink or become indecisive, can be perceived as distant or overly critical.",
      challengesExp:
        "If you dominantly have a Green personality, you likely excel in situations that require careful thought and analysis. Your logical approach is a valuable asset, but balancing it with consideration for emotional and social factors is important."
    },
    blue: {
      title: "Blue",
      traits: "Compassionate, empathetic, harmonious, and cooperative.",
      strengths:
        "Excellent interpersonal skills, values relationships, excels in teamwork and communication.",
      challenges:
        "May struggle with setting boundaries, can be overly sensitive or avoid conflict.",
      challengesExp:
        "If your results aligned more with the Blue personality are often the glue that holds groups together, providing support and fostering harmony. However, it’s essential to establish boundaries to avoid becoming overwhelmed by others’ needs."
    },
    yellow: {
      title: "Yellow",
      traits: "Optimistic, spontaneous, sociable, and enthusiastic.",
      strengths:
        "Good at creating a positive atmosphere, enjoys networking, brings energy to group settings.",
      challenges:
        "May avoid serious tasks or become easily distracted, struggles with long-term focus.",
      challengesExp:
        "If your results aligned more with the Yellow personality, your strength lies in your ability to create order and maintain stability. You are the person others rely on for consistency and thoroughness, though it’s beneficial to remain open to new ideas and changes."
    }
  }
};

const questionsArrayRedFormatted = [
  {
    question:
      "You're working on a group project, and it's time to divide the tasks. How do you approach this situation?",
    options: [
      {
        label:
          "A. You immediately take charge, assigning tasks to ensure everything is done efficiently.",
        color: "Red",
        checked: false,
        isCorrect: true
      },
      {
        label:
          "B. You suggest a detailed plan, making sure everyone understands their responsibilities and feels comfortable.",
        color: "Green",
        checked: false,
        isCorrect: false
      },
      {
        label:
          "C. You prefer to discuss everyone's strengths and weaknesses first, ensuring tasks are assigned according to individual abilities.",
        color: "Blue",
        checked: false,
        isCorrect: false
      },
      {
        label:
          "D. You focus on making the process enjoyable, suggesting creative ideas and encouraging a fun atmosphere.",
        color: "Yellow",
        checked: false,
        isCorrect: false
      }
    ]
  },
  {
    question: "How do you approach situations that involve risk?",
    options: [
      {
        label: "A. I embrace risks, seeing them as opportunities.",
        color: "Red",
        checked: false,
        isCorrect: true
      },
      {
        label: "B. I weigh the pros and cons but am open to taking risks.",
        color: "Green",
        checked: false,
        isCorrect: false
      },
      {
        label: "C. I prefer to minimize risks and proceed with caution.",
        color: "Blue",
        checked: false,
        isCorrect: false
      },
      {
        label: "D. I avoid risks whenever possible.",
        color: "Yellow",
        checked: false,
        isCorrect: false
      }
    ]
  },
  {
    question: "In a competitive situation, how do you typically feel?",
    options: [
      {
        label: "A. I like competition and aim to win.",
        color: "Red",
        checked: false,
        isCorrect: true
      },
      {
        label: "B. I enjoy competition but also focus on fair play.",
        color: "Green",
        checked: false,
        isCorrect: false
      },
      {
        label: "C. I participate, but winning isn’t my main goal.",
        color: "Blue",
        checked: false,
        isCorrect: false
      },
      {
        label: "D. I avoid competition and prefer cooperative situations.",
        color: "Yellow",
        checked: false,
        isCorrect: false
      }
    ]
  },
  {
    question:
      "When faced with a challenging task, what is your initial response?",
    options: [
      {
        label: "A. I dive in immediately and start tackling it head-on.",
        color: "Red",
        checked: false,
        isCorrect: true
      },
      {
        label: "B. I quickly assess the situation and then take action.",
        color: "Green",
        checked: false,
        isCorrect: false
      },
      {
        label:
          "C. I take time to analyze before deciding on a course of action.",
        color: "Blue",
        checked: false,
        isCorrect: false
      },
      {
        label: "D. I feel hesitant and may delay starting.",
        color: "Yellow",
        checked: false,
        isCorrect: false
      }
    ]
  },
  {
    question:
      "When planning activities with friends, what is your typical approach?",
    options: [
      {
        label:
          "A. I suggest adventurous or spontaneous ideas to keep things exciting.",
        color: "Red",
        checked: false,
        isCorrect: true
      },
      {
        label:
          "B. I propose activities that are fun but also consider everyone's preferences.",
        color: "Green",
        checked: false,
        isCorrect: false
      },
      {
        label: "C. I prefer to go along with others’ suggestions.",
        color: "Blue",
        checked: false,
        isCorrect: false
      },
      {
        label: "D. I stick to well-planned and familiar activities.",
        color: "Yellow",
        checked: false,
        isCorrect: false
      }
    ]
  }
  // Add more questions if needed
];

const questionsArrayBlueFormatted = [
  {
    question:
      "When working on a group project, how do you typically contribute?",
    options: [
      {
        label: "A. I focus on ensuring everyone feels included and valued.",
        color: "Blue",
        checked: false,
        isCorrect: true
      },
      {
        label: "B. I bring up new ideas and focus on just the planning aspect.",
        color: "Green",
        checked: false,
        isCorrect: false
      },
      {
        label: "C. I take charge and make decisions for the group.",
        color: "Red",
        checked: false,
        isCorrect: false
      },
      {
        label:
          "D. I prefer to focus on the technical aspects and problem-solving.",
        color: "Yellow",
        checked: false,
        isCorrect: false
      }
    ]
  },
  {
    question:
      "How do you approach situations where someone is feeling upset or emotional?",
    options: [
      {
        label: "A. I focus on ensuring everyone feels included and valued.",
        color: "Blue",
        checked: false,
        isCorrect: true
      },
      {
        label: "B. I suggest practical solutions to help them feel better.",
        color: "Green",
        checked: false,
        isCorrect: false
      },
      {
        label: "C. I give them space to process their emotions alone.",
        color: "Red",
        checked: false,
        isCorrect: false
      },
      {
        label: "D. I focus on getting them to move past it and carry on.",
        color: "Yellow",
        checked: false,
        isCorrect: false
      }
    ]
  },
  {
    question: "In a conflict, what is your usual response?",
    options: [
      {
        label:
          "A. I try to mediate and find a solution that keeps everyone happy.",
        color: "Blue",
        checked: false,
        isCorrect: true
      },
      {
        label:
          "B. I discuss the issues openly and try to resolve them logically.",
        color: "Green",
        checked: false,
        isCorrect: false
      },
      {
        label: "C. I assert my position and work to get my point across.",
        color: "Red",
        checked: false,
        isCorrect: false
      },
      {
        label: "D. I avoid the conflict and hope it resolves itself.",
        color: "Yellow",
        checked: false,
        isCorrect: false
      }
    ]
  },
  {
    question: "When making decisions, what do you consider most?",
    options: [
      {
        label: "A. How it will affect the people involved and their feelings.",
        color: "Blue",
        checked: false,
        isCorrect: true
      },
      {
        label: "B. The logical outcomes and possible consequences.",
        color: "Green",
        checked: false,
        isCorrect: false
      },
      {
        label: "C. How quickly I can implement the decision.",
        color: "Red",
        checked: false,
        isCorrect: false
      },
      {
        label: "D. The rules and guidelines that should be followed.",
        color: "Yellow",
        checked: false,
        isCorrect: false
      }
    ]
  },
  {
    question: "How do you typically show you care about someone?",
    options: [
      {
        label: "A. I spend quality time with them and offer emotional support.",
        color: "Blue",
        checked: false,
        isCorrect: true
      },
      {
        label: "B. I give them thoughtful advice or help them solve problems.",
        color: "Green",
        checked: false,
        isCorrect: false
      },
      {
        label: "C. I involve them in fun and exciting activities.",
        color: "Red",
        checked: false,
        isCorrect: false
      },
      {
        label: "D. I do things for them or help with their responsibilities.",
        color: "Yellow",
        checked: false,
        isCorrect: false
      }
    ]
  }
  // Add more questions if needed
];

const questionsArrayYellowFormatted = [
  {
    question: "When working on a group project, how do you usually contribute?",
    options: [
      {
        label:
          "A. Ensure everything is organized and everyone knows their tasks.",
        color: "Yellow",
        checked: false,
        isCorrect: true
      },
      {
        label: "B. Lead the group and make quick decisions.",
        color: "Red",
        checked: false,
        isCorrect: false
      },
      {
        label: "C. Provide emotional support and encourage everyone.",
        color: "Blue",
        checked: false,
        isCorrect: false
      },
      {
        label: "D. Offer innovative ideas and solutions.",
        color: "Green",
        checked: false,
        isCorrect: false
      }
    ]
  },
  {
    question: "How do you handle unexpected changes or challenges?",
    options: [
      {
        label: "A. Make a detailed plan to address the changes.",
        color: "Yellow",
        checked: false,
        isCorrect: true
      },
      {
        label: "B. Adapt quickly and go with the flow.",
        color: "Red",
        checked: false,
        isCorrect: false
      },
      {
        label: "C. Seek support from others and talk through the issues.",
        color: "Blue",
        checked: false,
        isCorrect: false
      },
      {
        label:
          "D. Avoid the challenge if possible and focus on something else.",
        color: "Green",
        checked: false,
        isCorrect: false
      }
    ]
  },
  {
    question: "In a social setting, how do you usually behave?",
    options: [
      {
        label: "A. Keep everything organized and ensure everyone is on track.",
        color: "Yellow",
        checked: false,
        isCorrect: true
      },
      {
        label: "B. Engage in conversations and make new connections.",
        color: "Red",
        checked: false,
        isCorrect: false
      },
      {
        label: "C. Take charge and organize the event or activity.",
        color: "Blue",
        checked: false,
        isCorrect: false
      },
      {
        label: "D. Support and help others feel included and valued.",
        color: "Green",
        checked: false,
        isCorrect: false
      }
    ]
  },
  {
    question: "When making decisions, what is your primary focus?",
    options: [
      {
        label:
          "A. Making sure the decision aligns with long-term goals and values.",
        color: "Yellow",
        checked: false,
        isCorrect: true
      },
      {
        label: "B. Quickly resolving the issue to move on to other tasks.",
        color: "Red",
        checked: false,
        isCorrect: false
      },
      {
        label: "C. Considering how the decision will affect everyone involved.",
        color: "Blue",
        checked: false,
        isCorrect: false
      },
      {
        label: "D. Following a detailed plan and ensuring accuracy.",
        color: "Green",
        checked: false,
        isCorrect: false
      }
    ]
  },
  {
    question: "How do you feel about setting and achieving goals?",
    options: [
      {
        label:
          "A. Setting clear goals and making sure they are achieved is very important.",
        color: "Yellow",
        checked: false,
        isCorrect: true
      },
      {
        label:
          "B. Achieving goals is less important than having fun and enjoying the process.",
        color: "Red",
        checked: false,
        isCorrect: false
      },
      {
        label: "C. There is no need to set goals.",
        color: "Blue",
        checked: false,
        isCorrect: false
      },
      {
        label:
          "D. Prefer to set goals but not worry too much about following through.",
        color: "Green",
        checked: false,
        isCorrect: false
      }
    ]
  }
  // Add more questions if needed
];

const questionsArrayGreenFormatted = [
  {
    question: "When faced with a problem, how do you typically approach it?",
    options: [
      {
        label: "A. Analyze the situation thoroughly before acting.",
        color: "Green",
        checked: false,
        isCorrect: true
      },
      {
        label: "B. Act based on my first thought.",
        color: "Red",
        checked: false,
        isCorrect: false
      },
      {
        label: "C. Seek advice from others before making a decision.",
        color: "Blue",
        checked: false,
        isCorrect: false
      },
      {
        label: "D. Ignore the problem and hope it resolves itself.",
        color: "Yellow",
        checked: false,
        isCorrect: false
      }
    ]
  },
  {
    question: "How do you prefer to spend your free time?",
    options: [
      {
        label:
          "A. Engaging in intellectual activities, like reading or puzzles.",
        color: "Green",
        checked: false,
        isCorrect: true
      },
      {
        label: "B. Socializing with friends and family.",
        color: "Red",
        checked: false,
        isCorrect: false
      },
      {
        label: "C. Participating in adventurous or spontaneous activities.",
        color: "Blue",
        checked: false,
        isCorrect: false
      },
      {
        label: "D. Watching movies.",
        color: "Yellow",
        checked: false,
        isCorrect: false
      }
    ]
  },
  {
    question: "When working on a group project, how do you contribute?",
    options: [
      {
        label: "A. Provide logical analysis and critical thinking.",
        color: "Green",
        checked: false,
        isCorrect: true
      },
      {
        label: "B. Offer emotional support and encourage teamwork.",
        color: "Red",
        checked: false,
        isCorrect: false
      },
      {
        label: "C. Take the lead and make quick decisions.",
        color: "Blue",
        checked: false,
        isCorrect: false
      },
      {
        label: "D. Just do my allocated part.",
        color: "Yellow",
        checked: false,
        isCorrect: false
      }
    ]
  },
  {
    question:
      "In a situation where you need to make a decision, what is your priority?",
    options: [
      {
        label: "A. Gathering and evaluating all the relevant information.",
        color: "Green",
        checked: false,
        isCorrect: true
      },
      {
        label: "B. Considering how the decision will impact others.",
        color: "Red",
        checked: false,
        isCorrect: false
      },
      {
        label: "C. Making a decision quickly to keep things moving.",
        color: "Blue",
        checked: false,
        isCorrect: false
      },
      {
        label: "D. I focus on my feelings.",
        color: "Yellow",
        checked: false,
        isCorrect: false
      }
    ]
  },
  {
    question: "When you encounter a new concept or idea, how do you react?",
    options: [
      {
        label: "A. Research and seek to understand it deeply.",
        color: "Green",
        checked: false,
        isCorrect: true
      },
      {
        label: "B. Embrace it enthusiastically and share it with others.",
        color: "Red",
        checked: false,
        isCorrect: false
      },
      {
        label:
          "C. I immediately reject it if it does not align with my values.",
        color: "Blue",
        checked: false,
        isCorrect: false
      },
      {
        label: "D. Implement it immediately.",
        color: "Yellow",
        checked: false,
        isCorrect: false
      }
    ]
  }
  // Add more questions if needed
];

const questionsQuiz = [
  {
    question: "When I make decisions:",
    options: [
      {
        label: "A. I do it quickly and go with the first impressions.",
        color: "Red",
        checked: false, // This is not the correct option
        isCorrect: false
      },
      {
        label: "B. I think about it, consider the options, and then decide.",
        color: "Green",
        checked: true, // This is the correct option
        isCorrect: true
      },
      {
        label:
          "C. I listen to my feelings and consider how my decisions will affect others.",
        color: "Blue",
        checked: false, // This is not the correct option
        isCorrect: false
      },
      {
        label:
          "D. I take it seriously and always try to make the right decision.",
        color: "Yellow",
        checked: false, // This is not the correct option
        isCorrect: false
      }
    ]
  }
];

const Week1 = () => {
  const week = 1;
  const courseId = "66853bf50118e2e0a02b6a5a";
  const { data, isLoading, isError } = useQuery({
    queryKey: ["dashboard/feedback/self-awareness", courseId, week],
    queryFn: () => userService.getMyActivites(courseId, week)
  });

  const [assessmentData, setAssessmentData] = useState(null);
  const [assessmentLoading, setAssessmentLoading] = useState(true);
  const [assessmentError, setAssessmentError] = useState(null);
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [ewQuestions, setNewQuizQuestions] = useState([]);

  useEffect(() => {
    const fetchAssessmentData = async () => {
      setAssessmentLoading(true);
      try {
        const data = await userService.getMyAssessment(courseId, week);
        setAssessmentData(data);
      } catch (error) {
        setAssessmentError(error);
      } finally {
        setAssessmentLoading(false);
      }
    };

    fetchAssessmentData();
  }, [courseId, week]);

  const assessments = assessmentData?.existingAssessment.assessments;
  const percent = assessmentData?.existingAssessment.rating;
  const color = assessmentData?.existingAssessment?.personalityColor;
  // console.log(percent)
  function getQuestionsByColor(color) {
    switch (color) {
      case "Red":
        return questionsArrayRedFormatted;
      case "Blue":
        return questionsArrayBlueFormatted;
      case "Yellow":
        return questionsArrayYellowFormatted;
      case "Green":
        return questionsArrayGreenFormatted;
      default:
        return [];
    }
  }

  function updateCheckedOptions(quizQuestions, assessments) {
    // Updated the parameter name
    return quizQuestions.map((question, questionIndex) => {
      const updatedQuestion = { ...question };

      updatedQuestion.options = updatedQuestion.options.map(
        (option, optionIndex) => {
          // Check if the current option index matches the answer index in assessments
          const isChecked = optionIndex === assessments[questionIndex]?.answer;
          return { ...option, checked: isChecked };
        }
      );

      return updatedQuestion;
    });
  }

  useEffect(() => {
    if (color) {
      const questionsToShow = getQuestionsByColor(color);
      const updatedQuestions = updateCheckedOptions(
        questionsToShow,
        assessments
      );
      setQuizQuestions(updatedQuestions); // Updated to setQuizQuestions
    }
  }, [color, assessments]);

  if (isLoading || assessmentLoading) {
    return <div>Loading...</div>;
  }

  if (isError || assessmentError) {
    return <div>Error loading data.</div>;
  }

  const buckets = data?.activity?.activities[5].buckets;

  const mappedContent = {
    yes: buckets?.yes?.map((item) => item.content),
    no: buckets?.no?.map((item) => item.content),
    sometimes: buckets?.sometimes.map((item) => item.content)
  };

  const backendAnswers = data?.activity?.activities[9].questionChecked;
  // console.log(backendAnswers)
  const selectedAnswers = Object.values(backendAnswers).map(
    (item) => item.text
  );
  // console.log(selectedAnswers)

  console.log(questions);

  const indexCount = Object.values(backendAnswers).reduce((count, item) => {
    count[item.index] = (count[item.index] || 0) + 1;
    return count;
  }, {});

const totalCount = Object.values(indexCount).reduce(
  (total, count) => total + count,
  0
);

const indexToChartData = {
  0: { name: "Red", color: "#FF0500" },
  1: { name: "Green", color: "#2CCF4F" },
  2: { name: "Blue", color: "#0093FF" },
  3: { name: "Yellow", color: "#FEF900" }
};

// Create pieChart data array
const pieChart = Object.keys(indexCount).map((index) => {
  const { name, color } = indexToChartData[index];
  const count = indexCount[index] || 0;
  const value = (count / totalCount) * 100; 

  return { name, value, color };
});

  const activities = [
    {
      activity: 1,
      question: 'What do you think "Self Awareness" is?',
      answer: data?.activity?.activities?.[1].answers[0],
      feedback: "Figma ipsum component variant main layer..."
    },
    {
      activity: 2,
      question:
        "Drag-and-drop the statements on the left into any of these bowls.",
      answer: mappedContent,
      feedback:
        "Figma ipsum component variant main layer. Font duplicate component effect vertical fill list team content editor..."
    }
  ];

  questions = questions.map((question) => {
    // Keeping the original 'questions' name here
    return {
      ...question,
      options: question.options.map((option) => {
        return {
          ...option,
          checked: selectedAnswers.includes(option.label) // Check if the selected answer matches the option label
        };
      })
    };
  });

  return (
    <div className="week-content">
      {activities?.map((activity, index) => (
        <div style={{ border: "none" }} className="activity" key={index}>
          <p className="activity-badge">Activity {activity?.activity}</p>
          <p className="question d-flex align-items-center gap-2">
            <h4 style={{ color: "#275DAD", marginTop: ".3rem" }}>Question:</h4>
            <span> {activity?.question}</span>
          </p>

          {activity?.answer.yes ? (
            <div
              style={{ width: "90%", margin: "1rem auto" }}
              className="drag-drop-activity"
            >
              <div className="drag-drop-section">
                <h5 id="yes">YES</h5>
                <ul>
                  {activity?.answer.yes.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
              <div className="drag-drop-section">
                <h5 id="no">NO</h5>
                <ul>
                  {activity?.answer.no.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
              <div className="drag-drop-section">
                <h5 id="sometimes">SOMETIMES</h5>
                <ul>
                  {activity?.answer.sometimes.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            <p className="d-flex align-items-center justify-content-between">
              <div className="answer d-flex align-items-center gap-2">
                <h4 style={{ color: "#555", marginTop: ".3rem" }}>Answer:</h4>{" "}
                <p style={{ fontSize: "14px" }}>{activity?.answer}</p>
              </div>
              <Icon
                style={{ color: "#D6D6D6" }}
                width={20}
                icon="hugeicons:comment-01"
              />
            </p>
          )}

          <p className="feedback">
            <div id="badge">Feedback:</div>
            <div
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                gap: "1rem"
              }}
            >
              <div className="feedback-card">{activity?.feedback}</div>
              <Icon
                style={{ color: "#275DAD" }}
                width={20}
                icon="lucide:edit"
              />
            </div>
          </p>
        </div>
      ))}
      <p className="activity-badge">Activity 3</p>
      {questions.map((q, index) => (
        <div className="question-block" key={index}>
          <p className="question d-flex align-items-center gap-2">
            <h4 style={{ color: "#275DAD", marginTop: ".3rem" }}>Question:</h4>
            <span> {q.question}</span>
          </p>
          <div className="options">
            {q.options.map((option, idx) => (
              <div className="option" key={idx}>
                <img
                  src={option.checked ? checkedImage : unCheckedImage}
                  alt={option.checked ? "Checked" : "Unchecked"}
                  style={{ width: "20px", marginRight: "10px" }}
                />
                <span style={{ fontSize: "14px" }} className="option-label">
                  {option.label}
                </span>
                <span className={`color-label ${option.color.toLowerCase()}`}>
                  {option.color}
                </span>
              </div>
            ))}
          </div>
        </div>
      ))}
      <PersonalityFeedback
        feedback={personalityFeedback}
        chartData={pieChart}
      />
      <p className="activity-badge">Activity 4</p>
      {quizQuestions.map((q, index) => (
        <div className="question-block" key={index}>
          <div className="question d-flex align-items-center gap-2">
            <h4 style={{ color: "#275DAD", marginTop: ".3rem" }}>Question:</h4>
            <span>{q.question}</span>
          </div>
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
      <FinalReport rate={percent} />{" "}
    </div>
  );
};

export default Week1;
