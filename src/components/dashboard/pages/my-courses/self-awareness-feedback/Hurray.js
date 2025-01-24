import React from "react";
import celebrate from "../../../../../assets/hurray.png";

const HurrayComponent = ({ points = 4 }) => {
  function getFeedBackMessage(points) {
    switch (true) {
      case points === 2:
        return "Keep trying! You scored 2 points!\n It looks like you might be struggling with understanding Emotional Intelligence.Your answers indicate that you need more guidance on recognizing and managing emotions effectively.Review the materials on Emotional Intelligence again, and consider discussing them with a teacher, parent, or mentor.Practice applying these concepts in your daily life and don’t hesitate to ask for help or additional resources to improve your understanding.";
      case points === 4:
        return "Nice effort! You scored 4 points!\n You have some understanding of Emotional Intelligence, but it appears that you might need more clarity on its full scope and impact. Your answers suggest that you could benefit from further reflection on these topics. Take time to learn more about the benefits of Emotional Intelligence and how to cultivate it. Consider discussing these concepts with a teacher or mentor for additional guidance.";
      case points === 6:
        return "Well done! You scored 6 points!\n You have a basic understanding of Emotional Intelligence, but there is room for improvement. Your answers indicate that you are on the right track, but you may need to think more about how to apply Emotional Intelligence consistently in various situations. Practice recognizing and managing emotions to deepen your understanding.";
      case points === 8:
        return "Great job! You scored 8 points!\n You have a good understanding of Emotional Intelligence. Your answers show that you recognize its significance and how it can impact your life positively. Focus on reinforcing your understanding and applying these concepts in real-life situations to further develop your emotional skills.";
      case points === 10:
        return "Congratulations! You scored 10 points!\n Excellent work! You have a strong understanding of Emotional Intelligence and its importance. Your answers reflect a good grasp of how managing and understanding emotions, both your own and others, can positively influence your life and relationships. Keep applying these principles to enhance your personal and professional interactions!";
      default:
        return "";
    }
  }
  return (
    <div>
      <div className="main-img">
        <img className="celebrate m-auto" src={celebrate} alt="celebrate" />
      </div>
      <div className="d-flex align-items-center justify-content-around mx-auto mt-5"></div>
      <p className="para">
        Congratulations on completing this journey of self-discovery and growth!
        Over the past weeks, you’ve explored what it means to be self-aware,
        learned how to identify and leverage your strengths, understood the
        importance of your values, and embraced a growth mindset. You’ve also
        gained insights into emotional intelligence, which will help you
        navigate relationships and challenges with empathy and resilience.
        Remember, self-awareness is an ongoing journey. The skills and knowledge
        you’ve acquired aren’t just for today—they’re tools you can use
        throughout your life to achieve your goals, overcome obstacles, and
        build meaningful connections. Keep reflecting on your experiences,
        continue to grow, and always stay true to yourself. Keep up the great
        work, and never stop learning!
      </p>
      <div className="blue-side">
        <h2> Overall Feedback</h2>
        {getFeedBackMessage(points)}
      </div>
    </div>
  );
};

export default HurrayComponent;
