import feeling1 from "../../../../../../../../../assets/tot-images/feeling1.png";
import feeling2 from "../../../../../../../../../assets/tot-images/feeling2.png";
import feeling3 from "../../../../../../../../../assets/tot-images/feeling3.png";
import feeling4 from "../../../../../../../../../assets/tot-images/feeling4.png";
import feeling5 from "../../../../../../../../../assets/tot-images/feeling5.png";

import { useMutation } from '@tanstack/react-query';
// import userService from "../../../../../../services/api/user";
import { useSelector, useDispatch } from "react-redux";
// import { userAnswer, updateData } from "../../../../../../redux/reducers/userAnswersReducer";
import { toast } from "react-toastify";
// import { adminData } from "../../../../../../redux/reducers/adminReducer";
// import user from "../../../../../../services/api/user";
import "../page4.css"

export default function Feeling() {
  const dispatch = useDispatch();
  // const userAnswers = useSelector(userAnswer);
  // const adminDatas = useSelector(adminData);

  const handleEmojiClick = (value) => {

    // if (adminDatas.isAdmin){
    //   dispatch(hideReviewPopup());
    //   return 
    //   // window.close();
    // } 
    // if (!userAnswers.course || !value) {
    //   toast.error("Something went wrong!")

    //   // This is the correct thing. Temprory commented out!
    //   return
    // }
    // mutation.mutate({ reaction: value })
  }

  // Mutation for saving user feedback
  // const mutation = useMutation({
  //   mutationFn: (data) => userService.submitUserCourseReaction(userAnswers.course, data.reaction), // Dispatch saveAssessment action
  //   onSuccess: (data) => {

  //     toast.dismiss()

  //     toast.success('Your feedback is really appreciated!'); // Show success toast
  //     dispatch(updateData({
  //       course: null,
  //       courseEnrollmentId: null,
  //       week: 1,
  //       activities: [],
  //       assessments: []
  //     }))
  //     dispatch(hideReviewPopup());
  //     // dispatch(navigateNext())
  //   },
  //   onError: (error) => {
  //     console.log(error, "errorrrr")
  //     toast.dismiss()
  //     toast.error(error?.message || error?.error || 'Error submiting feedback'); // Show error toast
  //   },
  // });


  return (
    <div 
      className="modal-content position-absolute p-4 feeling-modal"
    >
      <div className="tot-text">
        <div className="px-5 text-center">
          <h1 className="text-blue mb-4">
            How are you feeling today?
          </h1>
        </div>

        <div className="d-flex justify-content-center review-buttons gap-3">
          <button className="btn sad"
          // onClick={() => handleEmojiClick("dislike")} disabled={mutation.isPending}
          >
            <img src={feeling1} alt="sadEmoji" />
            <p className="text-center mt-2">Sad</p>
          </button>
          <button className="btn sad"
          // onClick={() => handleEmojiClick("neutral")} disabled={mutation.isPending}
          >
            <img src={feeling2} alt="okayEmoji" />
            <p className="text-center mt-2">Okay</p>
          </button>
          <button className="btn sad"
          // onClick={() => handleEmojiClick("like")} disabled={mutation.isPending}
          >
            <img src={feeling3} alt="happyEmoji" />
            <p className="text-center mt-2">Happy</p>
          </button>
          <button className="btn sad"
          // onClick={() => handleEmojiClick("neutral")} disabled={mutation.isPending}
          >
            <img src={feeling4} alt="okayEmoji" />
            <p className="text-center mt-2">Okay</p>
          </button>
          <button className="btn sad"
          // onClick={() => handleEmojiClick("like")} disabled={mutation.isPending}
          >
            <img src={feeling5} alt="happyEmoji" />
            <p className="text-center mt-2">Happy</p>
          </button>
        </div>
      </div>
    </div>
  );
}
