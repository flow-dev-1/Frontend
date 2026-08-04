const emotionalRegulationSystemFeedback = {
  1: {
    2: "Adjusting your emotions, actions, or body to match what’s happening around you.",
    4: "Emotional regulation means staying in control of your feelings or emotions instead of letting them control you.",
    6: "We all have many emotions, such as happiness, sadness, fear, excitement, joy, and calmness. These emotions help us understand how we feel and show on our faces and in our actions.",
    8: "The Blue Zone is a calm, low-energy zone. You may be in the Blue Zone when you feel tired, sad, bored, or sick.",
    10: "The Green Zone is when you have the right amount of energy and are ready for the day. You might feel happy, focused, excited, or ready to have fun.",
    12: "The Yellow Zone is when your emotions are stronger than usual. You might feel excited or a little anxious.",
    14: "The Red Zone is when your emotions feel very strong and overwhelming. You might feel angry, panicked, or frustrated, and it may be hard to stay in control.",
    15: "Every emotion you feel is valid. The goal is to understand your emotions and help them return to a balanced state.",
  },
  2: {
    2: "Last week, we learned about emotions, the different emotion zones, and what each color tells us about how we're feeling.",
    4: "Our emotions give us clues about how we're feeling. The zones help us recognize those feelings so we can respond in a healthy way.",
    6: "A person's energy level and emotions can help us identify which zone they're in. Once we know the zone, we can choose the best way to respond.",
    8: "Understanding a person's emotions and energy level helps you identify their zone and respond in the best way. The more you practice, the better you'll become at recognizing emotions in yourself and others.",
  },
  3: {
    2: "Using the SONAR method helps you pause, understand your emotions, and choose a healthy way to respond. Remember, emotions aren't meant to control you—they're meant to guide you. The more you practice, the easier it becomes to respond thoughtfully instead of reacting impulsively.",
  },
  4: {
    2: "We learned about emotional regulation and how the SONAR method helps us manage our emotions. SONAR stands for Stop, Observe, Name, Act, and Reflect. These five steps help us pause, understand our feelings, choose healthy responses, and learn from our experiences.",
    4: "Every emotion is valid, but not every reaction is helpful. By recognizing healthy and unhealthy coping skills, you're learning how to manage your emotions in positive and responsible ways.",
  },
  5: {
    2: "Identifying your zone is only the first step. Choosing the right coping skill helps you regulate your emotions and respond in healthy, positive ways.",
    3: "You've completed this lesson on emotional regulation. Remember, every emotion is valid. By recognizing your emotions, identifying your zone, and choosing healthy coping skills, you can respond thoughtfully and make positive choices every day.",
  },
};

export const getEmotionalRegulationSystemFeedback = (week, page) =>
  emotionalRegulationSystemFeedback[week]?.[page] || null;

export default emotionalRegulationSystemFeedback;
