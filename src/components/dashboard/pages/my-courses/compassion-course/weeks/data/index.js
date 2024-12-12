// Import both our data sources
import { courseContent } from "./activity";
import { assessments } from "./assessment";

//Gets course content for specific week and page
const getPageContent = (weekNumber, pageNumber) => {
  try {
    // Get week key (e.g., "week1")
    const weekKey = `week${weekNumber}`;

    // Check if week exists
    if (!courseContent[weekKey]) {
      return null;
    }

    // Find page by ID
    const page = courseContent[weekKey].pages.find(
      (page) => page.id === pageNumber
    );

    return page || null;
  } catch (error) {
    console.error("Error getting page content:", error);
    return null;
  }
};

//  Gets total pages for a specific week
export const getTotalPagesForWeek = (weekNumber) => {
  const weekKey = `week${weekNumber}`;
  return courseContent[weekKey]?.pages?.length || 0;
};

export default getPageContent;
