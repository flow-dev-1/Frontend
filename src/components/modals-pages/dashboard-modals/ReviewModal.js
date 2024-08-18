import { useNavigate } from "react-router-dom";
import { Icon } from '@iconify/react';
import sadEmoji from '../../../assets/selfawareness-images/sadEmoji.png';
import okayEmoji from '../../../assets/selfawareness-images/okayEmoji.png';
import happyEmoji from '../../../assets/selfawareness-images/happyEmoji.png';


export default function ReviewPopUp() {

    const navigate = useNavigate();

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
                    <button className="btn sad">
                        <img src={sadEmoji} alt="sadEmoji" />
                        <p className="text-center mt-2">Sad</p>
                        
                    </button>
                    <button className="btn sad">
                        <img src={okayEmoji} alt="okayEmoji" />
                        <p className="text-center mt-2">Okay</p>
                        
                    </button>
                    <button className="btn sad">
                        <img src={happyEmoji} alt="happyEmoji" />
                        <p className="text-center mt-2">Happy</p>
                        
                    </button>
                </div>
            </div>
        </div>
    )
}