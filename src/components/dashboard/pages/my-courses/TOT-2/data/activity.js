export const courseContent = {
  week1: {
    title: "Introduction to Resilience and Grit",
    pages: [
      {
        id: 1,
        type: "video",
        videoSrc:
          "https://d3sc34m1n26ele.cloudfront.net/tot2_videos/Week+1/ToT_1_1.mp4",
        hasNextButton: true,
      },
      {
        id: 2,
        type: "question",
        questionType: "text",
        question:
          "As a teacher, what would you say you think this course is all about?",
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
          "https://d3sc34m1n26ele.cloudfront.net/tot2_videos/Week+1/ToT_1_2.mp4",
        navigation: {
          prev: true,
          next: true,
        },
      },
      {
        id: 4,
        type: "question",
        questionType: "text",
        question: `Type one word that comes to mind when you hear “Inclusive Classroom.”`,
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
          "https://d3sc34m1n26ele.cloudfront.net/tot2_videos/Week+1/ToT_1_3.mp4",
        navigation: {
          prev: true,
          next: true,
        },
      },
      {
        id: 6,
        type: "question",
        question:
          "As a teacher, I’d love to hear your definition of these three words.",
        questions: [
          {
            type: "Inclusion",
          },
          {
            type: "Integration",
          },
          {
            type: "Segregation",
          },
        ],
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
          "https://d3sc34m1n26ele.cloudfront.net/tot2_videos/Week+1/ToT_1_4.mp4",
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
            type: "instruction",
            title: "Instruction",
            text: "Just to confirm that you really understand these three terms, you will be directed to an activity where you drag different statements into the correct category.",
          },
          {
            stepId: 2,
            type: "imageDragAndDrop",
            instruction:
              "Drag-and-drop the statements on the left into any of these boxes.",
            buckets: [
              {
                id: "green",
                title: "Integration",
              },
              {
                id: "red",
                title: "Segregation",
              },
              {
                id: "orange",
                title: "Inclusion",
              },
            ],
            images: [
              "All students learn together with support available as needed.",
              "Children are taught separately in special classrooms.",
              "Learners are placed in the school but not supported to participate.",
            ],
          },
          {
            stepId: 3,
            type: "dropdownScenario",
            question:
              "Now, take a moment to reflect. Which model best describes your current classroom or school system?",
            options: [
              {
                id: "1",
                text: "Segregation",
              },
              {
                id: "2",
                text: "Integration",
              },
              {
                id: "3",
                text: "Inclusion",
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
        id: 9,
        type: "video",
        videoSrc:
          "https://d3sc34m1n26ele.cloudfront.net/tot2_videos/Week+1/ToT_1_5.mp4",
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
            type: "dropdownScenario",
            question:
              "This student faces Dyslexia, meaning they struggle significantly with decoding and processing written text.",
            options: [
              {
                id: "1",
                text: "Text to speech software, simplified text versions and use of visual aids.",
              },
              {
                id: "2",
                text: "Guided questions and assessments, peer to peer discussion.",
              },
            ],
          },
          {
            stepId: 2,
            type: "dropdownScenario",
            question:
              "This student is an Average learner who will succeed with standard classroom instruction.",
            options: [
              {
                id: "1",
                text: "Text to speech software, simplified text versions and use of visual aids.",
              },
              {
                id: "2",
                text: "Guided questions and assessments, peer to peer discussion.",
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
        id: 11,
        type: "video",
        videoSrc:
          "https://d3sc34m1n26ele.cloudfront.net/tot2_videos/Week+1/ToT_1_6.mp4",
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
          "https://d3sc34m1n26ele.cloudfront.net/tot2_videos/Week+2/ToT_2_1.mp4",
        hasNextButton: true,
      },
      {
        id: 2,
        type: "question",
        questionType: "text",
        question:
          "In one word, describe how you want your SEND learners to feel when they walk through your classroom door.",
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
          "https://d3sc34m1n26ele.cloudfront.net/tot2_videos/Week+2/ToT_2_2.mp4",
        navigation: {
          prev: true,
          next: true,
        },
      },

      {
        id: 4,
        type: "multiStep",
        title: "Write a letter to yourself.",
        steps: [
          {
            stepId: 1,
            type: "instruction",
            challenge:
              "On the screen, you will see statements describing assumptions teachers often make about learners with special needs. Select the ones that describe reactions or judgments you have seen in yourself. The goal here is not to criticize, it is to build awareness.",
          },
          {
            stepId: 2,
            type: "imageDragAndDrop",
            instruction:
              "Drag-and-drop the statements on the left into any of these bowls.",
            steps: 4,
            buckets: [
              {
                id: "green",
                title: "YES",
              },
              {
                id: "red",
                title: "NO",
              },
            ],
            images: [
              "I expected a student with a diagnosed learning difficulty to automatically perform poorly on the test.",
              "I labelled a student in my mind (e.g., 'the anxious one,' 'the disruptive one') before fully understanding their core needs.",
              "I assumed a student with a mobility challenge would not want to participate in the group activity.",
              "I reacted to the visible challenging behavior without pausing to understand the underlying SEND need.",
              "I focused primarily on the most vocal learners and often overlooked the subtle needs of quiet students with any special need",
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
          "https://d3sc34m1n26ele.cloudfront.net/tot2_videos/Week+2/ToT_2_3.mp4",
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
            title: "Instruction",
            instructions: [
              "Let’s practice shifting our lens. You will see short scenarios involving SEND learners. Your task is to look beyond the challenge and identify the underlying strength being displayed.",
            ],
          },
          {
            stepId: 2,
            type: "dropdownScenario",
            question:
              "A child with ADHD asks many hyper-focused questions in class about a specific topic.",
            options: [
              {
                id: "1",
                text: "Deep Curiosity and High Engagement.",
              },
              {
                id: "2",
                text: "Creativity and Exceptional Spatial Thinking.",
              },
              {
                id: "3",
                text: "Empathy and Prosocial Behavior.",
              },
              {
                id: "4",
                text: "Tenacity and Persistence.",
              },
            ],
          },
          {
            stepId: 3,
            type: "dropdownScenario",
            question:
              "A child who struggles to write (Dysgraphia) builds small, intricate objects with scraps found around the classroom during free time.",
            options: [
              {
                id: "1",
                text: "Deep Curiosity and High Engagement.",
              },
              {
                id: "2",
                text: "Creativity and Exceptional Spatial Thinking.",
              },
              {
                id: "3",
                text: "Empathy and Prosocial Behavior.",
              },
              {
                id: "4",
                text: "Tenacity and Persistence.",
              },
            ],
          },
          {
            stepId: 4,
            type: "dropdownScenario",
            question: `A child who seems restless and needs movement keeps helping others pick up fallen materials or books without being asked.`,
            options: [
              {
                id: "1",
                text: "Deep Curiosity and High Engagement.",
              },
              {
                id: "2",
                text: "Creativity and Exceptional Spatial Thinking.",
              },
              {
                id: "3",
                text: "Empathy and Prosocial Behavior.",
              },
              {
                id: "4",
                text: "Tenacity and Persistence.",
              },
            ],
          },
          {
            stepId: 5,
            type: "dropdownScenario",
            question:
              "A child with a significant Learning Difference struggles to write but never gives up until they finish the lengthy assignment, long after others have moved on.",
            options: [
              {
                id: "1",
                text: "Deep Curiosity and High Engagement.",
              },
              {
                id: "2",
                text: "Creativity and Exceptional Spatial Thinking.",
              },
              {
                id: "3",
                text: "Empathy and Prosocial Behavior.",
              },
              {
                id: "4",
                text: "Tenacity and Persistence.",
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
        id: 7,
        type: "video",
        videoSrc:
          "https://d3sc34m1n26ele.cloudfront.net/tot2_videos/Week+2/ToT_2_4.mp4",
        navigation: {
          prev: true,
          next: true,
        },
      },
      {
        id: 8,
        type: "question",
        questionType: "text",
        question: "Is Empathy the same as Compassion?",
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
          "https://d3sc34m1n26ele.cloudfront.net/tot2_videos/Week+2/ToT_2_5.mp4",
        navigation: {
          prev: true,
          next: true,
        },
      },
    ],
  },
  week3: {
    title: "Understanding the Concept of Adaptability and Its Application",
    pages: [
      {
        id: 1,
        type: "video",
        videoSrc:
          "https://d3sc34m1n26ele.cloudfront.net/tot2_videos/Week+3/ToT_3_1.mp4",
        hasNextButton: true,
      },
      {
        id: 2,
        type: "question",
        question:
          "Quick question, when you plan a lesson, what usually comes first for you?",
        options: [
          {
            id: "A",
            text: "The content to cover",
          },
          {
            id: "B",
            text: "The learners",
          },
          {
            id: "C",
            text: "The assessment",
          },
          {
            id: "D",
            text: "The time available ",
          },
        ],
        correctOption: "B",
      },
      {
        id: 3,
        type: "video",
        videoSrc:
          "https://d3sc34m1n26ele.cloudfront.net/tot2_videos/Week+3/ToT_3_2.mp4",
        navigation: {
          prev: true,
          next: true,
        },
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
          "https://d3sc34m1n26ele.cloudfront.net/tot2_videos/Week+4/ToT_4_1.mp4",
        hasNextButton: true,
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
          "https://d3sc34m1n26ele.cloudfront.net/tot2_videos/Week+5/ToT_5_1.mp4",
        hasNextButton: true,
      },
      {
        id: 2,
        type: "question",
        questionType: "text",
        question:
          "How confident do you feel speaking to parents about learning or behaviour concerns?",
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
          "https://d3sc34m1n26ele.cloudfront.net/tot2_videos/Week+5/ToT_5_2.mp4",
        hasNextButton: true,
      },
    ],
  },
};
