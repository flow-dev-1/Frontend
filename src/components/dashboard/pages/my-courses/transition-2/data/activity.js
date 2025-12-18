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
        question: "Do you remember what we talked about last week?",
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
        type: "multiStep",
        steps: [
          {
            stepId: 1,
            type: "dropdownScenario",
            question: "Feeling calm and ready to learn",
            options: [
              {
                id: "A",
                text: "Blue",
                bgColor: "#0093FF",
                color: "white",
              },
              {
                id: "B",
                text: "Green",
                bgColor: "#27AE60",
                color: "white",
              },
              {
                id: "C",
                text: "Yellow",
                bgColor: "#FCF85D",
                color: "#5B616A",
              },
              {
                id: "D",
                text: "Red",
                bgColor: "#EE2447",
                color: "white",
              },
            ],
          },
          {
            stepId: 2,
            type: "dropdownScenario",
            question: "Low energy feeling like sadness or tiredness.",
            options: [
              {
                id: "A",
                text: "Blue",
                bgColor: "#0093FF",
                color: "white",
              },
              {
                id: "B",
                text: "Green",
                bgColor: "#27AE60",
                color: "white",
              },
              {
                id: "C",
                text: "Yellow",
                bgColor: "#FCF85D",
                color: "#5B616A",
              },
              {
                id: "D",
                text: "Red",
                bgColor: "#EE2447",
                color: "white",
              },
            ],
          },
          {
            stepId: 3,
            type: "dropdownScenario",
            question: `Feeling a little out of control with excitement or worry.`,
            options: [
              {
                id: "A",
                text: "Blue",
                bgColor: "#0093FF",
                color: "white",
              },
              {
                id: "B",
                text: "Green",
                bgColor: "#27AE60",
                color: "white",
              },
              {
                id: "C",
                text: "Yellow",
                bgColor: "#FCF85D",
                color: "#5B616A",
              },
              {
                id: "D",
                text: "Red",
                bgColor: "#EE2447",
                color: "white",
              },
            ],
          },
          {
            stepId: 4,
            type: "dropdownScenario",
            question: "Very big emotions like anger or extreme frustration.",
            options: [
              {
                id: "A",
                text: "Blue",
                bgColor: "#0093FF",
                color: "white",
              },
              {
                id: "B",
                text: "Green",
                bgColor: "#27AE60",
                color: "white",
              },
              {
                id: "C",
                text: "Yellow",
                bgColor: "#FCF85D",
                color: "#5B616A",
              },
              {
                id: "D",
                text: "Red",
                bgColor: "#EE2447",
                color: "white",
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
        videoSrc:
          "https://d3sc34m1n26ele.cloudfront.net/emotional_regulation_videos/Week+2/Week+2_3.mp4",
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
            type: "dualDropdownScenario",
            question:
              "If you see someone stomping their feet, yelling loudly, and feeling really, really upset, what do you think their energy level would be? Now, what zone is the person in?",
          },
          {
            stepId: 2,
            type: "dualDropdownScenario",
            question:
              "If you see someone giggling a lot, fidgeting in their seat, and feeling a little too silly, what do you think their energy level would be? . Now, what zone is the person in?",
          },
        ],
        dropdownOptions: {
          energyLevel: [
            { id: "A", text: "High", bgColor: "#27AE60", color: "white" },
            { id: "B", text: "Low", bgColor: "#EE2447", color: "white" },
          ],
          zoneOfRegulation: [
            { id: "A", text: "Blue", bgColor: "#0093FF", color: "white" },
            { id: "B", text: "Green", bgColor: "#27AE60", color: "white" },
            { id: "C", text: "Yellow", bgColor: "#FCF85D", color: "#5B616A" },
            { id: "D", text: "Red", bgColor: "#EE2447", color: "white" },
          ],
        },
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
        type: "multiStep",
        steps: [
          {
            stepId: 1,
            type: "dualDropdownScenario",
            question:
              "Elena just finished a long day at school and didn't get much sleep the night before. She feels sluggish and wants to lie down on the couch. What is Elena's enengy level, and which zone of regulation is she in?",
          },
          {
            stepId: 2,
            type: "dualDropdownScenario",
            question:
              "Jayden's soccer team just won a big match, and he's jumping up and down, cheering loudly. He can't stop smiling. What is Jayden's energy level, and which zone of regulation is he in?",
          },
          {
            stepId: 3,
            type: "dualDropdownScenario",
            question:
              "Kendra's little brother broke her favorite toy. She feels frustrated and starts yelling at him.What is Kendra's energy level, and which zone of regulation is she in?",
          },
          {
            stepId: 4,
            type: "dualDropdownScenario",
            question:
              "Liam is sitting quietly at his desk, working on his homework. He feels focused and calm. What is Liam's energy level, and which zone of regulation is he in?",
          },
          {
            stepId: 5,
            type: "dualDropdownScenario",
            question:
              "Priya's best friend moved to another city, and she misses her a lot. She doesn't feel like playing with her other friends today. What is Priya's energy level, and which zone of regulation is she in?",
          },
          {
            stepId: 6,
            type: "dualDropdownScenario",
            question:
              "Daniel is about to go on stage for his school play.He feels a bit nervous, his heart is racing, and his hands are sweaty. What is Daniel's energy level, and which zone of regulation is he in?",
          },
          {
            stepId: 7,
            type: "dualDropdownScenario",
            question:
              "Bella is playing outside with her friends, running around and laughing. She feels happy and full of energy. What is Bella's energy level, and which zone of regulation is she in?",
          },
          {
            stepId: 8,
            type: "dualDropdownScenario",
            question:
              "Carlos just found out that he didn't do well on his math test. He feels upset and frustrated, and he stants tearing up his test paper. What is Carlos' energy level, and which zone of regulation is he in?",
          },
        ],
        dropdownOptions: {
          energyLevel: [
            { id: "A", text: "High", bgColor: "#27AE60", color: "white" },
            { id: "B", text: "Low", bgColor: "#EE2447", color: "white" },
          ],
          zoneOfRegulation: [
            { id: "A", text: "Blue", bgColor: "#0093FF", color: "white" },
            { id: "B", text: "Green", bgColor: "#27AE60", color: "white" },
            { id: "C", text: "Yellow", bgColor: "#FCF85D", color: "#5B616A" },
            { id: "D", text: "Red", bgColor: "#EE2447", color: "white" },
          ],
        },
        navigation: { prev: true, next: true },
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
