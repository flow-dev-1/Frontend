export const courseContent = {
  week1: {
    title: "Introduction to Compassion",
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
        question: "What do you understand by the word",
        hasImage: true,
        imageSrc: "compassion.png",
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
        question: "What do you understand by the word",
        hasImage: true,
        imageSrc: "theory.png",
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
        type: "multiStep",
        steps: [
          {
            stepId: 1,
            type: "instruction",
            title: "Seeing, Caring and Doing!",
            instructions:
              "Read the following scenarios, and apply the Seeing, Caring and Doing Principle of Compassion.",
          },
          {
            stepId: 2,
            type: "scenario",
            title:
              "A classmate is sitting alone at lunch, looking sad. You notice they haven't touched thier food.",
            questions: [
              {
                type: "Seeing",
                question: "What do you notice about the situation?",
              },
              {
                type: "Caring",
                question: "What do you think your classmate might be feeling?",
              },
              {
                type: "Doing",
                question: "What could you do to show compassion?",
              },
            ],
          },
          {
            stepId: 3,
            type: "scenario",
            title:
              "You see a new student struggling to find their way around the school, looking lost and unsure of where to go.",
            questions: [
              {
                type: "Seeing",
                question: "What do you notice about the situation?",
              },
              {
                type: "Caring",
                question: "What do you think the new student might be feeling?",
              },
              {
                type: "Doing",
                question: "What could you do to show compassion?",
              },
            ],
          },
          {
            stepId: 4,
            type: "scenario",
            title:
              "Your friend did'nt do well on a test they studied hard for and seems very disappointed.",
            questions: [
              {
                type: "Seeing",
                question: "What do you notice about the situation?",
              },
              {
                type: "Caring",
                question: "What do you think your friend might be feeling?",
              },
              {
                type: "Doing",
                question: "What could you do to show compassion?",
              },
            ],
          },
          {
            stepId: 5,
            type: "scenario",
            title:
              "During recess, you notice a group of students excluding someone from a game. That student is standing alone, looking sad.",
            questions: [
              {
                type: "Seeing",
                question: "What do you notice about the situation?",
              },
              {
                type: "Caring",
                question: "What do you think the student might be feeling?",
              },
              {
                type: "Doing",
                question: "What could you do to show compassion?",
              },
            ],
          },
          {
            stepId: 6,
            type: "scenario",
            title:
              "You overhear a classmate being teased for a mistake they made during a presentation. They seem embarassed and are avoiding eye contact with others.",
            questions: [
              {
                type: "Seeing",
                question: "What do you notice about the situation?",
              },
              {
                type: "Caring",
                question: "What do you think your classmate might be feeling?",
              },
              {
                type: "Doing",
                question: "What could you do to show compassion?",
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
        videoSrc: "https://d3sc34m1n26ele.cloudfront.net/compassion_videos/Week+1/FLOW+1_4.mp4",
        navigation: {
          prev: true,
          next: true,
        },
      },
    ],
  },
  week2: {
    title: "Self-Compassion",
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
        question: "What do you understand by the word self-compassion?",
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
        videoSrc: "https://d3sc34m1n26ele.cloudfront.net/compassion_videos/Week+2/FLOW+2_2.mp4",
        navigation: {
          prev: true,
          next: true,
        },
      },
      {
        id: 4,
        type: "letter",
        title: "Write a letter to yourself.",
        instructions: [
          "Remember a time you made a mistake and judged yourself without empathy.",
          "Write a letter showing empathy and encouragement for yourself.",
        ],
        inputType: "textarea",
        textareaConfig: {
          placeholder: "Type your answer here...",
          rows: 5,
          cols: 80,
          styles: {
            maxWidth: "100%",
            fontSize: "25px",
          },
        },
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
      {
        id: 6,
        type: "reflection",
        prompts: [
          { id: 1, title: "I feel loved when", imgSrc: "heart-image.png" },
          { id: 2, title: "I feel cared for when", imgSrc: "hug-image.png" },
          { id: 3, title: "I need support when", imgSrc: "hug-image-2.png" },
          { id: 4, title: "I wish someone would", imgSrc: "wish-image.png" },
        ],
        inputType: "text",
        inputPlaceholder: "Type your answer here...",
        navigation: {
          prev: true,
          next: true,
        },
      },
      {
        id: 7,
        type: "video",
        videoSrc: "https://d3sc34m1n26ele.cloudfront.net/compassion_videos/Week+2/FLOW+2_4.mp4",
        navigation: {
          prev: true,
          next: true,
        },
      },
    ],
  },
  week3: {
    title: "Compassion in Action",
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
        question: "Do you remember what self-compassion is?",
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
        type: "interactiveScenario",
        steps: [
          {
            stepId: 1,
            type: "question",
            question:
              "Imagine you're at break-period, and you see a classmate sitting alone, looking upset. What would you do in this situation?",
            options: [
              { id: "A", text: "Go over and ask if they are okay." },
              {
                id: "B",
                text: "Ignore it; they probably want to be left alone.",
              },
              {
                id: "C",
                text: "Tell a teacher.",
              },
            ],
          },
          {
            stepId: 2,
            type: "feedback",
            message: {
              "A": "Great! Let's talk about why reaching out, even in a small way, can be a powerful act of compassion.",
              "B": "This can be handled better, try again to see what can be done differently.",
              "C": "If you immediately tell a teacher or an adult, ensure to follow up with the situation and encourage the person. However what we need you for this time is different."
            }
          }
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
        type: "question",
        questionType: "text",
        question:
          "Think about a time when someone helped you when you were feeling down. How did it make you feel?",
        inputType: "mediumTextBox",
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
      {
        id: 8,
        type: "listQuestion",
        question:
          "List five (5) other ways you think compassion can be shown to others.",
        inputCount: 5,
        inputType: "text",
        inputPlaceholder: "Type your answer here",
        navigation: {
          prev: true,
          next: true,
        },
      },
      {
        id: 9,
        type: "video",
        videoSrc: "https://d3sc34m1n26ele.cloudfront.net/compassion_videos/Week+3/FLOW+3_5.mp4",
        navigation: {
          prev: true,
          next: true,
        },
      },
      {
        id: 10,
        type: "Write a letter of Compassion to Others.",
        instructions: [
          "Can you remember a time when a friend needed your compassion, but you didn't offer it?",
          "Write a letter to this friend of yours, telling them that you're sorry for not being compassionate when they needed you, and offer them the kind words you wish you'd said back then.",
        ],
        inputType: "textarea",
        textareaConfig: {
          placeholder: "Type your answer here...",
          rows: 8,
          cols: 80,
          styles: {
            maxWidth: "100%",
            fontSize: "25px",
          },
        },
        navigation: {
          prev: true,
          next: true,
        },
      },
      {
        id: 11,
        type: "video",
        videoSrc: "https://d3sc34m1n26ele.cloudfront.net/compassion_videos/Week+3/FLOW+3_6.mp4",
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
          "If a stranger you never knew walked up to you and asked you to share your lunch with them because they were hungry. What would you do? Would you share your food with them to show compassion?",
        inputType: "mediumTextBox",
        navigation: {
          prev: true,
          next: true,
        },
      },
      {
        id: 3,
        type: "video",
        videoSrc: "https://d3sc34m1n26ele.cloudfront.net/compassion_videos/Week+4/FLOW+4_2.mp4",
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
          "Mum",
          "Dad",
          "Family friend",
          "Cousin",
          "Brother",
          "Sister",
          "Stranger",
          "Classmate",
          "Uncle",
          "Driver",
          "Best friend",
          "Teacher",
        ],
        bowls: [
          {
            id: "inner",
            label: "Inner Circle",
            count: 2,
          },
          {
            id: "outer",
            label: "Outer Circle",
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
        videoSrc: "https://d3sc34m1n26ele.cloudfront.net/compassion_videos/Week+4/Week+4_3.mp4",
        navigation: {
          prev: true,
          next: true,
        },
      },
      {
        id: 6,
        type: "imageDragAndDrop",
        instruction:
          "Drag-and-drop the statements on the left into any of these bowls",
        images: [
          "Helping with chores at home.",
          "Helping an elderly neighbor with groceries.",
          "Smiling at someone who looks upset.",
          "Standing up for someone being bullied.",
          "Holding the door open for a stranger.",
          "Helping a classmate with a school project.",
          "Listening when someone needs to talk.",
          "Being kind and respectful in your daily interactions.",
          "Preparing a meal for a sick family member.",
          "Picking up litter in a public park.",
        ],
        buckets: [
          {
            id: "green",
            label: "Inner Circle",
            image: "Green Bucket.svg",
          },
          {
            id: "orange",
            label: " Outer Circle",
            image: "Orange Bucket.svg",
          },
          {
            id: "red",
            label: "Both",
            image: "Red Bucket.svg",
          },
        ],
        steps: 10,
        currentStep: 1,
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
        type: "multiScenario",
        scenarios: [
          {
            id: 1,
            title: "Scenario 1",
            type: "question",
            question: "Your Friend Forgot Their Homework at Home.",
            options: [
              {
                id: "A",
                text: "You notice your friend is upset and say, \"I'm sorry you forgot your homework,\" but don't offer further help.",
              },
              {
                id: "B",
                text: 'You notice your friend is upset, express concern by saying, "I can see you\'re feeling worried about forgetting your homework." You then offer to share your notes and help them prepare for the class discussion.',
              },
              {
                id: "C",
                text: 'You tell your friend, "I\'ll help by talking to the teacher with you," and offer to go with them to explain the situation to the teacher.',
              },
            ],
          },
          {
            id: 2,
            type: "feedback",
            feedback: {
              A: "It's good that you expressed concern by acknowledging their situation, but compassion involves more than just words. You noticed your friend's worry (Observation), but you didn't take any steps to actively help (Request). True compassion means going beyond just recognizing a problem and offering support when possible.",
              B: "Great job! By choosing Option B, you've shown true compassion. You observed your friend's situation and acknowledged their feelings by saying they are worried (Observation & Feeling). You understood their need for help (Need) and offered assistance by sharing your notes and helping them prepare. Offering practical support for the class discussion directly addresses their emotional and academic needs, showing real compassion.",
              C: "It's great that you're taking initiative to help your friend by offering to speak to the teacher. This is a thoughtful way to address their need (Need). However, it's important to confirm with your friend first that they are comfortable with you involving the teacher. Compassion also means respecting their feelings and ensuring they're okay with the approach you take",
            },
          },
          {
            id: 3,
            title: "Scenario 2",
            type: "question",
            question:
              "You Go Out with Your Family to Dinner and Your Sibling is Rude to the Waiter.",
            options: [
              {
                id: "A",
                text: "Politely apologize to the waiter for your sibling's behavior and thank them for their service.",
              },
              {
                id: "B",
                text: "Ignore the situation and eat your food quietly.",
              },
              {
                id: "C",
                text: "Suggest to your family that you all leave a generous tip to make up for the rudeness.",
              },
            ]
          },
          {
            id: 4,
            type: "feedback",
            feedback: {
              A: "Great job! Apologizing to the waiter and being extra polite shows compassion and respect, making the waiter feel valued despite the rudeness. Also note that option C is not an act of compassion as giving the waiter money in that instant will be more of an insult than a compassionate act. Apologizing is the best way to show compassion to the waiter; this will also communicate to your sibling that they were wrong and probably make them feel sorry too.",
              B: "Oh, did you choose Option B? Ignoring the situation might seem like the easiest choice, but it doesn't help anyone. The waiter might still feel hurt, and your sibling won't learn how to treat others kindly. When we notice someone is being treated unfairly, it's important to speak up politely or show kindness in some way.",
              C: "If you choose Option C Understand that leaving a tip is a nice gesture, but in this case, it's not enough to fix the problem. Giving the waiter money won't make them feel respected. What they really need is for someone to say sorry and acknowledge their feelings. Showing kindness through words is more powerful than giving money in this situation.",
            },
          },
          {
            id: 5,
            title: "Scenario 3",
            type: "question",
            question:
              "A New Boy Comes to Class and is Nervous About Joining Others to Play.",
            options: [
              {
                id: "A",
                text: "Invite him to join your group and introduce him to other classmates.",
              },
              {
                id: "B",
                text: "Casually remind yourself it's not your responsibility to make new students feel welcome.",
              },
              {
                id: "C",
                text: "Pull him into the game without his permission.",
              },
            ],
          },
          {
            id: 6,
            type: "feedback",
            feedback: {
              A: "Did you choose Option A? Great job! Inviting him and giving him the option to choose to participate or not is a very compassionate act. However, pulling him into the game without his permission and ignoring him are not acts of compassion.",
              B: "If you choose Option B, Understand that, while it might feel like it's not your job to welcome others, we all play a part in making people feel included. Imagine if you were new and nervous—having someone reach out can make a big difference. Showing kindness and helping others feel comfortable is always a great thing to do.",
              C: "Option C might seem like you're helping by pulling him into the game, but forcing someone to do something can make them feel even more nervous. It's important to ask and give them the choice. When someone is new, they might need time to get comfortable, and being kind and patient can help them feel safe and ready to join when they're ready.",
            },
          },
          {
            id: 7,
            title: "Scenario 4",
            type: "question",
            question: "Your Friend Failed a Test While You Scored the Highest.",
            options: [
              {
                id: "A",
                text: "Brag about your high score and tell them they should have studied harder.",
              },
              {
                id: "B",
                text: "Ignore their feelings and continue to celebrate your own success.",
              },
              {
                id: "C",
                text: "Encourage them by reminding them that one test doesn't define their abilities, and that you can help them study for the next one.",
              },
            ],
          }, {
            id: 8,
            type: "feedback",
            feedback: {
              A: "If you choose Option A, understand that bragging about your success might make your friend feel worse. It's important to celebrate your achievements, but not in a way that hurts others. Telling them they should have studied harder isn't very kind. Sometimes, people need support and encouragement instead of criticism when they feel down.",
              B: "Did you choose Option B? Not quite right, Ignoring your friend's feelings might make them feel even more alone. When someone is upset, it's important to be aware of how they're feeling and offer them comfort. You can still be proud of your success, but showing kindness and understanding to your friend can make them feel better and strengthen your friendship.",
              C: "Did you choose Option C? Great job! Encouraging your friend and reminding them that the test doesn't define their abilities is very good, and is a compassionate act. Ignoring their feelings and bragging about your score is not compassionate and not kind in any way.",
            },
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
        videoSrc: "https://d3sc34m1n26ele.cloudfront.net/compassion_videos/Week+5/Week+5_2.mp4",
        navigation: {
          prev: true,
          next: true,
        },
      },
    ],
  },
};
