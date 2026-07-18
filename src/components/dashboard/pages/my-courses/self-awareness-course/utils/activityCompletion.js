export const hasRequiredActivityIds = (activities, requiredActivityIds) => {
  const completedActivityIds = new Set(
    (Array.isArray(activities) ? activities : []).map((activity) =>
      Number(activity?.activity)
    )
  );

  return requiredActivityIds.every((activityId) =>
    completedActivityIds.has(activityId)
  );
};
