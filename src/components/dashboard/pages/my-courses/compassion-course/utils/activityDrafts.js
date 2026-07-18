const DRAFT_PREFIX = "flow-compassion-activity-draft";

const getDraftKey = (userAnswers, pageId) => {
  const enrollmentId = userAnswers?.courseEnrollmentId || "unknown-enrollment";
  const week = userAnswers?.week || "unknown-week";

  return `${DRAFT_PREFIX}:${enrollmentId}:week-${week}:page-${pageId}`;
};

export const getActivityDraft = (userAnswers, pageId) => {
  try {
    const draft = localStorage.getItem(getDraftKey(userAnswers, pageId));
    return draft ? JSON.parse(draft) : null;
  } catch (error) {
    return null;
  }
};

export const saveActivityDraft = (userAnswers, pageId, answer) => {
  try {
    localStorage.setItem(getDraftKey(userAnswers, pageId), JSON.stringify(answer));
  } catch (error) {
    // Local drafts are best-effort only.
  }
};

export const clearActivityDraft = (userAnswers, pageId) => {
  try {
    localStorage.removeItem(getDraftKey(userAnswers, pageId));
  } catch (error) {
    // Local drafts are best-effort only.
  }
};
