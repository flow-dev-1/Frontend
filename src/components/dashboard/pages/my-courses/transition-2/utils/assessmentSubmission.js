import { queryClient } from "../../../../../../queryClient";

export const syncTransition2AssessmentSubmission = async ({
  enrollmentId,
  week,
  assessment,
}) => {
  const courseDataQueryKey = [
    "dashboard-transition-2-course",
    enrollmentId,
    week,
  ];

  if (assessment) {
    queryClient.setQueryData(courseDataQueryKey, (previousData) => ({
      ...(previousData || {}),
      assessment,
    }));
  }

  await Promise.all([
    queryClient.invalidateQueries({ queryKey: courseDataQueryKey }),
    queryClient.invalidateQueries({
      queryKey: ["dashboard-transition-2-enrollment", enrollmentId],
    }),
    queryClient.invalidateQueries({
      queryKey: [
        `dashboard/transition2-feedback-${week}`,
        enrollmentId,
        week,
      ],
    }),
  ]);
};
