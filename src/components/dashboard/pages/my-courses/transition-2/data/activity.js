export const courseContent = {
  week1: {
    title: "Introduction to Resilience and Grit",
    pages: [
      {
        id: 1,
        type: "video",
        videoSrc:
          "https://d3sc34m1n26ele.cloudfront.net/emotional_regulation_videos/Week+1/Week+1_1.mp4",
        hasNextButton: true,
      },
      {
        id: 2,
        type: "question",
        questionType: "text",
        question: "What's next for you after year 12?",
        hasImage: false,
        imageSrc: "mindset.png",
        inputType: "bigTextBox",
        navigation: {
          prev: true,
          next: true,
        },
      },
      {
        id: 3,
        type: "video",
        videoSrc:
          "https://d3sc34m1n26ele.cloudfront.net/emotional_regulation_videos/Week+1/Week+1_2.mp4",
        navigation: {
          prev: true,
          next: true,
        },
      },
      {
        id: 4,
        type: "multiStep",
        steps: [
          {
            stepId: 1,
            type: "checkbox",
            question: "Why do you want to go to the University/College?",
            options: [
              "Because it's expected of me",
              "To build a future career",
              "To discover who I am",
              "To gain independence",
              "Others",
            ],
          },
          {
            stepId: 2,
            type: "question",
            questionType: "text",
            question: "Type the other things here.",
            inputType: "bigTextBox",
            conditionalOn: {
              stepId: 1,
              optionText: "Others",
              mustBeSelected: true,
            },
          },
        ],
        navigation: {
          prev: true,
          next: true,
        },
      },
      {
        id: 5,
        type: "video",
        videoSrc:
          "https://d3sc34m1n26ele.cloudfront.net/emotional_regulation_videos/Week+1/Week+1_3.mp4",
        navigation: {
          prev: true,
          next: true,
        },
      },
      {
        id: 6,
        type: "multiStep",
        steps: [
          {
            stepId: 1,
            type: "checkbox",
            question: "Choose 3–4 that best describe your future self.",
            options: [
              "Confident",
              "Independent",
              "Discplined",
              "Social",
              "Curious",
              "Resilent",
              "Creative",
              "Leader",
            ],
          },
          {
            stepId: 2,
            type: "question",
            questionType: "text",
            question:
              "Now, in a structured sentence, I want you to write your reason for your next step after secondary school. Why are you making that particular decision? ",
            inputType: "bigTextBox",
            conditionalOn: {
              stepId: 1,
              optionText: "Others",
              mustBeSelected: true,
            },
          },
        ],
        navigation: {
          prev: true,
          next: true,
        },
      },
      {
        id: 7,
        type: "video",
        videoSrc:
          "https://d3sc34m1n26ele.cloudfront.net/emotional_regulation_videos/Week+1/Week+1_4.mp4",
        navigation: {
          prev: true,
          next: true,
        },
      },
      {
        id: 8,
        type: "multiStep",
        steps: [
          {
            stepId: 1,
            type: "scenario",
            scenarioText:
              "You got admission into university to study a particular course ,maybe Computer Science, History, or Medicine. You knew it would be challenging, but the first required course turns out to be dull and painfully technical. You dread every lecture, struggle to stay focused, and your grades start to drop. You realise a big part of your first two years will be filled with similar courses.",
          },
          {
            stepId: 2,
            type: "question",
            questionType: "text",
            question:
              "Does your why give you enough motivation to push through these tough and boring classes so you can graduate with a good result?",
            inputType: "bigTextBox",
            conditionalOn: {
              stepId: 1,
              optionText: "Others",
              mustBeSelected: true,
            },
          },
        ],
        navigation: {
          prev: true,
          next: true,
        },
      },
      {
        id: 9,
        type: "video",
        videoSrc:
          "https://d3sc34m1n26ele.cloudfront.net/emotional_regulation_videos/Week+1/Week+1_5.mp4",
        navigation: {
          prev: true,
          next: true,
        },
      },
      {
        id: 10,
        type: "multiStep",
        steps: [
          {
            stepId: 1,
            type: "scenario",
            scenarioText:
              "A few months into your first semester, you receive a once-in-a-lifetime offer ,a fully paid, year-long volunteer or travel opportunity abroad. But it means taking a full year off school. Your friends and family encourage you to go, saying, “School will always be there.”",
          },
          {
            stepId: 2,
            type: "question",
            questionType: "text",
            question:
              "Is your why for going to university strong enough to keep you focused on your long-term goal, or would this exciting opportunity pull you away?",
            inputType: "bigTextBox",
            conditionalOn: {
              stepId: 1,
              optionText: "Others",
              mustBeSelected: true,
            },
          },
        ],
        navigation: {
          prev: true,
          next: true,
        },
      },
      {
        id: 11,
        type: "video",
        videoSrc:
          "https://d3sc34m1n26ele.cloudfront.net/emotional_regulation_videos/Week+1/Week+1_6.mp4",
        navigation: {
          prev: true,
          next: true,
        },
      },
      {
        id: 12,
        type: "multiStep",
        steps: [
          {
            stepId: 1,
            type: "scenario",
            scenarioText:
              "You meet a well-respected lecturer who reviews your work and bluntly tells you that you don’t have what it takes to succeed in your chosen field. They even suggest switching majors or leaving the program.",
          },
          {
            stepId: 2,
            type: "question",
            questionType: "text",
            question:
              "Is your why strong enough to help you rise above criticism and prove your abilities, or does this discouragement make you question your entire purpose?",
            inputType: "bigTextBox",
            conditionalOn: {
              stepId: 1,
              optionText: "Others",
              mustBeSelected: true,
            },
          },
        ],
        navigation: {
          prev: true,
          next: true,
        },
      },
      {
        id: 13,
        type: "video",
        videoSrc:
          "https://d3sc34m1n26ele.cloudfront.net/emotional_regulation_videos/Week+1/Week+1_7.mp4",
        navigation: {
          prev: true,
          next: true,
        },
      },
      {
        id: 14,
        type: "multiStep",
        steps: [
          {
            stepId: 1,
            type: "scenario",
            scenarioText:
              "Your best friend gets admitted into a different school, and they try to convince you to transfer or move closer. They say your choice of university is hurting your friendship.",
          },
          {
            stepId: 2,
            type: "question",
            questionType: "text",
            question:
              "Does your why for attending this university and pursuing your goals matter more than the short-term comfort of staying close to your friend?",
            inputType: "bigTextBox",
            conditionalOn: {
              stepId: 1,
              optionText: "Others",
              mustBeSelected: true,
            },
          },
        ],
        navigation: {
          prev: true,
          next: true,
        },
      },
      {
        id: 15,
        type: "video",
        videoSrc:
          "https://d3sc34m1n26ele.cloudfront.net/emotional_regulation_videos/Week+1/Week+1_8.mp4",
        navigation: {
          prev: true,
          next: true,
        },
      },
    ],
  },
  week2: {
    title: "Developing Resilience",
    pages: [
      {
        id: 1,
        type: "video",
        videoSrc:
          "https://d3sc34m1n26ele.cloudfront.net/emotional_regulation_videos/Week+2/Week+2_1.mp4",
        hasNextButton: true,
      },
      {
        id: 2,
        type: "question",
        questionType: "text",
        question: "What’s your definition of Mindset and Values?",
        hasImage: false,
        imageSrc: "mindset.png",
        inputType: "bigTextBox",
        navigation: {
          prev: true,
          next: true,
        },
      },
      {
        id: 3,
        type: "video",
        videoSrc:
          "https://d3sc34m1n26ele.cloudfront.net/emotional_regulation_videos/Week+2/Week+2_2.mp4",
        navigation: {
          prev: true,
          next: true,
        },
      },
      {
        id: 4,
        type: "question",
        questionType: "text",
        question:
          "Imagine you just failed your first university quiz. What’s your honest first reaction? What’s the first thought that comes to your mind?",
        hasImage: false,
        imageSrc: "mindset.png",
        inputType: "bigTextBox",
        navigation: {
          prev: true,
          next: true,
        },
      },
      {
        id: 5,
        type: "video",
        videoSrc:
          "https://d3sc34m1n26ele.cloudfront.net/emotional_regulation_videos/Week+2/Week+2_3.mp4",
        navigation: {
          prev: true,
          next: true,
        },
      },
      {
        id: 6,
        type: "listQuestion",
        question: "List 3 values you think are important.",
        inputCount: 3,
        inputType: "text",
        inputPlaceholder: "Type your answer here",
        navigation: {
          prev: true,
          next: true,
        },
      },
      {
        id: 7,
        type: "video",
        videoSrc:
          "https://d3sc34m1n26ele.cloudfront.net/emotional_regulation_videos/Week+2/Week+2_4.mp4",
        navigation: {
          prev: true,
          next: true,
        },
      },
      {
        id: 8,
        type: "question",
        questionType: "text",
        question: "What's next for you after year 12?",
        hasImage: false,
        imageSrc: "mindset.png",
        inputType: "bigTextBox",
        navigation: {
          prev: true,
          next: true,
        },
      },
      {
        id: 9,
        type: "video",
        videoSrc:
          "https://d3sc34m1n26ele.cloudfront.net/emotional_regulation_videos/Week+2/Week+2_4.mp4",
        navigation: {
          prev: true,
          next: true,
        },
      },
      {
        id: 10,
        type: "question",
        questionType: "text",
        question:
          "How would your value of responsibility influence your decision?",
        hasImage: false,
        imageSrc: "mindset.png",
        inputType: "bigTextBox",
        navigation: {
          prev: true,
          next: true,
        },
      },
      {
        id: 11,
        type: "video",
        videoSrc:
          "https://d3sc34m1n26ele.cloudfront.net/emotional_regulation_videos/Week+2/Week+2_4.mp4",
        navigation: {
          prev: true,
          next: true,
        },
      },

      // {
      //   id: 9,
      //   type: "video",
      //   videoSrc:
      //     "https://d3sc34m1n26ele.cloudfront.net/emotional_regulation_videos/Week+2/Week+2_5.mp4",
      //   navigation: {
      //     prev: true,
      //     next: true,
      //   },
      // },
    ],
  },
  week3: {
    title: "Understanding the Concept of Adaptability and Its Application",
    pages: [
      {
        id: 1,
        type: "video",
        videoSrc:
          "https://d3sc34m1n26ele.cloudfront.net/emotional_regulation_videos/Week+3/Week+3_1.mp4",
        hasNextButton: true,
      },
      {
        id: 2,
        type: "multiStep",
        steps: [
          {
            stepId: 1,
            type: "instruction",
            title: "Instruction",
            instructions: [
              "Read the two scenarios below carefully.",
              "For each scenario, write what you would do for each step of SONAR (Stop, Observe, Name, Accept, Regulate).",
            ],
          },
          {
            stepId: 2,
            type: "sonar",
            title: "Scenario 1",
            scenario: {
              heading: "Scenario 1",
              text: "You feel really nervous because you have to give a presentation in class.",
            },
            letters: [
              {
                key: "S1",
                label: "S",
                labelFull: "STOP",
                question:
                  "What could you do to stop and pause when you feel nervous?",
              },
              {
                key: "O1",
                label: "O",
                labelFull: "OBSERVE",
                question: "What are you noticing in your body right now?",
              },
              {
                key: "N1",
                label: "N",
                labelFull: "NAME",
                question: "What emotion are you feeling?",
              },
              {
                key: "A1",
                label: "A",
                labelFull: "ACCEPT",
                question: "How can you accept that feeling without judgment?",
              },
              {
                key: "R1",
                label: "R",
                labelFull: "REGULATE",
                question: "What could you do to calm yourself?",
              },
            ],
          },
          {
            stepId: 3,
            type: "sonar",
            title: "Scenario 2",
            scenario: {
              heading: "Scenario 2",
              text: "You feel super excited and can't sit still during a fun class project.",
            },
            letters: [
              {
                key: "S2",
                label: "S",
                labelFull: "STOP",
                question:
                  "What could you do to stop and pause when you feel left out?",
              },
              {
                key: "O2",
                label: "O",
                labelFull: "OBSERVE",
                question: "What are you noticing in your body right now?",
              },
              {
                key: "N2",
                label: "N",
                labelFull: "NAME",
                question: "What emotion are you feeling?",
              },
              {
                key: "A2",
                label: "A",
                labelFull: "ACCEPT",
                question: "How can you accept that feeling without judgment?",
              },
              {
                key: "R2",
                label: "R",
                labelFull: "REGULATE",
                question: "What could you do to calm yourself?",
              },
            ],
          },
        ],
        navigation: { prev: true, next: true },
      },
    ],
  },
  week4: {
    title: "The Role of Support Systems",
    pages: [
      {
        id: 1,
        type: "video",
        videoSrc:
          "https://d3sc34m1n26ele.cloudfront.net/emotional_regulation_videos/Week+4/Week+4_1.mp4",
        hasNextButton: true,
      },
      {
        id: 2,
        type: "question",
        questionType: "text",
        question:
          "Before we proceed, we’d love to find out if you remember what we treated last week.",
        hasImage: false,
        imageSrc: "mindset.png",
        inputType: "bigTextBox",
        navigation: {
          prev: true,
          next: true,
        },
      },
      {
        id: 3,
        type: "video",
        videoSrc:
          "https://d3sc34m1n26ele.cloudfront.net/emotional_regulation_videos/Week+4/Week+4_2.mp4",
        navigation: {
          prev: true,
          next: true,
        },
      },
      {
        id: 4,
        type: "multiStep",
        steps: [
          {
            stepId: 1,
            type: "instruction",
            instructionText: `For the emotions listed below, recall a time you experienced them and identify the action you took to cope. Classify that action as a "healthy" or "unhealthy" skill based on whether it caused further stress to yourself or others.`,
          },
          {
            stepId: 2,
            type: "emotionTable",
            emotions: [
              "Sad",
              "Excited",
              "Frustrated",
              "Bored",
              "Angry",
              "Overwhelmed",
            ],
          },
        ],
        navigation: {
          prev: true,
          next: true,
        },
      },
      {
        id: 5,
        type: "video",
        videoSrc:
          "https://d3sc34m1n26ele.cloudfront.net/emotional_regulation_videos/Week+4/Week+4_3.mp4",
        navigation: {
          prev: true,
          next: true,
        },
      },
    ],
  },
  week5: {
    title: "Coping Skills",
    pages: [
      {
        id: 1,
        type: "video",
        videoSrc:
          "https://d3sc34m1n26ele.cloudfront.net/emotional_regulation_videos/Week+5/Week+5_1.mp4",
        hasNextButton: true,
      },
      {
        id: 2,
        type: "multiStep",
        title: "Coping Skills Regulation Zones",
        steps: [
          {
            stepId: 1,
            type: "instruction",
            challenge:
              "Below are several coping skills. Your task is to pick and drop each skill activity to the zone it can help regulate.",
          },
          {
            stepId: 2,
            type: "copingSkillsDragDrop",
            instruction:
              "Drag and drop each coping skill into the appropriate zone.",
            zones: [
              {
                id: "blue",
                title: "Blue Zone",
                color: "#4A90E2",
              },
              {
                id: "green",
                title: "Green Zone",
                color: "#50C878",
              },
              {
                id: "yellow",
                title: "Yellow Zone",
                color: "#F4C430",
              },
              {
                id: "red",
                title: "Red Zone",
                color: "#E74C3C",
              },
            ],
            skills: [
              "Taking a break",
              "Listening to upbeat music",
              "Deep breathing",
              "Counting to 10",
              "Practicing gratitude",
              "Walking outside",
              "Talking to a trusted adult",
              "Playing football",
              "Drawing",
              "Doing a quick stretch",
              "Writing in a journal",
              "Drinking water",
              "Hugging a stuffed animal or pillow",
              "Doing jumping jacks",
              "Watching a favorite show or video",
              "Singing your favorite song",
              "Playing with a pet",
              "Visualizing a calm place",
              "Meditating for a few minutes",
              "Organizing your desk or room",
            ],
          },
        ],
        navigation: {
          prev: true,
          next: true,
        },
      },
      {
        id: 3,
        type: "video",
        videoSrc:
          "https://d3sc34m1n26ele.cloudfront.net/emotional_regulation_videos/Week+5/Week+5_2.mp4",
        hasNextButton: true,
      },
    ],
  },
};
