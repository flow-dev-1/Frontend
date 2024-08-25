// Import images dynamically

const importAll = (r) => {
  let images = {};
  r.keys().forEach((item) => { images[item.replace('./', '')] = r(item); });
  return images;
};

// Use `require.context` to import all images in a directory
const images = importAll(require.context('../../../../../../assets/selfawareness-images/mindset-images', false, /\.(png|jpe?g|svg)$/));


const imageMap = {
    "Generosity": "generosity.png",
    "Respect": "respect.png",
    "Leadership": "leadership.png",
    "Responsibility": "responsibility.png",
    "Integrity": "integrity.png",
    "Empathy": "empathy.png",
    "Compassion": "compassion.png",
    "Gratitude": "gratitude.png",
    "Courage": "courage.png",
    "Forgiveness": "forgiveness.png",
    "Perseverance": "perseverance.png",
    "Cooperation": "cooperation.png",
    "Kindness": "kindness.png",
    "Tolerance": "tolerance.png",
    "Patience": "patience.png",
    "Friendship": "friendship.png",
    "Teamwork": "teamwork.png",
    "Organization": "organization.png",
    "Grit": "grit.png",
    "Resilience": "resilience.png",
    "Adaptability": "adaptability.png",
    "Contentment": "contentment.png",
    "Honor": "honor.png",
    "Moderation": "moderation.png",
    "Spirituality": "spirituality.png",
    "Healthy Life": "healthy_life.png",
    "Family": "family.png",
    "Resourcefulness": "resourcefulness.png",
    "Mindfulness": "mindfulness.png",
    "Creativity": "creativity.png",
    "Curiosity": "curiosity.png",
    "Punctuality": "punctuality.png",
    "Courtesy": "courtesy.png",
    "Self-control": "self_control.png",
    "Self-discipline": "self_discipline.png",
    "Optimism": "optimism.png"
  }
  

// Map values to actual images
const mappedImages = Object.fromEntries(
  Object.entries(imageMap).map(([key, value]) => [key, images[value]])
);

export default mappedImages;