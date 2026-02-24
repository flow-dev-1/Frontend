import { useNavigate } from "react-router-dom";
import { Icon } from '@iconify/react';
import sadEmoji from '../../../assets/selfawareness-images/sadEmoji.png';
import okayEmoji from '../../../assets/selfawareness-images/okayEmoji.png';
import happyEmoji from '../../../assets/selfawareness-images/happyEmoji.png';
import { useMutation } from '@tanstack/react-query';
import userService from '../../../services/api/user';
import { useSelector, useDispatch } from 'react-redux';
import { userAnswer, updateData } from '../../../redux/reducers/userAnswersReducer';
import { toast } from 'react-toastify';


export default function ReviewPopUp({ closeReviewPopUp }) {
    const dispatch = useDispatch();
    const userAnswers = useSelector(userAnswer);
    const navigate = useNavigate();

    const handleClose = () => {
        console.log('handleClose called, closeReviewPopUp:', closeReviewPopUp);
        if (closeReviewPopUp) {
            closeReviewPopUp();
        }
    };

    const handleEmojiClick = (value) => {
        console.log('handleEmojiClick called with:', value);
        console.log('userAnswers.course:', userAnswers?.course);

        // If we have course data, try to submit feedback
        if (userAnswers?.course && value) {
            mutation.mutate({ reaction: value });
        } else {
            // If no course data, show a message and close immediately
            toast.info('Thanks for your feedback!');
            handleClose();
        }
    };

    // Mutation for saving user feedback
    const mutation = useMutation({
        mutationFn: (data) => userService.submitUserCourseReaction(userAnswers.course, data.reaction),
        onSuccess: (data) => {
            console.log('Mutation success, closing modal');
            toast.dismiss();
            toast.success('Your feedback is really appreciated!');
            dispatch(updateData({
                course: null,
                courseEnrollmentId: null,
                week: 1,
                activities: [],
                assessments: []
            }));
            handleClose();
        },
        onError: (error) => {
            console.log('Mutation error:', error);
            toast.dismiss();
            toast.error(error?.message || error?.error || 'Error submitting feedback');
            // Still close the modal on error
            handleClose();
        },
    });

    return (
        <div className='review-popup modal-content'>
            <div className="">
                <h1 className="review">
                    Review this Course
                </h1>
                <p className="text-center my-5">Kindly help us with your feedback.
                    This will help us make this course better.
                </p>
                <div className="d-flex  review-buttons">
                    <button className="btn sad" onClick={() => handleEmojiClick("dislike")} disabled={mutation.isPending}>
                        <img src={sadEmoji} alt="sadEmoji" />
                        <p className="text-center mt-2">Sad</p>
                    </button>
                    <button className="btn sad" onClick={() => handleEmojiClick("neutral")} disabled={mutation.isPending}>
                        <img src={okayEmoji} alt="okayEmoji" />
                        <p className="text-center mt-2">Okay</p>
                    </button>
                    <button className="btn sad" onClick={() => handleEmojiClick("like")} disabled={mutation.isPending}>
                        <img src={happyEmoji} alt="happyEmoji" />
                        <p className="text-center mt-2">Happy</p>
                    </button>
                </div>
            </div>
        </div>
    )
}