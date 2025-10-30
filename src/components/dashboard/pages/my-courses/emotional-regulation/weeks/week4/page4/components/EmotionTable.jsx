import React, { useEffect, useState } from "react";

function EmotionTable({ data, setErrorMessage, answers, setAnswers }) {
  const [localValues, setLocalValues] = useState({});

  useEffect(() => {
    const existingAnswer = answers.find((item) => item.stepId === data.step);
    if (existingAnswer) {
      setLocalValues(existingAnswer.value || {});
    }
  }, [answers, data.step]);

  const handleInputChange = (emotion, field, value) => {
    const key = `${emotion}_${field}`;
    const updatedValues = { ...localValues, [key]: value };
    setLocalValues(updatedValues);

    // Update answers array
    const updatedAnswers = answers.filter((item) => item.stepId !== data.step);
    updatedAnswers.push({
      stepId: data.step,
      value: updatedValues,
    });
    setAnswers(updatedAnswers);
    setErrorMessage("");
  };

  return (
    <div className="container">
      <div className="table-responsive">
        <table className="table table-bordered border border-1 border-secondary">
          <thead>
            <tr>
              <th
                className="text-center text-white py-3 px-4 border border-1 border-secondary"
                style={{ backgroundColor: "#27AE60", width: "25%" }}
              >
                <h2 className="mb-0 text-white">Emotion</h2>
              </th>
              <th
                className="text-center text-white py-3 px-4 border border-1 border-secondary"
                style={{ backgroundColor: "#27AE60", width: "45%" }}
              >
                <h2 className="mb-0 text-white">What you did</h2>
              </th>
              <th
                className="text-center text-white py-3 px-4 border border-1 border-secondary"
                style={{ backgroundColor: "#27AE60", width: "30%" }}
              >
                <h2 className="mb-0 text-white">Healthy/Unhealthy</h2>
              </th>
            </tr>
          </thead>
          <tbody>
            {data.emotions.map((emotion, index) => (
              <tr key={index}>
                <td className="align-middle py-3 px-4 border-bottom border border-1 border-secondary">
                  <h2 className="text-gray fs-3">{emotion}</h2>
                </td>
                <td className="align-middle py-2 px-2 border-bottom border border-1 border-secondary">
                  <input
                    type="text"
                    className="border-0 bg-transparent border-outline-0 form-control small-input text-gray"
                    placeholder="Type here..."
                    value={localValues[`${emotion}_whatYouDid`] || ""}
                    onChange={(e) =>
                      handleInputChange(emotion, "whatYouDid", e.target.value)
                    }
                    style={{
                      outline: "none",
                      boxShadow: "none",
                      padding: "10px 15px",
                    }}
                  />
                </td>
                <td className="align-middle py-2 px-2 border-bottom border border-1 border-secondary">
                  <select
                    className="form-select border-0 bg-transparent w-100"
                    value={localValues[`${emotion}_healthStatus`] || ""}
                    onChange={(e) =>
                      handleInputChange(emotion, "healthStatus", e.target.value)
                    }
                    style={{
                      outline: "none",
                      boxShadow: "none",
                      padding: "10px 15px",
                      cursor: "pointer",
                    }}
                  >
                    <option value="">Select...</option>
                    <option value="Healthy">Healthy</option>
                    <option value="Unhealthy">Unhealthy</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default EmotionTable;
