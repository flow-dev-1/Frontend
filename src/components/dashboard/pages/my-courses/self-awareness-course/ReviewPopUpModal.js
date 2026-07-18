import { useNavigate } from 'react-router-dom'
import sadEmoji from '../../../../../assets/selfawareness-images/sadEmoji.png'
import okayEmoji from '../../../../../assets/selfawareness-images/okayEmoji.png'
import happyEmoji from '../../../../../assets/selfawareness-images/happyEmoji.png'
// import { hideReviewPopup } from "../../../../../../redux/reducers/navigationSlice";
import { useMutation } from '@tanstack/react-query';
import userService from "../../../../../services/api/user";
import { useSelector, useDispatch } from "react-redux";
import { userAnswer, updateData } from "../../../../../redux/reducers/userAnswersReducer";
import { toast } from "react-toastify";

export default function ReviewPopUpModal({closeModal}) {
  const dispatch = useDispatch();
  const userAnswers = useSelector(userAnswer);

  console.log(userAnswers, "userAnswers")

  const handleEmojiClick = (value) => {

    if (!userAnswers.course || !value) {
      toast.error("Something went wrong!")
      return
    }
    mutation.mutate({ reaction: value })
  }

  // Mutation for saving user feedback
  const mutation = useMutation({
    mutationFn: (data) => userService.submitUserCourseReaction(userAnswers.course, data.reaction), // Dispatch saveAssessment action
    onSuccess: (data) => {

      toast.dismiss()

      toast.success('Your feedback is really appreciated!'); // Show success toast
      dispatch(updateData({
        course: null,
        courseEnrollmentId: null,
        week: 1,
        activities: [],
        assessments: []
      }))

      closeModal()
      // dispatch(hideReviewPopup());
      // dispatch(navigateNext())
    },
    onError: (error) => {
      console.log(error, "errorrrr")
      toast.dismiss()
      toast.error(error?.message || error?.error || 'Error submiting feedback'); // Show error toast
    },
  });


  return (
    <div className='review-popup modal-content'>
      <div className=''>
        <h1 style={{ margin: '0 auto' }} className='review'>
          Review this Course
        </h1>
        <p className='text-center my-2'>
          Kindly help us with your feedback. <br /> This will help us make this
          course better.
        </p>
        <div
          className='d-flex  review-buttons'
        >
          <button className='btn sad' onClick={() => handleEmojiClick("dislike")} disabled={mutation.isPending}>
            <img src={sadEmoji} alt='sadEmoji' />
            <p className='text-center mt-2'>Sad</p>
          </button>
          <button className='btn sad' onClick={() => handleEmojiClick("neutral")} disabled={mutation.isPending}>
            <img src={okayEmoji} alt='okayEmoji' />
            <p className='text-center mt-2'>Okay</p>
          </button>
          <button className='btn sad' onClick={() => handleEmojiClick("like")} disabled={mutation.isPending}>
            <img src={happyEmoji} alt='happyEmoji' />
            <p className='text-center mt-2'>Happy</p>
          </button>
        </div>
      </div>
    </div>
  )
}
