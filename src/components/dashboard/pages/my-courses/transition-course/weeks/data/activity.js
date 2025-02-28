export const courseContent = {
  week1: {
    title: "Introduction to Transition",
    pages: [
      {
        id: 1,
        type: "video",
        videoSrc: "https://d3sc34m1n26ele.cloudfront.net/compassion_videos/Week+1/FLOW+1_1.mp4",
        hasNextButton: true,
      },
      {
        id: 2,
        type: "question",
        questionType: "text",
        question: "How has been your learning process in Primary school?",
        inputType: "bigTextBox",
        navigation: {
          prev: true,
          next: true,
        },
      },

      {
        id: 3,
        type: "video",
        videoSrc: "https://d3sc34m1n26ele.cloudfront.net/compassion_videos/Week+1/FLOW+1_2.mp4",
        navigation: {
          prev: true,
          next: true,
        },
      },
      {
        id: 4,
        type: "question",
        questionType: "text",
        question: "Why do you think a higher education is important for you?",
        inputType: "bigTextBox",
        navigation: {
          prev: true,
          next: true,
        },
      },



      {
        id: 5,
        type: "video",
        videoSrc: "https://d3sc34m1n26ele.cloudfront.net/compassion_videos/Week+1/FLOW+1_3.mp4",
        navigation: {
          prev: true,
          next: true,
        },
      },
      {
        id: 6,
        type: "listQuestion",
        questionType: "text",
        question: "What do you look forward to experiencing in secondary school?",
        inputCount: 5,
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
        videoSrc: "https://d3sc34m1n26ele.cloudfront.net/compassion_videos/Week+1/FLOW+1_3.mp4",
        navigation: {
          prev: true,
          next: true,
        },
      },
      {
        id: 8,
        type: "question",
        questionType: "text",
        question: "What does the word ",
        hasImage: true,
        isbrokenQuestion: true,
        brokenCompletion: " mean to you?",
        imageSrc: "transition.png",
        inputType: "bigTextBox",
        navigation: {
          prev: true,
          next: true,
        },
      },
      {
        id: 9,
        type: "video",
        videoSrc: "https://d3sc34m1n26ele.cloudfront.net/compassion_videos/Week+1/FLOW+1_3.mp4",
        navigation: {
          prev: true,
          next: true,
        },
      },

      // Love TextBox
      {
        id: 10,
        type: "question",
        questionType: "text",
        question: "What’s one thing you’re looking forward to?",
        inputType: "bigTextBox",
        navigation: {
          prev: true,
          next: true,
        },
      },
      {
        id: 11,
        type: "video",
        videoSrc: "https://d3sc34m1n26ele.cloudfront.net/compassion_videos/Week+1/FLOW+1_3.mp4",
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
            type: "instruction",
            title: "questions",
            instructions:
              "Read the following scenarios, and apply the Seeing, Caring and Doing Principle of Compassion.",
          },
          {
            stepId: 2,
            type: "multipleQuestionBoxes",
            title:
              "List three (3) things you’re excited about for secondary school.",
            questions: [
              {
                title: "1",
                color: "yellow",
              },
              {
                type: "2",
                color: "orange",
              },
              {
                type: "3",
                color: "pink",
              }

            ],
          },
          {
            stepId: 3,
            type: "multipleQuestionBoxes",
            title:
              "List three (3) things that you feel nervous or afraid about.",
            questions: [
              {
                title: "1",
                color: "yellow",
              },
              {
                type: "2",
                color: "orange",
              },
              {
                type: "3",
                color: "pink",
              }

            ],
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
        videoSrc: "https://d3sc34m1n26ele.cloudfront.net/compassion_videos/Week+1/FLOW+1_3.mp4",
        navigation: {
          prev: true,
          next: true,
        },
      },
    ],
  },
  week2: {
    title: "Mindset",
    pages: [
      {
        id: 1,
        type: "video",
        videoSrc: "https://d3sc34m1n26ele.cloudfront.net/compassion_videos/Week+2/FLOW+2_1.mp4",
        hasNextButton: true,
      },
      {
        id: 2,
        type: "question",
        questionType: "text",
        question: "What do you understand by the",
        hasImage: true,
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
        videoSrc: "https://d3sc34m1n26ele.cloudfront.net/compassion_videos/Week+2/FLOW+2_2.mp4",
        navigation: {
          prev: true,
          next: true,
        },
      },
      {
        id: 4,
        type: "dragAndDrop",
        instruction:
          "Drag-and-drop the statements on the left into any of these bowls",
        options: [
          "I can get better at this if I keep practicing.",
          "I haven’t figured it out yet, but I will.",
          "Mistakes help me learn and improve.",
          "With effort, I can improve my skills.",
        ],
        bowls: [
          {
            id: "inner",
            label: "Growth Mindset",
            count: 2,
          },
          {
            id: "outer",
            label: "Fixed Mindset",
            count: 2,
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
        videoSrc: "https://d3sc34m1n26ele.cloudfront.net/compassion_videos/Week+2/FLOW+2_3.mp4",
        navigation: {
          prev: true,
          next: true,
        },
      },
    ],
  },
  week3: {
    title: "Secondary School",
    pages: [
      {
        id: 1,
        type: "video",
        videoSrc: "https://d3sc34m1n26ele.cloudfront.net/compassion_videos/Week+3/FLOW+3_1.mp4",
        hasNextButton: true,
      },
      {
        id: 2,
        type: "question",
        questionType: "text",
        question: "On a scale of 1 to 100, how ready do you feel for Secondary School?",
        hasImage: true,
        imageSrc: "self-compassion.png",
        inputType: "bigTextBox",
        navigation: {
          prev: true,
          next: true,
        },
      },
      {
        id: 3,
        type: "video",
        videoSrc: "https://d3sc34m1n26ele.cloudfront.net/compassion_videos/Week+3/FLOW+3_2.mp4",
        navigation: {
          prev: true,
          next: true,
        },
      },
      {
        id: 4,
        type: "dragAndDrop",
        instruction:
          "Drag-and-drop the statements on the left into any of these bowls",
        options: [
          "Past Mistakes",
          "How I Respond to Challenges",
          "Asking for Help",
          "Being Accountable",
          "Height",
          "Being Kind",
          "Doing My Chores",
          "Forgiveness from others",
          "Who Loves Me",
          "The Friends I Choose to Have",
          "Death",
          "Others expressing their emotions",
          "Skin Color",
          "Others being kind",
          "Someone else's decisions",
          "How I Spend my Free Time",
          "Responding Properly",
        ],
        bowls: [
          {
            id: "inner",
            label: "Inner Cycle",
            count: 2,
          },
          {
            id: "outer",
            label: "Outer Cycle",
            count: 2,
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
        videoSrc: "https://d3sc34m1n26ele.cloudfront.net/compassion_videos/Week+3/FLOW+3_3.mp4",
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
            type: "instruction",
            title: "Scenario",
            instructions:
              "Read the following scenarios, and apply the Seeing, Caring and Doing Principle of Compassion.",
          },
          {
            stepId: 2,
            type: "scenario",
            title:
              "Your friends made plans without you.",
            questions: [
              {
                type: "Seeing",
                question: "Within your control:",
              },
              {
                type: "Caring",
                question: "Outside your control:",
              }

            ],
          },
          {
            stepId: 3,
            type: "scenario",
            title:
              "It started raining on the day you planned to play outside.",
            questions: [
              {
                type: "Seeing",
                question: "Within your control:",
              },
              {
                type: "Caring",
                question: "Outside your control:",
              }
            ],
          },
          {
            stepId: 4,
            type: "scenario",
            title:
              "You didn’t get selected for the school team.",
            questions: [
              {
                type: "Seeing",
                question: "Within your control:",
              },
              {
                type: "Caring",
                question: "Outside your control:",
              }
            ],
          },
          {
            stepId: 5,
            type: "scenario",
            title:
              "Your sibling borrowed your things without asking.",
            questions: [
              {
                type: "Seeing",
                question: "Within your control:",
              },
              {
                type: "Caring",
                question: "Outside your control:",
              }
            ],
          },
          {
            stepId: 6,
            type: "scenario",
            title:
              "You feel nervous about giving a presentation.",
            questions: [
              {
                type: "Seeing",
                question: "Within your control:",
              },
              {
                type: "Caring",
                question: "Outside your control:",
              }
            ],
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
        videoSrc: "https://d3sc34m1n26ele.cloudfront.net/compassion_videos/Week+3/FLOW+3_4.mp4",
        navigation: {
          prev: true,
          next: true,
        },
      },
    ],
  },
  week4: {
    title: "Compassion in Daily Life",
    pages: [
      {
        id: 1,
        type: "video",
        videoSrc: "https://d3sc34m1n26ele.cloudfront.net/compassion_videos/Week+4/FLOW+4_1.mp4",
        hasNextButton: true,
      },
      {
        id: 2,
        type: "question",
        questionType: "text",
        question:
          "What do you understand by the word",
        inputType: "mediumTextBox",
        hasImage: true,
        imageSrc: "values.png",
        navigation: {
          prev: true,
          next: true,
        },
      },
      {
        id: 3,
        type: "video",
        videoSrc: "https://d3sc34m1n26ele.cloudfront.net/compassion_videos/Week+4/Week+4_2.mp4",
        navigation: {
          prev: true,
          next: true,
        },
      },
      {
        id: 4,
        type: "multiStepValueCheck",
        instruction:
          "Drag-and-drop the statements on the left into any of these bowls",
        steps: [
          {
            stepId: 1,
            checklists: [
              {
                option: "Generosity",
                description: "Being willing to share and give to others.",
                eg: "Example: Donating to charity.",
              },
              {
                option: "Respect",
                description: "Valuing and honoring others and their options.",
                eg: "Example: Listening carefully to an elder.",
              },
              {
                option: "Leadership",
                description: "Guiding  and inspiring others.",
                eg: "Example: Leading a group project at school",
              },
              {
                option: "Responsibility",
                description: "Being accountable for your actions and duties.",
                eg: "Example: Completing your homework on time.",
              }, {
                option: "Integrity",
                description: "Being honest and having strong moral principles.",
                eg: "Example:Returning a lost wallet you found.",
              },
              {
                option: "Empathy",
                description: "Understanding and sharing the feelings of others.",
                eg: "Example: Comforting a friend who is sad.",
              },
              {
                option: "Compassion",
                description: "Caring for others and helping them when they need it.",
                eg: "Example: Volunteering at a soup kitchen.",
              },
              {
                option: "Gratitude",
                description: "Being thankful and appreciating what you have.",
                eg: "Example: Writing a thank-you note to someone who helped you.",
              }, {
                option: "Courage",
                description: "Facing your fears or challenges bravely.",
                eg: "Example: Speaking up for someone being bullied.",
              },
              {
                option: "Forgiveness",
                description: "Letting go of anger or resentment towards someone who wronged you.",
                eg: "Example: Forgiving a friend who hurt your feelings.",
              }
              ,
              {
                option: "Perseverance",
                description: "Continuing to try, even when things are tough.",
                eg: "Example: Practicig a sport even after losing a game.",
              },
              {
                option: "Cooperation",
                description: "Working well with others to achieve a common goal.",
                eg: "Example: Collaborating on a group project.",
              }
            ],
          },
          {
            stepId: 2,
            checklists: [
              {
                option: "Kindness",
                description: "Being friendly, generous, and considerate to others.",
                eg: "Example: Helping a neighbor carry their groceries.",
              },
              {
                option: "Tolerance",
                description: "Accepting and respecting different opinions or behaviors.",
                eg: "Example: Respecting classmates' diverse backgrounds.",
              },
              {
                option: "Patience",
                description: "Waiting calmly without getting frustrated.",
                eg: "Example: Waiting for your turn without complaining.",
              },
              {
                option: "Friendship",
                description: "Having a close and trusting relationship with someone.",
                eg: "Example: Spending time with a friend who needs support.",
              }, {
                option: "Teamwork",
                description: "Working together with others to achieve a goal.",
                eg: "Example: Playing a team sport and supporting each other.",
              },
              {
                option: "Organization",
                description: "Planning and arranging tasks and activities efficiently.",
                eg: "Example: Keeping a tidy desk and schedule.",
              },
              {
                option: "Grit",
                description: "Having courage and determination to stick with something.",
                eg: "Example: Studying hard for a tough exam.",
              },
              {
                option: "Resilience",
                description: "Recovering quickly from difficulties.",
                eg: "Example: Bouncing back after a disappointing performance.",
              }, {
                option: "Adaptability",
                description: "Adjusting to new conditions or changes.",
                eg: "Example: Getting used to a new school.",
              },
              {
                option: "Contentment",
                description: "Being happy and satisfied with what you have.",
                eg: "Example: Enjoying time with family without wanting more.",
              }
              ,
              {
                option: "Honour",
                description: "Doing what is right and keeping promises.",
                eg: "Example: Keeping a promise even when it’s hard.",
              },
              {
                option: "Moderation",
                description: "Avoiding extremes and practicing self-control.",
                eg: "Example: Eating sweets occasionally rather than every day.",
              }
            ],
          },
          {
            stepId: 3,
            checklists: [
              {
                option: "Spirituality",
                description: "Feeling connected to something bigger than yourself.",
                eg: "Example: Practicing meditation or prayer.",
              },
              {
                option: "Healthy Life",
                description: "Taking care of your physical, mental, and emotional well-being.",
                eg: "Example: Exercising and eating a balanced diet.",
              },
              {
                option: "Family",
                description: "Valuing and maintaining strong bonds with family members.",
                eg: "Example: Spending quality time with your family.",
              },
              {
                option: "Resourcefulness",
                description: "Finding clever solutions to problems.",
                eg: "Example: Using household items creatively to solve a problem.",
              }, {
                option: "Mindfulness",
                description: "Being fully present and aware of the moment.",
                eg: "Example: Practicing deep breathing to stay calm.",
              },
              {
                option: "Creativity",
                description: "Using your imagination to create or solve problems.",
                eg: "Example: Painting a picture or writing a story.",
              },
              {
                option: "Curiosity",
                description: "Wanting to know or learn something new.",
                eg: "Example: Asking questions about a topic you’re interested in.",
              },
              {
                option: "Punctuality",
                description: "Being on time.",
                eg: "Example: Arriving at school before the bell rings.",
              },
              {
                option: "Courtsey",
                description: "Being polite and considerate.",
                eg: "Example: Saying please and thank you.",
              }, {
                option: "Self-control",
                description: "Managing your emotions and behavior.",
                eg: "Example:Staying calm when you’re angry.",
              },
              {
                option: "Self-discipline",
                description: "Sticking to what’s right, even when it’s tough.",
                eg: "Example: Following a study schedule despite wanting to play.",
              }
              ,
              {
                option: "Optimism",
                description: "Being hopeful and confident about the future.",
                eg: "Example: Believing you will do well on a test even if it seems hard.",
              },
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
        videoSrc: "https://d3sc34m1n26ele.cloudfront.net/compassion_videos/Week+4/Week+4_3.mp4",
        navigation: {
          prev: true,
          next: true,
        },
      },
      {
        id: 6,
        type: "multiStepMultiAnswers",
        steps: [

          {
            stepId: 1,
            type: "question",
            title:
              "Identify three (3) important people in your life and list their names below.",
            answers: 3
          },
          {
            stepId: 1,
            type: "question",
            title:
              "Write out what these people think about you.",
            answers: 3
          },
          {
            stepId: 1,
            type: "question",
            title:
              "Are you happy with what these people think about you? If no, what would you like to change? If yes, type “YES” in the box.",
            answers: 3
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
        videoSrc: "https://d3sc34m1n26ele.cloudfront.net/compassion_videos/Week+4/Week+4_4.mp4",
        navigation: {
          prev: true,
          next: true,
        },
      },
    ],
  },
  week5: {
    title: "Compassion in Practice",
    pages: [
      {
        id: 1,
        type: "video",
        videoSrc: "https://d3sc34m1n26ele.cloudfront.net/compassion_videos/Week+5/Week+5_1.mp4",
        hasNextButton: true,
      },
      {
        id: 2,
        type: "listQuestion",
        questionType: "text",
        question: "Give examples of emotions that you know of.",
        inputCount: 5,
        inputType: "text",
        inputPlaceholder: "Type your answer here",
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
            type: "instruction",
            title: "Scenario",
            instructions:
              "Jordan's friend was supposed to meet him at the library but canceled at the last minute. Jordan feels frustrated.",
          },
          {
            stepId: 2,
            type: "scenario",
            title:
              "Your friends made plans without you.",
            questions: [
              {
                type: "",
                question: "Identify the Emotion:",
              },
              {
                type: "",
                question: "Reason for the Emotion:",
              },
              {
                type: "",
                question: "Respond with Emotional Intelligence:",
              }

            ],
          },
          {
            stepId: 3,
            type: "scenario",
            title:
              "Maria got her test results back and is disappointed because she didn’t score as high as she expected, even though she studied hard.",
            questions: [
              {
                type: "",
                question: "Identify the Emotion:",
              },
              {
                type: "",
                question: "Reason for the Emotion:",
              },
              {
                type: "",
                question: "Respond with Emotional Intelligence:",
              }

            ],
          }, {
            stepId: 4,
            type: "scenario",
            title:
              "Alex’s friend just got chosen as the team captain, a position Alex also wanted. Alex feels left out and a little jealous.",
            questions: [
              {
                type: "",
                question: "Identify the Emotion:",
              },
              {
                type: "",
                question: "Reason for the Emotion:",
              },
              {
                type: "",
                question: "Respond with Emotional Intelligence:",
              }

            ],
          }, {
            stepId: 5,
            type: "scenario",
            title:
              "During group work, Mia notices that one team member, Sam, seems quiet and withdrawn. Mia suspects he might be feeling stressed..",
            questions: [
              {
                type: "",
                question: "Identify the Emotion:",
              },
              {
                type: "",
                question: "Reason for the Emotion:",
              },
              {
                type: "",
                question: "Respond with Emotional Intelligence:",
              }

            ],
          }, {
            stepId: 6,
            type: "scenario",
            title:
              "Jamie helped organize a big event, but nobody thanked him for his hard work. Jamie feels unappreciated.",
            questions: [
              {
                type: "",
                question: "Identify the Emotion:",
              },
              {
                type: "",
                question: "Reason for the Emotion:",
              },
              {
                type: "",
                question: "Respond with Emotional Intelligence:",
              }

            ],
          },
        ],
        navigation: {
          prev: true,
          next: true,
        },
      },
      {
        id: 4,
        type: "video",
        videoSrc: "https://d3sc34m1n26ele.cloudfront.net/compassion_videos/Week+5/Week+5_2.mp4",
        navigation: {
          prev: true,
          next: true,
        },
      },
    ],
  },
  week6: {
    title: "Compassion in Practice",
    pages: [
      {
        id: 1,
        type: "video",
        videoSrc: "https://d3sc34m1n26ele.cloudfront.net/compassion_videos/Week+5/Week+5_1.mp4",
        hasNextButton: true,
      },
      {
        id: 2,
        type: "question",
        questionType: "text",
        question: "What comes to your mind about the word  ",
        hasImage: true,
        imageSrc: "social_skills.png",
        inputType: "bigTextBox",
        navigation: {
          prev: true,
          next: true,
        },
      },
      {
        id: 3,
        type: "video",
        videoSrc: "https://d3sc34m1n26ele.cloudfront.net/compassion_videos/Week+5/Week+5_2.mp4",
        navigation: {
          prev: true,
          next: true,
        },
      },
      {
        id: 4,
        type: "progressBar",
        question: "Do you think you have great social skills or poor social skills?",
        progressBarConfig: {
          low: 0,
          mid: 50,
          max: 100,
        },
        navigation: {
          prev: true,
          next: true,
        },
      },
      {
        id: 5,
        type: "video",
        videoSrc: "https://d3sc34m1n26ele.cloudfront.net/compassion_videos/Week+5/Week+5_2.mp4",
        navigation: {
          prev: true,
          next: true,
        },
      },
      {
        id: 6,
        type: "question",
        questionType: "text",
        question: "What comes to your mind about the word  ",
        hasImage: true,
        imageSrc: "communication.png",
        inputType: "bigTextBox",
        navigation: {
          prev: true,
          next: true,
        },
      },
      {
        id: 7,
        type: "video",
        videoSrc: "https://d3sc34m1n26ele.cloudfront.net/compassion_videos/Week+5/Week+5_2.mp4",
        navigation: {
          prev: true,
          next: true,
        },
      },
      {
        id: 8,
        type: "question",
        questionType: "text",
        question: "What do you understand by the word ",
        hasImage: true,
        imageSrc: "boundaries.png",
        inputType: "bigTextBox",
        navigation: {
          prev: true,
          next: true,
        },
      },
      {
        id: 9,
        type: "video",
        videoSrc: "https://d3sc34m1n26ele.cloudfront.net/compassion_videos/Week+5/Week+5_2.mp4",
        navigation: {
          prev: true,
          next: true,
        },
      },
      {
        id: 10,
        type: "dragAndDrop",
        instruction:
          "Drag-and-drop the statements on the left into any of these bowls",
        options: [
          "Listening actively and not interrupting.",
          "Clearly expressing your own comfort levels in a conversation.",
          "Being direct and respectful when you don’t agree.",
          "Politely explaining if something is outside your comfort zone.",
          "Respecting others’ personal space and values.",
        ],
        bowls: [
          {
            id: "inner",
            label: "Effective communication",
            count: 2,
          },
          {
            id: "outer",
            label: "Clear Boundaries",
            count: 2,
          },
        ],
        navigation: {
          prev: true,
          next: true,
        },
      },
      {
        id: 11,
        type: "multiStepDropDown",
        steps: [
          {
            stepId: 1,
            type: "instruction",
            title: "Instruction",
            instructions: [
              "Below are sentences with missing words related to communication and boundaries. Choose the best word from the list below to complete each sentence.",
              "Missing words are: Respect, Clarity, Comfort, Listen, Express"
            ]
          },
          {
            stepId: 2,
            type: "scenario",
            question: "When setting boundaries, it’s important to clearly ______ your needs.",
            options: [
              "Respect",
              "Clarity",
              "Comfort",
              "Listen",
              "Express",
            ],
          },
          {
            stepId: 3,
            type: "scenario",
            question: "In effective communication, you ______ to understand, not to respond immediately.",
            options: [
              "Respect",
              "Clarity",
              "Comfort",
              "Listen",
              "Express",
            ],
          },
          {
            stepId: 4,
            type: "scenario",
            question: "Boundaries help maintain ______ within relationships.",
            options: [
              "Respect",
              "Clarity",
              "Comfort",
              "Listen",
              "Express",
            ],
          },
          {
            stepId: 5,
            type: "scenario",
            question: "Good communication includes being able to speak with ______ and honesty.",
            options: [
              "Respect",
              "Clarity",
              "Comfort",
              "Listen",
              "Express",
            ],
          },
          {
            stepId: 6,
            type: "scenario",
            question: "Healthy relationships are built on ______ for each other’s space and ideas.",
            options: [
              "Respect",
              "Clarity",
              "Comfort",
              "Listen",
              "Express",
            ],
          },
        ],
        navigation: {
          prev: true,
          next: true,
        },
      },
      {
        id: 12,
        type: "video",
        videoSrc: "https://d3sc34m1n26ele.cloudfront.net/compassion_videos/Week+5/Week+5_2.mp4",
        navigation: {
          prev: true,
          next: true,
        },
      },
    ],
  },
  week7: {
    title: "Compassion in Practice",
    pages: [
      {
        id: 1,
        type: "video",
        videoSrc: "https://d3sc34m1n26ele.cloudfront.net/compassion_videos/Week+5/Week+5_1.mp4",
        hasNextButton: true,
      },
      {
        id: 2,
        type: "radio",
        question: "Have you sat down to think about how you will balance all of these effectively? ",
        options: [
          "Yes",
          "No"
        ],
        navigation: {
          prev: true,
          next: true,
        },
      },
      {
        id: 3,
        type: "video",
        videoSrc: "https://d3sc34m1n26ele.cloudfront.net/compassion_videos/Week+5/Week+5_2.mp4",
        navigation: {
          prev: true,
          next: true,
        },
      },


      {
        id: 4,
        type: "versatileMultiStepAndMultiAnswers",
        steps: [
          {
            stepId: 1,
            type: "multipleAnswers",
            question:
              "List of all the assignments and activities you have this week.",
            fieldCount: 5
          },

          {
            stepId: 2,
            type: "decoratedSmallBoxesWithTitles",
            question:
              "Choose three tasks from your planner and rank them by importance. Write down which task you’ll complete first, second, and third.",
            fieldCount: 3,
            config: [
              {
                title: "1",
                color: "green",
                colorCode:"#89B92E",
              },
              {
                title: "2",
                color: "yellow",
                colorCode:"#FCF85D",
              },
              {
                title: "3",
                color: "red",
                colorCode:"#F46851",
              },
            ]
          },
          {
            stepId: 3,
            type: "bigTextBox",
            question:
              "Why did you select these tasks?",
            fieldCount: 1
          },
          {
            stepId: 4,
            type: "decoratedSmallBoxesWithTitles",
            question:
              "Decide when you’ll work on each task, starting with the top 3 you selected.",
            fieldCount: 6,
            config: [
              {
                title: "Monday",
                color: "orange",
                colorCode:"#FCAF17",
              },
              {
                title: "Tuesday",
                color: "yellow",
                colorCode:"#FCF85D",
              },
              {
                title: "Wednesday",
                color: "lightOrange",
                colorCode:"#FAAA74",
              },
              {
                title: "Thursday",
                color: "green",
                colorCode:"#2CCF4F",
              },
              {
                title: "Friday",
                color: "pink",
                colorCode:"#FDD8B6",
              },
              {
                title: "Saturday",
                color: "blue",
                colorCode:"#01A7FF",
              },
            ]
          },
          {
            stepId: 5,
            type: "checkBoxesWithImageAndTitle",
            question:
              "Identify the things you will need to limit to make more room for your tasks.",
            fieldCount: 6,
            config: [
              {
                title: "Watching TV",
                image: "watchingTv.png",
                color: "#FCF85D",
              },
              {
                title: "Spending time on phone",
                image: "timeWithPhone.png",
                color: "#FFEEBB",
              },
              {
                title: "Gisting/Gossiping",
                image: "gistingAndGossiping",
                color: "#C9FF61",
              },
              {
                title: "Playing Games",
                image: "playingGames.png",
                color: "#FCCAA1",
              },
              {
                title: "Playing around",
                image: "playingAround.png",
                color: "#ECEDF0",
              },
              {
                title: "Social Media",
                image: "socialMedia.png",
                color: "#F7ABAA",
              },
            ]
          },
          {
            stepId: 6,
            type: "multipleAnswers",
            question:
              "Write other time consumers you must limit, if you have.",
            fieldCount: 5
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
        videoSrc: "https://d3sc34m1n26ele.cloudfront.net/compassion_videos/Week+5/Week+5_2.mp4",
        navigation: {
          prev: true,
          next: true,
        },
      },


    ],
  },
  week8: {
    title: "Compassion in Practice",
    pages: [
      {
        id: 1,
        type: "video",
        videoSrc: "https://d3sc34m1n26ele.cloudfront.net/compassion_videos/Week+5/Week+5_1.mp4",
        hasNextButton: true,
      },
      {
        id: 2,
        type: "radio",
        question: "Do you watch or play football? ",
        hasImage: true,
        imageSrc: "footballers.png",
        options: [
          "Yes",
          "No"
        ],
        navigation: {
          prev: true,
          next: true,
        },
      },
      {
        id: 3,
        type: "video",
        videoSrc: "https://d3sc34m1n26ele.cloudfront.net/compassion_videos/Week+5/Week+5_2.mp4",
        navigation: {
          prev: true,
          next: true,
        },
      },
      {
        id: 4,
        type: "question",
        questionType: "text",
        question: "What do you understand by the word  ",
        hasImage: true,
        imageSrc: "resilience.png",
        inputType: "bigTextBox",
        navigation: {
          prev: true,
          next: true,
        },
      },
      {
        id: 5,
        type: "video",
        videoSrc: "https://d3sc34m1n26ele.cloudfront.net/compassion_videos/Week+5/Week+5_2.mp4",
        navigation: {
          prev: true,
          next: true,
        },
      },
      {
        id: 6,
        type: "versatileMultiStepAndMultiAnswers",
        steps: [
          {
            stepId: 1,
            type: "star",
            question:
              "Your friends made plans without you.",
            fieldCount: 5,
            config: [
              {
                title: "",
                color: "yellow",
                colorCode:"#FCF85D",
                bgColor:"#FCF85D"
              },
              {
                title: "",
                color: "blue",
                colorCode:"#01A7FF",
                bgColor:"#85D4FF"
              },
              {
                title: "",
                color: "pink",
                colorCode:"#FF2C92",
                bgColor:"#FF90C6"
              },
              {
                title: "",
                color: "green",
                colorCode:"#2CCF4F",
                bgColor:"#FFCDAC"
              },
              {
                title: "",
                color: "pink",
                colorCode:"#FDD8B6",
                bgColor:"#C9FF61"
              },
            ]
          },

          {
            stepId: 2,
            type: "hearts",
            question:
              "Write down the goals you want to achieve.",
            fieldCount: 5,
            config: [
              {
                title: "",
                color: "yellow",
                colorCode:"#FCF85D",
                bgColor:"#FCF85D"
              },
              {
                title: "",
                color: "blue",
                colorCode:"#01A7FF",
                bgColor:"#85D4FF"
              },
              {
                title: "",
                color: "pink",
                colorCode:"#FF2C92",
                bgColor:"#FF90C6"
              },
              {
                title: "",
                color: "green",
                colorCode:"#2CCF4F",
                bgColor:"#FFCDAC"
              },
              {
                title: "",
                color: "pink",
                colorCode:"#FDD8B6",
                bgColor:"#C9FF61"
              },
            ]
          },
          {
            stepId: 3,
            type: "singleStar",
            question:
              "Write down your Wishing State here.",
            fieldCount: 1
          },
          {
            stepId: 3,
            type: "smart",
            question:
              "Write down your Wishing State here.",
            fieldCount: 5,
            config: [
              {
                title: "S",
              },
              {
                title: "M",
              },
              {
                title: "A",
              },
              {
                title: "R",
              
              },
              {
                title: "T",
              },
            ]
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
        videoSrc: "https://d3sc34m1n26ele.cloudfront.net/compassion_videos/Week+5/Week+5_2.mp4",
        navigation: {
          prev: true,
          next: true,
        },
      },
    ],
  },
  week9: {
    title: "Compassion in Practice",
    pages: [
      {
        id: 1,
        type: "video",
        videoSrc: "https://d3sc34m1n26ele.cloudfront.net/compassion_videos/Week+5/Week+5_1.mp4",
        hasNextButton: true,
      },
      {
        id: 2,
        type: "question",
        questionType: "text",
        question: "What do you understand by the word  ",
        hasImage: true,
        imageSrc: "resilience.png",
        inputType: "bigTextBox",
        navigation: {
          prev: true,
          next: true,
        },
      },
      {
        id: 3,
        type: "video",
        videoSrc: "https://d3sc34m1n26ele.cloudfront.net/compassion_videos/Week+5/Week+5_1.mp4",
        hasNextButton: true,
      },
      {
        id: 4,
        type: "versatileMultiStepAndMultiAnswers",
        steps: [
          {
            stepId: 1,
            type: "bigTextBox",
            question:
              "What do you understand by the word",
              hasImage:true,
              image:"copingSkils.png",
            fieldCount: 1,
          },
          {
            stepId: 2,
            type: "multipleAnswers",
            question:
              "Other words for coping could be: deal with, handle. Let me know if you have other words in mind.",
            fieldCount: 5
          },
          {
            stepId: 3,
            type: "imageDragAndDrop",
            question:
              "Drag-and-drop the statements on the left into any of these bowls.",
            dragCount: 9,
            dragConfig:[
              {
                title:"1",
                desc:"Healthy Skills",
              },
              {
                title:"2",
                desc:"Unhealthy Skills",
              }
            ],
            dragData:[
              {
                title:"Write",
                image:"writeDragable.png",
              },
              {
                title:"Walk away",
                image:"walAwayDragable.png",
              },
              {
                title:"Belly Breathing",
                image:"bellyBreathingDragable.png",
              },
              {
                title:"Exercise",
                image:"exerciseDragable.png",
              },
              {
                title:"Yell",
                image:"yellDragable.png",
              },
              {
                title:"Talk to Someone",
                image:"talkToSomeoneDragable.png",
              },
              {
                title:"Positive Self Talk",
                image:"positiveSelfTalkDragable.png",
              },
              {
                title:"Break things",
                image:"breakThingsDragable.png",
              },
              {
                title:"Bite nails",
                image:"biteNailsDragable.png",
              },
            ]

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
        videoSrc: "https://d3sc34m1n26ele.cloudfront.net/compassion_videos/Week+5/Week+5_1.mp4",
        hasNextButton: true,
      },
      {
        id: 6,
        type: "multiStepChallengeWithStatement",
        title: "Write a letter to yourself.",
        challenges: [
          {
            type: "example",
            chalenge: "Preparing for a big math test, and you don’t understand all the topics.",
            statement: "I don’t understand all the topics. yet., but I can keep studying and practicing until I do"
          },
          {
            type: "question",
            chalenge: "Trying to make new friends but feeling like I don’t fit in..",
          },
          {
            type: "question",
            chalenge: "Learning how to play a musical instrument, but I keep making mistakes.",
          },
          {
            type: "question",
            chalenge: "During class discussions, I don't feel confident speaking in front of others..",
          },
          {
            type: "question",
            chalenge: "I don't seem to know how to balance school work and home chores",
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
        videoSrc: "https://d3sc34m1n26ele.cloudfront.net/compassion_videos/Week+5/Week+5_1.mp4",
        hasNextButton: true,
      }
    ],
  },
  week10: {
    title: "Compassion in Practice",
    pages: [
      {
        id: 1,
        type: "video",
        videoSrc: "https://d3sc34m1n26ele.cloudfront.net/compassion_videos/Week+5/Week+5_1.mp4",
        hasNextButton: true,
      },
      {
        id: 2,
        type: "muiltiStepBigTextWithTitle",
        steps: [
          {
            stepId: 1,
            type: "question",
            title: "Dear Future Me",
            question:
              "When I’m feeling overwhelmed with homework, I’ll remember to",
          },
          {
            stepId: 2,
            type: "question",
            title: "Dear Future Me",
            question:
              "If I’m nervous about giving a presentation, I’ll try to calm myself by...",
          },
          {
            stepId: 3,
            type: "question",
            title: "Dear Future Me",
            question:
              "If I find a subject difficult and start to struggle, I’ll remind myself to ...",
          },
          {
            stepId: 4,
            type: "question",
            title: "Dear Future Me",
            question:
              "When I get a lower grade than I expected, I’ll use resilience by...",
          },
          {
            stepId: 5,
            type: "question",
            title: "Dear Future Me",
            question:
              "If I feel left out at lunch or during group activities, I’ll remember to...",
          },
          {
            stepId: 6,
            type: "question",
            title: "Dear Future Me",
            question:
              "When I have a disagreement with a friend, I’ll handle it by...",
          },
          {
            stepId: 7,
            type: "question",
            title: "Dear Future Me",
            question:
              "If I feel too tired or stressed, I’ll take care of myself by ...",
          },
          {
            stepId: 8,
            type: "question",
            title: "Dear Future Me",
            question:
              "When I feel unsure about asking for help, I’ll remind myself that I can always talk to...",
          },
          {
            stepId: 9,
            type: "question",
            title: "Dear Future Me",
            question:
              "If I need to set a new goal, I’ll plan by first...",
          },
          {
            stepId: 10,
            type: "question",
            title: "Dear Future Me",
            question:
              "When I need a break from studying, I’ll choose a healthy way to recharge like...",
          },
          {
            stepId: 11,
            type: "question",
            title: "Dear Future Me",
            question:
              "If I have a day where everything feels hard, I’ll show resilience by...",
          },
          {
            stepId: 12,
            type: "question",
            title: "Dear Future Me",
            question:
              "When I need to manage my time for a big test, I’ll organize myself by...",
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
        videoSrc: "https://d3sc34m1n26ele.cloudfront.net/compassion_videos/Week+5/Week+5_1.mp4",
        hasNextButton: true,
      },
    ],
  },
};
