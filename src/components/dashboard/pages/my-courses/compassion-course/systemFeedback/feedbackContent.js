const compassionSystemFeedback = {
  1: {
    2: "Compassion is noticing when someone needs help, caring about how they feel, and taking action to support them. It helps us build stronger relationships and create a kinder environment for everyone around us.",
    4: "A theory is an explanation that helps us understand why something happens or how something works. Learning about theories can help us better understand people, situations, and the world around us.",
    6: "Compassion involves more than noticing that someone needs help. It includes understanding how they might feel and taking positive action to support them. Practicing ‘Seeing’, ‘Caring’, and ‘Doing’ can help you show compassion in your everyday life.",
  },
  2: {
    2: "Self-compassion means treating yourself with kindness, understanding, and patience, especially when you make mistakes or face challenges. It helps you learn, grow, and cope with difficult situations in a healthy way.",
    4: [
      "Everyone makes mistakes and faces challenges. Taking time to reflect on how you can respond more kindly to yourself helps build self-compassion and reminds you that growth often comes from learning, not from being perfect.",
      "Writing kind and encouraging words to yourself is a powerful way to practise self-compassion. The way you speak to yourself can affect how you feel, so learning to be supportive and understanding toward yourself is an important skill to develop.",
    ],
    6: "Understanding how you like to receive kindness and support can help you take better care of yourself and communicate your needs to others. Self-compassion starts with recognising what helps you feel understood, valued, and supported.",
  },
  3: {
    2: "Self-compassion means treating yourself with kindness, understanding, and patience, especially when things do not go as planned. It helps you learn from mistakes and support yourself through challenges.",
    4: "Compassion often begins with noticing when someone may need support. Small actions, such as checking in, listening, or offering kind words, can help someone feel seen, valued, and less alone.",
    6: "Receiving compassion from others can make us feel supported, understood, and cared for. Reflecting on these experiences can help us understand the positive impact our own acts of kindness can have on others.",
    8: "There are many ways to show compassion. Whether through kind words, helpful actions, patience, encouragement, or simply being present, small acts of care can make a meaningful difference in someone’s day.",
    10: "Recognising when we could have acted more compassionately is an important part of learning and growing. Taking time to apologise, acknowledge someone’s feelings, and offer kind words can help repair relationships and show genuine care for others.",
  },
  4: {
    2: "Compassion is about caring for others, but it is also important to think about your safety and boundaries. Different situations may require different responses, and showing compassion can sometimes mean finding a safe and appropriate way to help.",
    4: "The people in your life have different levels of closeness and trust. Understanding who belongs in your inner and outer circles can help you make thoughtful decisions about how you show care, offer support, and set healthy boundaries.",
    6: "Compassion can be shown in many different ways. Some actions are appropriate for people you know well, while others can be shown to almost anyone. Understanding the difference helps you practise kindness while also respecting personal boundaries and safety.",
  },
  5: {
    2: "Compassion involves noticing how others might be feeling, understanding their needs, and choosing actions that are helpful, respectful, and kind. Real-life situations are often complex, but taking time to consider another person's feelings can help you respond in a thoughtful and compassionate way.",
  },
};

export const getCompassionSystemFeedback = (week, page) =>
  compassionSystemFeedback[week]?.[page] || null;

export default compassionSystemFeedback;
