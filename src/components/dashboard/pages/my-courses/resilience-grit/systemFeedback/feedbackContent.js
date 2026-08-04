const resilienceGritSystemFeedback = {
  1: {
    2: "Resilience is the ability to bounce back after facing a challenge, much like a rubber band that stretches and snaps back into shape.",
    4: "Reflecting on times we've overcome difficulty helps us recognise the resilience we already have. Every challenge we push through, big or small, builds our confidence to face the next one.",
    6: "Grit is the determination to stick with something over the long haul, even when it's difficult or tiring. While resilience helps us bounce back from setbacks, grit keeps us moving toward a goal until we reach it.",
    8: "Resilience and grit often work together, but they show up differently. Resilience is about recovering after something goes wrong, while grit is about staying focused and passionate about a goal over time.",
    10: "Adding the word \"yet\" to a struggle reminds us that not being able to do something now doesn't mean we never will. This is part of being resilient.",
  },
  2: {
    2: "Just like a building needs a strong foundation to stand, resilience is built on solid foundations too. When one of those foundations is missing, it can be harder to stay steady when life gets challenging.",
    4: "The 7 C's are the building blocks of resilience, and understanding what each C means helps us see which strengths we already have and which ones we can keep developing.",
  },
  3: {
    2: "Adaptability is the ability to adjust to new situations or changes as soon as possible.",
    4: "Adaptability doesn't mean liking every change or always agreeing with it, it means knowing how to handle change when it happens. Being able to tell this difference helps you process your emotions the right way when a sudden change comes up.",
  },
  4: {
    2: "A support system is made up of the people who help you stay strong and bounce back when life gets tough, like family, friends, or mentors.",
    4: "Having people we trust and can rely on is a key part of resilience. They're like a safety net that catches us and helps us get back up. A strong support system doesn't need to be large; it just needs to be made up of people who genuinely care about you.",
    6: "Mapping out our support system helps us see who we can turn to and reminds us that we don't have to face challenges alone. Just like a garden, these relationships grow stronger when we invest time in nurturing them.",
  },
  5: {
    2: "Coping means finding ways to manage stress, tough emotions, or challenges in a healthy way. It's like having a first aid kit for accidents.",
    6: "Different situations call for different coping strategies, whether that's deep breaths before a test or talking to someone after an argument. It's okay to practice different skills when you're in a tough situation until you feel calm.",
  },
};

export const getResilienceGritSystemFeedback = (week, page) =>
  resilienceGritSystemFeedback[week]?.[page] || null;

export default resilienceGritSystemFeedback;
