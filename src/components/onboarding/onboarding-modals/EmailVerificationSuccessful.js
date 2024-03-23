import { Link, useNavigate } from "react-router-dom";
import { Icon } from '@iconify/react';




export default function EmailVerificationSuccessful({ from }) {

    const navigate = useNavigate();

    return (
        <div className='success-modal modal-content'>
            <div className="d-flex flex-column align-items-center">

                <div className="icon-with-bg ">
                    <Icon icon="octicon:check-circle-fill-16" className="rounded-icon" />
                </div>

                {from === "otp" ? (<h2>Successful!</h2>) : (<h2>Email Sent!</h2>)}
                {/* // && from === "resetPassword" ? */}

                {from === "otp" ? (
                    <p className="">You have successfully created your account.</p>
                ) : from === "resetPassword" ? (<p className="">You have successfully changed your password.</p>)
                    : (
                        <p className="my-3">A  password reset link has been sent to <span>Morayo@flow.ng</span></p>
                    )
                }

                {from === "otp" ? (
                    <button onClick={() => { navigate("/signin"); }} className="btn submit-btn mt-5">Proceed to Sign In</button>
                ) : from === "resetPassword" ? (
                    <button onClick={() => { navigate("/signin"); }} className="btn submit-btn mt-5">Sign In</button>
                ) : null}


            </div>
        </div>
    )
}