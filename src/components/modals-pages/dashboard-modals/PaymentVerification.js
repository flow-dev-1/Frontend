import { useNavigate } from "react-router-dom";
import { Icon } from '@iconify/react';


export default function PaymentVerification() {

    const navigate = useNavigate();

    return (
        <div className='success-modal modal-content'>
            <div className="d-flex flex-column align-items-center">

                <div className="icon-with-bg ">
                    <Icon icon="octicon:check-circle-fill-16" className="rounded-icon" />
                </div>

                <h2>Successful!</h2>



                <p className="">You have successfully enrolled in the course</p>


                <button onClick={() => { navigate("/dashboard/my-courses", { replace: true }); }} className="btn submit-btn mt-5">proceed to Course</button>



            </div>
        </div>
    )
}