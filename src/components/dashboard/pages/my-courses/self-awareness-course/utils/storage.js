export const getSelfAwarenessActivityProgressKey = (enrollmentId, week) =>
  `flow-self-awareness-${enrollmentId}-week-${week}-currentActivity`;

export const getSelfAwarenessActivityDataKey = (enrollmentId, week) =>
  `flow-self-awareness-${enrollmentId}-week-${week}-activityData`;

export const getLegacySelfAwarenessActivityProgressKey = (week) =>
  `week-${week}-currentActivity`;

export const getLegacySelfAwarenessActivityDataKey = (week) =>
  `week-${week}-activityData`;

export const readSelfAwarenessStorage = (
  primaryKey,
  fallbackKey,
  defaultValue
) => {
  const readKey = (key) => {
    if (!key) return null;

    try {
      const value = localStorage.getItem(key);
      return value ? JSON.parse(value) : null;
    } catch (error) {
      return null;
    }
  };

  const primaryValue = readKey(primaryKey);
  if (primaryValue !== null) return primaryValue;

  const fallbackValue = readKey(fallbackKey);
  return fallbackValue !== null ? fallbackValue : defaultValue;
};

export const canWriteSelfAwarenessStorage = () =>
  Boolean(localStorage.getItem("Flow-Auth-Token") || localStorage.getItem("persist:root"));

export const writeSelfAwarenessStorage = (key, value) => {
  if (!key) return;
  if (!canWriteSelfAwarenessStorage()) return;
  localStorage.setItem(key, JSON.stringify(value));
};

export const writeSelfAwarenessRawStorage = (key, value) => {
  if (!key) return;
  if (!canWriteSelfAwarenessStorage()) return;
  localStorage.setItem(key, value);
};

export const mergeSelfAwarenessActivityDrafts = (
  remoteActivities = [],
  draftActivities = []
) => {
  const mergedActivities = [...remoteActivities];
  const remoteActivityIds = new Set(
    remoteActivities.map((activity) => Number(activity.activity))
  );

  draftActivities.forEach((draftActivity) => {
    if (!remoteActivityIds.has(Number(draftActivity.activity))) {
      mergedActivities.push(draftActivity);
    }
  });

  return mergedActivities;
};
