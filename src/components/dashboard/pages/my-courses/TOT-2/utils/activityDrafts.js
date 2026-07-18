const DRAFT_PREFIX = "flow-tot2-activity-draft";

const getDraftKey = (userAnswers, pageId) => {
  const enrollmentId = userAnswers?.courseEnrollmentId || "unknown-enrollment";
  const week = userAnswers?.week || "unknown-week";

  return `${DRAFT_PREFIX}:${enrollmentId}:week-${week}:page-${pageId}`;
};

export const getActivityDraft = (userAnswers, pageId) => {
  if (pageId == null) return undefined;

  try {
    const rawDraft = localStorage.getItem(getDraftKey(userAnswers, pageId));
    return rawDraft ? JSON.parse(rawDraft) : undefined;
  } catch {
    return undefined;
  }
};

export const saveActivityDraft = (userAnswers, pageId, answer) => {
  if (pageId == null) return;

  try {
    localStorage.setItem(
      getDraftKey(userAnswers, pageId),
      JSON.stringify(answer),
    );
  } catch {
    // Draft storage is best-effort only.
  }
};

export const clearActivityDraft = (userAnswers, pageId) => {
  if (pageId == null) return;

  try {
    localStorage.removeItem(getDraftKey(userAnswers, pageId));
  } catch {
    // Draft storage is best-effort only.
  }
};
