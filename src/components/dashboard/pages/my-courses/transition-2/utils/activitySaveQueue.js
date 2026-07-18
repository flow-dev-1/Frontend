let activitySaveQueue = Promise.resolve();

export const queueTransition2ActivitySave = (saveOperation) => {
  const queuedSave = activitySaveQueue.then(saveOperation, saveOperation);

  activitySaveQueue = queuedSave.catch(() => undefined);
  return queuedSave;
};
