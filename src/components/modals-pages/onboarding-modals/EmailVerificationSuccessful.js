import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";

export default function EmailVerificationSuccessful({ from, email }) {
  const navigate = useNavigate();

  return (
    <div className="success-modal mx-3">
      <div
        className="d-flex flex-column align-items-center"
        style={{ width: "100%" }}
      >
        <div className="icon-with-bg">
          <Icon icon="octicon:check-circle-fill-16" className="rounded-icon" />
        </div>

        {from === "otp" || from === "resetPassword" ? (
          <h2 style={{ color: "#5B616A", fontSize: "40px" }}>Successful!</h2>
        ) : (
          <h2 style={{ color: "#5B616A", fontSize: "40px" }}>Email Sent!</h2>
        )}

        {from === "otp" ? (
          <p style={{ color: "#5B616A" }} className="text-center">
            You have successfully created your account.
          </p>
        ) : from === "resetPassword" ? (
          <p style={{ color: "#5B616A" }} className="text-center">
            You have successfully changed your password.
          </p>
        ) : (
          <p style={{ width: "100%", color: "#5B616A" }} className="my-3">
            A password reset link has been sent to <span>{email && email}</span>
          </p>
        )}

        {from === "otp" ? (
          <button
            onClick={() => {
              navigate("/sign-in");
            }}
            className="btn submit-btn  success "
            style={{ borderRadius: "5px", width: "110%", margin: ".5rem 0" }}
          >
            Proceed to Sign In
          </button>
        ) : from === "resetPassword" ? (
          <button
            onClick={() => {
              navigate("/sign-in");
            }}
            style={{
              borderRadius: "5px",
              marginBottom: "1rem",
              marginTop: ".5rem",
              padding: ".5rem 0",
              width: "110%",
            }}
            className="btn submit-btn "
          >
            Sign In
          </button>
        ) : null}
      </div>
    </div>
  );
}
