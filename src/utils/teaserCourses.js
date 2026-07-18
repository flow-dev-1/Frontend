export const TEASER_COURSE_IDS = [
  "6a4b61506661e58365e9ceb4",
  "6a4b616d6661e58365e9ceb5",
];

export const TEASER_ALLOWED_SCHOOL_ID = "673210c0f28242d1d71ba39f";

const normalizeId = (value) => {
  if (!value) return "";
  if (typeof value === "string") return value;
  if (value._id && value._id !== value) return normalizeId(value._id);
  return value.toString?.() || "";
};

export const canUserViewTeaserCourses = (user) => {
  const schoolId = user?.isSchool
    ? normalizeId(user?._id)
    : normalizeId(user?.school);

  return schoolId === TEASER_ALLOWED_SCHOOL_ID;
};

export const isTeaserCourse = (course) => {
  const courseId = normalizeId(course?._id || course?.course?._id);
  return TEASER_COURSE_IDS.includes(courseId);
};

export const filterTeaserCoursesForUser = (courses = [], user) => {
  if (canUserViewTeaserCourses(user)) return courses;
  return courses.filter((course) => !isTeaserCourse(course));
};
