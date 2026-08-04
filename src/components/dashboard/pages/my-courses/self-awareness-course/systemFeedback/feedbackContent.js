const selfAwarenessSystemFeedback = {
  1: {
    2: "Nice thinking. Self-awareness is all about understanding yourself: your thoughts, feelings, strengths, and how they influence what you do. As we go on, you’ll build a clearer and deeper understanding of what this really looks like in your everyday life.",
    4: "Personality is what makes you uniquely you, it shows up in how you think, feel, and behave. As you continue, you’ll get a clearer picture of your own personality and what shapes it.",
    8: "Nice reflection. Thinking about which colour fits you helps you understand your patterns, strengths, and how you respond in different situations. Take a moment to connect your choice to real-life examples; this will make your understanding much stronger as you move forward.",
    14: "Thanks for sharing your result. Whether it matched what you expected or not, what matters is how it helps you learn about yourself. Think about the traits that stood out and when you see them in your daily life. This will help you understand yourself better over time.",
  },
  2: {
    2: "Strengths are the things you are good at or do well. Weaknesses are the things you find harder and may need more practice with. Both are important because they help you understand yourself and grow.",
    5: "Good work completing the checklist. It’s great to see you thinking about both your strengths and the areas where you can improve. Every human on earth has strengths and weaknesses (areas of improvement). There is no perfect human being so do not feel bad about your weaknesses.",
  },
  3: {
    2: "A mindset is the way you think about yourself, your abilities, and challenges. It shapes how you respond when things are easy or difficult, and it can change over time as you learn and grow.",
    4: "Most people are a mix of growth and fixed mindset, depending on the situation. The important thing is noticing how you think when things are easy or hard, so you can start to shift toward a growth mindset over time.",
    6: "Great reflection. You’ve shown that you understand the key ideas from the video. A clear, specific goal is powerful because it helps you know exactly what to do next and track your progress over time.",
  },
  4: {
    2: "Values are the beliefs and principles that guide your choices and actions. They help you decide what matters most to you and can influence the kind of person you want to be.",
    4: "The values you chose tell us what is important to you and can help explain many of the choices you make. Understanding your values is an important step toward understanding yourself and making decisions that feel right for you.",
    8: "Your core values are the beliefs that matter most to you. They can guide your decisions, shape your goals, and help you stay true to yourself, especially when facing difficult choices.",
  },
  5: {
    2: "Emotional intelligence is the ability to understand and manage your own emotions while also understanding the emotions of others. It helps you make better decisions, build stronger relationships, and respond thoughtfully in different situations.",
    4: "Recognising emotions is an important part of emotional intelligence. The better you become at identifying emotions in yourself and others, the easier it becomes to communicate, show empathy, and respond appropriately in different situations.",
    6: [
      "Emotional intelligence helps you understand yourself, manage your feelings, and communicate effectively with others. It can help you build healthy relationships, handle challenges calmly, and make thoughtful choices in everyday situations.",
      "Emotional intelligence involves thinking carefully about how your actions affect both yourself and others. In challenging situations, it can help you stay calm, understand different perspectives, communicate respectfully, and make choices that support your well-being and goals.",
    ],
    8: "Understanding how others might be feeling helps you respond with empathy and care. Paying attention to emotions can improve communication, strengthen relationships, and help create positive interactions with the people around you.",
  },
};

export const selfAwarenessWeekTwoScenarioFeedback = [
  "In situations like this, listening and showing empathy are the most important strengths. They help your friend feel understood and supported before any advice or solutions are given.",
  "Group work needs teamwork, clear communication, and sometimes someone to guide the group. These strengths help everyone stay organised, involved, and working toward the same goal.",
  "Determination and resilience are key here. They help you keep going even when you don’t feel like it, and push through challenges to finish strong.",
];

export const getSelfAwarenessSystemFeedback = (week, activity) =>
  selfAwarenessSystemFeedback[week]?.[activity] || null;

export default selfAwarenessSystemFeedback;
