import React from "react";
import logo from "../../../../../../assets/logo.png";

import checkedImage from "../../../../../../assets/checkedbox.png";
import uncheckedImage from "../../../../../../assets/uncheckedBox.png";

import confidentImg from "../../../../../../assets/transition-2-images/week1/page6/confident.png";
import independentImg from "../../../../../../assets/transition-2-images/week1/page6/independent.png";
import disciplinedImg from "../../../../../../assets/transition-2-images/week1/page6/disciplined.png";
import socialImg from "../../../../../../assets/transition-2-images/week1/page6/social.png";
import curiousImg from "../../../../../../assets/transition-2-images/week1/page6/curious.png";
import resilientImg from "../../../../../../assets/transition-2-images/week1/page6/resilient.png";
import creativeImg from "../../../../../../assets/transition-2-images/week1/page6/creative.png";
import leaderImg from "../../../../../../assets/transition-2-images/week1/page6/leader.png";

export default function VisionBoard({ answers }) {
  const options = [
    "Confident",
    "Independent",
    "Discplined",
    "Social",
    "Curious",
    "Resilent",
    "Creative",
    "Leader",
  ];

  const optionImageMap = {
    Confident: confidentImg,
    Independent: independentImg,
    Discplined: disciplinedImg,
    Social: socialImg,
    Curious: curiousImg,
    Resilent: resilientImg,
    Creative: creativeImg,
    Leader: leaderImg,
  };

  const handleCheckboxChange = (index) => {
    // placeholder if needed
  };

  return (
    <div
      className="pdf-root"
      style={{
        width: "794px", // fixed A4 width
        minHeight: "1123px", // A4 height
        padding: "40px",
        boxSizing: "border-box",
        backgroundColor: "#fff",
        fontFamily: "sans-serif",
      }}
    >
      {/* Logo */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "24px",
        }}
      >
        <img src={logo} alt="Logo" width={145} height={60} />
      </div>
      {/* Title */}
      <div style={{ textAlign: "center", marginBottom: "24px" }}>
        <p
          className="blue-fancy-rectangle"
          style={{
            display: "inline-block",
            padding: "8px 16px",
            fontSize: "32px",
            fontWeight: "bold",
            borderRadius: "12px",
            color: "#fff",
          }}
        >
          MY VISION BOARD
        </p>
      </div>
      {/* Instruction */}
      <p className="text-blue" style={{ fontWeight: "bold", fontSize: "16px" }}>
        1. Choose 3-4 that best describe your future self.
      </p>
      {/* Grid Section */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "16px",
          marginTop: "16px",
        }}
      >
        {options.map((option, index) => (
          <div
            className="shared-background"
            key={index}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              borderRadius: "10px",
              padding: "10px",
            }}
          >
            <div
              style={{
                width: "100%",
                height: "100px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img
                src={optionImageMap[option]}
                alt={option}
                style={{
                  maxWidth: "80px",
                  maxHeight: "80px",
                  objectFit: "contain",
                }}
              />
            </div>

            <div
              style={{
                backgroundColor: "#E5DBFC",
                width: "100%",
                borderRadius: "8px",
                marginTop: "-20px",
                padding: "10px",
                display: "flex",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <input
                type="checkbox"
                id={`checkbox-${index}`}
                onChange={() => handleCheckboxChange(index)}
                style={{ display: "none" }}
              />
              <label
                htmlFor={`checkbox-${index}`}
                style={{ cursor: "pointer" }}
              >
                <img
                  src={checkedImage}
                  alt=""
                  style={{ width: 20, height: 20 }}
                />
              </label>
              <span style={{ fontWeight: "bold", fontSize: "11px" }}>
                {option}
              </span>
            </div>
          </div>
        ))}
      </div>
      {/* Second question */}
      <p
        className="text-blue fw-bolder"
        style={{
          fontSize: "16px",
          marginTop: "24px",
        }}
      >
        2. Now, in a structured sentence, I want you to write your reason for
        your next step after secondary school. Why are you making that
        particular decision?
      </p>
      <p
        className="text-gray"
        style={{
          backgroundColor: "#F9FAFB",
          padding: "12px",
          borderRadius: "8px",
          minHeight: "80px",
          marginBottom: "24px",
        }}
      >
        {answers?.reason || "Lorem ipsum dolor sit amet consectetur..."}
      </p>
      {/* Third question */}
      <p className="text-blue fw-bolder" style={{ fontSize: "16px" }}>
        3. Choose the top 5 Values that matter most to you right now, then rank
        them from 1 to 5, with 1 being the most important.
      </p>
      {Array.from({ length: 5 }).map((_, i) => (
        <p
          key={i}
          style={{
            backgroundColor: "#F9FAFB",
            padding: "12px",
            borderRadius: "8px",
            marginBottom: "12px",
          }}
        >
          {answers?.values?.[i] || `${i + 1}. Lorem ipsum`}
        </p>
      ))}
    </div>
  );
}
