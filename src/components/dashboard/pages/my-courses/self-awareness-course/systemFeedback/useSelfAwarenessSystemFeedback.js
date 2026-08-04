import { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { adminData } from '../../../../../../redux/reducers/adminReducer.js';
import { getSelfAwarenessSystemFeedback } from './feedbackContent.js';

export default function useSelfAwarenessSystemFeedback(week, setCurrentActivity) {
  const adminDatas = useSelector(adminData);
  const [feedback, setFeedback] = useState(null);
  const [pendingActivity, setPendingActivity] = useState(null);

  const advanceAfterSave = useCallback((completedActivity, nextActivity) => {
    const message = adminDatas.isAdmin
      ? null
      : getSelfAwarenessSystemFeedback(week, completedActivity);

    if (!message) {
      setCurrentActivity(nextActivity);
      return;
    }

    setPendingActivity(nextActivity);
    setFeedback(message);
  }, [adminDatas.isAdmin, setCurrentActivity, week]);

  const continueAfterFeedback = useCallback(() => {
    if (pendingActivity === null) return;
    setFeedback(null);
    setCurrentActivity(pendingActivity);
    setPendingActivity(null);
  }, [pendingActivity, setCurrentActivity]);

  return {
    advanceAfterSave,
    continueAfterFeedback,
    feedback,
    isAdmin: adminDatas.isAdmin,
  };
}
